/*
The following constants stem from: https://en.wikipedia.org/wiki/Adobe_RGB_color_space#Reference_viewing_conditions
*/

/**
 * Calculates the red component of linear Adobe RGB from CIE 1931 XYZ.
 *
 * @param x The X component of CIE 1931 XYZ.
 * @param y The Y component of CIE 1931 XYZ.
 * @param z The Z component of CIE 1931 XYZ.
 *
 * @returns The red component of linear Adobe RGB.
 * @see https://en.wikipedia.org/wiki/Adobe_RGB_color_space#Reference_viewing_conditions
 */
export const toLinearAdobeRGBRFromCIE1931XYZ = (
    x: number,
    y: number,
    z: number,
) => x * 2.04159 + y * -0.56501 + z * -0.34473;

/**
 * Calculates the green component of linear Adobe RGB from CIE 1931 XYZ.
 *
 * @param x The X component of CIE 1931 XYZ.
 * @param y The Y component of CIE 1931 XYZ.
 * @param z The Z component of CIE 1931 XYZ.
 *
 * @returns The green component of linear Adobe RGB.
 * @see https://en.wikipedia.org/wiki/Adobe_RGB_color_space#Reference_viewing_conditions
 */
export const toLinearAdobeRGBGFromCIE1931XYZ = (
    x: number,
    y: number,
    z: number,
) => x * -0.96924 + y * 1.87597 + z * 0.04156;

/**
 * Calculates the blue component of linear Adobe RGB from CIE 1931 XYZ.
 *
 * @param x The X component of CIE 1931 XYZ.
 * @param y The Y component of CIE 1931 XYZ.
 * @param z The Z component of CIE 1931 XYZ.
 *
 * @returns The blue component of linear Adobe RGB.
 * @see https://en.wikipedia.org/wiki/Adobe_RGB_color_space#Reference_viewing_conditions
 */
export const toLinearAdobeRGBBFromCIE1931XYZ = (
    x: number,
    y: number,
    z: number,
) => x * 0.01344 + y * -0.11836 + z * 1.01517;