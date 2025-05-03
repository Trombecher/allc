import {expect, test} from "vitest";
import {LinearRGB, RGB} from "../src";
import {TOLERANCE} from "./common";

test(`RANDOM: RGB <-> LinearRGB; for "sRGB", "Adobe RGB", and "Display P3"`, () => {
    for(const space of ["sRGB", "Adobe RGB", "Display P3"] as const) {
        for(let i = 0; i < 100; i++) {
            const rgb = RGB.random(space);
            expect(rgb.toLinearRGB().toRGB().distance(rgb)).toBeLessThan(TOLERANCE)

            const lrgb = LinearRGB.random(space);
            expect(lrgb.toRGB().toLinearRGB().distance(lrgb)).toBeLessThan(TOLERANCE);
        }
    }
})