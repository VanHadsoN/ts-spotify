import type { ComponentPropsWithoutRef } from 'react';
import cn from "clsx";

interface Props extends ComponentPropsWithoutRef<"div"> {
    side?: "left" | "right";
}

export function CustomMenu({ children, side, className, ...props }: Props) {
    return (
        <div
            {...props}
            className={cn("w-48 fade-in bg-[#2B2B30] p-1 rounded-md absolute z-10",
                        side === "left" ? "left-0" : side === "right" ? "right-0" : "left-1/2 -translate-x-1/2",
                className,
            )}
            style={{ top: "calc(100% + 0.5rem)", ...props.style }}
        >
            {children}
        </div>
    );
}
