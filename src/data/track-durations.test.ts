import { describe, expect, it } from "vitest";

import { TRACK_DURATIONS } from "@/data/track-durations.generated.ts";
import { RAW_TRACKS } from "@/data/tracks.data.ts";

const durations: Readonly<Record<string, unknown>> = TRACK_DURATIONS;

describe("generated track durations", () => {
    it.each(RAW_TRACKS)(
        "contains a duration for $file",
        ({ file }) => {
            expect(Object.hasOwn(durations, file)).toBe(true);
        },
    );

    it.each(Object.entries(durations))(
        "contains a valid duration for %s",
        (_file, duration) => {
            expect(typeof duration).toBe("number");

            if(typeof duration !== "number") {
                throw new TypeError("Track duration must be a number");
            }

            expect(Number.isFinite(duration)).toBe(true);
            expect(duration).toBeGreaterThan(0);
        },
    );

    it("does not contain entries for nonexistent tracks", () => {
        const trackFiles = RAW_TRACKS.map(({ file }) => file).sort();
        const durationFiles = Object.keys(durations).sort();

        expect(durationFiles).toEqual(trackFiles);
    });
});
