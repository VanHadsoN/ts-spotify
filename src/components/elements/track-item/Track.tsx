import type { ITrack } from "@/types/track.types";

interface Props {
    track: ITrack;
};

export function Track({track}: Props) {
    return <div>

        <Mp3CoverPreview file={track.file} alt=""/>

    </div>
}