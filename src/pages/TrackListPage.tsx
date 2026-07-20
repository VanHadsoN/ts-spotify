import { Track } from "@/components/elements/track-item/Track.tsx";
import type { ITrack } from "@/types/track.types.ts";

type Props = {
    title: string;
    tracks: ITrack[];
    emptyText: string;
};

export function TrackListPage({ title, tracks, emptyText }: Props) {
    return(
        <section>
            <h1 className="text-2xl font-semibold mb-4">{title}</h1>

            {tracks.length === 0 ? (
                <p className="opacity-70">{emptyText}</p>
            ) : (
                tracks.map((track) => <Track key={track.id} track={track} />)
            )}
        </section>
    );
}
export default TrackListPage;
