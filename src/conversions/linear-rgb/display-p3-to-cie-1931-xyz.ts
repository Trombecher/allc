import {
    MATRIX_CIE_1931_XYZ_FROM_LINEAR_DISPLAY_P3_0_0,
    MATRIX_CIE_1931_XYZ_FROM_LINEAR_DISPLAY_P3_0_1,
    MATRIX_CIE_1931_XYZ_FROM_LINEAR_DISPLAY_P3_0_2,
    MATRIX_CIE_1931_XYZ_FROM_LINEAR_DISPLAY_P3_1_0,
    MATRIX_CIE_1931_XYZ_FROM_LINEAR_DISPLAY_P3_1_1,
    MATRIX_CIE_1931_XYZ_FROM_LINEAR_DISPLAY_P3_1_2,
    MATRIX_CIE_1931_XYZ_FROM_LINEAR_DISPLAY_P3_2_0,
    MATRIX_CIE_1931_XYZ_FROM_LINEAR_DISPLAY_P3_2_1,
    MATRIX_CIE_1931_XYZ_FROM_LINEAR_DISPLAY_P3_2_2,
} from "../../matrices";

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
) => r * MATRIX_CIE_1931_XYZ_FROM_LINEAR_DISPLAY_P3_0_0
    + g * MATRIX_CIE_1931_XYZ_FROM_LINEAR_DISPLAY_P3_0_1
    + b * MATRIX_CIE_1931_XYZ_FROM_LINEAR_DISPLAY_P3_0_2;

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
) => r * MATRIX_CIE_1931_XYZ_FROM_LINEAR_DISPLAY_P3_1_0
    + g * MATRIX_CIE_1931_XYZ_FROM_LINEAR_DISPLAY_P3_1_1
    + b * MATRIX_CIE_1931_XYZ_FROM_LINEAR_DISPLAY_P3_1_2;

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
) => r * MATRIX_CIE_1931_XYZ_FROM_LINEAR_DISPLAY_P3_2_0
    + g * MATRIX_CIE_1931_XYZ_FROM_LINEAR_DISPLAY_P3_2_1
    + b * MATRIX_CIE_1931_XYZ_FROM_LINEAR_DISPLAY_P3_2_2;