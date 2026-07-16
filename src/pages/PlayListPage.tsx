import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Track } from "@/components/elements/track-item/Track.tsx";
import { TRACKS } from "@/data/tracks.data.ts";
import { playlistStore } from "@/store/playlist.store.ts";
import type { ITrack } from "@/types/track.types.ts";

const tracksById = new Map<string, ITrack>(TRACKS.map((track) => [track.id, track]));

const decodeParam = (value: string) => {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
};

export const PlayListPage = observer(function PlaylistPage() {
    const { id } = useParams<{ id: string }>();
    const playlistName = id ? decodeParam(id) : "";

    const playlist = playlistStore.playlists.find((item) => item.name === playlistName);

    const tracks = useMemo(() => {
        if (!playlist) return [];
        return playlist.trackIds
            .map((trackId) => tracksById.get(trackId))
            .filter((track): track is ITrack => Boolean(track));
    }, [playlist]);

    if (!playlist) {
        return (
            <section className="rounded-xl border border-player-bg p-8">
                <h1 className="text-2xl font-semibold mb-2">Playlist not found</h1>
                <p className="opacity-70">The requested playlist does not exist</p>
            </section>
        );
    }

    return (
        <section>
            <h1 className="text-2xl font-semibold mb-4">{playlist.name}</h1>

            {tracks.length === 0 ? (
                <p className="opacity-70">This playlist is empty</p>
            ) : (
                tracks.map((track) => <Track key={track.id} track={track} />)
            )}
        </section>
    );
});
