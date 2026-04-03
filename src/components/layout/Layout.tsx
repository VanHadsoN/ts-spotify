import type { PropsWithChildren } from "react";
import {RightSidebar} from "@/components/layout/right-sidebar/RightSidebar.tsx";
import {LeftSidebar} from "@/components/layout/left-sidebar/LeftSidebar.tsx";

export default function Layout ({ children }: PropsWithChildren<unknown>) {

    return (
        <div className='min-h-screen h-full grid grid-cols-[1fr_4fr_1.1fr]'>
            <LeftSidebar />
            <main className='p-layout'>
                {children}
            </main>
            <RightSidebar />
        </div>
        )

}