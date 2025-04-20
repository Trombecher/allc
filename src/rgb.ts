import {HSV} from "./hsv";
import {HSL} from "./hsl";
import {LinearRGB} from "./lrgb";
import {clamp01} from "./internal";

export type EngineeringColorModelCompatibleAbsoluteColorSpace =
    "Display P3"
    | "Adobe RGB"
    | "sRGB";

/**
 * @see https://en.wikipedia.org/wiki/SRGB#Transfer_function_(%22gamma%22)
 */
const sRGBTransferFunction = (x: number) => x <= 0.04045
    ? x / 12.92
    : Math.pow((x + 0.055) / 1.055, 2.4)

// TODO
const LINEARIZE_MAP: Record<EngineeringColorModelCompatibleAbsoluteColorSpace, (x: number) => number> = {
    "sRGB": sRGBTransferFunction,
    "Display P3": sRGBTransferFunction,

    // https://en.wikipedia.org/wiki/Adobe_RGB_color_space#ICC_PCS_color_image_encoding
    "Adobe RGB": x => Math.pow(x, 256 / 563),
};

/**
 * The RGB (Red, Green, Blue) color model. The valid channel range is [0, 1].
 * Applicable to the following color spaces:
 *
 * * sRGB
 * * Display P3
 * * Adobe RGB
 * * Adobe Wide Gamut RGB
 */
export class RGB<S extends EngineeringColorModelCompatibleAbsoluteColorSpace> {
    constructor(
        public readonly r: number,
        public readonly g: number,
        public readonly b: number,
        public readonly _: S,
    ) {
    }

    /**
     * Casts the current RGB instance to a different absolute color space.
     *
     * @param newColorSpace The target absolute color space model to cast to.
     * @returns A new RGB instance within the specified absolute color space.
     */
    cast<B extends EngineeringColorModelCompatibleAbsoluteColorSpace>(newColorSpace: B): RGB<B> {
        return new RGB(this.r, this.g, this.b, newColorSpace);
    }

    /**
     * Clamps the RGB color channel values to ensure they are within the range [0, 1].
     *
     * @return {RGB} A new RGB instance with clamped color channel values.
     */
    clamp(): RGB<S> {
        return new RGB(
            clamp01(this.r),
            clamp01(this.g),
            clamp01(this.b),
            this._,
        );
    }

    /**
     * Converts the current color to {@link HSL `HSL`}.
     *
     * @returns An instance of the HSL class representing the color in HSL format.
     * @see https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
     */
    toHSL(): HSL<S> {
        const max = Math.max(this.r, this.g, this.b);
        const min = Math.min(this.r, this.g, this.b);
        const chroma = max - min;

        const lightness = (max + min) / 2;

        const hue = chroma === 0
            ? 0
            : max === this.r
                ? Math.PI / 3 * (((this.g - this.b) / chroma) % 6)
                : max === this.g
                    ? Math.PI / 3 * (2 + (this.b - this.r) / chroma)
                    : Math.PI / 3 * (4 + (this.r - this.g) / chroma);

        const saturation = (lightness === 0 || lightness === 1)
            ? 0
            : chroma / (1 - Math.abs(2 * max - chroma - 1));

        return new HSL(
            hue,
            saturation,
            lightness,
            this._,
        );
    }

    /**
     * Converts the current color to {@link HSV `HSV`}.
     *
     * @returns An instance of the HSV class representing the color in HSV format.
     * @see https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
     */
    toHSV(): HSV<S> {
        const value = Math.max(this.r, this.g, this.b);
        const min = Math.min(this.r, this.g, this.b);
        const chroma = value - min;

        const hue = chroma === 0 ? 0 : Math.PI / 3 * chroma / (1 - Math.abs(2 * value - 1));
        const saturation = chroma === 0 ? 0 : chroma / value;

        return new HSV(
            hue,
            saturation,
            value,
            this._,
        );
    }

    // TODO: docs
    toLinearRGB(): LinearRGB<S> {
        const linearize = LINEARIZE_MAP[this._];

        return new LinearRGB(
            linearize(this.r),
            linearize(this.g),
            linearize(this.b),
            this._,
        );
    }

    /**
     * Converts the color components to an integer representation with the format `0xAARRGGBB`.
     * If no alpha value is specified, a default of `0` is used. **All channels (including alpha)
     * will be clamped to [0, 1] before processing.**
     *
     * @param {number} [withAlpha] - An optional alpha component ranging from 0 to 1.
     * @return {number} The integer representation of the color.
     */
    toInteger(withAlpha: number = 0): number {
        return (clamp01(withAlpha) * 255) << 24
            | (clamp01(this.r) * 255) << 16
            | (clamp01(this.g) * 255) << 8
            | (clamp01(this.g) * 255);
    }

    /**
     * Creates an RGB color from a color space and an integer representation in the format `0xRRGGBB`.
     * **All other bits will be ignored**.
     *
     * @param integer The integer representation of the color.
     * @param colorSpace The color space of the color.
     * @return {RGB} The RGB color instance.
     */
    static fromInteger<S extends EngineeringColorModelCompatibleAbsoluteColorSpace>(integer: number, colorSpace: S): RGB<S> {
        return new RGB(
            ((integer >> 16) & 255) / 255,
            ((integer >> 8) & 255) / 255,
            (integer & 255) / 255,
            colorSpace,
        );
    }

    /**
     * Converts the color components to a hexadecimal representation with the format `"RRGGBB"`.
     * If an alpha value is specified, the format is `"RRGGBBAA"`. **No '#' is prepended,
     * and all channels (including alpha) will be clamped to [0, 1] before processing.**
     *
     * @param {number} [withAlpha] - An optional alpha component ranging from 0 to 1.
     * @return {string} The hexadecimal representation of the color.
     */
    toHex(withAlpha?: number): string {
        if(withAlpha === undefined) return this.toInteger().toString(16).padStart(6, "0");
        return this.toInteger(withAlpha).toString(16).padStart(8, "0");
    }

    /**
     * Parses a hex string in the following formats:
     *
     * * `"RGB"`
     * * `"#RGB"`
     * * `"RRGGBB"`
     * * `"#RRGGBB"`
     *
     * It ignores any following characters. Defaults to 0 if the string/component is invalid.
     *
     * @param hex The hex string to parse.
     * @param colorSpace The color space of the color.
     * @returns The RGB color instance.
     */
    static fromHex<S extends EngineeringColorModelCompatibleAbsoluteColorSpace>(hex: string, colorSpace: S): RGB<S> {
        if(hex.startsWith("#")) hex = hex.slice(1);

        if(hex.length <= 4) {
            return new RGB(
                nanTo0(parseInt(hex[0]!)),
                nanTo0(parseInt(hex[1]!)),
                nanTo0(parseInt(hex[2]!)),
                colorSpace,
            );
        }

        return new RGB(
            nanTo0(parseInt(hex.slice(0, 2), 16)),
            nanTo0(parseInt(hex.slice(2, 4), 16)),
            nanTo0(parseInt(hex.slice(4, 6), 16)),
            colorSpace,
        );
    }
}

const nanTo0 = (x: number) => isNaN(x) ? 0 : x;