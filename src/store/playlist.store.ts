import { makeAutoObservable } from "mobx";
import { readStorageJSON, STORAGE_KEYS, writeStorageJSON } from "@/utils/storage.ts";

type Playlist = {
    name: string;
    trackIds: string[];
};

const isStringArray = (value: unknown): value is string[] =>
    Array.isArray(value) && value.every((item) => typeof item === "string");

const isPlaylist = (value: unknown): value is Playlist => {
    if(!value || typeof value !== "object") return false;

    const candidate = value as Record<string, unknown>;
    return typeof candidate.name === "string" && isStringArray(candidate.trackIds);
};

const isPlaylistArray = (value: unknown): value is Playlist[] =>
    Array.isArray(value) && value.every(isPlaylist);

class PlaylistStore {
    playlists: Playlist[] = readStorageJSON<Playlist[]>(
        STORAGE_KEYS.playlists,
        [],
        isPlaylistArray
    );

    constructor() {
        makeAutoObservable(this);
    }

    private saveToLocalStorage() {
        writeStorageJSON(STORAGE_KEYS.playlists, this.playlists);
    }

    createPlaylist(name: string) {
        if (this.playlists.find(playlist => playlist.name === name)) return;

        this.playlists.push({ name, trackIds: [] });
        this.saveToLocalStorage();
    }

    toggleTrackInPlaylist(playlistName: string, trackId: string) {
        const playlist = this.playlists.find((item) => item.name === playlistName);
        if (!playlist) return;

        if(playlist.trackIds.includes(trackId)) {
            playlist.trackIds = playlist.trackIds.filter((id) => id !== trackId);
        } else {
            playlist.trackIds.push(trackId);
        }

        this.saveToLocalStorage();
    }

    isTrackInPlaylist(playlistName: string, trackId: string) {
        const playlist = this.playlists.find((item) => item.name === playlistName);
        return playlist?.trackIds.includes(trackId) ?? false;
    }
}

export const playlistStore = new PlaylistStore();
