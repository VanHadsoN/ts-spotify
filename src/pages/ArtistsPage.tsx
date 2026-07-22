import { Link } from "react-router-dom";

import { ARTISTS } from "@/data/artist.data.ts";
import { PagesConfig } from "@/config/pages.config.ts";

export function ArtistsPage() {
    return (
        <section>
            <h1 className="text-2xl font-semibold md-4">Artists</h1>

            <ul className="grid gap-4">
                {ARTISTS.map(artist => (
                    <li key={artist.name}>
                        {/* encodeURIComponent — имена с пробелами/спецсимволами */}
                        <Link to={PagesConfig.ARTISTS(encodeURIComponent(artist.name))}>
                            <img src={artist.image} alt={artist.name} className="w-16 object-cover rounded-full" />
                            <span>{artist.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
