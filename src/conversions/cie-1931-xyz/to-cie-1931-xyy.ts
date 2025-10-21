/**
 * Calculates the x component of CIE 1931 xyY from CIE 1931 XYZ.
 *
 * @param x The X component of CIE 1931 XYZ.
 * @param y The Y component of CIE 1931 XYZ.
 * @param z The Z component of CIE 1931 XYZ.
 *
 * @returns The x component of CIE 1931 xyY.
 * @see https://en.wikipedia.org/wiki/CIE_1931_color_space#CIE_xyY_color_space
 */
export const toCIE1931xyYxFromCIE1931XYZ = (x: number, y: number, z: number) =>
    x / (x + y + z);

/**
 * Calculates the y component of CIE 1931 xyY from CIE 1931 XYZ.
 *
 * @param x The X component of CIE 1931 XYZ.
 * @param y The Y component of CIE 1931 XYZ.
 * @param z The Z component of CIE 1931 XYZ.
 *
 * @returns The y component of CIE 1931 xyY.
 * @see https://en.wikipedia.org/wiki/CIE_1931_color_space#CIE_xyY_color_space
 */
export const toCIE1931xyYyFromCIE1931XYZ = (x: number, y: number, z: number) =>
    y / (x + y + z);
