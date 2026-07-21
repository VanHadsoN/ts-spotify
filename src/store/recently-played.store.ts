import { makeAutoObservable } from "mobx";
import { readStorageJSON, STORAGE_KEYS, writeStorageJSON } from "@/utils/storage.ts";

const MAX_ITEMS = 30;

const isStringArray = (value: unknown): value is string[] =>
    Array.isArray(value) && value.every((item) => typeof item === "string");

class RecentlyPlayedStore {
    trackIds: string[] = readStorageJSON<string[]>(
        STORAGE_KEYS.recentlyPlayed,
        [],
        isStringArray
    );

    constructor() {
        makeAutoObservable(this);
    }

    /* Вызывать при выборе/старте трека */
    add(trackId: string) {
        // убрать дубликат, поставить в начало
        this.trackIds = [
            trackId,
            ...this.trackIds.filter((id) => id !== trackId),
        ].slice(0, MAX_ITEMS);

        writeStorageJSON(STORAGE_KEYS.recentlyPlayed, this.trackIds);
    }
}

export const recentlyPlayedStore = new RecentlyPlayedStore();
