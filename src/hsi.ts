import {RGB, RGBColorSpace} from "./rgb";
import {Color} from "./index";
import {clamp01} from "./internal";

/**
 * A color in the HSI (hue, saturation, intensity) color model.
 *
 * @template S The underlying color space.
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#Lightness
 */
export class HSI<S extends RGBColorSpace> implements Color<HSI<S>> {
    constructor(
        /**
         * The hue component, in radians.
         */
        public readonly h: number,
        /**
         * The saturation component, range [0, 1].
         */
        public readonly s: number,
        /**
         * The intensity component, range [0, 1].
         */
        public readonly i: number,
        /**
         * The color space.
         */
        public readonly _: S,
    ) {
    }

    clamp(): HSI<S> {
        // No need for a copy if it is already bounded.
        if(this.isBounded()) return this;

        return new HSI(
            this.h,
            clamp01(this.s),
            clamp01(this.i),
            this._,
        );
    }

    toCSS(withAlpha?: number): string {
        return this.toRGB().toCSS(withAlpha);
    }

    distance(other: HSI<S>): number {
        // Convert to 3D space and calculate Euclidean distance.
        return Math.hypot(
            other.i - this.i,
            Math.cos(other.h) * other.s - Math.cos(this.h) * this.s,
            Math.sin(other.h) * other.s - Math.sin(this.h) * this.s,
        );
    }

    isBounded(): boolean {
        return 0 <= this.s && this.s <= 1
            && 0 <= this.i && this.i <= 1;
    }

    /**
     * Converts the current color to {@link RGB `RGB`}.
     *
     * @returns An instance of the RGB class representing the color in RGB format.
     * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSI_to_RGB
     */
    toRGB(): RGB<S> {
        const hPrime = (this.h * 3 / Math.PI) % 6;
        const z = 1 - Math.abs(hPrime % 2 - 1);
        const c = 3 * this.i * this.s / (1 + z);
        const x = c * z;
        const m = this.i * (1 - this.s);

        switch(hPrime | 0) {
            case 0: return new RGB(c + m, x + m, m, this._);
            case 1: return new RGB(x + m, c + m, m, this._);
            case 2: return new RGB(m, c + m, x + m, this._);
            case 3: return new RGB(m, x + m, c + m, this._);
            case 4: return new RGB(x + m, m, c + m, this._);
        }

        return new RGB(c + m, m, x + m, this._);
    }
}