import {applyMatrix3X3, Matrix3X3} from "@/matrix";
import {RGB} from "@/rgb";

export type CIE1931XYZ = {
    x: number,
    y: number,
    z: number
};

const sRGBToCIE1931XYZGammaExpandChannel = (channel: number) => channel <= .04045
    ? channel / 12.92
    : ((channel + .055) / 1.055) ** 2.4;

const SRGB_TO_CIE1931XYZ_MATRIX: Readonly<Matrix3X3> = [
    .4124,
    .3576,
    .1805,
    .2126,
    .7152,
    .0722,
    .0193,
    .1192,
    .9505,
] as const;

/**
 * Converts a color in the sRGB color space to the corresponding
 * color in the CIE 1931 XYZ reference color space according to
 * the method described [here](https://en.wikipedia.org/wiki/SRGB#From_sRGB_to_CIE_XYZ).
 * @param from
 */
export const toCIE1931XYZFromSRGB = ({r, g, b}: RGB): CIE1931XYZ => {
    const [x, y, z] = applyMatrix3X3(
        sRGBToCIE1931XYZGammaExpandChannel(r),
        sRGBToCIE1931XYZGammaExpandChannel(g),
        sRGBToCIE1931XYZGammaExpandChannel(b),
        SRGB_TO_CIE1931XYZ_MATRIX
    );
    return {x, y, z};
}