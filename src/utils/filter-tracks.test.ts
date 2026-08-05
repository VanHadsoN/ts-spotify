import { describe, expect, it } from "vitest";

import { TRACKS } from "@/data/tracks.data.ts";
import { filterTracks } from "@/utils/filter-tracks.ts";

describe("filterTracks", () => {
    it("returns all tracks for an empty search", () => {
        expect(filterTracks(TRACKS, "   ")).toBe(TRACKS);
    });

    it("filters tracks by title case-insensitively", () => {
        expect(filterTracks(TRACKS, "  green RIVER  ").map(({ name }) => name))
            .toEqual(["Green River"]);
    });

    it("filters tracks by artist", () => {
        expect(filterTracks(TRACKS, "oasis").map(({ name }) => name))
            .toEqual(["Little By Little"]);
    });

    it("returns an empty list when nothing matches", () => {
        expect(filterTracks(TRACKS, "unknown song")).toEqual([]);
    });
});
