import { Navigate, Route, Routes } from "react-router-dom";

import { PagesConfig } from "@/config/pages.config.ts";
import { HomePage } from "@/pages/HomePage.tsx";
import { PlayListPage } from "@/pages/PlayListPage.tsx";
import { StubPage } from "@/pages/StubPage.tsx";

function App() {
    return (
        <Routes>
            <Route path={PagesConfig.HOME} element={<HomePage />} />
            <Route path={PagesConfig.DISCOVER} element={<StubPage title="Discover" />} />
            <Route path={PagesConfig.RADIO} element={<StubPage title="Radio" />} />
            <Route path={PagesConfig.MADE_FOR_YOU} element={<StubPage title="Made For You" />} />
            <Route path={PagesConfig.RECENTLY_PLAYED} element={<StubPage title="Recently Played" />} />
            <Route path={PagesConfig.LIKED_SONGS} element={<StubPage title="Liked Songs" />} />
            <Route path={PagesConfig.PLAYLIST_ROUTE} element={<PlayListPage />} />
            <Route path={PagesConfig.ALBUMS()} element={<StubPage title="Albums" />} />
            <Route path={PagesConfig.ARTISTS()} element={<StubPage title="Artists" />} />

            <Route path="*" element={<Navigate to={PagesConfig.HOME} replace />} />
        </Routes>
    );
}

export default App;
