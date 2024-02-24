import {expect, test} from "vitest";
import {clamp01, lerp, lerpColor, RGB} from "../src";

test("clamp01", () => {
    expect(clamp01(.5)).toBe(.5);
    expect(clamp01(-1)).toBe(0);
    expect(clamp01(100)).toBe(1);
});

test("lerp", () => {
    expect(lerp(0, 2, .4)).toBe(.8);
    expect(lerp(100, -100, .5)).toBe(0);
});

test("lerpColor", () => {
    expect(lerpColor({
        r: 0,
        g: 1,
        b: 0.5
    } satisfies RGB, {
        r: 0,
        g: 0,
        b: 1,
    }, 0.5)).toEqual({
        r: 0,
        g: 0.5,
        b: 0.75
    });
});