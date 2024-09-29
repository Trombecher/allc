import {expect, test} from "vitest";
import {
    randomRGBNumber,
    stripHash,
    toHexFromRGBNumber,
    toRGBFromRGBNumber,
    toRGBNumberFromHex,
    toRGBNumberFromRGB,
} from "../src/rgb";

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

test("toRGBFromRGBNumber", () => {
    expect(toRGBFromRGBNumber(0x00FF22)).toEqual({
        r: 0,
        g: 1,
        b: 0x22 / 255
    });
});

test("stripHash", () => {
    expect(stripHash("#344")).toEqual("344");
    expect(stripHash("344")).toEqual("344");
});

test("toHexFromRGBNumber", () => {
    expect(toHexFromRGBNumber(0xf4f2a0)).toBe("f4f2a0")
});