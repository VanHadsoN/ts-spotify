import {LIBRARY_MENU_ITEMS, MENU_ITEMS} from "../../../data/menu.data.ts";
import {Menu} from "lucide-react";

export function RightSidebar() {
    return <aside>

        <Menu items={MENU_ITEMS} />

    </aside>
}