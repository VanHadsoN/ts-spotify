import { Link } from 'react-router-dom';
import { PagesConfig } from "@/config/pages.config.ts";
import { getAlbums } from "@/utils/albums.ts";

export function AlbumsPage() {
    const albums = getAlbums();

    return (
        <section>
            <h1 className="text-2xl font-semibold mb4">Albums</h1>
            <ul>
                {albums.map((album) => (
                    <li key={album.id}>
                        <Link to={PagesConfig.ALBUMS(album.id)}>
                            <img src={album.cover} alt={album.name} />
                            <span>{album.name}</span>
                            <span className="opacity-70">{album.artistName}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
