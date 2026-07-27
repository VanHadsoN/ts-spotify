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

export type PlaylistMutationResult =
    | "success"
    | "empty"
    | "duplicate"
    | "not-found";

const normalizeName = (name: string) => name.trim();

const namesEqual = (first: string, second: string) =>
    normalizeName(first).toLowerCase() === normalizeName(second).toLowerCase();

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

    createPlaylist(name: string): PlaylistMutationResult {
        const normalizedName = normalizeName(name);

        if(!normalizedName) return "empty";

        const exist = this.playlists.some(playlist =>
            namesEqual(playlist.name, normalizedName)
        );

        if(exist) return "duplicate";

        this.playlists.push({
            name: normalizedName,
            trackIds: [],
        });

        this.saveToLocalStorage();
        return "success";
    }

    renamePlaylist(
        currentName: string,
        newName: string
    ) : PlaylistMutationResult {
        const normalizedName = normalizeName(newName);

        if(!normalizedName) return "empty";

        const playlist = this.playlists.find((item) =>
            namesEqual(item.name, currentName)
        );

        if(!playlist) return "not-found";

        const duplicate = this.playlists.some((item) =>
            item !== playlist && namesEqual(item.name, normalizedName)
        );

        if(duplicate) return "duplicate";

        playlist.name = normalizedName;
        this.saveToLocalStorage();

        return "success";
    }

    deletePlaylist(name: string) : PlaylistMutationResult {
        const playlistIndex = this.playlists.findIndex((item) =>
            namesEqual(item.name, name)
        );

        if(playlistIndex === -1) return "not-found";

        this.playlists.splice(playlistIndex, 1);
        this.saveToLocalStorage();

        return "success";
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
