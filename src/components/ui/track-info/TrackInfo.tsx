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

            {track ? (
                <button onClick={() => musicPlayerStore.setTrack(track)}>
                    <img
                        src={image}
                        alt={title}
                        className="w-12 h-12 rounded-full"
                    />
                </button>
            ) : (
                <img
                    src={image}
                    alt={title}
                    className="w-12 h-12 rounded-full"
                />
            )}

            <div>
                <div className="text-lg text-white font-medium">{title}</div>
                <div>{subTitle}</div>
            </div>
        </div>
    )
}
