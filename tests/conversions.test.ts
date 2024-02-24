import {expect, test} from "vitest";
import {
    randomHSL,
    randomHSV,
    randomRGB,
    randomRGBNumber,
    stripHash,
    toHCVFromRGB,
    toHexFromRGBNumber,
    toHSLFromHSV,
    toHSLFromRGB,
    toHSVFromHSL,
    toHSVFromRGB, toRGBFromCMYK,
    toRGBFromHSL,
    toRGBFromHSV,
    toRGBFromRGBNumber,
    toRGBNumberFromHex,
    toRGBNumberFromRGB
} from "../src";
import {toCMYKFromRGB} from "../src/cmyk";

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

    const hsl = randomHSL();
    expectAboutEqual(hsl, toHSLFromRGB(toRGBFromHSL(hsl)));
});

test("RGB <=> HSV", () => {
    const rgb = randomRGB();
    expectAboutEqual(rgb, toRGBFromHSV(toHSVFromRGB(rgb)));

    const hsv = randomHSV();
    expectAboutEqual(hsv, toHSVFromRGB(toRGBFromHSV(hsv)));
});

test("HSL <=> HSV", () => {
    const hsl = randomHSL();
    expectAboutEqual(hsl, toHSLFromHSV(toHSVFromHSL(hsl)));

    const hsv = randomHSV();
    expectAboutEqual(hsv, toHSVFromHSL(toHSLFromHSV(hsv)));
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

test("RGB <=> CMYK", () => {
    const rgb = randomRGB();
    expectAboutEqual(rgb, toRGBFromCMYK(toCMYKFromRGB(rgb)));

    const cmyk = toCMYKFromRGB(randomRGB());
    expectAboutEqual(cmyk, toCMYKFromRGB(toRGBFromCMYK(cmyk)));
});