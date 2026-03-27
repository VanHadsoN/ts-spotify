import type { ITrack } from "../types/track.types.ts";
import { ARTISTS } from "./artist.data.ts";

export const TRACKS: ITrack[] = [
    {
        name: 'Train Kept A Rollin’',
        file: '/audio/Aerosmith - Train Kept A Rollin\'.mp3',
        artist: ARTISTS[0],
        duration: 333, // сек
    },
    {
        name: 'Green River',
        file: '/audio/Creedence Clearwater Revival - Green River.mp3',
        artist: ARTISTS[1],
        duration: 156, // сек
    },
    {
        name: 'Zitti e buoni',
        file: '/audio/Maneskin - Zitti e buoni.mp3',
        artist: ARTISTS[2],
        duration: 193, // сек
    },
    {
        name: 'Little By Little',
        file: '/audio/Oasis - Little By Little.mp3',
        artist: ARTISTS[3],
        duration: 294, // сек
    },
    {
        name: 'Last of the Mohikans Theme',
        file: '/audio/Trevor Jones - Last of the Mohikans Theme.mp3',
        artist: ARTISTS[4],
        duration: 104, // сек
    },
];