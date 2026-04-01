import type { IMenuItem } from "@/types/menu.types.ts";

interface Props {
    items: IMenuItem[];
    title?: string;
}

export function Menu({items, title}: Props) {
    return <div>
        {title && <div className="opacity-60 text-xxs uppercase font-medium mb-5">{title}</div>}
        <ul>
            {items.map((item) => (
                <li key={item.name}>
                    <a className="flex gap-3 items-center mb-5 group"
                       href="#"
                    >
                        {item.icon && <item.icon className="group-hover:text-primary" />}
                        <span className="group-hover:text-primary duration-300 font-medium">{item.name}</span>
                    </a>
                </li>
            ))}
        </ul>

    </div>
}