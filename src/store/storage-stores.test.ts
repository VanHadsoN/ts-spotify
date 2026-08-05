import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { FavoriteStore } from "@/store/favorite.store.ts";
import { PlaylistStore } from "@/store/playlist.store.ts";
import { STORAGE_KEYS } from "@/utils/storage.ts";

class MemoryStorage implements Storage {
    private readonly values = new Map<string, string>();

    get length() {
        return this.values.size;
    }

    clear() {
        this.values.clear();
    }

    getItem(key: string) {
        return this.values.get(key) ?? null;
    }

    key(index: number) {
        return [...this.values.keys()][index] ?? null;
    }

    removeItem(key: string) {
        this.values.delete(key);
    }

    setItem(key: string, value: string) {
        this.values.set(key, value);
    }
}

describe("persistent stores", () => {
    let localStorage: MemoryStorage;

    beforeEach(() => {
        localStorage = new MemoryStorage();
        vi.stubGlobal("window", { localStorage });
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    describe("FavoriteStore", () => {
        it("toggles favorites and persists them", () => {
            const store = new FavoriteStore();

            store.toggleFavorite("track-1");

            expect(store.isFavorite("track-1")).toBe(true);
            expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) ?? "[]"))
                .toEqual(["track-1"]);

            store.toggleFavorite("track-1");

            expect(store.isFavorite("track-1")).toBe(false);
        });

        it.each(["{broken", '{"unexpected":true}'])(
            "uses an empty list for invalid storage value %s",
            (storedValue) => {
                localStorage.setItem(STORAGE_KEYS.favorites, storedValue);

                expect(new FavoriteStore().favoritesTrackIds).toEqual([]);
            },
        );
    });

    describe("PlaylistStore", () => {
        it("creates, renames and deletes playlists", () => {
            const store = new PlaylistStore();

            expect(store.createPlaylist("  Road Trip  ")).toBe("success");
            expect(store.createPlaylist("road trip")).toBe("duplicate");
            expect(store.renamePlaylist("Road Trip", "Favorites")).toBe("success");
            expect(store.deletePlaylist("favorites")).toBe("success");
            expect(store.playlists).toEqual([]);
        });

        it("toggles a track and persists the playlist", () => {
            const store = new PlaylistStore();
            store.createPlaylist("Favorites");

            store.toggleTrackInPlaylist("Favorites", "track-1");

            expect(store.isTrackInPlaylist("Favorites", "track-1")).toBe(true);
            expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.playlists) ?? "[]"))
                .toEqual([{ name: "Favorites", trackIds: ["track-1"] }]);
        });

        it.each(["{broken", '[{"name":"Incomplete"}]'])(
            "uses an empty list for invalid storage value %s",
            (storedValue) => {
                localStorage.setItem(STORAGE_KEYS.playlists, storedValue);

                expect(new PlaylistStore().playlists).toEqual([]);
            },
        );
    });
});
