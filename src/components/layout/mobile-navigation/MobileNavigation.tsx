import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";

import { LeftSidebar } from "@/components/layout/left-sidebar/LeftSidebar.tsx";

export function MobileNavigation() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const openNavigation = useCallback(() => {
        const isDesktop = window.matchMedia("(min-width: 48rem)").matches;
        const dialog = dialogRef.current;

        if(isDesktop || !dialog || dialog.open) return;

        dialog.showModal();
        setIsOpen(true);
    }, []);

    const closeNavigation = useCallback(() => {
        const dialog = dialogRef.current;

        if(dialog?.open) {
            dialog.close();
        }
    }, []);

    // Закрываем меню после перехода на другую страницу
    useEffect(() => {
        closeNavigation();
    }, [location.pathname, closeNavigation]);

    // Запрещаем прокрутку страницы под открытым меню
    useEffect(() => {
        if(!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        }
    }, [isOpen]);

    // TODO: Добавить эффект, который следит за шириной окна
    useEffect(() => {

    }, []);

    return (
        <header
            className="sticky top-0 z-40 flex h-14 items-center
            border-b border-player-bg bg-bg px-4
            md-hidden"
        >
            <button
                type="button"
                aria-label="open navigation"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                onClick={openNavigation}
                className="flex size-11 items-center justify-center
                rounde-md transition-colors hover:bg-white/10"
            >
                <Menu aria-hidden="true" />
            </button>

            <span className="ml-3 font-semibold text-white">
                Spotify
            </span>

            <dialog
                ref={dialogRef}
                aria-label="main navigation"
                onClose={() => setIsOpen(false)}
                onClick={(event) => {
                    if(event.target === event.currentTarget) {
                        closeNavigation();
                    }
                }}
                className="fixed inset-y-0 left-0 m-0
                h-dvh max-h-none w-[min(20rem, 85vw)] max-w-none
                overflow-y-auto bg-bg p-0 text-inherit
                backdrop:bg-black/60
                md:hidden"
            >
                <div className="relative min-h-full">
                    <button
                        type="button"
                        aria-label="close navigation"
                        onClick={closeNavigation}
                        className="absolute right-3 top-3 z-10
                        flex size-11 items-center justify-center
                        rounded-md transition-colors hover:bg-white/10"
                    >
                        <X aria-hidden="true" />
                    </button>

                    <LeftSidebar />
                </div>
            </dialog>
        </header>
    );
}
