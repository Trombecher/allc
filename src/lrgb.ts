import {clamp01, Matrix3x3, matrixTimesVector, Vector3} from "./internal";
import {CIE1931XYZ} from "./cie1931xyz";
import {RGBColorSpace, RGB} from "./rgb";
import {Color} from "./common";

/**
 * @see https://en.wikipedia.org/wiki/SRGB#Transfer_function_(%22gamma%22)
 */
const inverseSRGBTransferFunction = (x: number) => x <= 0.0031308
    ? 12.92 * x
    : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;

const UNLINEARIZE_MAP: Record<RGBColorSpace, (x: number) => number> = {
    "sRGB": inverseSRGBTransferFunction,
    "Display P3": inverseSRGBTransferFunction,

    // https://en.wikipedia.org/wiki/Adobe_RGB_color_space#ICC_PCS_color_image_encoding
    "Adobe RGB": x => Math.pow(x, 563 / 256),
};

/**
 * @see https://en.wikipedia.org/wiki/SRGB#Primaries
 */
const M_LINEAR_SRGB_TO_CIE_1931_XYZ: Matrix3x3 = [
    0.4124, 0.3576, 0.1805,
    0.2126, 0.7152, 0.0722,
    0.0193, 0.1192, 0.9505,
];

const M_LINEAR_DISPLAY_P3_TO_CIE_1931_XYZ: Matrix3x3 = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0, // TODO
];

/**
 * https://en.wikipedia.org/wiki/Adobe_RGB_color_space#Reference_viewing_conditions
 */
const M_LINEAR_ADOBE_RGB_TO_CIE_1931_XYZ: Matrix3x3 = [
    0.57667, 0.18556, 0.18823,
    0.29734, 0.62736, 0.07529,
    0.02703, 0.07069, 0.99134,
];

/**
 * Non-gamma-corrected RGB. All channels have a range of [0, 1].
 */
export class LinearRGB<S extends RGBColorSpace> implements Color<LinearRGB<S>> {
    constructor(
        /**
         * The red channel.
         */
        public readonly r: number,
        /**
         * The green channel.
         */
        public readonly g: number,
        /**
         * The blue channel.
         */
        public readonly b: number,
        /**
         * The color space.
         */
        public readonly _: S,
    ) {
    }

    clamp(): LinearRGB<S> {
        return new LinearRGB(
            clamp01(this.r),
            clamp01(this.g),
            clamp01(this.b),
            this._
        );
    }

    toCSS(withAlpha?: number): string {
        if(this._ === "sRGB") return `color(srgb-linear ${this.r} ${this.g} ${this.b}${withAlpha !== undefined ? `/${withAlpha}` : ""})`;
        return this.toRGB().toCSS(withAlpha);
    }

    /**
     * Converts the current color to {@link CIE1931XYZ `CIE1931XYZ`}. The conversion will depend on the color space.
     *
     * * For sRGB: https://en.wikipedia.org/wiki/SRGB#Primaries
     * * Display P3: https://www.color.org/chardata/rgb/DisplayP3.xalter (inverse matrix)
     * * Adobe RGB: https://en.wikipedia.org/wiki/Adobe_RGB_color_space#Reference_viewing_conditions
     *
     * @returns An instance of the CIE1931XYZ class representing the color in CIE 1931 XYZ format.
     */
    toCIE1931XYZ(): CIE1931XYZ {
        const v: Vector3 = [this.r, this.g, this.b];

        switch(this._) {
            case "sRGB":
                return new CIE1931XYZ(...matrixTimesVector(M_LINEAR_SRGB_TO_CIE_1931_XYZ, v));
            case "Display P3":
                return new CIE1931XYZ(...matrixTimesVector(M_LINEAR_DISPLAY_P3_TO_CIE_1931_XYZ, v));
            case "Adobe RGB":
                return new CIE1931XYZ(...matrixTimesVector(M_LINEAR_ADOBE_RGB_TO_CIE_1931_XYZ, v));
        }
    }

    // TODO: docs
    toRGB(): RGB<S> {
        const unlinerize = UNLINEARIZE_MAP[this._];

        return new RGB(
            unlinerize(this.r),
            unlinerize(this.g),
            unlinerize(this.b),
            this._,
        );
    }
}