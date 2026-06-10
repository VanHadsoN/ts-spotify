import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export function CustomMenu({ children }: Props) {
    return <div className="w-48 fade-in bg-zinc-700/30 p-4 rounded-md absolute left-0 z-10"
                style={{ top: 'calc(100% + 0.5rem)' }}
    >
        {children}
    </div>
}
