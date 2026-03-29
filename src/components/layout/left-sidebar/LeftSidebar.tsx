import {LIBRARY_MENU_ITEMS, MENU_ITEMS} from "@/data/menu.data.ts";
import {Menu} from "@/components/layout/left-sidebar/Menu.tsx";

export function LeftSidebar() {
    return <aside>

        <Menu items={MENU_ITEMS} />

        <hr />

        <Menu items={LIBRARY_MENU_ITEMS} title="Your Library" />

        <hr />

        <Menu items={[]} title="PlayLists" />
    </aside>
}