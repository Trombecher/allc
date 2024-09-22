import {expect, test} from "vitest";
import {randomRGBNumber, toRGBNumberFromHex, toRGBNumberFromRGB} from "../../src/rgb";

test("randomRGBNumber", () => {
    const color = randomRGBNumber();
    expect(color).toBeLessThan(0x1000000);
});

test("toRGBNumberFromHex", () => {
    expect(toRGBNumberFromHex("#123456")).toBe(0x123456);
    expect(toRGBNumberFromHex("ABCDEF")).toBe(0xABCDEF);
});

test("toRGBNumberFromRGB", () => {
    expect(toRGBNumberFromRGB({
        r: 0,
        g: 1,
        b: 1,
    })).toBe(0x00FFFF);
});