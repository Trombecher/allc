/**
 * Calculates the X component of CIE 1931 XYZ from CIE 1931 xyY.
 *
 * @param x The x component of CIE 1931 xyY, typically in the range [0, 1].
 * @param y The y component of CIE 1931 xyY, typically in the range [0, 1].
 * @param Y The Y component of CIE 1931 xyY, typically in the range [0, 1].
 *
 * @returns The X component of CIE 1931 XYZ.
 * @see https://en.wikipedia.org/wiki/CIE_1931_color_space#CIE_xyY_color_space
 */
export const toCIE1931XYZXFromCIE1931xyY = (x: number, y: number, Y: number) =>
    (x * Y) / y;

/**
 * Calculates the Z component of CIE 1931 XYZ from CIE 1931 xyY.
 *
 * @param x The x component of CIE 1931 xyY, typically in the range [0, 1].
 * @param y The y component of CIE 1931 xyY, typically in the range [0, 1].
 * @param Y The Y component of CIE 1931 xyY, typically in the range [0, 1].
 *
 * @returns The Z component of CIE 1931 XYZ.
 * @see https://en.wikipedia.org/wiki/CIE_1931_color_space#CIE_xyY_color_space
 */
export const toCIE1931XYZZFromCIE1931xyY = (x: number, y: number, Y: number) =>
    ((1 - x - y) * Y) / y;
