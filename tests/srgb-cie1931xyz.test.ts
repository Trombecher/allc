import {expect, test} from "vitest";
import {SRGB, toSRGBFromCIE1931XYZ} from "../src/srgb";
import {toCIE1931XYZFromSRGB} from "../src/cie1931xyz";

test("<=>", () => {
    const srgb = {
        r: Math.random(),
        g: Math.random(),
        b: Math.random()
    } satisfies SRGB;

    expect(toSRGBFromCIE1931XYZ(toCIE1931XYZFromSRGB(srgb))).toEqual(srgb);
});