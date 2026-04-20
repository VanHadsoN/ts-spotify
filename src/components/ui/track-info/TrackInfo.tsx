interface Props {
    image?: string;
    title: string;
    subTitle: string;
}

export function TrackInfo({ title, subTitle }: Props) {
    return (
        <div className="flex items-center gap-3">
            {/* TODO: Circle progress-bar */}
            {/* TODO: Play/pause button when hover title or cover */}
            <div
                className="h-10 w-10 shrink-0 rounded-full border border-primary bg-white/5"
                aria-hidden
            />
            <div className="min-w-0 flex-1">
                <div className="text-lg text-white font-medium">{title}</div>
                <div className="opacity-65">
                    {subTitle}
                </div>
            </div>
        </div>
    )
}