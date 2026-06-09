import {LIBRARY_MENU_ITEMS, MENU_ITEMS} from "@/data/menu.data.ts";
import {Menu} from "@/components/layout/left-sidebar/Menu.tsx";
import {SidebarPlaylist} from "@/components/layout/left-sidebar/SidebarPlaylist.tsx";

export function LeftSidebar() {
    return <aside className="px-layout border-r border-player-bg h-full py-9">

        <Menu items={MENU_ITEMS} />

        <hr className="my-8 border-player-bg" />

        <Menu items={LIBRARY_MENU_ITEMS} title="Your Library" />

        <hr className="my-8 border-player-bg" />

        <SidebarPlaylist />

    </aside>
}
