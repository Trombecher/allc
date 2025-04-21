import {expect, test} from "vitest";
import {HSV, RGB} from "../src";
import {TOLERANCE} from "./common";

const EXTREMA: [RGB<"sRGB">, HSV<"sRGB">][] = [
    [new RGB(0, 0, 0, "sRGB"), new HSV(0, 0, 0, "sRGB")],
    [new RGB(0, 0, 0, "sRGB"), new HSV(0, 0, 0, "sRGB")],
];

test("Extrema", () => {

})

test("RGB -> HSV -> RGB", () => {
    for(let i = 0; i < 100; i++) {
        const rgb = RGB.random("sRGB");
        console.log(rgb.toCSS());

        const hsv = rgb.toHSV();
        console.log(hsv.toCSS());

        const rgb2 = hsv.toRGB();
        console.log(rgb2.toCSS());

        expect(rgb2.distance(rgb)).toBeLessThanOrEqual(TOLERANCE);
    }
})