import {clamp01} from "../../internal";

/**
 * Converts the RGB color components to an integer representation of the format `0xAARRGGBB`.
 * If no alpha value is specified, a default of `0` is used. **All channels (including alpha)
 * will be clamped to [0, 1] before processing.**
 *
 * @param r - The red component, range [0, 1].
 * @param g - The green component, range [0, 1].
 * @param b - The blue component, range [0, 1].
 * @param withAlpha - An optional alpha component, range [0, 1], defaults to 0.
 * @return The integer representation of the color.
 */
export const toIntegerFromRGB = (
    r: number,
    g: number,
    b: number,
    withAlpha: number = 0,
) => Math.round(clamp01(withAlpha) * 255) << 24
    | Math.round(clamp01(r) * 255) << 16
    | Math.round(clamp01(g) * 255) << 8
    | Math.round(clamp01(b) * 255);

/**
 * Converts the RGB color components to a hexadecimal representation of the format `"RRGGBB"`.
 * If an alpha value is specified, the format is `"RRGGBBAA"`. **No '#' is prepended,
 * and all channels (including alpha) will be clamped to [0, 1] before processing.**
 *
 * @param r - The red component, range [0, 1].
 * @param g - The green component, range [0, 1].
 * @param b - The blue component, range [0, 1].
 * @param withAlpha - An optional alpha component, range [0, 1], defaults to 0.
 * @return The hexadecimal representation of the color.
 */
export const toHexStringFromRGB = (
    r: number,
    g: number,
    b: number,
    withAlpha?: number,
) => withAlpha === undefined
    ? toIntegerFromRGB(r, g, b)
        .toString(16)
        .padStart(6, "0")
    : toIntegerFromRGB(r, g, b, withAlpha)
        .toString(16)
        .padStart(8, "0");