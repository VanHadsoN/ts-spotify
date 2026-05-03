import {TrackInfo} from "@/components/ui/track-info/TrackInfo";
import {musicPlayerStore} from "@/store/store";
import {Pause, Play, SkipBack, SkipForward, Volume, Volume1, Volume2} from "lucide-react";
import {transformDuration} from "@/utils/transform-duration.ts";
import { observer } from "mobx-react-lite";
import { useRef, useEffect } from "react";

interface Props {}

export function AudioPlayerInner({}: Props) {
    const audioRef = useRef<HTMLAudioElement>(null);
    // const isDraggingRef = useRef(false);

    const track = musicPlayerStore.currentTrack;
    if (!track) return null;

    useEffect(() => {
        musicPlayerStore.resetPlayback?.();
        const el = audioRef.current;
        if (el) el.load();
    }, [track?.file]);

    return <div className="w-full py-5 px-10 bg-player-bg
            border-t border-white/10
            flex items-center justify-between fixed bottom-0 left-0">
        <TrackInfo
            title={track.name}
            subTitle={track.artist.name}
            image={undefined}
        />

        <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
                <button className="opacity-80 hover:opacity-100 duration-300">
                    <SkipBack size={20}/>
                </button>

                <button className="rounded-full bg-gradient-to-r from-[#3C3D41] to-[#444549]
                p-3 border border-white/5 border-solid duration-300
                hover:shadow text-primary">
                    {musicPlayerStore.isPlaying ? (
                        <Pause size={20}/>
                        ) : (
                        <Play
                            size={20}
                            className="group-hover:fill-primary"
                        />
                    )}
                </button>

                <button className="opacity-80 hover:opacity-100 duration-300">
                    <SkipForward size={20}/>
                </button>
            </div>

            <div className="flex items-center gap-2">
                <span>0:00</span>
                <div
                    className="bg-white/20 w-full rounded relative h-1"
                >
                    <div className="absolute top-0 left-0 h-1 rounded bg-gradient-to-r
                    from-primary to-secondary"
                         style={{
                             width:`${musicPlayerStore.progress}%`
                         }}
                    />
                    <input type="range"
                           min={0}
                           max={track.duration}
                           className=""
                           onChange={(e) => musicPlayerStore.seek(Number(e.target.value))}
                           value={musicPlayerStore.currentTime}
                    />
                </div>

                <span className="text-white/50">
                    {transformDuration(track.duration)}
                </span>
            </div>

            <div>
                {
                    musicPlayerStore.volume === 0 ? (<Volume />) :
                    musicPlayerStore.volume < 50 ? (<Volume1 />) :
                    (<Volume2 />
                    )
                }

                {/* TODO: ProgressBar */}
            </div>
        </div>
    </div>
}

export const AudioPlayer = observer(AudioPlayerInner);