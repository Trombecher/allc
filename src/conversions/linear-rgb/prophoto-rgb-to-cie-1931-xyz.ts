// This file was automatically generated by `src-comptime/precalculate.ts`.
import {
    MATRIX_CIE_1931_XYZ_FROM_LINEAR_PROPHOTO_RGB_0_0,
    MATRIX_CIE_1931_XYZ_FROM_LINEAR_PROPHOTO_RGB_0_1,
    MATRIX_CIE_1931_XYZ_FROM_LINEAR_PROPHOTO_RGB_0_2,
    MATRIX_CIE_1931_XYZ_FROM_LINEAR_PROPHOTO_RGB_1_0,
    MATRIX_CIE_1931_XYZ_FROM_LINEAR_PROPHOTO_RGB_1_1,
    MATRIX_CIE_1931_XYZ_FROM_LINEAR_PROPHOTO_RGB_1_2,
    MATRIX_CIE_1931_XYZ_FROM_LINEAR_PROPHOTO_RGB_2_0,
    MATRIX_CIE_1931_XYZ_FROM_LINEAR_PROPHOTO_RGB_2_1,
    MATRIX_CIE_1931_XYZ_FROM_LINEAR_PROPHOTO_RGB_2_2,
} from "../../matrices";

/**
 * Calculates the X component of CIE 1931 XYZ from linear ProPhoto RGB.
 *
 * @param r The red component of linear ProPhoto RGB, typically in the range [0, 1].
 * @param g The green component of linear ProPhoto RGB, typically in the range [0, 1].
 * @param b The blue component of linear ProPhoto RGB, typically in the range [0, 1].
 *
 * @returns The X component of CIE 1931 XYZ.
 */
export const toCIE1931XYZXFromLinearProPhotoRGB = (
    r: number,
    g: number,
    b: number,
) => r * MATRIX_CIE_1931_XYZ_FROM_LINEAR_PROPHOTO_RGB_0_0
    + g * MATRIX_CIE_1931_XYZ_FROM_LINEAR_PROPHOTO_RGB_0_1
    + b * MATRIX_CIE_1931_XYZ_FROM_LINEAR_PROPHOTO_RGB_0_2;

/**
 * Calculates the Y component of CIE 1931 XYZ from linear ProPhoto RGB.
 *
 * @param r The red component of linear ProPhoto RGB, typically in the range [0, 1].
 * @param g The green component of linear ProPhoto RGB, typically in the range [0, 1].
 * @param b The blue component of linear ProPhoto RGB, typically in the range [0, 1].
 *
 * @returns The Y component of CIE 1931 XYZ.
 */
export const toCIE1931XYZYFromLinearProPhotoRGB = (
    r: number,
    g: number,
    b: number,
) => r * MATRIX_CIE_1931_XYZ_FROM_LINEAR_PROPHOTO_RGB_1_0
    + g * MATRIX_CIE_1931_XYZ_FROM_LINEAR_PROPHOTO_RGB_1_1
    + b * MATRIX_CIE_1931_XYZ_FROM_LINEAR_PROPHOTO_RGB_1_2;

/**
 * Calculates the Z component of CIE 1931 XYZ from linear ProPhoto RGB.
 *
 * @param r The red component of linear ProPhoto RGB, typically in the range [0, 1].
 * @param g The green component of linear ProPhoto RGB, typically in the range [0, 1].
 * @param b The blue component of linear ProPhoto RGB, typically in the range [0, 1].
 *
 * @returns The Z component of CIE 1931 XYZ.
 */
export const toCIE1931XYZZFromLinearProPhotoRGB = (
    r: number,
    g: number,
    b: number,
) => r * MATRIX_CIE_1931_XYZ_FROM_LINEAR_PROPHOTO_RGB_2_0
    + g * MATRIX_CIE_1931_XYZ_FROM_LINEAR_PROPHOTO_RGB_2_1
    + b * MATRIX_CIE_1931_XYZ_FROM_LINEAR_PROPHOTO_RGB_2_2;