import {expect, test} from "vitest";
import {stripHash, toHexFromRGBNumber} from "@/rgb/hex";

test("stripHash", () => {
    expect(stripHash("#344")).toEqual("344");
    expect(stripHash("344")).toEqual("344");
});

test("toHexFromRGBNumber", () => {
    expect(toHexFromRGBNumber(0xf4f2a0)).toBe("f4f2a0")
});