
import type { ITrack } from "@/types/track.types";
import {Ellipsis, Heart} from "lucide-react";
import {TrackInfo} from "@/components/ui/track-info/TrackInfo";
import {transformDuration} from "@/utils/transform-duration.ts";

interface Props {
    track: ITrack;
};


export function Track({track}: Props) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-player-bg/50 py-7 last:border-0">
            <div className="min-w-0 flex-1">
                <TrackInfo
                    title={track.name}
                    subTitle={transformDuration(track.duration)}
                    image={undefined}
                />
            </div>
            <div className="flex shrink-0 items-center gap-4">
                <button type="button" aria-label="В избранное">
                    <Heart className="text-primary hover:fill-primary" />
                </button>
                <button type="button" aria-label="Ещё">
                    <Ellipsis className="opacity-65 hover:opacity-100" />
                </button>
            </div>
        </div>
    )
}