import {RGBNumber} from "@/rgb/rgb-number";
import {SRGB} from "@/srgb";
import {RGB} from "@/rgb/index";

/**
 * A string with length six containing the hexadecimal representation of the
 * [RGB color model](https://en.wikipedia.org/wiki/RGB_color_model).
 */
// @ts-ignore
export type Hex<ColorSpace extends RGB = SRGB> = string;

/**
 * Removes the leading '#' from the given string.
 */
export const stripHash = <ColorSpace extends RGB = SRGB>(string: string): Hex<ColorSpace> => string[0] === '#' ? string.slice(1) : string;

/**
 * @returns The hex-string representation of the `rgbNumber`. A leading '#' is **not** added.
 */
export const toHexFromRGBNumber = <ColorSpace extends RGB = SRGB>(rgbNumber: RGBNumber<ColorSpace>): Hex<ColorSpace> => rgbNumber.toString(16).padStart(6, "0");