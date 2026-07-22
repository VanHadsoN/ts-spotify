import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { ARTISTS } from "@/data/artist.data.ts";
import { TRACKS } from "@/data/tracks.data.ts";
import { TrackListPage } from "@/pages/TrackListPage.tsx";

const decodeParam = (value: string) => {
    try {
        return decodeURIComponent(value);
    } catch (error) {
        return value;
    }
};

export default function ArtistPage() {
    const { id } = useParams<{ id: string }>();
    const artistName = id ? decodeParam(id) : "";

    const artist = ARTISTS.find((item) => item.name === artistName);

    const tracks = useMemo(
        () => TRACKS.filter((track) => track.artist.name === artistName),
        [artistName],
    );

    if(!artist) {
        return (
            <section className="rounded-xl border border-player-bg p-8">
                <h1 className="text-2xl font-semibold mb-2">Artist not found</h1>
            </section>
        );
    }

    return (
        <TrackListPage
            title={artist.name}
            tracks={tracks}
            emptyText="No tracks for this artist"
        />
    );
}
