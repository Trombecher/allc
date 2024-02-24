import {RGB} from "./rgb";
import {Hex, stripHash} from "./hex";

/**
 * An integer number in range [0, 16777216) (24 bits)
 * containing the hexadecimal representation of the
 * [RGB color model](https://en.wikipedia.org/wiki/RGB_color_model).
 *
 * The blue channel is encoded in the lowest eight bits,
 * the green channel in the second lowest eight bits
 * and the red channel in the third lowest eight bits.
 */
export type RGBNumber = number;

export function randomRGBNumber() {
    return Math.round(Math.random() * 2 ** 24)
}

export function toRGBNumberFromHex(hex: Hex): RGBNumber {
    return parseInt(stripHash(hex), 16);
}

export function toRGBNumberFromRGB({r, g, b}: Readonly<RGB>): RGBNumber {
    return (scale(r) << 16) | (scale(g) << 8) | scale(b);
}

const scale = (x: number) => Math.round(x * 255);