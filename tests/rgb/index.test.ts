import {expect, test} from "vitest";
import {toRGBFromRGBNumber} from "../../src/rgb";

test("toRGBFromRGBNumber", () => {
    expect(toRGBFromRGBNumber(0x00FF22)).toEqual({
        r: 0,
        g: 1,
        b: 0x22 / 255
    });
});