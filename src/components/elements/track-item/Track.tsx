import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import type { ITrack } from "@/types/track.types";
import {Ellipsis, Heart} from "lucide-react";
import {TrackInfo} from "@/components/ui/track-info/TrackInfo";

interface Props {
    track: ITrack;
};

dayjs.extend(utc);
export function Track({track}: Props) {
    return (
        <div className="border-b border-player-bg/50 py-7 last:border-0">
            <TrackInfo
                title={track.name}
                subTitle={dayjs.unix(track.duration).utc().format('m:ss')}
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