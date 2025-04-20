import {HSV} from "./hsv";
import {EngineeringColorModelCompatibleAbsoluteColorSpace, RGB} from "./rgb";

/**
 * Represents a color in the HSL (Hue, Saturation, Lightness) color model.
 *
 * The hue component `h` is in radians. The saturation and lightness components `s` and `l` are in the range [0, 1].
 *
 * @template S The underlying color space.
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV
 */
export class HSL<S extends EngineeringColorModelCompatibleAbsoluteColorSpace> {
    constructor(
        public readonly h: number,
        public readonly s: number,
        public readonly l: number,
        public readonly _: S,
    ) {
    }

    /**
     * Converts the current color to {@link RGB `RGB`}.
     *
     * @returns An instance of the RGB class representing the color in RGB format.
     * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative
     */
    toRGB(): RGB<S> {
        const a = this.s * Math.min(this.l, 1 - this.l);

        const f = (n: number) => {
            const k = (n + this.h * 6 / Math.PI) % 12;
            return this.l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
        };

        return new RGB(
            f(0),
            f(8),
            f(4),
            this._,
        );
    }

    /**
     * Converts the current color to {@link HSV `HSV`}.
     *
     * @returns An HSV instance representing the color in HSV format.
     * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_HSV
     */
    toHSV(): HSV<S> {
        const value = this.l + this.s * Math.min(this.l, 1 - this.l);

        return new HSV(
            this.h,
            value === 0 ? 0 : 2 * (1 - this.l / value),
            value,
            this._
        );
    }
}