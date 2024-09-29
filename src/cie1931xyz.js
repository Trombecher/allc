import {applyMatrix3X3} from "./internal";

let sRGBToCIE1931XYZGammaExpandChannel = channel => channel <= .04045
    ? channel / 12.92
    : ((channel + .055) / 1.055) ** 2.4;

let SRGB_TO_CIE1931XYZ_MATRIX = [
    .4124,
    .3576,
    .1805,
    .2126,
    .7152,
    .0722,
    .0193,
    .1192,
    .9505,
];

export let toCIE1931XYZFromSRGB = (
    {r, g, b},
    [x, y, z] = applyMatrix3X3(
        sRGBToCIE1931XYZGammaExpandChannel(r),
        sRGBToCIE1931XYZGammaExpandChannel(g),
        sRGBToCIE1931XYZGammaExpandChannel(b),
        SRGB_TO_CIE1931XYZ_MATRIX
    )
) => ({x, y, z});