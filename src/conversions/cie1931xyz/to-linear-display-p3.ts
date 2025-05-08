/*
Constants taken from https://www.color.org/chardata/rgb/DisplayP3.xalter.
*/

/**
 * Calculates the red component of linear Display P3 from CIE 1931 XYZ.
 * The Z component is omitted because it is unnecessary for the conversion.
 *
 * @param x The X component of CIE 1931 XYZ.
 * @param y The Y component of CIE 1931 XYZ.
 *
 * @returns The red component of linear Display P3.
 * @see https://www.color.org/chardata/rgb/DisplayP3.xalter
 */
export const toLinearDisplayP3RFromCIE1931XYZ = (
    x: number,
    y: number,
) => x * 0.68 + y * 0.32;

/**
 * Calculates the green component of linear Display P3 from CIE 1931 XYZ.
 *
 * @param x The X component of CIE 1931 XYZ.
 * @param y The Y component of CIE 1931 XYZ.
 * @param z The Z component of CIE 1931 XYZ.
 *
 * @returns The green component of linear Display P3.
 * @see https://www.color.org/chardata/rgb/DisplayP3.xalter
 */
export const toLinearDisplayP3GFromCIE1931XYZ = (
    x: number,
    y: number,
    z: number,
) => x * 0.265 + y * 0.69 + z * 0.045;

/**
 * Calculates the blue component of linear Display P3 from CIE 1931 XYZ.
 *
 * @param x The X component of CIE 1931 XYZ.
 * @param y The Y component of CIE 1931 XYZ.
 * @param z The Z component of CIE 1931 XYZ.
 *
 * @returns The blue component of linear Display P3.
 * @see https://www.color.org/chardata/rgb/DisplayP3.xalter
 */
export const toLinearDisplayP3BFromCIE1931XYZ = (
    x: number,
    y: number,
    z: number,
) => x * 0.15 + y * 0.06 + z * 0.79;