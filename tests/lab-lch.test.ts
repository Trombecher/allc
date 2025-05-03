import {expect, test} from "vitest";
import {LCH} from "../src";
import {SAMPLE_COUNT, TOLERANCE} from "./common";

test(`RANDOM: LAB <-> LCH`, () => {
    // This conversion is color space invariant.

    for(let i = 0; i < SAMPLE_COUNT; i++) {
        const lch = LCH.random("Ok");
        expect(lch.toLAB().toLCH().distance(lch)).toBeLessThan(TOLERANCE);

        // TODO: samples for LAB?
    }
});