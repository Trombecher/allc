/**
 * Helper function for converting HSL to RGB.
 *
 * @param h The hue component of HSL, in radians.
 * @param s The saturation component of HSL, typically in the range [0, 1].
 * @param l The lightness component of HSL, typically in the range [0, 1].
 * @param n A component-specific number.
 *
 * @returns The RGB component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative
 */
const f = (h: number, s: number, l: number, n: number) => {
    const k = (n + (h * 6) / Math.PI) % 12;
    return l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1));
};

/**
 * Calculates the red component of RGB from HSL.
 *
 * @param h The hue component of HSL, in radians.
 * @param s The saturation component of HSL, typically in the range [0, 1].
 * @param l The lightness component of HSL, typically in the range [0, 1].
 *
 * @returns The red component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative
 */
export const toRGBRFromHSL = (h: number, s: number, l: number) => f(h, s, l, 0);

/**
 * Calculates the green component of RGB from HSL.
 *
 * @param h The hue component of HSL, in radians.
 * @param s The saturation component of HSL, typically in the range [0, 1].
 * @param l The lightness component of HSL, typically in the range [0, 1].
 *
 * @returns The green component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative
 */
export const toRGBGFromHSL = (h: number, s: number, l: number) => f(h, s, l, 8);

/**
 * Calculates the blue component of RGB from HSL.
 *
 * @param h The hue component of HSL, in radians.
 * @param s The saturation component of HSL, typically in the range [0, 1].
 * @param l The lightness component of HSL, typically in the range [0, 1].
 *
 * @returns The blue component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative
 */
export const toRGBBFromHSL = (h: number, s: number, l: number) => f(h, s, l, 4);
