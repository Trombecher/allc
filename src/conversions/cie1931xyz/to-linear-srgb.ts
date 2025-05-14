import {
    MATRIX_LINEAR_SRGB_FROM_CIE_1931_XYZ_0_0,
    MATRIX_LINEAR_SRGB_FROM_CIE_1931_XYZ_0_1,
    MATRIX_LINEAR_SRGB_FROM_CIE_1931_XYZ_0_2,
    MATRIX_LINEAR_SRGB_FROM_CIE_1931_XYZ_1_0,
    MATRIX_LINEAR_SRGB_FROM_CIE_1931_XYZ_1_1,
    MATRIX_LINEAR_SRGB_FROM_CIE_1931_XYZ_1_2,
    MATRIX_LINEAR_SRGB_FROM_CIE_1931_XYZ_2_0,
    MATRIX_LINEAR_SRGB_FROM_CIE_1931_XYZ_2_1,
    MATRIX_LINEAR_SRGB_FROM_CIE_1931_XYZ_2_2,
} from "../generated-constants";

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
) => x * MATRIX_LINEAR_SRGB_FROM_CIE_1931_XYZ_0_0
    + y * MATRIX_LINEAR_SRGB_FROM_CIE_1931_XYZ_0_1
    + z * MATRIX_LINEAR_SRGB_FROM_CIE_1931_XYZ_0_2;

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
) => x * MATRIX_LINEAR_SRGB_FROM_CIE_1931_XYZ_1_0
    + y * MATRIX_LINEAR_SRGB_FROM_CIE_1931_XYZ_1_1
    + z * MATRIX_LINEAR_SRGB_FROM_CIE_1931_XYZ_1_2;

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
) => x * MATRIX_LINEAR_SRGB_FROM_CIE_1931_XYZ_2_0
    + y * MATRIX_LINEAR_SRGB_FROM_CIE_1931_XYZ_2_1
    + z * MATRIX_LINEAR_SRGB_FROM_CIE_1931_XYZ_2_2;