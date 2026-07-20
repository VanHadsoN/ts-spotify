import { TRACKS } from "@/data/tracks.data.ts";
import type { ITrack } from "@/types/track.types.ts";

export const tracksById = new Map<string, ITrack>(
    TRACKS.map((track) => [track.id, track]),
);

/* По списку id вернуть существующие треки (порядок сохраняем) */
export function resolveTracks(trackIds: string[]): ITrack[] {
    return trackIds
        .map((id) => tracksById.get(id))
        .filter((track): track is ITrack => Boolean(track));
}
