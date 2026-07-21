import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { TrackListPage } from '@/pages/TrackListPage.tsx';
import { favoriteStore } from "@/store/favorite.store.ts";
import { resolveTracks } from "@/utils/tracks-by-id.ts";

export const LikedSongsPage = observer(function LikedSongsPage() {
    const tracks = useMemo(
        () => resolveTracks(favoriteStore.favoritesTrackIds),
        [favoriteStore.favoritesTrackIds.slice()]
    );

    return (
        <TrackListPage
            title="LikedSongs"
            tracks={tracks}
            emptyText="No liked songs yet"
        />
    );
});