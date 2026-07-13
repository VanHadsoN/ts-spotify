import { makeAutoObservable } from "mobx";
import { readStorageJSON, STORAGE_KEYS, writeStorageJSON } from "@/utils/storage.ts";

const isStringArray = (value: unknown): value is string[] =>
    Array.isArray(value) && value.every((item) => typeof item === "string");

class FavoriteStore {
    favoritesTrackIds: string[] = readStorageJSON<string[]>(
        STORAGE_KEYS.favorites,
        [],
        isStringArray
    );

    constructor() {
        makeAutoObservable(this);
    }

    toggleFavorite(trackId: string) {
        if (this.favoritesTrackIds.includes(trackId)) {
            this.favoritesTrackIds = this.favoritesTrackIds.filter(id => id !== trackId);
        } else {
            this.favoritesTrackIds.push(trackId);
        }

        writeStorageJSON(STORAGE_KEYS.favorites, this.favoritesTrackIds);
    }

    isFavorite(trackId: string) {
        return this.favoritesTrackIds.includes(trackId);
    }
}

export const favoriteStore = new FavoriteStore;
