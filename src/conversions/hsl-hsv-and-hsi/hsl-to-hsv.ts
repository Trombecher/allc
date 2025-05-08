/**
 * Calculates the value component of HSV from HSL.
 * The hue component is omitted because it is unnecessary for the computation.
 *
 * @param s The saturation component of HSL, typically in the range [0, 1].
 * @param l The lightness component of HSL, typically in the range [0, 1].
 *
 * @returns The value component of HSV, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_HSV
 */
export const toHSVValueFromHSL = (
    s: number,
    l: number,
) => l + s * Math.min(l, 1 - l);

/**
 * Calculates the saturation component of HSV from HSL.
 * The hue component is omitted because it is unnecessary for the computation.
 *
 * @param s The saturation component of HSL, typically in the range [0, 1].
 * @param l The lightness component of HSL, typically in the range [0, 1].
 *
 * @returns The saturation component of HSV, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_HSV
 */
export const toHSVSaturationFromHSL = (
    s: number,
    l: number,
) => {
    const value = l + s * Math.min(l, 1 - l);
    return value && 2 * (1 - l / value);
};