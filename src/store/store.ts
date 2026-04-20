import { makeAutoObservable } from 'mobx';
import type {ITrack} from "@/types/track.types.ts";

class MusicPlayerStore {
    isPlaying: boolean = false;
    currentTrack: ITrack | null = null;

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