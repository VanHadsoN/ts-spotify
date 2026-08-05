import { observer } from 'mobx-react-lite';

import { TrackListPage } from "@/pages/TrackListPage.tsx";
import { recentlyPlayedStore } from "@/store/recently-played.store.ts";
import { resolveTracks } from "@/utils/tracks-by-id.ts";

export const RecentlyPlayedPage = observer(function RecentlyPlayedPage() {
    const tracks = resolveTracks(recentlyPlayedStore.trackIds);

    return (
        <TrackListPage
            title="Recently Played"
            tracks={tracks}
            emptyText="Nothing played yet"
        />
    );
});
