import {TrackInfo} from "@/components/ui/track-info/TrackInfo";
import {musicPlayerStore} from "@/store/store";
import {Pause, Play, SkipBack, SkipForward, Volume, Volume1, Volume2} from "lucide-react";
import {transformDuration} from "@/utils/transform-duration.ts";

interface Props {}

export function AudioPlayer({}: Props) {
    if (!musicPlayerStore.currentTrack) return null;

    return <div className="w-full py-8 px-10 bg-player-bg
            border-t border-white/10
            flex items-center justify-between fixed bottom-0 left-0">
        <TrackInfo
            title={musicPlayerStore.currentTrack.name}
            subTitle={musicPlayerStore.currentTrack.artist.name}
            image={undefined}
        />

        <div>
            <div>
                <button>
                    <SkipBack />
                </button>

                <button className="rounded-full bg-gradient-to-r from-[#3C3D41] to-[#444549]
                p-4 border border-player-bg border-solid duration-300 hover:shadow">
                    {musicPlayerStore.isPlaying ? <Pause /> : <Play />}
                </button>

                <button>
                    <SkipForward />
                </button>
            </div>

            <div>
                <span>0:00</span>
                <input type="range"/>
                <span>
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