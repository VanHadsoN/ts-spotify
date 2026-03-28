import type { IMenuItem } from "@/types/menu.types.ts";

interface Props {
    items: IMenuItem[];
    title?: string;
}

export function Menu({items, title}: Props) {
    return <div>
        {title && <div>{title}</div>}
        <ul>
            {items.map((item) => (
                <li>
                    <a>
                        {item.icon && <item.icon />}
                        <span>{item.name}</span>
                    </a>
                </li>
            ))}
        </ul>

    </div>
}