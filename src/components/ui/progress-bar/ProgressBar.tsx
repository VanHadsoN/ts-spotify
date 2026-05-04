import {transformDuration} from "@/utils/transform-duration.ts";

interface Props {
    currentTime?: number;
    duration?: number;
    progress: number;
    onSeek: (time: number) => void;
}

export function ProgressBar({
    currentTime,
    duration,
    progress,
    onSeek,
                            }: Props) {
    return <div className="flex items-center gap-5">
        {currentTime &&
            <span className="w-10">
                    {transformDuration(currentTime)}
                </span>
        }

        <div
            className="bg-white/20 w-full rounded relative h-1"
        >
            <div className="absolute top-0 left-0 h-1 rounded bg-gradient-to-r
                    from-primary to-secondary"
                 style={{
                     width:`${progress}%`
                 }}
            />

            <div
                className="w-3.5 h-3.5 bg-secondary rounded-full absolute top-1/2
                        -translate-y-1/2 -translate-x-1/2"
                style={{
                    left: `${progress}%`
                }}
            />
            <input type="range"
                   min={0}
                   max={duration}
                   className=""
                   onChange={(e) => onSeek(Number(e.target.value))}
                   value={currentTime}
            />
        </div>

        {duration &&
            <span className="text-white/50">
                    {transformDuration(duration)}
            </span>
        }

    </div>
}
