import { makeAutoObservable } from 'mobx';
import type {ITrack} from "@/types/track.types.ts";
import {TRACKS} from "@/data/tracks.data.ts";

const VOLUME_STORAGE_KEY = "player-volume";

const clampVolume = (value: number): number => Math.min(100, Math.max(0, Math.round(value)));

const getInitialVolume = (): number => {
    if(typeof window === "undefined") return 85;

    const raw = window.localStorage.getItem(VOLUME_STORAGE_KEY);
    const parsed = Number(raw);

    if(!Number.isFinite(parsed)) return 85;
    return clampVolume(parsed);
}

class MusicPlayerStore {
    isPlaying: boolean = false;
    currentTrack: ITrack | null = TRACKS[0];
    volume: number = 85;
    currentTime: number = 0;
    progress: number = 0;
    seekRequestTime: number | null = null;

    constructor() {
        this.volume = getInitialVolume();
        makeAutoObservable(this);
    }

    setTrack(track: ITrack | null) {
        this.currentTrack = track;
    }

    selectTrack(track: ITrack) {
        this.setTrack(track);
        this.resetPlayback();
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
        this.pause();
        this.seekRequestTime = null;
    }

    seek(time: number) {
        const duration = this.currentTrack?.duration || 1;
        this.currentTime = time;
        this.progress = Math.min(100, Math.max(0, (time / duration) * 100));
    }

    // Опционально: сброс при смене трека (вызывать из компонента при смене currentTrack)
    resetPlayback() {
        this.currentTime = 0;
        this.progress = 0;
    }

    setVolume(volume: number) {
        const normalizedVolume = clampVolume(volume);
        this.volume = normalizedVolume;

        if(typeof window !== "undefined") {
            window.localStorage.setItem(VOLUME_STORAGE_KEY, String(normalizedVolume));
        }
    }

    changeTrack(type: "prev" | "next") {
        if (!this.currentTrack) return;

        const currentIndex = TRACKS.findIndex(
            track => track.id === this.currentTrack?.id
        )

        if(currentIndex === -1) return;

        const nextIndex =
            type === "next"
                ? (currentIndex + 1) % TRACKS.length
                : (currentIndex - 1 + TRACKS.length) % TRACKS.length

    this.selectTrack(TRACKS[nextIndex]);
    }

    requestSeek(time: number) {
        this.seekRequestTime = time;
        this.seek(time);
    }

    clearSeekRequest() {
        this.seekRequestTime = null;
    }
}

export const musicPlayerStore = new MusicPlayerStore();
