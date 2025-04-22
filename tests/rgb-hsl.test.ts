import {expect, test} from "vitest";
import {HSL, RGB} from "../src";
import {TOLERANCE} from "./common";

const EXTREMA: [RGB<"sRGB">, HSL<"sRGB">][] = [
    // Black / White
    [new RGB(0, 0, 0, "sRGB"), new HSL(0, 0, 0, "sRGB")],
    [new RGB(0.5, 0.5, 0.5, "sRGB"), new HSL(0, 0, 0.5, "sRGB")],
    [new RGB(1, 1, 1, "sRGB"), new HSL(0, 1, 1, "sRGB")],

    // Corners
    [new RGB(1, 0, 0, "sRGB"), new HSL(0, 1, 0.5, "sRGB")],
    [new RGB(1, 1, 0, "sRGB"), new HSL(Math.PI / 3, 1, 0.5, "sRGB")],
    [new RGB(0, 1, 0, "sRGB"), new HSL(2 * Math.PI / 3, 1, 0.5, "sRGB")],
    [new RGB(0, 1, 1, "sRGB"), new HSL(Math.PI, 1, 0.5, "sRGB")],
    [new RGB(0, 0, 1, "sRGB"), new HSL(4 * Math.PI / 3, 1, 0.5, "sRGB")],
    [new RGB(1, 0, 1, "sRGB"), new HSL(5 * Math.PI / 3, 1, 0.5, "sRGB")],
];

test("Field", () => {
    EXTREMA.forEach(([rgb, hsl]) => {
        expect(rgb.toHSL().distance(hsl)).toBeLessThanOrEqual(TOLERANCE);
        expect(hsl.toRGB().distance(rgb)).toBeLessThanOrEqual(TOLERANCE);
    });
});

test("RGB -> HSL -> RGB", () => {
    for(let i = 0; i < 100; i++) {
        const rgb = RGB.random("sRGB");
        const hsl = rgb.toHSL();
        const rgb2 = hsl.toRGB();

        expect(rgb2.distance(rgb)).toBeLessThanOrEqual(TOLERANCE);
    }
});

test("RGB -> HSL -> RGB", () => {
    for(let i = 0; i < 100; i++) {
        const hsl = HSL.random("sRGB");
        const hsl2 = hsl.toRGB().toHSL();

        expect(hsl2.distance(hsl)).toBeLessThanOrEqual(TOLERANCE);
    }
});