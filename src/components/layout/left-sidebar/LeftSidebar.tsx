import {LIBRARY_MENU_ITEMS, MENU_ITEMS} from "@/data/menu.data.ts";
import {Menu} from "@/components/layout/left-sidebar/Menu.tsx";

export function LeftSidebar() {
    return <aside className="p-layout border-r border-player-bg h-full">

        <Menu items={MENU_ITEMS} />

        <hr className="my-8 border-player-bg" />

        <Menu items={LIBRARY_MENU_ITEMS} title="Your Library" />

        <hr className="my-8 border-player-bg" />

        {/* TODO: add playlist */}
        <Menu items={[]} title="PlayLists" />
    </aside>
}