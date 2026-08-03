import { makeAutoObservable } from 'mobx';
import type { ITrack } from "@/types/track.types.ts";
import { TRACKS } from "@/data/tracks.data.ts";
import { recentlyPlayedStore } from "@/store/recently-played.store.ts";
import { readStorageJSON, STORAGE_KEYS, writeStorageJSON } from "@/utils/storage.ts";

const DEFAULT_VOLUME = 85;

const clampVolume = (value: number): number => Math.min(100, Math.max(0, Math.round(value)));

const getInitialVolume = (): number => {
    const savedVolume = readStorageJSON<number>(
        STORAGE_KEYS.volume,
        DEFAULT_VOLUME,
        (value): value is number =>
            typeof value === "number" && Number.isFinite(value),
    );

    return clampVolume(savedVolume);
};

const shuffle = <T,>(items: T[]) => {
    const result = [...items];

    for(let index = result.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }
    return result;
};

export type RepeatMode = "off" | "all" | "one";

class MusicPlayerStore {
    isPlaying: boolean = false;
    currentTrack: ITrack | null = TRACKS[0];
    volume: number = 85;
    currentTime: number = 0;
    currentDuration: number | null = null;
    progress: number = 0;
    seekRequestTime: number | null = null;
    repeatMode: RepeatMode = "off";
    isShuffleEnabled = false;
    isMuted = false;

    constructor() {
        this.volume = getInitialVolume();
        makeAutoObservable(this);
    }

    private playOrder: string[] = TRACKS.map(({ id }) => id);
    private playOrderIndex = 0;

    setTrack(track: ITrack | null) {
        this.currentTrack = track;
    }

    selectTrack(track: ITrack) {
        this.activateTrack(track);
        this.rebuildPlayOrder();
    }

    private activateTrack(track: ITrack) {
        this.setTrack(track);
        this.resetPlayback();
        recentlyPlayedStore.add(track.id);
    }

    toggleShuffle() {
        this.isShuffleEnabled = !this.isShuffleEnabled;
        this.rebuildPlayOrder();
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
    }

    cycleRepeatMode() {
        const modes: RepeatMode[] = ["off", "all", "one"];
        const currentIndex = modes.indexOf(this.repeatMode);

        this.repeatMode = modes[(currentIndex + 1) % modes.length];
    }

    private rebuildPlayOrder() {
        const currentTrackId = this.currentTrack?.id;
        const trackIds = TRACKS.map(({ id }) => id);

        if(!currentTrackId) {
            this.playOrder = trackIds;
            this.playOrderIndex = 0;
            return;
        }

        if(this.isShuffleEnabled) {
            const remainingTrackIds = trackIds.filter((id) => id !== currentTrackId)

            this.playOrder = [
                currentTrackId,
                ...shuffle(remainingTrackIds),
            ];
            this.playOrderIndex = 0;
            return;
        }

        this.playOrder = trackIds;

        const currentIndex = trackIds.indexOf(currentTrackId);
        this.playOrderIndex = currentIndex === -1 ? 0 : currentIndex;
    }

    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
    }

    play() {
        this.isPlaying = true;
    }

    pause() {
        this.isPlaying = false;
    }

    finishTrack() {
        if(this.repeatMode === "one") {
            this.requestSeek(0);
            return;
        }

        this.seekRequestTime = null;
        this.changeTrack("next", true);
    }

    seek(time: number) {
        const duration = this.currentDuration ?? this.currentTrack?.duration ?? 1;

        this.currentTime = time;
        this.progress = Math.min(100, Math.max(0, (time / duration) * 100));
    }

    // Опционально: сброс при смене трека (вызывать из компонента при смене currentTrack)
    resetPlayback() {
        this.currentTime = 0;
        this.progress = 0;
        this.currentDuration = null;
    }

    setVolume(volume: number) {
        const normalizedVolume = clampVolume(volume);

        this.volume = normalizedVolume;

        if(normalizedVolume > 0) {
            this.isMuted = false;
        }

        writeStorageJSON(STORAGE_KEYS.volume, normalizedVolume);
    }

    changeTrack(type: "prev" | "next", triggeredByEnd = false) {
        if(!this.currentTrack || this.playOrder.length === 0) return;

        const offset = type === "next" ? 1 : -1;
        const targetIndex = this.playOrderIndex + offset;

        const isOutsideQueue = targetIndex < 0 || targetIndex >= this.playOrder.length;

        if(isOutsideQueue) {
            // Без repeat all переход за границы очереди запрещён
            if(this.repeatMode !== "all") {
                if(triggeredByEnd) {
                    this.pause();
                }

                return;
            }

            if(this.isShuffleEnabled && type === "next") {
                /*
                * Создаём новый случайный цикл.
                * Текущий трек будет первым, поэтому выбираем индекс 1,
                * чтобы он не повторился сразу.
                */
                this.rebuildPlayOrder();
                this.playOrderIndex = Math.min(1, this.playOrder.length - 1);
            } else {
                // Обычное циклическое переключение
                this.playOrderIndex = type === "next" ? 0 : this.playOrder.length - 1;
            }
        } else {
            this.playOrderIndex = targetIndex;
        }

        const targetTrackId = this.playOrder[this.playOrderIndex];
        const targetTrack = TRACKS.find(({ id }) => id === targetTrackId);

        if(targetTrack) {
            this.activateTrack(targetTrack);
        }
    }

    requestSeek(time: number) {
        this.seekRequestTime = time;
        this.seek(time);
    }

    clearSeekRequest() {
        this.seekRequestTime = null;
    }

    setDuration(duration: number) {
        if(!Number.isFinite(duration) || duration <= 0) return;

        this.currentDuration = Math.floor(duration);
    }
}

export const musicPlayerStore = new MusicPlayerStore();
