import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import type { ITrack } from "@/types/track.types";
import {Ellipsis, Heart} from "lucide-react";

interface Props {
    track: ITrack;
};

dayjs.extend(utc);
export function Track({track}: Props) {
    return (
        <div className="border-b border-player-bg py-4">
            <div className="flex items-center gap-3">
                {/* TODO: Circle progress-bar */}
                <div
                    className="h-10 w-10 shrink-0 rounded-full border border-primary bg-white/5"
                    aria-hidden
                />
                <div className="min-w-0 flex-1">
                    <div className="truncate text-lg text-white">{track.name}</div>
                    <div className="opacity-65">
                        {dayjs.unix(track.duration).utc().format('m:ss')}
                    </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                    <button type="button" aria-label="В избранное">
                        <Heart className="text-primary hover:fill-primary" />
                    </button>
                    <button type="button" aria-label="Ещё">
                        <Ellipsis className="opacity-65 hover:opacity-100" />
                    </button>
                </div>
            </div>
        </div>
    )
}