import {expect, test} from "vitest";
import {RGB, toHCVFromRGB} from "../src";
import {
    randomSRGB, randomSRGBNumber,
    SRGB,
    toSRGBFromHSL,
    toSRGBFromHSV,
    toSRGBFromRGBNumber,
    toSRGBFromSRGBNumber,
    toSRGBNumberFromSRGB,
} from "../src/srgb";
import {HSL, toHSLFromHSV, toHSLFromSRGB} from "../src/hsl";
import {toHSVFromHSL, toHSVFromSRGB} from "../src/hsv";

function expectAboutEqual<T extends {[index: string]: number} | {
    [index: number]: number
}>(a: T, b: T, accuracy: number = 12) {
    Object.keys(a).forEach(key => {
        // @ts-ignore key matches.
        expect(a[key] - b[key]).toBeLessThanOrEqual(.1 ** accuracy);
    });
}

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

test("sRGB <=> HSL(sRGB)", () => {
    // Yellow
    expectAboutEqual({
        r: 1,
        g: 1,
        b: 0
    }, toSRGBFromHSL({
        h: 60,
        s: 1,
        l: .5
    }));

    // Blue
    expectAboutEqual(toHSLFromSRGB({
        r: 0,
        g: 0,
        b: 1,
    }), {
        h: 240,
        s: 1,
        l: .5
    });

    const rgb = randomSRGB();
    expectAboutEqual(rgb, toSRGBFromHSL(toHSLFromSRGB(rgb)));
});

test("sRGB <=> HSV(sRGB)", () => {
    const rgb = randomSRGB();
    expectAboutEqual(rgb, toSRGBFromHSV(toHSVFromSRGB(rgb)));
});

test("HSL <=> HSV", () => {
    const hsl: Readonly<HSL<RGB>> = {
        h: 50,
        s: 0.5,
        l: 0.5,
    };
    expectAboutEqual(hsl, toHSLFromHSV(toHSVFromHSL(hsl)));
});

test("SRGB <=> SRGBNumber", () => {
    for(let i = 0; i < 100; i++) {
        const rgb = randomSRGB();
        expectAboutEqual(rgb, toSRGBFromSRGBNumber(toSRGBNumberFromSRGB(rgb)), 2);

        const rgbNumber = randomSRGBNumber();
        expect(rgbNumber).toBe(toSRGBNumberFromSRGB(toSRGBFromSRGBNumber(rgbNumber)));
    }
});

test("RGBNumber <=> Hex", () => {
    const rgbNumber = randomRGBNumber();
    expect(rgbNumber).toBe(toRGBNumberFromHex(toHexFromRGBNumber(rgbNumber)));

    const hex = "#366fda";
    // `toRGBNumberFromHex(...)` should do automatic hash-stripping.
    expect(stripHash(hex)).toBe(toHexFromRGBNumber(toRGBNumberFromHex(hex)));
});

test("RGB <=> CMYK", () => {
    const rgb = randomRGB();
    expectAboutEqual(rgb, toRGBFromCMYK(toCMYKFromRGB(rgb)));

    const cmyk = toCMYKFromRGB(randomRGB());
    expectAboutEqual(cmyk, toCMYKFromRGB(toRGBFromCMYK(cmyk)));
});