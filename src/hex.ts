/**
 * A string with length six containing the hexadecimal representation of the
 * [RGB color model](https://en.wikipedia.org/wiki/RGB_color_model).
 */
export type Hex = string;

/**
 * Removes the leading '#' from the given string.
 */
export function stripHash(string: string): Hex {
    return string[0] === '#' ? string.substring(1) : string;
}

/**
 * @returns The hex-string representation of the `rgbNumber`. A leading '#' is **not** added.
 */
export function toHexFromRGBNumber(rgbNumber: number): Hex {
    return rgbNumber.toString(16).padStart(6, "0");
}