import {HSV} from "./hsv";
import {HSL} from "./hsl";
import {LinearRGB} from "./lrgb";
import {clamp01} from "./internal";
import {Color} from "./index";

/**
 * A color space that has RGB as its default color model.
 */
export type RGBColorSpace =
    "Display P3"
    | "Adobe RGB"
    | "sRGB";

/**
 * @see https://en.wikipedia.org/wiki/SRGB#Transfer_function_(%22gamma%22)
 */
const sRGBTransferFunction = (x: number) => x <= 0.04045
    ? x / 12.92
    : Math.pow((x + 0.055) / 1.055, 2.4)

const LINEARIZE_MAP: Record<RGBColorSpace, (x: number) => number> = {
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
 */
export class RGB<S extends RGBColorSpace> implements Color<RGB<S>> {
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

    distance(other: RGB<S>) {
        return Math.hypot(
            other.r - this.r,
            other.g - this.g,
            other.b - this.b,
        );
    }

    toCSS(withAlpha?: number): string {
        return `rgb(${this.r * 255} ${this.g * 255} ${this.b * 255}${withAlpha !== undefined ? `/${withAlpha}` : ""})`;
    }

    /**
     * Casts the current RGB instance to a different absolute color space.
     *
     * @param newColorSpace The target absolute color space model to cast to.
     * @returns A new RGB instance within the specified absolute color space.
     */
    cast<B extends RGBColorSpace>(newColorSpace: B): RGB<B> {
        return new RGB(this.r, this.g, this.b, newColorSpace);
    }

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
        const hue = calcHue(this, chroma, max);

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

        const hue = calcHue(this, chroma, value);
        const saturation = value === 0 ? 0 : chroma / value;

        return new HSV(
            hue,
            saturation,
            value,
            this._,
        );
    }

    /**
     * Converts the current color to linear RGB by undoing gamma correction on the channels.
     *
     * @returns A new {@link LinearRGB `LinearRGB`} instance with the color values linearized.
     */
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
     * @returns The RGB color instance.
     */
    static fromInteger<S extends RGBColorSpace>(integer: number, colorSpace: S): RGB<S> {
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
    static fromHex<S extends RGBColorSpace>(hex: string, colorSpace: S): RGB<S> {
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

    /**
     * Creates a random color in the specified color space.
     *
     * Note that this function does not create _perceptually uniform_ colors. For that purpose use Oklab.
     *
     * @param colorSpace The color space of the color.
     * @returns A new random color.
     */
    static random<S extends RGBColorSpace>(colorSpace: S): RGB<S> {
        return new RGB(
            Math.random(),
            Math.random(),
            Math.random(),
            colorSpace
        )
    }
}

const nanTo0 = (x: number) => isNaN(x) ? 0 : x;
const calcHue = (rgb: RGB<RGBColorSpace>, chroma: number, max: number) => {
    if(chroma === 0) return 0;
    if(max === rgb.r) return Math.PI / 3 * (((rgb.g - rgb.b) / chroma) % 6);
    if(max === rgb.g) return Math.PI / 3 * (2 + (rgb.b - rgb.r) / chroma);
    return Math.PI / 3 * (4 + (rgb.r - rgb.g) / chroma);
}