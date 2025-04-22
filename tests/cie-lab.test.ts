import {expect, test} from "vitest";
import {LCH} from "../src";
import {TOLERANCE} from "./common";

test(`CIE 1931 XYZ <-> LAB<"Ok">`, () => {
    for(let i = 0; i < 100; i++) {
        const lab = LCH.random("Ok").toLAB();
        const cie = lab.toCIE1931XYZ();
        const lab2 = cie.toLAB("Ok");

        expect(lab2.distance(lab))
            .toBeLessThanOrEqual(TOLERANCE);
    }
});