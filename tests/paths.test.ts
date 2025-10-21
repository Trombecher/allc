import {expect, test} from "vitest";
import {Color} from "../src";
import {SAMPLE_COUNT} from "./common";

test("sRGB HSV <-> Oklch", () => {
    for (let i = 0; i < SAMPLE_COUNT; i++) {
        const h = Math.random();
        const s = Math.random();
        const v = Math.random();

        const randomColor = Color.fromHSV(h, s, v, "sRGB");

        const newColor = Color.fromLCH(
            randomColor.pl("Ok"),
            randomColor.pc("Ok"),
            randomColor.ph("Ok"),
            "Ok",
        );

        const d = Math.hypot(
            newColor.h("sRGB") - h,
            newColor.sv("sRGB") - s,
            newColor.v("sRGB") - v,
        );

        expect(d).toBeLessThan(0.0000011);
    }
});
