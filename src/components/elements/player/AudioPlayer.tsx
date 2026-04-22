import {TrackInfo} from "@/components/ui/track-info/TrackInfo";
import {musicPlayerStore} from "@/store/store";
import {Pause, Play, SkipBack, SkipForward, Volume, Volume1, Volume2} from "lucide-react";
import {transformDuration} from "@/utils/transform-duration.ts";

interface Props {}

export function AudioPlayer({}: Props) {
    if (!musicPlayerStore.currentTrack) return null;

    return <div className="w-full py-5 px-10 bg-player-bg
            border-t border-white/10
            flex items-center justify-between fixed bottom-0 left-0">
        <TrackInfo
            title={musicPlayerStore.currentTrack.name}
            subTitle={musicPlayerStore.currentTrack.artist.name}
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
                <input type="range"/>
                <span className="text-white/50">
                    {transformDuration(musicPlayerStore.currentTrack.duration)}
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