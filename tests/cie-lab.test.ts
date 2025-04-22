import {expect, test} from "vitest";
import {CIE1931XYZ, LAB, LCH} from "../src";
import {TOLERANCE} from "./common";

test(`CIE 1931 XYZ <-> LAB<"Ok">`, () => {
    console.log(new LAB(1, 0, 0, "Ok").toCIE1931XYZ());

    for(let i = 0; i < 100; i++) {
        const lab = LCH.random("Ok").toLAB();
        console.log(lab);

        const cie = lab.toCIE1931XYZ();
        console.log(cie);

        const lab2 = cie.toLAB("Ok");
        console.log(lab2);

        expect(lab2.distance(lab))
            .toBeLessThanOrEqual(TOLERANCE);
    }
})