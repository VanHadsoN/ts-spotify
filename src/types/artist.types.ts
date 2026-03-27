import type { ITrack } from "./track.types.ts";

export interface IArtist {
    name: string;
    image: string;
    listenersCount: number;
    tracks: ITrack[];
}