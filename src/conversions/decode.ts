/**
 * Calculates the red component of an integer representation in the format `0xRRGGBB`.
 * **All other bits will be ignored, including the alpha channel**.
 *
 * @param integer The integer representation.
 *
 * @returns The red component.
 */
export const toRGBRFromInteger = (integer: number) =>
    ((integer >> 16) & 255) / 255;

/**
 * Calculates the green component of an integer representation in the format `0xRRGGBB`.
 * **All other bits will be ignored, including the alpha channel**.
 *
 * @param integer The integer representation.
 *
 * @returns The green component.
 */
export const toRGBGFromInteger = (integer: number) =>
    ((integer >> 8) & 255) / 255;

/**
 * Calculates the blue component of an integer representation in the format `0xRRGGBB`.
 * **All other bits will be ignored, including the alpha channel**.
 *
 * @param integer The integer representation.
 *
 * @returns The blue component.
 */
export const toRGBBFromInteger = (integer: number) => (integer & 255) / 255;

/**
 * Calculates the red component of a hex representation in either of the formats
 * listed below:
 *
 * * `"RGB"`
 * * `"#RGB"`
 * * `"RRGGBB"`
 * * `"#RRGGBB"`
 *
 * It ignores any following characters. Defaults to 0 if the string/component is invalid.
 *
 * @param hex The hex string.
 *
 * @returns The red component.
 */
export const toRGBRFromHexString = (hex: string) => {
    if (hex.startsWith("#")) hex = hex.slice(1);
    if (hex.length <= 4) return nanTo0(parseInt(hex[0] ?? "0", 16)) / 15;
    return nanTo0(parseInt(hex.slice(0, 2), 16)) / 255;
};

/**
 * Calculates the green component of a hex representation in either of the formats
 * listed below:
 *
 * * `"RGB"`
 * * `"#RGB"`
 * * `"RRGGBB"`
 * * `"#RRGGBB"`
 *
 * It ignores any following characters. Defaults to 0 if the string/component is invalid.
 *
 * @param hex The hex string.
 *
 * @returns The green component.
 */
export const toRGBGFromHexString = (hex: string) => {
    if (hex.startsWith("#")) hex = hex.slice(1);
    if (hex.length <= 4) return nanTo0(parseInt(hex[1] ?? "0", 16)) / 15;
    return nanTo0(parseInt(hex.slice(2, 4), 16)) / 255;
};

/**
 * Calculates the blue component of a hex representation in either of the formats
 * listed below:
 *
 * * `"RGB"`
 * * `"#RGB"`
 * * `"RRGGBB"`
 * * `"#RRGGBB"`
 *
 * It ignores any following characters. Defaults to 0 if the string/component is invalid.
 *
 * @param hex The hex string.
 *
 * @returns The blue component.
 */
export const toRGBBFromHexString = (hex: string) => {
    if (hex.startsWith("#")) hex = hex.slice(1);
    if (hex.length <= 4) return nanTo0(parseInt(hex[2] ?? "0", 16)) / 15;
    return nanTo0(parseInt(hex.slice(4, 6), 16)) / 255;
};

const nanTo0 = (x: number) => (Number.isNaN(x) ? 0 : x);
