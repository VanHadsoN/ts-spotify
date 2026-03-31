import type { IArtist } from "../types/artist.types.ts";

export const ARTISTS: IArtist[] = [
    {
        name: 'Aerosmith',
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Aerosmith_with_Slash.jpg',
        listenersCount: 25600000,
        tracks: [],
    },
    {
        name: 'Creedence Clearwater Revival',
        image: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Creedence_Clearwater_Revival_1968.jpg',
        listenersCount: 38062378,
        tracks: [],
    },
    {
        name: 'Maneskin',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Maneskin_2018.jpg',
        listenersCount: 21858254,
        tracks: [],
    },
    {
        name: 'Oasis',
        image: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Oasis_2005.jpg',
        listenersCount: 27352156,
        tracks: [],
    },
    {
        name: 'Trevor Jones',
        image: 'https://trevorjonesfilmmusic.com/jpeg%20thumbnails/trevorjones%20revised.JPG', // нужно найти вручную / через API
        listenersCount: 274200, // нужно найти количество слушателей
        tracks: [],
    },
]