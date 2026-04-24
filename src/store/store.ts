import { makeAutoObservable } from 'mobx';
import type {ITrack} from "@/types/track.types.ts";
import {TRACKS} from "@/data/tracks.data.ts";

class MusicPlayerStore {
    isPlaying: boolean = false;
    currentTrack: ITrack | null = TRACKS[0];
    volume: number = 85;
    currentTime: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    play(track: ITrack) {
        this.currentTrack = track;
        this.isPlaying = true;
        console.log(`Playing track: ${track.name}`);
    }

    seek(time: number) {
        this.currentTime = time;
    }
}

export const musicPlayerStore = new MusicPlayerStore();
