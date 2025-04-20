import {LAB} from "./lab";
import {D_65_XN, D_65_YN, D_65_ZN, Matrix3x3, matrixTimesVector} from "./internal";
import {LinearRGB} from "./lrgb";

const M_TO_LINEAR_SRGB: Matrix3x3 = [
    +3.2404542, -1.5371385, -0.4985314,
    -0.9692660, +1.8760108, +0.0415560,
    +0.0556434, -0.2040259, +1.0572252,
];

// TODO: maybe error here
const cielabF = (t: number) => t > 0.008856
    ? Math.cbrt(t)
    : 7.787 * t + 16 / 116;

// https://bottosson.github.io/posts/oklab/#converting-from-xyz-to-oklab
const M_XYZ_TO_LMS: Matrix3x3 = [
    +0.8189330101, +0.0329845436, +0.0482003018,
    +0.3618667424, +0.9293118715, +0.2643662691,
    -0.1288597137, +0.0361456387, +0.6338517070,
];

const M_LMS_DASH_TO_OKLAB: Matrix3x3 = [
    +0.2104542553, +1.9779984951, +0.0259040371,
    +0.7936177850, -2.4285922050, +0.7827717662,
    -0.0040720468, +0.4505937099, -0.8086757660,
];

/**
 * A color in the reference color space CIE 1931 XYZ.
 *
 * More information [here](https://en.wikipedia.org/wiki/CIE_1931_color_spacehttps://en.wikipedia.org/wiki/CIE_1931_color_space).
 */
export class CIE1931XYZ {
    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly z: number,
    ) {
    }

    toSRGB(): LinearRGB<"sRGB"> {
        return new LinearRGB(
            ...matrixTimesVector(M_TO_LINEAR_SRGB, [this.x, this.y, this.z]),
            "sRGB",
        );
    }

    toCIELAB(): LAB<"CIE"> {
        return new LAB(
            116 * cielabF(this.y / D_65_YN) - 16,
            500 * (cielabF(this.x / D_65_XN) - cielabF(this.y / D_65_YN)),
            200 * (cielabF(this.y / D_65_YN) - cielabF(this.z / D_65_ZN)),
            "CIE",
        );
    }

    toOklab(): LAB<"Ok"> {
        const lms = matrixTimesVector(M_XYZ_TO_LMS, [this.x, this.y, this.z]);

        for(let i = 0; i < 3; i++) lms[i] = Math.cbrt(lms[i]!);

        return new LAB(
            ...matrixTimesVector(M_LMS_DASH_TO_OKLAB, lms),
            "Ok",
        );
    }
}