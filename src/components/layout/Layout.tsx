import type { PropsWithChildren } from "react";
import { RightSidebar } from "@/components/layout/right-sidebar/RightSidebar.tsx";
import { LeftSidebar } from "@/components/layout/left-sidebar/LeftSidebar.tsx";
import { AudioPlayer } from "@/components/elements/player/AudioPlayer.tsx";
import { MobileNavigation } from "@/components/layout/mobile-navigation/MobileNavigation.tsx";

export default function Layout ({ children }: PropsWithChildren<unknown>) {

    return (
        <>
            <MobileNavigation />

            <div
                className="
                    grid min-h-screen grid-cols-1 pb-28
                    md:grid-cols-[15rem_minmax(0.1fr)]
                    xl:grid-cols-[15rem_minmax(0,1fr)_18rem]
                "
            >
                <div className="hidden md:block">
                    <LeftSidebar />
                </div>

                <main className="min-w-0 px-4 sm:px-6 md:p-8">
                    {children}
                </main>

                <div className="hidden xl:block">
                    <RightSidebar />
                </div>
            </div>
            <AudioPlayer />
        </>
    )

}