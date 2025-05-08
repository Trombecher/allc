/**
 * Calculates the CSS representation of the given HSL color in the sRGB color space.
 * The given components are **not** clamped to [0, 1] before processing.
 *
 * There is no equivalent function for the other RGB color spaces.
 * If you want to convert them to CSS, first convert them to CIE 1931 XYZ and then to CSS.
 *
 * @param h The hue component of HSL, in radians.
 * @param s The saturation component of HSL, typically in the range [0, 1].
 * @param l The lightness component of HSL, typically in the range [0, 1].
 * @param withAlpha The alpha component of the color, range [0, 1], defaults to 1.
 *
 * @returns The CSS representation of the color.
 */
export const toCSSFromSRGBHSL = (
    h: number,
    s: number,
    l: number,
    withAlpha?: number,
) => `hsl(${h} ${s} ${l}${withAlpha !== undefined ? `/${withAlpha}` : ""})`;

/**
 * Calculates the CSS representation of the given HSV color in the sRGB color space.
 * The given components are **not** clamped to [0, 1] before processing.
 *
 * There is no equivalent function for the other RGB color spaces.
 * If you want to convert them to CSS, first convert them to CIE 1931 XYZ and then to CSS.
 *
 * @param h The hue component of HSV, in radians.
 * @param s The saturation component of HSV, typically in the range [0, 1].
 * @param v The lightness component of HSV, typically in the range [0, 1].
 * @param withAlpha The alpha component of the color, range [0, 1], defaults to 1.
 *
 * @returns The CSS representation of the color.
 */
export const toCSSFromSRGBHSV = (
    h: number,
    s: number,
    v: number,
    withAlpha?: number,
) => `hsv(${h} ${s} ${v}${withAlpha !== undefined ? `/${withAlpha}` : ""})`;