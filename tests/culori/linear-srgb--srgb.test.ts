import * as culori from "culori";
import {expect, test} from "vitest";
import {
    toLinearSRGBComponentFromSRGBComponent,
    toSRGBComponentFromLinearSRGBComponent,
} from "../../src";
import {SAMPLE_COUNT, TOLERANCE} from "../common";

test("Linear sRGB -> sRGB", () => {
    for(let i = 0; i < SAMPLE_COUNT; i++) {
        const lr = Math.random();
        const lg = Math.random();
        const lb = Math.random();

        let {
            r: expectedR,
            g: expectedG,
            b: expectedB,
        } = culori.convertLrgbToRgb({r: lr, g: lg, b: lb}, "rgb");

        let r = toSRGBComponentFromLinearSRGBComponent(lr),
            g = toSRGBComponentFromLinearSRGBComponent(lg),
            b = toSRGBComponentFromLinearSRGBComponent(lb);

        expect(Math.hypot(
            expectedR - r,
            expectedG - g,
            expectedB - b,
        )).toBeLessThan(TOLERANCE);
    }
});

test("sRGB -> Linear sRGB", () => {
    for(let i = 0; i < SAMPLE_COUNT; i++) {
        const r = Math.random();
        const g = Math.random();
        const b = Math.random();

        let {
            r: expectedLR,
            g: expectedLG,
            b: expectedLB,
        } = culori.convertRgbToLrgb({r, g, b});

        let lr = toLinearSRGBComponentFromSRGBComponent(r),
            lg = toLinearSRGBComponentFromSRGBComponent(g),
            lb = toLinearSRGBComponentFromSRGBComponent(b);

        expect(Math.hypot(
            expectedLR - lr,
            expectedLG - lg,
            expectedLB - lb,
        )).toBeLessThan(TOLERANCE);
    }
});
