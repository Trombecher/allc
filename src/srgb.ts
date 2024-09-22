import {CIE1931XYZ} from "@/cie1931xyz";
import {applyMatrix3X3, Matrix3X3} from "@/matrix";
import {RGB} from "@/rgb";

const TO_SRGB_FROM_CIE1931XYZ_MATRIX: Readonly<Matrix3X3> = [
    3.2406,
    -1.5372,
    -.4986,
    -.9689,
    1.8758,
    .0415,
    .0557,
    -.2040,
    1.0570,
] as const;

const gammaCorrectChannel = (channel: number) => channel <= .0031308
    ? 12.92 * channel
    : 1.055 * channel ** (1 / 2.4) - .055;

export const toSRGBFromCIE1931XYZ = ({x, y, z}: CIE1931XYZ): RGB<"srgb"> => {
    const [lr, lg, lb] = applyMatrix3X3(x, y, z, TO_SRGB_FROM_CIE1931XYZ_MATRIX);
    return {
        r: gammaCorrectChannel(lr),
        g: gammaCorrectChannel(lg),
        b: gammaCorrectChannel(lb)
    };
}