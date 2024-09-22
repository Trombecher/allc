import {expect, test} from "vitest";
import {clamp01, clampColor, lerp, lerpColor, tag} from "../src";
import {rgb, rgba} from "../src/rgb";
import {hsl} from "../src/hsl";

test("tag", () => {
    expect(tag("srgb", rgb(0, 0, 0))._).toBe("srgb");
});

test("clamp01", () => {
    expect(clamp01(-1)).toBe(0);
    expect(clamp01(0)).toBe(0);
    expect(clamp01(.5)).toBe(.5);
    expect(clamp01(1)).toBe(1);
    expect(clamp01(1.435)).toBe(1);
    expect(clamp01(3456346)).toBe(1);
});

test("lerp", () => {
    expect(lerp(0, 2, .4)).toBe(.8);
    expect(lerp(100, -100, .5)).toBe(0);
});

test("lerpColor", () => {
    expect(lerpColor(
        rgba(0, 1, 0, 0),
        rgba(1, .5, 0, 1),
        .5
    )).toEqual(rgba(.5, .75, 0, .5));
});

test("clampColor", () => {
    expect(clampColor(rgba(-34, 0.2, 45325, 4))).toEqual({
        r: 0,
        g: 0.2,
        b: 1,
        a: 1,
    });

    expect(clampColor(hsl(-400, 23.5, -4))).toEqual(hsl(320, 1, 0));
});