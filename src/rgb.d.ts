import {Tagged, WithAlpha} from "./index.js";
import {HSL} from "./hsl.js";
import {HSV} from "./hsv.js";

export type RGBColorSpace = "srgb";

/**
 * An RGB color. All components in the range [0, 1].
 */
export type RGB<ColorSpace extends RGBColorSpace = "srgb"> = {
    r: number,
    g: number,
    b: number,
};

export function toRGBFromRGBNumber<CS extends RGBColorSpace>(rgbNumber: RGBNumber<CS>): RGB<CS>;

/**
 * Creates a random {@link RGB} color from `Math.random()`.
 */
export function randomRGB<CS extends RGBColorSpace>(): RGB<CS>;

/**
 * Conversion based off https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative.
 */
export function toRGBFromHSL<CS extends RGBColorSpace>(hsl: Readonly<HSL<CS>>): RGB<CS>;
export function toRGBFromHSL<CS extends RGBColorSpace>(hsl: Readonly<Tagged<HSL<CS>>>): Tagged<RGB<CS>>;
export function toRGBFromHSL<CS extends RGBColorSpace>(hsl: Readonly<WithAlpha<HSL<CS>>>): WithAlpha<RGB<CS>>;
export function toRGBFromHSL<CS extends RGBColorSpace>(hsl: Readonly<Tagged<WithAlpha<HSL<CS>>>>): Tagged<WithAlpha<RGB<CS>>>;

/**
 * Conversion based off https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative.
 */
export function toRGBFromHSV<CS extends RGBColorSpace>(hsv: Readonly<HSV<CS>>): RGB<CS>;
export function toRGBFromHSV<CS extends RGBColorSpace>(hsv: Readonly<Tagged<HSV<CS>>>): Tagged<RGB<CS>>;
export function toRGBFromHSV<CS extends RGBColorSpace>(hsv: Readonly<WithAlpha<HSV<CS>>>): WithAlpha<RGB<CS>>;
export function toRGBFromHSV<CS extends RGBColorSpace>(hsv: Readonly<Tagged<WithAlpha<HSV<CS>>>>): Tagged<WithAlpha<RGB<CS>>>;

// ---- RGBNumber ----

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
export type RGBNumber<CS extends RGBColorSpace = "srgb"> = number;

/**
 * Generates a random RGB number in the given color space.
 */
export function randomRGBNumber<CS extends RGBColorSpace>(): RGBNumber<CS>;

/**
 * Strips the hashtag if there is one.
 */
export function toRGBNumberFromHex<CS extends RGBColorSpace>(hex: Hex<CS>): RGBNumber<CS>;

export function toRGBNumberFromRGB<CS extends RGBColorSpace>(rgb: Readonly<RGB<CS>>): RGBNumber<CS>;

// ---- Hex ----

/**
 * A string with length six containing the hexadecimal representation of the
 * [RGB color model](https://en.wikipedia.org/wiki/RGB_color_model).
 */
export type Hex<CS extends RGBColorSpace> = string;

/**
 * Removes the leading '#' from the given string.
 */
export function stripHash<CS extends RGBColorSpace>(hex: string): Hex<CS>;

/**
 * @returns The hex-string representation of the `rgbNumber`. A leading '#' is **not** added.
 */
export function toHexFromRGBNumber<CS extends RGBColorSpace>(rgbNumber: RGBNumber<CS>): Hex<CS>;