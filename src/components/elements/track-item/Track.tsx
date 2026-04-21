
import type { ITrack } from "@/types/track.types";
import {Ellipsis, Heart} from "lucide-react";
import {TrackInfo} from "@/components/ui/track-info/TrackInfo";
import {transformDuration} from "@/utils/transform-duration.ts";

interface Props {
    track: ITrack;
};


export function Track({track}: Props) {
    return (
        <div className="border-b border-player-bg/50 py-7 last:border-0">
            <TrackInfo
                title={track.name}
                subTitle={transformDuration(track.duration)}
                image={undefined}
            />
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