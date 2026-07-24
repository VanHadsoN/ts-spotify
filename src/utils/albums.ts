import { TRACKS } from "@/data/tracks.data.ts";
import type { ITrack } from "@/types/track.types.ts";

export type AlbumSummary = {
    id: string;
    name: string;
    artistName: string;
    cover: string;
    tracks: ITrack[];
};

/** id = encode-friendly slug из artist + album */
export function makeAlbum(artistName: string, albumName: string) {
    return encodeURIComponent(`${artistName}_${albumName}`);
}

export function getAlbums(): AlbumSummary[] {
    const map = new Map<string, AlbumSummary>();

    for(const track of TRACKS) {
        const key = `${track.artist.name}_${track.album}`;

        if(!map.has(key)) {
            map.set(key, {
                id: makeAlbum(track.artist.name, track.album),
                name: track.album,
                artistName: track.artist.name,
                cover: track.cover,
                tracks: [],
            });
        }

        map.get(key)!.tracks.push(track);
    }

    return [...map.values()];
}
