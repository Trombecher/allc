import * as culori from "culori";
import {expect, test} from "vitest";
import {
    toCIE1931XYZXFromLinearSRGB,
    toCIE1931XYZYFromLinearSRGB,
    toCIE1931XYZZFromLinearSRGB,
    toLinearSRGBBFromCIE1931XYZ,
    toLinearSRGBGFromCIE1931XYZ,
    toLinearSRGBRFromCIE1931XYZ,
} from "../../src";
import {SAMPLE_COUNT} from "../common";

test("Linear sRGB -> CIE 1931 XYZ", () => {
    for(let i = 0; i < SAMPLE_COUNT; i++) {
        const lr = Math.random();
        const lg = Math.random();
        const lb = Math.random();

        const {
            x: expectedX,
            y: expectedY,
            z: expectedZ,
        } = culori.convertRgbToXyz65(culori.convertLrgbToRgb({r: lr, g: lg, b: lb}, "rgb"));

        const x = toCIE1931XYZXFromLinearSRGB(lr, lg, lb);
        const y = toCIE1931XYZYFromLinearSRGB(lr, lg, lb);
        const z = toCIE1931XYZZFromLinearSRGB(lr, lg, lb);

        expect(Math.hypot(
            expectedX - x,
            expectedY - y,
            expectedZ - z,
        )).toBeLessThan(0.0001); // TODO: IDK, some1 is not that precise
    }
});

test("CIE 1931 XYZ -> Linear sRGB", () => {
    for(let i = 0; i < SAMPLE_COUNT; i++) {
        const {
            x,
            y,
            z,
        } = culori.random("xyz65");

        const {
            r: expectedLR,
            g: expectedLG,
            b: expectedLB,
        } = culori.convertRgbToLrgb(culori.convertXyz65ToRgb({x, y, z}));

        const lr = toLinearSRGBRFromCIE1931XYZ(x, y, z);
        const lg = toLinearSRGBGFromCIE1931XYZ(x, y, z);
        const lb = toLinearSRGBBFromCIE1931XYZ(x, y, z);

        expect(Math.hypot(
            expectedLR - lr,
            expectedLG - lg,
            expectedLB - lb,
        )).toBeLessThan(0.0005); // TODO: IDK, some1 is not that precise
    }
});