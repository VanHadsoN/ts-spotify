import {LIBRARY_MENU_ITEMS, MENU_ITEMS} from "@/data/menu.data.ts";
import {Menu} from "@/components/layout/left-sidebar/Menu.tsx";

export function LeftSidebar() {
    return <aside>

        <Menu items={MENU_ITEMS} />

        <hr className="my-10 border-player-bg" />

        <Menu items={LIBRARY_MENU_ITEMS} title="Your Library" />

        <hr />

        <Menu items={[]} title="PlayLists" />
    </aside>
}