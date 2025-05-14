import {expect, test} from "vitest";
import {Color} from "../src";
import "./common";

type Sample = {
    sRGB: Color,
    oklab: Color,
}

const SAMPLES: readonly Sample[] = [
    {
        sRGB: Color.fromRGB(0, 0, 0, "sRGB"),
        oklab: Color.fromLAB(0, 0, 0, "Ok"),
    },
] as const;

test("Color.from*", () => {
    for(const {sRGB, oklab} of SAMPLES) {
        expect(sRGB).toBeAboutEqualTo(oklab);
    }
});