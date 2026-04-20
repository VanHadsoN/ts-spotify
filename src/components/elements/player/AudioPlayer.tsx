import {TrackInfo} from "@/components/ui/track-info/TrackInfo";
import {musicPlayerStore} from "@/store/store";
import {Pause, Play, SkipBack, SkipForward} from "lucide-react";

interface Props {}

export function AudioPlayer({}: Props) {
    if (!musicPlayerStore.currentTrack) return null;

    return <div>
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

                <button className="rounded-full
                bg-gradient-to-r from-[#3C3D41] to-[#1F2026]
                p-5 border border-player-bg bodredr-solid
                duration-300 hover:shadow">
                    {musicPlayerStore.isPlaying ? <Pause /> : <Play />}
                </button>

                <button>
                    <SkipForward />
                </button>
            </div>
        </div>
    </div>
}