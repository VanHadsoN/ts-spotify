import { observer } from 'mobx-react-lite';

import { TrackListPage } from '@/pages/TrackListPage.tsx';
import { favoriteStore } from "@/store/favorite.store.ts";
import { resolveTracks } from "@/utils/tracks-by-id.ts";

export const LikedSongsPage = observer(function LikedSongsPage() {
    const tracks = resolveTracks(favoriteStore.favoritesTrackIds);

    return (
        <TrackListPage
            title="LikedSongs"
            tracks={tracks}
            emptyText="No liked songs yet"
        />
    );
});
