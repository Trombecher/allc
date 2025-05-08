/**
 * Calculates the lightness component of HSL from HSV.
 * The hue component is omitted because it is unnecessary for the computation.
 *
 * @param s The saturation component of HSV, typically in the range [0, 1].
 * @param v The value component of HSV, typically in the range [0, 1].
 *
 * @returns The lightness component of HSL, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL
 */
export const toHSLLFromHSV = (
    s: number,
    v: number,
) => v * (1 - s / 2);

/**
 * Calculates the saturation component of HSL from HSV.
 * The hue component is omitted because it is unnecessary for the computation.
 *
 * @param s The saturation component of HSV, typically in the range [0, 1].
 * @param v The value component of HSV, typically in the range [0, 1].
 *
 * @returns The saturation component of HSL, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL
 */
export const toHSLSFromHSV = (
    s: number,
    v: number,
) => {
    const l = v * (1 - s / 2);
    return +(l === 0 || l === 1) * (v - l) / Math.min(l, 1 - l);
};