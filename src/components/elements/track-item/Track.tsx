import type { ITrack } from "@/types/track.types";
import { Heart } from "lucide-react";
import {TrackInfo} from "@/components/ui/track-info/TrackInfo";
import {transformDuration} from "@/utils/transform-duration.ts";
import {favoriteStore} from "@/store/favorite.store.ts";
import { observer } from "mobx-react-lite";
import {AddToPlaylist} from "@/components/elements/track-item/AddToPlaylist.tsx";

interface Props {
    track: ITrack;
};


export const Track = observer(function Track({track}: Props) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-player-bg/50 py-7 last:border-0">
            <div className="min-w-0 flex-1">
                <TrackInfo
                    title={track.name}
                    subTitle={transformDuration(track.duration)}
                    image={track.cover}
                    track={track}
                />
            </div>
            <div className="flex shrink-0 items-center gap-4">
                <button onClick={() => {favoriteStore.toggleFavorite(track.id)}} >
                    <Heart className="text-primary opacity-85 duration-300 hover:opacity-100"
                           fill={favoriteStore.isFavorite(track.id) ? 'var(--color-primary)' : 'none'}
                    />
                </button>
                <button>
                    <AddToPlaylist track={track} />
                </button>
            </div>
        </div>
    );
})
