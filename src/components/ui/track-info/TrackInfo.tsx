import {musicPlayerStore} from "@/store/store.ts";
import type {ITrack} from "@/types/track.types.ts";

interface Props {
    image: string;
    title: string;
    subTitle: string;
    track?: ITrack;
}

export function TrackInfo({ title, subTitle, image, track }: Props) {
    return (
        <div className="flex items-center gap-3">
            {/* TODO: Circle progress-bar */}
            {/* TODO: Play/pause button when hover title or cover */}

            <button onClick={() => musicPlayerStore.togglePlayPause()}>
                <img
                    src={image}
                    alt={title}
                    className="w-12 h-12 rounded-full"
                />
            </button>

            <div className="min-w-0 flex-1">
                <div className="text-lg text-white font-medium">{title}</div>
                <div className="opacity-65">
                    {subTitle}
                </div>
            </div>
        </div>
    )
}
