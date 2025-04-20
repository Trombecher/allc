import {expect, test} from "vitest";
import {clamp01, clampColor, lerp, lerpColor, tag, Tagged, WithAlpha} from "../old_src";
import {RGB} from "../old_src/rgb";
import {HSL} from "../old_src/hsl";

test("tag", () => {
    expect(tag({
        r: 1,
        g: 1,
        b: 1,
    }, "srgb")._).toBe("srgb");
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
    expect(lerpColor<WithAlpha<RGB>>(
        {
            r: 0,
            g: 1,
            b: 0,
            a: 0,
        },
        {
            r: 1,
            g: .5,
            b: 0,
            a: 1,
        },
        .5
    )).toEqual({
        r: .5,
        g: .75,
        b: 0,
        a: .5
    });
});

test("clampColor", () => {
    const c1: Tagged<WithAlpha<RGB>> = {
        r: -34,
        g: 0.2,
        b: 45325,
        a: 4,
        _: "srgb"
    };

    clampColor(c1);

    expect(c1).toEqual({
        r: 0,
        g: 0.2,
        b: 1,
        a: 1,
        _: "srgb"
    });

    const c2: HSL = {
        h: -400,
        s: 23.5,
        l: -4,
    };

    clampColor(c2);

    expect(c2).toEqual({
        h: 320,
        s: 1,
        l: 0
    });
});