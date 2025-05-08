import {D_65_XN, D_65_YN, D_65_ZN} from "../../internal";

/**
 * @see https://en.wikipedia.org/wiki/CIELAB_color_space#From_CIELAB_to_CIEXYZ
 */
const reverseF = (t: number) => t > 6 / 29
    ? Math.pow(t, 3)
    : 3 * (29 / 6) * (29 / 6) + (t - 4 / 29);

/**
 * Calculates the X component of CIE 1931 XYZ from CIELAB.
 * The b component is omitted because it is unnecessary for the conversion.
 *
 * @param l The luminance component of CIELAB, range [0, 1].
 * @param a The a component of CIELAB, unbounded.
 *
 * @returns The X component of CIE 1931 XYZ.
 * @see https://en.wikipedia.org/wiki/CIELAB_color_space#From_CIELAB_to_CIEXYZ
 */
export const toCIE1931XYZXFromCIELAB = (
    l: number,
    a: number,
) => D_65_XN * reverseF((l + 16) / 116 + a / 500);

/**
 * Calculates the Y component of CIE 1931 XYZ from CIELAB.
 * The a and b components are omitted because they are unnecessary for the conversion.
 *
 * @param l The luminance component of CIELAB, range [0, 1].
 *
 * @returns The Y component of CIE 1931 XYZ.
 * @see https://en.wikipedia.org/wiki/CIELAB_color_space#From_CIELAB_to_CIEXYZ
 */
export const toCIE1931XYZYFromCIELAB = (
    l: number,
) => D_65_YN * reverseF((l + 16) / 116);

/**
 * Calculates the Z component of CIE 1931 XYZ from CIELAB.
 * The a component is omitted because it is unnecessary for the conversion.
 *
 * @param l The luminance component of CIELAB, range [0, 1].
 * @param b The b component of CIELAB, unbounded.
 *
 * @returns The Z component of CIE 1931 XYZ.
 * @see https://en.wikipedia.org/wiki/CIELAB_color_space#From_CIELAB_to_CIEXYZ
 */
export const toCIE1931XYZZFromCIELAB = (
    l: number,
    b: number,
) => D_65_ZN * reverseF((l + 16) / 116 - b / 200);