import { describe, expect, it } from "vitest";

import { transformDuration } from "@/utils/transform-duration.ts";

describe("transformDuration", () => {
    it.each([
        [0, "0:00"],
        [9, "0:09"],
        [60, "1:00"],
        [125, "2:05"],
        [3600, "60:00"],
    ])("formats %i seconds as %s", (duration, expected) => {
        expect(transformDuration(duration)).toBe(expected);
    });
});
