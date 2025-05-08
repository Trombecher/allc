/*
Constants taken from https://www.emathhelp.net/calculators/linear-algebra/inverse-of-matrix-calculator/?i=%5B%5B0.4124%2C0.3576%2C0.1805%5D%2C%5B0.2126%2C0.7152%2C0.0722%5D%2C%5B0.0193%2C0.1192%2C0.9505%5D%5D&m=g
*/

/**
 * Calculates the red component of linear sRGB from CIE 1931 XYZ.
 *
 * @param x The X component of CIE 1931 XYZ.
 * @param y The Y component of CIE 1931 XYZ.
 * @param z The Z component of CIE 1931 XYZ.
 *
 * @returns The red component of linear sRGB.
 * @see https://en.wikipedia.org/wiki/SRGB#Primaries
 */
export const toLinearSRGBRFromCIE1931XYZ = (
    x: number,
    y: number,
    z: number,
) => x * 28154000 / 8687829
    + y * -13355000 / 8687829
    + z * -1444000 / 2895943;

/**
 * Calculates the green component of linear sRGB from CIE 1931 XYZ.
 *
 * @param x The X component of CIE 1931 XYZ.
 * @param y The Y component of CIE 1931 XYZ.
 * @param z The Z component of CIE 1931 XYZ.
 *
 * @returns The green component of linear sRGB.
 * @see https://en.wikipedia.org/wiki/SRGB#Primaries
 */
export const toLinearSRGBGFromCIE1931XYZ = (
    x: number,
    y: number,
    z: number,
) => x * -418089250 / 431495507
    + y * 1618760625 / 862991014
    + z * 17914625 / 431495507;

/**
 * Calculates the blue component of linear sRGB from CIE 1931 XYZ.
 *
 * @param x The X component of CIE 1931 XYZ.
 * @param y The Y component of CIE 1931 XYZ.
 * @param z The Z component of CIE 1931 XYZ.
 *
 * @returns The blue component of linear sRGB.
 * @see https://en.wikipedia.org/wiki/SRGB#Primaries
 */
export const toLinearSRGBBFromCIE1931XYZ = (
    x: number,
    y: number,
    z: number,
) => x * 484000 / 8687829
    + y * -1772500 / 8687829
    + z * 3061000 / 2895943;