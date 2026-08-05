import type { ITrack } from "../types/track.types.ts";
import { ARTISTS } from "./artist.data.ts";
import {generateTrackId} from "@/utils/track-id.ts";

type RawTrack = Omit<ITrack, "id">;

export const RAW_TRACKS: RawTrack[] = [
    {
        name: "Train Kept A Rollin",
        album: "Get Your Wings",
        file: "/audio/aerosmith-train-kept-a-rollin.mp3",
        artist: ARTISTS[0],
        cover: "/cover/train-kept-a-rollin.jpg",
        duration: 335, // сек
    },
    {
        name: "Green River",
        album: "Green River",
        file: "/audio/creedence-clearwater-revival-green-river.mp3",
        artist: ARTISTS[1],
        cover: "/cover/green-river.jpg",
        duration: 136, // сек
    },
    {
        name: "Zitti e buoni",
        album: "Teatro d’ira: Vol. I.",
        file: "/audio/maneskin-zitti-e-buoni.mp3",
        artist: ARTISTS[2],
        cover: "/cover/zitti-e-buoni.jpg",
        duration: 194, // сек
    },
    {
        name: "Little By Little",
        album: "Heathen Chemistry",
        file: "/audio/oasis-little-by-little.mp3",
        artist: ARTISTS[3],
        cover: "/cover/little-by-little.jpg",
        duration: 294, // сек
    },
    {
        name: "Last of the Mohikans Theme",
        album: "The Last of the Mohicans (Original Motion Picture Soundtrack)",
        file: "/audio/trevor-jones-last-of-the-mohikans-theme.mp3",
        artist: ARTISTS[4],
        cover: "/cover/last-of-the-mohikans-theme.jpg",
        duration: 169, // сек
    },
];

export const TRACKS: ITrack[] = RAW_TRACKS.map((track) => ({
    ...track,
    id: generateTrackId(track.file, track.artist.name),
}));
