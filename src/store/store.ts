import { makeAutoObservable } from 'mobx';
import type {ITrack} from "@/types/track.types.ts";
import {TRACKS} from "@/data/tracks.data.ts";

class MusicPlayerStore {
    isPlaying: boolean = false;
    currentTrack: ITrack | null = TRACKS[0];
    volume: number = 85;
    currentTime: number = 0;
    progress: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    play(track: ITrack) {
        this.currentTrack = track;
        this.isPlaying = true;
        console.log(`Playing track: ${track.name}`);
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
        this.volume = volume;
    }
}

export const musicPlayerStore = new MusicPlayerStore();
