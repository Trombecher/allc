import {expect, test} from "vitest";
import {SAMPLE_COUNT} from "./common";
import {CIE1931xyY} from "../src/cie1931xyy";

test.for(Array.from(
    {length: SAMPLE_COUNT},
    () => {
        const xyY = CIE1931xyY.random()
        return [xyY, xyY.toCIE1931XYZ().toCIE1931xyY()] as const;
    }
))("RANDOM ROUNDTRIP: CIE1931xyY <-> CIE1931XYZ", ([exp, found]) => {
    expect(found).toBeAboutEqualTo(exp)
});