import {expect, test} from "vitest";
import {Color} from "../src";

test("Adobe RGB", () => {
    for (let colorInt = 0; colorInt < 16_777_216; ++colorInt) {
        const color = Color.fromInteger(colorInt, "sRGB");

        expect(color.r("Adobe RGB")).not.toBeNaN();
        expect(color.g("Adobe RGB")).not.toBeNaN();
        expect(color.b("Adobe RGB")).not.toBeNaN();
    }
});
