import {expect, test} from "vitest";
import {clampHSV, HSV} from "../src";

test("clampHSV", () => {
    const hsv = {
        h: -1000,
        s: 255,
        v: -34.5
    } satisfies HSV;

    clampHSV(hsv);

    expect(hsv).toEqual({
        h: 80,
        s: 1,
        v: 0
    });
});