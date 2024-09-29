import {applyMatrix3X3, conditionalAssign} from "./internal";

let TO_SRGB_FROM_CIE1931XYZ_MATRIX = [
    3.2406,
    -1.5372,
    -.4986,
    -.9689,
    1.8758,
    .0415,
    .0557,
    -.2040,
    1.0570,
];

let gammaCorrectChannel = channel => channel <= .0031308
    ? 12.92 * channel
    : 1.055 * channel ** (1 / 2.4) - .055;

export let toSRGBFromCIE1931XYZ = (
    {x, y, z, a, _},
    [lr, lg, lb] = applyMatrix3X3(x, y, z, TO_SRGB_FROM_CIE1931XYZ_MATRIX)
) => conditionalAssign({
    r: gammaCorrectChannel(lr),
    g: gammaCorrectChannel(lg),
    b: gammaCorrectChannel(lb)
}, a, _ && "srgb");