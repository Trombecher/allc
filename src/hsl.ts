import {HSV} from "./hsv";
import {RGBColorSpace, RGB} from "./rgb";
import {Color} from "./index";
import {clamp01} from "./internal";

/**
 * Represents a color in the HSL (Hue, Saturation, Lightness) color model.
 *
 * The hue component `h` is in radians. The saturation and lightness components `s` and `l` are in the range [0, 1].
 *
 * @template S The underlying color space.
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV
 */
export class HSL<S extends RGBColorSpace> implements Color<HSL<S>> {
    constructor(
        public readonly h: number,
        public readonly s: number,
        public readonly l: number,
        public readonly _: S,
    ) {
    }

    clamp(): HSL<S> {
        return new HSL(
            this.h,
            clamp01(this.s),
            clamp01(this.l),
            this._,
        )
    }

    toCSS(withAlpha?: number): string {
        return `hsl(${this.h}rad ${this.s} ${this.l}${withAlpha !== undefined ? `/${withAlpha}` : ""})`;
    }

    distance(other: HSL<S>) {
        // Convert to 3D space and calculate Euclidean distance.
        const thisR = this.s * (1 - Math.abs(2 * this.l - 1));
        const otherR = other.s * (1 - Math.abs(2 * other.l - 1));

        return Math.hypot(
            thisR * Math.cos(this.h) - otherR * Math.cos(other.h),
            thisR * Math.sin(this.h) - otherR * Math.sin(other.h),
            this.l - other.l
        );
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

    /**
     * Creates a random color in the specified color space.
     *
     * Note that this function does not create _perceptually uniform_ colors. For that purpose use Oklab.
     *
     * @param colorSpace The color space of the color.
     * @returns A new random color.
     */
    static random<S extends RGBColorSpace>(colorSpace: S): HSL<S> {
        return new HSL(
            Math.random() * Math.PI * 2,
            Math.random(),
            Math.random(),
            colorSpace
        );
    }
}