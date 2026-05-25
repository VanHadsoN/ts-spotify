import type { ITrack } from "../types/track.types.ts";
import { ARTISTS } from "./artist.data.ts";

export const TRACKS: ITrack[] = [
    {
        name: 'Train Kept A Rollin’',
        file: '/audio/Aerosmith - Train Kept A Rollin\'.mp3',
        artist: ARTISTS[0],
        cover: '/cover/Train_Kept_A_Rollin.jpg',
        duration: 333, // сек
    },
    {
        name: 'Green River',
        file: '/audio/Creedence Clearwater Revival - Green River.mp3',
        artist: ARTISTS[1],
        cover: '/cover/Green_River.jpg',
        duration: 156, // сек
    },
    {
        name: 'Zitti e buoni',
        file: '/audio/Maneskin - Zitti e buoni.mp3',
        artist: ARTISTS[2],
        cover: '/cover/Zitti_e_buoni.jpg',
        duration: 193, // сек
    },
    {
        name: 'Little By Little',
        file: '/audio/Oasis - Little By Little.mp3',
        artist: ARTISTS[3],
        cover: '/cover/Little_By_Little.jpg',
        duration: 294, // сек
    },
    {
        name: 'Last of the Mohikans Theme',
        file: '/audio/Trevor Jones - Last of the Mohikans Theme.mp3',
        artist: ARTISTS[4],
        cover: '/cover/Last_of_the_Mohikans_Theme.jpg',
        duration: 104, // сек
    },
];
