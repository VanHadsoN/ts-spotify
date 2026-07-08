import { makeAutoObservable } from "mobx";

type Playlist = {
    name: string;
    trackIds: string[];
};

class PlaylistStore {
    playlists: Playlist[] = JSON.parse(
        localStorage.getItem('playlists') || '[]'
    );

    constructor() {
        makeAutoObservable(this);
    }

    private saveToLocalStorage() {
        localStorage.setItem('playlists', JSON.stringify(this.playlists));
    }

    createPlaylist(name: string) {
        if (this.playlists.find(playlist => playlist.name === name)) return;
        this.playlists.push({ name, trackIds: [] });

        this.saveToLocalStorage();
    }

    toggleTrackInPlaylist(playlistName: string, trackId: string) {
        const playlist = this.playlists.find(playlist => playlist.name === playlistName);
        if (!playlist) return;

        if(playlist.trackIds.includes(trackId)) {
            playlist.trackIds = playlist.trackIds.filter(id => id !== trackId);
        } else {
            playlist.trackIds.push(trackId);
        }
        this.saveToLocalStorage();
    }

    isTrackInPlaylist(playlistName: string, trackId: string) {
        const playlist = this.playlists.find(playlist => playlist.name === playlistName);
        return playlist?.trackIds.includes(trackId) ?? false;
    }
}

export const playlistStore = new PlaylistStore();
