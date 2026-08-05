import type { ITrack } from "@/types/track.types.ts";

export const filterTracks = (tracks: ITrack[], searchTerm: string): ITrack[] => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if(!normalizedSearchTerm) return tracks;

    return tracks.filter(
        (track) =>
            track.name.toLowerCase().includes(normalizedSearchTerm) ||
            track.artist.name.toLowerCase().includes(normalizedSearchTerm),
    );
};
