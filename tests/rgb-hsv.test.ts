import {expect, test} from "vitest";
import {HSV, RGB} from "../src";
import {TOLERANCE} from "./common";

const EXTREMA: [RGB<"sRGB">, HSV<"sRGB">][] = [
    // Black / White
    [new RGB(0, 0, 0, "sRGB"), new HSV(0, 0, 0, "sRGB")],
    [new RGB(0.5, 0.5, 0.5, "sRGB"), new HSV(0, 0, 0.5, "sRGB")],
    [new RGB(1, 1, 1, "sRGB"), new HSV(0, 0, 1, "sRGB")],

    // Corners
    [new RGB(1, 0, 0, "sRGB"), new HSV(0, 1, 1, "sRGB")],
    [new RGB(1, 1, 0, "sRGB"), new HSV(Math.PI / 3, 1, 1, "sRGB")],
    [new RGB(0, 1, 0, "sRGB"), new HSV(2 * Math.PI / 3, 1, 1, "sRGB")],
    [new RGB(0, 1, 1, "sRGB"), new HSV(Math.PI, 1, 1, "sRGB")],
    [new RGB(0, 0, 1, "sRGB"), new HSV(4 * Math.PI / 3, 1, 1, "sRGB")],
    [new RGB(1, 0, 1, "sRGB"), new HSV(5 * Math.PI / 3, 1, 1, "sRGB")],
];

test("Field", () => {
    EXTREMA.forEach(([rgb, hsv]) => {
        expect(rgb.toHSV().distance(hsv)).toBeLessThanOrEqual(TOLERANCE);
        expect(hsv.toRGB().distance(rgb)).toBeLessThanOrEqual(TOLERANCE);
    });
});

test("RGB -> HSV -> RGB", () => {
    for(let i = 0; i < 100; i++) {
        const rgb = RGB.random("sRGB");
        const hsv = rgb.toHSV();
        const rgb2 = hsv.toRGB();

        expect(rgb2.distance(rgb)).toBeLessThanOrEqual(TOLERANCE);
    }
});

test("RGB -> HSV -> RGB", () => {
    for(let i = 0; i < 100; i++) {
        const hsv = HSV.random("sRGB");
        const hsv2 = hsv.toRGB().toHSV();

        expect(hsv2.distance(hsv)).toBeLessThanOrEqual(TOLERANCE);
    }
});