import { makeAutoObservable } from 'mobx';
import type {ITrack} from "@/types/track.types.ts";
import {TRACKS} from "@/data/tracks.data.ts";

class MusicPlayerStore {
    isPlaying: boolean = false;
    currentTrack: ITrack | null = TRACKS[0];
    volume: number = 85;

    constructor() {
        makeAutoObservable(this);
    }

    play(track: ITrack) {
        this.currentTrack = track;
        this.isPlaying = true;
        console.log(`Playing track: ${track.name}`);
    }
}

export const musicPlayerStore = new MusicPlayerStore();