import * as allc from "../../src";
import * as culori from "culori";
import {expect, test} from "vitest";
import {clamp01} from "../../src/internal";
import {SAMPLE_COUNT} from "../common";

test("sRGB -> CIE 1931 XYZ", () => {
    for(let i = 0; i < SAMPLE_COUNT; i++) {
        const r = Math.random();
        const g = Math.random();
        const b = Math.random();

        const {
            x: expectedX,
            y: expectedY,
            z: expectedZ,
        } = culori.convertRgbToXyz65({r, g, b});

        const lr = allc.toLinearSRGBComponentFromSRGBComponent(r),
            lg = allc.toLinearSRGBComponentFromSRGBComponent(g),
            lb = allc.toLinearSRGBComponentFromSRGBComponent(b);

        const x = allc.toCIE1931XYZXFromLinearSRGB(lr, lg, lb);
        const y = allc.toCIE1931XYZYFromLinearSRGB(lr, lg, lb);
        const z = allc.toCIE1931XYZZFromLinearSRGB(lr, lg, lb);

        expect(Math.hypot(
            expectedX - x,
            expectedY - y,
            expectedZ - z,
        )).toBeLessThan(0.0001);
    }
});

test("CIE 1931 XYZ -> sRGB", () => {
    for(let i = 0; i < SAMPLE_COUNT; i++) {
        const {
            x,
            y,
            z,
        } = culori.random("xyz65");

        let {
            r: expectedR,
            g: expectedG,
            b: expectedB,
        } = culori.convertXyz65ToRgb({x, y, z});

        expectedR = clamp01(expectedR);
        expectedG = clamp01(expectedG);
        expectedB = clamp01(expectedB);

        let r = allc.toSRGBComponentFromLinearSRGBComponent(allc.toLinearSRGBRFromCIE1931XYZ(x, y, z)),
            g = allc.toSRGBComponentFromLinearSRGBComponent(allc.toLinearSRGBGFromCIE1931XYZ(x, y, z)),
            b = allc.toSRGBComponentFromLinearSRGBComponent(allc.toLinearSRGBBFromCIE1931XYZ(x, y, z));

        r = clamp01(r);
        g = clamp01(g);
        b = clamp01(b);

        expect(Math.hypot(
            expectedR - r,
            expectedG - g,
            expectedB - b,
        ), `from x: ${x}, y: ${y}, z: ${z} to RGB: expected ${expectedR}, ${expectedG}, ${expectedB}, got ${r}, ${g}, ${b}`)
            .toBeLessThan(0.001);
    }
});