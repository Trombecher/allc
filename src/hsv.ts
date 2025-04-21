import {RGBColorSpace, RGB} from "./rgb";
import {HSL} from "./hsl";
import {clamp01} from "./internal";

/**
 * Represents a color in the HSV (Hue, Saturation, Value / Brightness) color model.
 *
 * The hue component `h` is in radians. The saturation and value components `s` and `v` are in the range [0, 1].
 *
 * @template S The underlying color space.
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV
 */
export class HSV<S extends RGBColorSpace> {
    constructor(
        public readonly h: number,
        public readonly s: number,
        public readonly v: number,
        public readonly _: S,
    ) {
    }

    /**
     * Clamps all components to [0, 1].
     *
     * @returns A new HSV instance with the components clamped to the range [0, 1].
     */
    clamp(): HSV<S> {
        return new HSV(
            clamp01(this.h),
            clamp01(this.s),
            clamp01(this.v),
            this._
        )
    }

    /**
     * Converts the current color to {@link RGB `RGB`}.
     *
     * @returns An instance of the RGB class representing the color in RGB format.
     * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative
     */
    toRGB(): RGB<S> {
        const f = (n: number) => {
            const k = (n + this.h * 3 / Math.PI) % 6;
            return this.v - this.v * this.s + Math.max(0, Math.min(k, 4 - k, 1));
        };

        return new RGB(
            f(5),
            f(3),
            f(1),
            this._,
        );
    }

    /**
     * Converts the current color to {@link HSL `HSL`}.
     *
     * @returns An instance of the HSL class representing the color in HSL format.
     * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL
     */
    toHSL(): HSL<S> {
        const l = this.v * (1 - this.s / 2);

        return new HSL(
            this.h,
            (l === 0 || l === 1) ? 0 : (this.v - l) / Math.min(l, 1 - l),
            l,
            this._,
        );
    }
}