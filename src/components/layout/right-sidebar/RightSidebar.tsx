import {LIBRARY_MENU_ITEMS, MENU_ITEMS} from "@/data/menu.data.ts";
import {Menu} from "@/components/layout/left-sidebar/Menu.tsx";

export function RightSidebar() {
    return <aside>

        <Menu items={MENU_ITEMS} />

    </aside>
}