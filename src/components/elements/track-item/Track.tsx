import type { ITrack } from "@/types/track.types";

interface Props {
    track: ITrack;
};

export function Track({track}: Props) {
    return <div>

        <img src={track} alt=""/>

    </div>
}