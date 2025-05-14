/*
The following constants stem from: https://www.emathhelp.net/calculators/linear-algebra/inverse-of-matrix-calculator/?i=%5B%5B0.680%2C0.320%2C0%5D%2C%5B0.256%2C0.690%2C0.045%5D%2C%5B0.150%2C0.060%2C0.790%5D%5D&m=g
*/

/**
 * Calculates the X component of CIE 1931 XYZ from linear Display P3.
 *
 * @param r The red component of linear Display P3, typically in the range [0, 1].
 * @param g The green component of linear Display P3, typically in the range [0, 1].
 * @param b The blue component of linear Display P3, typically in the range [0, 1].
 *
 * @returns The X component of CIE 1931 XYZ.
 * @see https://www.emathhelp.net/calculators/linear-algebra/inverse-of-matrix-calculator/?i=%5B%5B0.680%2C0.320%2C0%5D%2C%5B0.256%2C0.690%2C0.045%5D%2C%5B0.150%2C0.060%2C0.790%5D%5D&m=g
 */
export const toCIE1931XYZXFromLinearDisplayP3 = (
    r: number,
    g: number,
    b: number,
) => r * 1500 / 847 + g * -79000 / 95711 + b * 4500 / 95711;

/**
 * Calculates the Y component of CIE 1931 XYZ from linear Display P3.
 *
 * @param r The red component of linear Display P3, typically in the range [0, 1].
 * @param g The green component of linear Display P3, typically in the range [0, 1].
 * @param b The blue component of linear Display P3, typically in the range [0, 1].
 *
 * @returns The Y component of CIE 1931 XYZ.
 * @see https://www.emathhelp.net/calculators/linear-algebra/inverse-of-matrix-calculator/?i=%5B%5B0.680%2C0.320%2C0%5D%2C%5B0.256%2C0.690%2C0.045%5D%2C%5B0.150%2C0.060%2C0.790%5D%5D&m=g
 */
export const toCIE1931XYZYFromLinearDisplayP3 = (
    r: number,
    g: number,
    b: number,
) => r * -4325 / 6776 + g * 167875 / 95711 + b * -19125 / 191422;

/**
 * Calculates the Z component of CIE 1931 XYZ from linear Display P3.
 *
 * @param r The red component of linear Display P3, typically in the range [0, 1].
 * @param g The green component of linear Display P3, typically in the range [0, 1].
 * @param b The blue component of linear Display P3, typically in the range [0, 1].
 *
 * @returns The Z component of CIE 1931 XYZ.
 * @see https://www.emathhelp.net/calculators/linear-algebra/inverse-of-matrix-calculator/?i=%5B%5B0.680%2C0.320%2C0%5D%2C%5B0.256%2C0.690%2C0.045%5D%2C%5B0.150%2C0.060%2C0.790%5D%5D&m=g
 */
export const toCIE1931XYZZFromLinearDisplayP3 = (
    r: number,
    g: number,
    b: number,
) => r * -975 / 3388 + g * 2250 / 95711 + b * 121025 / 95711;