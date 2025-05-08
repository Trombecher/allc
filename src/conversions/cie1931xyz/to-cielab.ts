import {D_65_XN, D_65_YN, D_65_ZN} from "../../internal";

/**
 * Helper function for CIE 1931 XYZ to CIELAB conversion.
 *
 * @see https://en.wikipedia.org/wiki/CIELAB_color_space#From_CIE_XYZ_to_CIELAB
 */
const f = (t: number) => t > 216 / 24389
    ? Math.cbrt(t)
    : 841 / 108 * t + 4 / 29;

/**
 * Calculates the lightness component of CIELAB from CIE 1931 XYZ.
 * The X and Z components are omitted because they are unnecessary for the conversion.
 *
 * @param y The Y component of CIE 1931 XYZ.
 *
 * @returns The lightness component of CIELAB.
 * @see https://en.wikipedia.org/wiki/CIELAB_color_space#From_CIE_XYZ_to_CIELAB
 */
export const toCIELABLFromCIE1931XYZ = (
    y: number,
) => 116 * f(y / D_65_YN) - 16;

/**
 * Calculates the a component of CIELAB from CIE 1931 XYZ.
 * The Z component is omitted because it is unnecessary for the conversion.
 *
 * @param x The X component of CIE 1931 XYZ.
 * @param y The Y component of CIE 1931 XYZ.
 *
 * @returns The a component of CIELAB.
 * @see https://en.wikipedia.org/wiki/CIELAB_color_space#From_CIE_XYZ_to_CIELAB
 */
export const toCIELABAFromCIE1931XYZ = (
    x: number,
    y: number,
) => 500 * (f(x / D_65_XN) - f(y / D_65_YN));

/**
 * Calculates the b component of CIELAB from CIE 1931 XYZ.
 * The X component is omitted because it is unnecessary for the conversion.
 *
 * @param y The Y component of CIE 1931 XYZ.
 * @param z The Z component of CIE 1931 XYZ.
 *
 * @returns The b component of CIELAB.
 * @see https://en.wikipedia.org/wiki/CIELAB_color_space#From_CIE_XYZ_to_CIELAB
 */
export const toCIELABBFromCIE1931XYZ = (
    y: number,
    z: number,
) => 200 * (f(y / D_65_YN) - f(z / D_65_ZN));