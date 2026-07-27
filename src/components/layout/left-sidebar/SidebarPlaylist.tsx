import type { FormEvent } from "react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Menu } from "@/components/layout/left-sidebar/Menu.tsx";
import { CustomMenu } from "@/components/ui/custom-menu/CustomMenu.tsx";
import { PagesConfig } from "@/config/pages.config.ts";
import { playlistStore } from "@/store/playlist.store.ts";

export const SidebarPlaylist = observer(function SidebarPlaylist() {
    const [value, setValue] = useState("");
    const [isShow, setIsShow] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = playlistStore.createPlaylist(value);

        if(result === "duplicate") {
            setError("A playlist with this name already exists");
            return;
        }

        setValue("");
        setError(null);
        setIsShow(false);
    };

    const handleToggleMenu = () => {
        setIsShow((currentValue) => !currentValue);

        setError(null);
    };

    return (
        <Menu
            items={
                playlistStore.playlists.map(playlist => ({
                    name: playlist.name,
                    link: PagesConfig.PLAYLIST(playlist.name),
                }))
            }
            title="PlayLists"
        >
            <div className="relative">
                <button
                    type="button"
                    aria-expanded={isShow}
                    onClick={handleToggleMenu}
                    className="flex items-center gap-1.5 mt-5 bg-zinc-700/30 py-2 px-3.5 rounded-md
                duration-300 transition-colors hover:bg-zinc-700/50"
                >
                    <Plus /><span>New Playlist</span>
                </button>

                {isShow && (
                    <CustomMenu>
                        <form onSubmit={handleCreate}>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Playlist name"
                                value={value}
                                aria-invalid={Boolean(error)}
                                aria-describedby={
                                    error ? "playlist-name-error" : undefined
                                }
                                onChange={(event) => {
                                    setValue(event.target.value);
                                    setError(null);
                                }}
                                className="rounded-md px-3 py-2 w-full"
                            />

                            {error && (
                                <p
                                    id="playlist-name-error"
                                    className="px-2 py-1 text-sm text-red-400"
                                >
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="w-full rounded-md px-3 py-2 mt-1 transition-colors hover:bg-zinc-700"
                            >
                                Create
                            </button>
                        </form>
                    </CustomMenu>
                )}
            </div>

        </Menu>
    );
});
