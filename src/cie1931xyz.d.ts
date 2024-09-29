import {RGB} from "./rgb";

export type CIE1931XYZ = {
    x: number,
    y: number,
    z: number
};

/**
 * Converts a color in the sRGB color space to the corresponding
 * color in the CIE 1931 XYZ reference color space according to
 * the method described [here](https://en.wikipedia.org/wiki/SRGB#From_sRGB_to_CIE_XYZ).
 */
export function toCIE1931XYZFromSRGB(rgb: RGB): CIE1931XYZ;