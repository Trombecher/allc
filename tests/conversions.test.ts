import {expect, test} from "vitest";

import {HSL, toHSLFromHSV, toHSLFromRGB} from "../src/hsl";
import {toHSVFromHSL, toHSVFromRGB} from "../src/hsv";
import {
    randomRGB,
    randomRGBNumber, stripHash,
    toHexFromRGBNumber,
    toRGBFromHSL,
    toRGBFromHSV,
    toRGBFromRGBNumber,
    toRGBNumberFromHex,
    toRGBNumberFromRGB,
} from "../src/rgb";
import {toSRGBFromCIE1931XYZ} from "../src/srgb";
import {toCIE1931XYZFromSRGB} from "../src/cie1931xyz";
import {toHCVFromRGB} from "../src/internal";

const expectAboutEqual = <T extends {[index: string]: number} | {
    [index: number]: number
}>(a: T, b: T, accuracy: number = 12) => Object.keys(a).forEach(key => {
    // @ts-ignore key matches.
    expect(a[key] - b[key]).toBeLessThanOrEqual(.1 ** accuracy, `${a[key]} - ${b[key]}`);
});

test("toHCVFromRGB", () => {
    // Green
    expectAboutEqual<[number, number, number]>(toHCVFromRGB({
        r: 0,
        g: 1,
        b: 0,
    }), [
        120,
        1,
        1
    ]);
});

test("RGB <=> HSL", () => {
    // Yellow
    expectAboutEqual({
        r: 1,
        g: 1,
        b: 0
    }, toRGBFromHSL({
        h: 60,
        s: 1,
        l: .5
    }));

    // Blue
    expectAboutEqual(toHSLFromRGB({
        r: 0,
        g: 0,
        b: 1,
    }), {
        h: 240,
        s: 1,
        l: .5
    });

    const rgb = randomRGB();
    expectAboutEqual(rgb, toRGBFromHSL(toHSLFromRGB(rgb)));
});

test("RGB <=> HSV", () => {
    const rgb = randomRGB();
    expectAboutEqual(rgb, toRGBFromHSV(toHSVFromRGB(rgb)));
});

test("HSL <=> HSV", () => {
    const hsl: Readonly<HSL> = {
        h: 50,
        s: 0.5,
        l: 0.5,
    };
    expectAboutEqual(hsl, toHSLFromHSV(toHSVFromHSL(hsl)));
});

test("RGB <=> RGBNumber", () => {
    for(let i = 0; i < 100; i++) {
        const rgb = randomRGB();
        expectAboutEqual(rgb, toRGBFromRGBNumber(toRGBNumberFromRGB(rgb)), 2);

        const rgbNumber = randomRGBNumber();
        expect(rgbNumber).toBe(toRGBNumberFromRGB(toRGBFromRGBNumber(rgbNumber)));
    }
});

test("RGBNumber <=> Hex", () => {
    const rgbNumber = randomRGBNumber();
    expect(rgbNumber).toBe(toRGBNumberFromHex(toHexFromRGBNumber(rgbNumber)));

    const hex = "#366fda";
    // `toRGBNumberFromHex(...)` should do automatic hash-stripping.
    expect(stripHash(hex)).toBe(toHexFromRGBNumber(toRGBNumberFromHex(hex)));
});

test("SRGB <=> CIE 1931 XYZ", () => {
    const srgb = randomRGB();
    expectAboutEqual(toSRGBFromCIE1931XYZ(toCIE1931XYZFromSRGB(srgb)), srgb, 4);
});