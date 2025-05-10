/**
 * Helper function for converting HSV to RGB.
 *
 * @param h The hue component of HSV, in radians.
 * @param s The saturation component of HSV, typically in the range [0, 1].
 * @param v The value component of HSV, typically in the range [0, 1].
 * @param n A component-specific number.
 *
 * @returns The RGB component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative
 */
const f = (
    h: number,
    s: number,
    v: number,
    n: number,
) => {
    const k = (n + h * 3 / Math.PI) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
};

/**
 * Calculates the red component of RGB from HSV.
 *
 * @param h The hue component of HSV, in radians.
 * @param s The saturation component of HSV, typically in the range [0, 1].
 * @param v The value component of HSV, typically in the range [0, 1].
 *
 * @returns The red component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative
 */
export const toRGBRFromHSV = (
    h: number,
    s: number,
    v: number,
) => f(h, s, v, 5);

/**
 * Calculates the green component of RGB from HSV.
 *
 * @param h The hue component of HSV, in radians.
 * @param s The saturation component of HSV, typically in the range [0, 1].
 * @param v The value component of HSV, typically in the range [0, 1].
 *
 * @returns The green component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative
 */
export const toRGBGFromHSV = (
    h: number,
    s: number,
    v: number,
) => f(h, s, v, 3);

/**
 * Calculates the blue component of RGB from HSV.
 *
 * @param h The hue component of HSV, in radians.
 * @param s The saturation component of HSV, typically in the range [0, 1].
 * @param v The value component of HSV, typically in the range [0, 1].
 *
 * @returns The blue component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative
 */
export const toRGBBFromHSV = (
    h: number,
    s: number,
    v: number,
) => f(h, s, v, 1);