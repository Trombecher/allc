import {expect, test} from "vitest";
import {LCH} from "../src";
import {SAMPLE_COUNT, TOLERANCE} from "./common";

test(`RANDOM ROUNDTRIP: CIE 1931 XYZ <-> LAB<"Ok">`, () => {
    for(let i = 0; i < SAMPLE_COUNT; i++) {
        const lab = LCH.random("Ok").toLAB();
        expect(lab.toCIE1931XYZ().toLAB("Ok").distance(lab)).toBeLessThanOrEqual(TOLERANCE);
    }
});