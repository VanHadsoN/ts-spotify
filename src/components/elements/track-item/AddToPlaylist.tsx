import type { ITrack } from "@/types/track.types";
import { Ellipsis } from "lucide-react";
import { observer } from "mobx-react-lite";
import {useState} from "react";
import {CustomMenu} from "@/components/ui/custom-menu/CustomMenu.tsx";
import {playlistStore} from "@/store/playlist.store.ts";
import cn from "clsx";

interface Props {
    track: ITrack;
}


export const AddToPlaylist = observer(function AddToPlaylist({track}: Props) {

    const [isShow, setIsShow] = useState(false);
    const hasPlayLists = playlistStore.playlists.length > 0;
    return (
        <div className="relative">
            <button
                type="button"
                aria-label={`Add ${track.name} to playlist`}
                aria-expanded={isShow}
                onClick={() => setIsShow(prev => !prev)}
            >
                <Ellipsis className="opacity-30 duration-300 hover:opacity-100" />
            </button>

            {isShow && (
                <CustomMenu side="right">
                    <div className="p-1.5 space-y-1.5">
                        {hasPlayLists ? (
                            playlistStore.playlists.map(playlist => {
                                    const isAdded = playlistStore.isTrackInPlaylist(playlist.name, track.id);
                                    return (
                                        <button
                                            key={playlist.name}
                                            type="button"
                                            className={cn("w-full text-left transition-opacity duration-300 " +
                                                "hover:opacity-100 text-sm",
                                                isAdded ? "opacity-100 font-semibold" : "opacity-60"
                                            )}
                                            onClick={() => {
                                                playlistStore.toggleTrackInPlaylist(playlist.name, track.id)
                                            }}
                                        >
                                            <span>{playlist.name}</span>
                                        </button>
                                    );
                                })
                        ) : (
                            <div
                                role="status"
                                className="px-3 py-2 text-center"
                            >
                                <p className="text-sm opacity-70">
                                    No playlists yet
                                </p>

                                <p className="mt-1 text-xs opacity-50">
                                    Create a playlist first
                                </p>
                            </div>
                        )}
                    </div>
                </CustomMenu>
            )}
        </div>
    );
})
