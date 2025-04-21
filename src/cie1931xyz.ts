import {LAB, PerceptualColorSpace} from "./lab";
import {
    clamp01,
    D_65_XN,
    D_65_YN,
    D_65_ZN,
    Matrix3x3,
    matrixTimesVector,
    sharedDistanceImplementation,
} from "./internal";
import {LinearRGB} from "./lrgb";
import {RGBColorSpace} from "./rgb";
import {Color} from "./common";

const cielabF = (t: number) => t > 216 / 24389
    ? Math.cbrt(t)
    : 841 / 108 * t + 4 / 29;

/**
 * @see https://en.wikipedia.org/wiki/SRGB#Primaries
 */
const M_CIE_1931_XYZ_TO_LINEAR_SRGB: Matrix3x3 = [
    +3.2404542, -1.5371385, -0.4985314,
    -0.9692660, +1.8760108, +0.0415560,
    +0.0556434, -0.2040259, +1.0572252,
];

/**
 * @see https://bottosson.github.io/posts/oklab/#converting-from-xyz-to-oklab
 */
const M_CIE_1931_XYZ_TO_LMS: Matrix3x3 = [
    +0.8189330101, +0.0329845436, +0.0482003018,
    +0.3618667424, +0.9293118715, +0.2643662691,
    -0.1288597137, +0.0361456387, +0.6338517070,
];

/**
 * @see https://bottosson.github.io/posts/oklab/#converting-from-xyz-to-oklab
 */
const M_LMS_DASH_TO_OKLAB: Matrix3x3 = [
    +0.2104542553, +1.9779984951, +0.0259040371,
    +0.7936177850, -2.4285922050, +0.7827717662,
    -0.0040720468, +0.4505937099, -0.8086757660,
];

/**
 * @see https://www.color.org/chardata/rgb/DisplayP3.xalter
 */
const M_CIE_1931_XYZ_TO_LINEAR_DISPLAY_P3: Matrix3x3 = [
    0.680, 0.320, 0.000,
    0.256, 0.690, 0.045,
    0.150, 0.060, 0.790,
];

/**
 * @see https://en.wikipedia.org/wiki/Adobe_RGB_color_space#Reference_viewing_conditions
 */
const M_CIE_1931_XYZ_TO_LINEAR_ADOBE_RGB: Matrix3x3 = [
    +2.04159, -0.56501, -0.34473,
    -0.96924, +1.87597, +0.04156,
    +0.01344, -0.11836, +1.01517
];

/**
 * A color in the reference color space CIE 1931 XYZ.
 *
 * @see https://en.wikipedia.org/wiki/CIE_1931_color_space
 */
export class CIE1931XYZ implements Color<CIE1931XYZ> {
    constructor(
        /**
         * The X component (mix of red and green).
         */
        public readonly x: number,

        /**
         * The Y component (luminance), range [0, 1].
         */
        public readonly y: number,

        /**
         * The Z component (quasi-blue).
         */
        public readonly z: number,
    ) {
    }

    distance = sharedDistanceImplementation;

    clamp(): CIE1931XYZ {
        return new CIE1931XYZ(
            this.x,
            clamp01(this.y),
            this.y
        );
    }

    toCSS(withAlpha?: number): string {
        return `xyz(${this.x} ${this.y} ${this.z}${withAlpha !== undefined ? `/${withAlpha}` : ""})`;
    }

    /**
     * Converts the current color to {@link LinearRGB `LinearRGB`}. This will do a different conversion based on the color space.
     *
     * * sRGB: https://en.wikipedia.org/wiki/SRGB#Primaries
     * * Display P3: https://www.color.org/chardata/rgb/DisplayP3.xalter
     * * Adobe RGB: https://en.wikipedia.org/wiki/Adobe_RGB_color_space#Reference_viewing_conditions
     *
     * @returns A new {@link LinearRGB `LinearRGB`} instance representing the color in the sRGB color space.
     */
    toLinearRGB<S extends RGBColorSpace>(colorSpace: S): LinearRGB<S> {
        if(colorSpace === "Adobe RGB") {
            return new LinearRGB(
                ...matrixTimesVector(M_CIE_1931_XYZ_TO_LINEAR_ADOBE_RGB, [this.x, this.y, this.z]),
                colorSpace,
            );
        }

        if(colorSpace === "Display P3") {
            return new LinearRGB(
                ...matrixTimesVector(M_CIE_1931_XYZ_TO_LINEAR_DISPLAY_P3, [this.x, this.y, this.z]),
                colorSpace,
            );
        }

        return new LinearRGB(
            ...matrixTimesVector(M_CIE_1931_XYZ_TO_LINEAR_SRGB, [this.x, this.y, this.z]),
            colorSpace,
        );
    }

    /**
     * Converts the current color to {@link LAB `LAB`}. This will do a different conversion based on the color space.
     *
     * * CIELAB: https://en.wikipedia.org/wiki/CIELAB_color_space#From_CIEXYZ_to_CIELAB
     * * Oklab: https://bottosson.github.io/posts/oklab/#converting-from-xyz-to-oklab
     *
     * @returns A new LAB instance representing the color in the CIE 1976 color space.
     */
    toLAB<S extends PerceptualColorSpace>(colorSpace: S): LAB<S> {
        if(colorSpace === "Ok") {
            const lms = matrixTimesVector(M_CIE_1931_XYZ_TO_LMS, [this.x, this.y, this.z]);

            for(let i = 0; i < 3; i++) lms[i] = Math.cbrt(lms[i]!);

            return new LAB(
                ...matrixTimesVector(M_LMS_DASH_TO_OKLAB, lms),
                colorSpace,
            );
        }

        return new LAB(
            116 * cielabF(this.y / D_65_YN) - 16,
            500 * (cielabF(this.x / D_65_XN) - cielabF(this.y / D_65_YN)),
            200 * (cielabF(this.y / D_65_YN) - cielabF(this.z / D_65_ZN)),
            colorSpace,
        );
    }
}