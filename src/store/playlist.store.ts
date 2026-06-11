import { makeAutoObservable } from "mobx";

class PlaylistStore {
    playlists: { name: string; tracks: string[] }[] = JSON.parse(
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
        this.playlists.push({ name, tracks: [] });

        this.saveToLocalStorage();
    }

    addToPlaylist(playlistName: string, trackName: string) {
        const playlist = this.playlists.find(playlist => playlist.name === playlistName);
        if (!playlist || playlist.tracks.includes(trackName)) return;
        playlist.tracks.push(trackName);

        this.saveToLocalStorage();
    }

    removeFromPlaylist(playlistName: string, trackName: string) {
        const playlist = this.playlists.find(playlist => playlist.name === playlistName);
        if (!playlist) return;
        playlist.tracks = playlist.tracks.filter(name => name !== trackName);

        this.saveToLocalStorage();
    }

    isTrackInPlaylist(playlistName: string, trackName: string) {
        const playlist = this.playlists.find(playlist => playlist.name === playlistName);
        if (!playlist) return false;
        return playlist.tracks.includes(trackName);
    }
}

export const playlistStore = new PlaylistStore();
