import {LIBRARY_MENU_ITEMS, MENU_ITEMS} from "@/data/menu.data.ts";
import {Menu} from "@/components/layout/left-sidebar/Menu.tsx";
import {playlistStore} from "@/store/playlist.store.ts";
import {PagesConfig} from "@/config/pages.config.ts";
import {Plus} from "lucide-react";

export function LeftSidebar() {
    return <aside className="px-layout border-r border-player-bg h-full py-9">

        <Menu items={MENU_ITEMS} />

        <hr className="my-8 border-player-bg" />

        <Menu items={LIBRARY_MENU_ITEMS} title="Your Library" />

        <hr className="my-8 border-player-bg" />

        {/* TODO: add playlist */}
        <Menu
            items={
                playlistStore.playlists.map(playlist => ({
                    name: playlist.name,
                    link: PagesConfig.PLAYLIST(playlist.name)
                }))
            }
            title="PlayLists" >
            <button className="flex items-center gap-1.5 mt-5 bg-zinc-700/30 py-2 px-3.5 rounded-md
            duration-300 transition-colors hover:bg-zinc-700/50">
                <Plus /> <span>New Playlist</span>
            </button>
        </Menu>
    </aside>
}
