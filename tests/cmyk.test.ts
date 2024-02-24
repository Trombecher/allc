import {expect, test} from "vitest";
import {clampCMYK, CMYK} from "../src/cmyk";

test("clampCMYK", () => {
    const cmyk = {
        c: 1,
        m: 0,
        y: 2,
        k: 0,
    } satisfies CMYK;

    clampCMYK(cmyk);

    expect(cmyk.y).toBe(1);
});