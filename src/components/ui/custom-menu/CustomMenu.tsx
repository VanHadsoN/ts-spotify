import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export function CustomMenu({ children }: Props) {
    return <div className="bg-zinc-700/30 p-4 rounded-md absolute bottom-0 right-0 z-10">
        {children}
    </div>
}
