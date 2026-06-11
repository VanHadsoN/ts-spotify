import type { ITrack } from "@/types/track.types";
import {Ellipsis, Heart, Menu, Plus} from "lucide-react";
import {TrackInfo} from "@/components/ui/track-info/TrackInfo";
import {transformDuration} from "@/utils/transform-duration.ts";
import {favoriteStore} from "@/store/favorite.store.ts";
import { observer } from "mobx-react-observer";
import {useState} from "react";
import {CustomMenu} from "@/components/ui/custom-menu/CustomMenu.tsx";
import {playlistStore} from "@/store/playlist.store.ts";

interface Props {
    track: ITrack;
}


export const AddToPlaylist = observer(function AddToPlaylist({track}: Props) {
    const [value, setValue] = useState("");
    const [isShow, setIsShow] = useState(false);
    return (
        <div className="relative">
            <button onClick={() => setIsShow(prev => !prev)} >
                <Ellipsis className="opacity-30 duration-300 hover:opacity-100" />
            </button>

            {isShow && (
                <CustomMenu>
                    {playlistStore.playlists.map(playlist => {
                        const isAdded = playlistStore.isTrackInPlaylist(
                            playlist.name,
                            track.name
                        )
                        return (
                            <button
                                key={playlist.name}
                                className="w-full text-left px-4 py-2 hover:bg-white/10"

                            ></button>
                        )
                    })}
                </CustomMenu>
            )}
        </div>
    );
})
