import type { IArtist } from "./artist.types.ts";

export interface ITrack {
    name: string;
    file: string;
    artist: IArtist;
    duration: number; // in seconds
}