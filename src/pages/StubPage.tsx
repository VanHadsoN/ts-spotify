interface StubPageProps {
    title: string;
}

export function StubPage({ title }: StubPageProps) {
    return (
        <section className="rounded-xl border border-player-bg p-8">
            <h1 className="text-2xl font-semibold mb-2">{title}</h1>
            <p className="opacity-70">This page is a work in progress</p>
        </section>
    );
}
