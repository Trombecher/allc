import {expect, test} from "vitest";
import {clampHSL, HSL} from "../src";

test("clampHSL", () => {
    const hsl = {
        h: -1000,
        s: 255,
        l: -34.5
    } satisfies HSL;

    clampHSL(hsl);

    expect(hsl).toEqual({
        h: 80,
        s: 1,
        l: 0
    });
});