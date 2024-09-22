import {Hex, stripHash} from "./hex";
import {RGB} from "@/rgb";
import {SRGB} from "@/srgb";

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
export type RGBNumber<ColorSpace extends RGB = SRGB> = number;

/**
 * Generates a random RGB number in the given color space.
 */
export const randomRGBNumber = <ColorSpace extends RGB = SRGB>(): RGBNumber<ColorSpace> => Math.round(Math.random() * 2 ** 24);

export const toRGBNumberFromHex = <ColorSpace extends RGB = SRGB>(hex: Hex<ColorSpace>): RGBNumber<ColorSpace> =>
    parseInt(stripHash(hex), 16);

export const toRGBNumberFromSRGB = ({r, g, b}: Readonly<SRGB>): RGBNumber =>
    (scale(r) << 16) | (scale(g) << 8) | scale(b);

const scale = (x: number) => Math.round(x * 255);