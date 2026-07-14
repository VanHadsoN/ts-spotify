import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import type { IMenuItem } from "@/types/menu.types.ts";

interface Props {
    items: IMenuItem[];
    title?: string;
    children?: ReactNode;
}

export function Menu({ items, title, children }: Props) {
    return (
        <div>
            {title && <div className="opacity-60 text-xxs uppercase font-medium mb-5">{title}</div>}

            {items.length === 0 && <div>No items found</div>}

            <ul>
                {items.map((item) => (
                    <li key={item.link}>
                        <NavLink to={item.link} className="flex gap-3 items-center mb-5 group">
                            {({ isActive }) => (
                                <>
                                    {item.icon && (
                                        <item.icon className={isActive ? "text-primary" : "group-hover:text-primary"} />
                                    )}
                                    <span
                                        className={
                                            isActive
                                                ? "text-primary duration-300 font-medium"
                                                : "group-hover:text-primary duration-300 font-medium"
                                        }
                                    >
                    {item.name}
                  </span>
                                </>
                            )}
                        </NavLink>
                    </li>
                ))}
            </ul>

            {children}
        </div>
    );
}
