import { useEffect, useRef } from 'react';

export function useDismissibleMenu(
    isOpen: boolean,
    onDismiss: () => void,
) {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if(!isOpen) return;

        const handlePointerDown = (event: PointerEvent) => {
            if(!(event.target instanceof Node)) return;

            if(containerRef.current && !containerRef.current.contains(event.target)
            ) {
                onDismiss();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if(event.key !== "Escape") return;

            event.preventDefault();
            onDismiss();
            triggerRef.current?.focus();
        };

        document.addEventListener("pointerdown", handlePointerDown, true);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown, true);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onDismiss]);

    return { containerRef, triggerRef };
}
