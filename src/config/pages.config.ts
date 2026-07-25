export class PagesConfig {
    static HOME = '/';
    static DISCOVER = '/discover';
    static RADIO = '/radio';

    static MADE_FOR_YOU = '/made-for-you';
    static RECENTLY_PLAYED = '/recently-played';
    static LIKED_SONGS = '/liked-songs';

    static PLAYLIST_ROUTE = '/playlist/:id';

    static PLAYLIST(id: string) {
        return `/playlist/${id}`;
    }

    static ALBUMS_ROUTE = "/albums/:id";

    static ALBUMS(id?: string) {
        return id ? `/albums/${id}` : "/albums";
    }

    static ARTISTS_ROUTE = "/artists/:id";

    static ARTISTS(id?: string) {
        return id ? `/artists/${id}` : "/artists";
    }
}
