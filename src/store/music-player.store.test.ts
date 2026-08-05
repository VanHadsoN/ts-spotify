import { beforeEach, describe, expect, it } from "vitest";

import { TRACKS } from "@/data/tracks.data.ts";
import { MusicPlayerStore } from "@/store/store.ts";

describe("MusicPlayerStore", () => {
    let store: MusicPlayerStore;

    beforeEach(() => {
        store = new MusicPlayerStore();
    });

    it("switches to the next and previous tracks", () => {
        store.changeTrack("next");
        expect(store.currentTrack?.id).toBe(TRACKS[1]?.id);

        store.changeTrack("prev");
        expect(store.currentTrack?.id).toBe(TRACKS[0]?.id);
    });

    it("updates seek time and progress", () => {
        store.setDuration(200);

        store.requestSeek(50);

        expect(store.currentTime).toBe(50);
        expect(store.progress).toBe(25);
        expect(store.seekRequestTime).toBe(50);

        store.clearSeekRequest();
        expect(store.seekRequestTime).toBeNull();
    });

    it("automatically starts the next track when the current track ends", () => {
        store.play();

        store.finishTrack();

        expect(store.currentTrack?.id).toBe(TRACKS[1]?.id);
        expect(store.isPlaying).toBe(true);
        expect(store.progress).toBe(0);
    });

    it("stops after the last track when repeat is off", () => {
        store.selectTrack(TRACKS.at(-1)!);
        store.play();

        store.finishTrack();

        expect(store.currentTrack?.id).toBe(TRACKS.at(-1)?.id);
        expect(store.isPlaying).toBe(false);
    });

    it("restarts the current track in repeat-one mode", () => {
        store.cycleRepeatMode();
        store.cycleRepeatMode();
        store.seek(30);

        store.finishTrack();

        expect(store.currentTrack?.id).toBe(TRACKS[0]?.id);
        expect(store.currentTime).toBe(0);
        expect(store.progress).toBe(0);
        expect(store.seekRequestTime).toBe(0);
    });
});
