import type { PropsWithChildren } from "react";

export default function Layout ({ children }: PropsWithChildren<unknown>) {

    return (
        <div className='h-full grid grid-cols-[1fr_3.5fr_1.2fr]'>
            <Sidebar />
            <main className='py-6 px-4'>
                {children}
            </main>
            <RightSidebar />
        </div>
        )

}