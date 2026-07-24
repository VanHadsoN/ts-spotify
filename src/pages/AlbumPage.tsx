import { useParams } from "react-router-dom";
import { getAlbums } from "@/utils/albums.ts";
import { TrackListPage } from "@/pages/TrackListPage.ts";

export function AlbumPage() {
    const { id } = useParams<{ id: string }>();
    const album = getAlbums().find((item) => item.id === id);

    if(!album) {
        return <p className="opacity-70">Album not found</p>;
    }

    return (
        <TrackListPage
            title={album.name}
            tracks={album.tracks}
            emptyText={"This album is empty"}
        />
    );
}
