import {RGB} from "./rgb";
import {Tagged, WithAlpha} from "./index";

/**
 * Represents a color in the [CIE 1931 XYZ color space](https://en.wikipedia.org/wiki/CIE_1931_color_space).
 */
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
export function toCIE1931XYZFromSRGB(rgb: Readonly<RGB>): CIE1931XYZ;
export function toCIE1931XYZFromSRGB(rgb: Readonly<Tagged<RGB>>): Tagged<CIE1931XYZ>;
export function toCIE1931XYZFromSRGB(rgb: Readonly<WithAlpha<RGB>>): WithAlpha<CIE1931XYZ>;
export function toCIE1931XYZFromSRGB(rgb: Readonly<Tagged<WithAlpha<RGB>>>): Tagged<WithAlpha<CIE1931XYZ>>;