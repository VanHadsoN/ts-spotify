import type { PropsWithChildren } from "react";
import {RightSidebar} from "@/components/layout/right-sidebar/RightSidebar.tsx";
import {LeftSidebar} from "@/components/layout/left-sidebar/LeftSidebar.tsx";

export default function Layout ({ children }: PropsWithChildren<unknown>) {

    return (
        <div className='h-full grid grid-cols-[1fr_3.5fr_1.2fr]'>
            <LeftSidebar />
            <main className='py-6 px-4'>
                {children}
            </main>
            <RightSidebar />
        </div>
        )

}