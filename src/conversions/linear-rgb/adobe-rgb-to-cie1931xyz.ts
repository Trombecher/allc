/**
 * Calculates the X component of CIE 1931 XYZ from linear Adobe RGB.
 * 
 * @param r The red component of linear Adobe RGB, typically in the range [0, 1].
 * @param g The green component of linear Adobe RGB, typically in the range [0, 1].
 * @param b The blue component of linear Adobe RGB, typically in the range [0, 1].
 * 
 * @returns The X component of CIE 1931 XYZ.
 * @see https://en.wikipedia.org/wiki/Adobe_RGB_color_space#Reference_viewing_conditions
 */
export const toCIE1931XYZXFromLinearAdobeRGB = (
    r: number,
    g: number,
    b: number,
) => r * 0.57667 + g * 0.18556 + b * 0.18823;

/**
 * Calculates the Y component of CIE 1931 XYZ from linear Adobe RGB.
 *
 * @param r The red component of linear Adobe RGB, typically in the range [0, 1].
 * @param g The green component of linear Adobe RGB, typically in the range [0, 1].
 * @param b The blue component of linear Adobe RGB, typically in the range [0, 1].
 *
 * @returns The Y component of CIE 1931 XYZ.
 * @see https://en.wikipedia.org/wiki/Adobe_RGB_color_space#Reference_viewing_conditions
 */
export const toCIE1931XYZYFromLinearAdobeRGB = (
    r: number,
    g: number,
    b: number,
) => r * 0.29734 + g * 0.62736 + b * 0.07529;

/**
 * Calculates the Z component of CIE 1931 XYZ from linear Adobe RGB.
 *
 * @param r The red component of linear Adobe RGB, typically in the range [0, 1].
 * @param g The green component of linear Adobe RGB, typically in the range [0, 1].
 * @param b The blue component of linear Adobe RGB, typically in the range [0, 1].
 *
 * @returns The Z component of CIE 1931 XYZ.
 * @see https://en.wikipedia.org/wiki/Adobe_RGB_color_space#Reference_viewing_conditions
 */
export const toCIE1931XYZZFromLinearAdobeRGB = (
    r: number,
    g: number,
    b: number,
) => r * 0.02703 + g * 0.07069 + b * 0.99134;