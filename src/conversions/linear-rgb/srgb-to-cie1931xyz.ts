/*
The following constants stem from: https://en.wikipedia.org/wiki/SRGB#Primaries.
*/

/**
 * Calculates the X component of CIE 1931 XYZ from linear sRGB.
 * 
 * @param r The red component of linear sRGB, typically in the range [0, 1].
 * @param g The green component of linear sRGB, typically in the range [0, 1].
 * @param b The blue component of linear sRGB, typically in the range [0, 1].
 * 
 * @returns The X component of CIE 1931 XYZ.
 * @see https://en.wikipedia.org/wiki/SRGB#Primaries
 */
export const toCIE1931XYZXFromLinearSRGB = (
    r: number,
    g: number,
    b: number,
) => r * 0.4124 + g * 0.3576 + b * 0.1805;

/**
 * Calculates the Y component of CIE 1931 XYZ from linear sRGB.
 *
 * @param r The red component of linear sRGB, typically in the range [0, 1].
 * @param g The green component of linear sRGB, typically in the range [0, 1].
 * @param b The blue component of linear sRGB, typically in the range [0, 1].
 *
 * @returns The Y component of CIE 1931 XYZ.
 * @see https://en.wikipedia.org/wiki/SRGB#Primaries
 */
export const toCIE1931XYZYFromLinearSRGB = (
    r: number,
    g: number,
    b: number,
) => r * 0.2126 + g * 0.7152 + b * 0.0722;

/**
 * Calculates the Z component of CIE 1931 XYZ from linear sRGB.
 *
 * @param r The red component of linear sRGB, typically in the range [0, 1].
 * @param g The green component of linear sRGB, typically in the range [0, 1].
 * @param b The blue component of linear sRGB, typically in the range [0, 1].
 *
 * @returns The Z component of CIE 1931 XYZ.
 * @see https://en.wikipedia.org/wiki/SRGB#Primaries
 */
export const toCIE1931XYZZFromLinearSRGB = (
    r: number,
    g: number,
    b: number,
) => r * 0.0193 + g * 0.1192 + b * 0.9505;