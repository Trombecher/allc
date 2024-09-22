import {Hex, stripHash} from "./hex";
import {RGB, RGBColorSpace} from "@/rgb";

/**
 * An integer number in range [0, 16777216) (24 bits)
 * containing the hexadecimal representation of the
 * [RGB color model](https://en.wikipedia.org/wiki/RGB_color_model).
 *
 * The blue channel is encoded in the least significant eight bits,
 * the green channel in the following eight bits
 * and the red channel in the eight bits after that:
 *
 * ```plaintext
 * 0bRRRRRRRRGGGGGGGGBBBBBBBB
 * 0xRRGGBB
 * ```
 */
// @ts-ignore
export type RGBNumber<CS extends RGBColorSpace = "srgb"> = number;

/**
 * Generates a random RGB number in the given color space.
 */
export const randomRGBNumber = <CS extends RGBColorSpace = "srgb">(): RGBNumber<CS> => Math.round(Math.random() * 2 ** 24);

/**
 * Strips the hashtag if there is one.
 */
export const toRGBNumberFromHex = <CS extends RGBColorSpace>(hex: Hex<CS>): RGBNumber<CS> => parseInt(stripHash(hex), 16);

export const toRGBNumberFromRGB = ({r, g, b}: Readonly<RGB>): RGBNumber =>
    (scale(r) << 16) | (scale(g) << 8) | scale(b);

const scale = (x: number) => Math.round(x * 255);