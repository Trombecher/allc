import {RGBNumber, RGBColorSpace} from "@/rgb";

/**
 * A string with length six containing the hexadecimal representation of the
 * [RGB color model](https://en.wikipedia.org/wiki/RGB_color_model).
 */
// @ts-ignore
export type Hex<CS extends RGBColorSpace> = string;

/**
 * Removes the leading '#' from the given string.
 */
export const stripHash = <CS extends RGBColorSpace>(string: string): Hex<CS> => string[0] === '#' ? string.slice(1) : string;

/**
 * @returns The hex-string representation of the `rgbNumber`. A leading '#' is **not** added.
 */
export const toHexFromRGBNumber = <CS extends RGBColorSpace>(rgbNumber: RGBNumber<CS>): Hex<CS> => rgbNumber.toString(16).padStart(6, "0");