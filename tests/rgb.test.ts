import {expect, test} from "vitest";
import {RGB} from "../src";

const HEX_SAMPLES: [string, RGB<"sRGB">, string][] = [
    ["#000000", new RGB(0, 0, 0, "sRGB"), "000000"],
    ["#FFF", new RGB(1, 1, 1, "sRGB"), "ffffff"],
    ["#0fff8f", new RGB(15 / 255, 1, 143 / 255, "sRGB"), "0fff8f"],
    ["F00001", new RGB(0xF0 / 255, 0, 1 / 255, "sRGB"), "f00001"],
    ["0F0", new RGB(0, 1, 0, "sRGB"), "00ff00"],
];

test(`RGB<"sRGB"> <-> Hex (Samples)`, () => {
    HEX_SAMPLES.forEach(([hex, rgb, normHex]) => {
        expect(RGB.fromHex(hex, "sRGB")).toEqual(rgb);
        expect(rgb.toHex()).toEqual(normHex);
        // TODO: alpha
    });
});

const INTEGER_SAMPLES: [number, RGB<"sRGB">, number][] = [
    [0xAABBCC, new RGB(0xAA / 255, 0xBB / 255, 0xCC / 255, "sRGB"), 0xAABBCC],
    [0xFFAABBCC, new RGB(0xAA / 255, 0xBB / 255, 0xCC / 255, "sRGB"), 0xAABBCC],
];

test(`RGB<"sRGB"> <-> Integer (Samples)`, () => {
    INTEGER_SAMPLES.forEach(([int, rgb, normInt]) => {
        expect(RGB.fromInteger(int, "sRGB")).toEqual(rgb);
        expect(rgb.toInteger()).toEqual(normInt);
        // TODO: alpha
    });
});

// TODO: random tests