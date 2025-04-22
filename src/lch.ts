import {Color, RGBColorSpace} from "./index";
import {clamp01} from "./internal";
import {LAB, PerceptualColorSpace} from "./lab";

/**
 * The cylindrical representation of a LAB color.
 */
export class LCH<S extends PerceptualColorSpace> implements Color<LCH<S>> {
    constructor(
        /**
         * The (perceived) lightness component, range [0, 1]. This is unchanged compared to LAB.
         */
        public readonly l: number,
        /**
         * The chroma component, minimum 0, maximum unbounded but usually 0.4.
         */
        public readonly c: number,
        /**
         * The hue component, in radians.
         */
        public readonly h: number,
        /**
         * The color space.
         */
        public readonly _: S,
    ) {
    }

    isBounded(): boolean {
        return 0 <= this.l && this.l <= 1 && 0 <= this.c;
    }

    distance(other: LCH<S>) {
        // Convert to LAB and then calculate Euclidean distance.
        return Math.hypot(
            this.l - other.l,
            this.c * Math.cos(this.h) - other.c * Math.cos(other.h),
            this.c * Math.sin(this.h) - other.c * Math.sin(other.h),
        )
    }

    clamp(): LCH<S> {
        return new LCH(
            clamp01(this.l),
            Math.max(0, this.c),
            this.h,
            this._,
        );
    }

    toCSS(withAlpha?: number): string {
        return `${this._ === "Ok" ? "ok" : ""}lch(${this.l} ${this.c} ${this.h}rad${withAlpha !== undefined ? `/${withAlpha}` : ""})`;
    }

    /**
     * Converts this color to {@link LAB `LAB`}. The conversion is the same for both Oklab and CIELAB.
     *
     * @see https://bottosson.github.io/posts/oklab/#the-oklab-color-space
     */
    toLAB(): LAB<S> {
        return new LAB(
            this.l,
            this.c * Math.cos(this.h),
            this.c * Math.sin(this.h),
            this._,
        );
    }

    // TODO: docs
    static random<S extends PerceptualColorSpace>(colorSpace: S): LCH<S> {
        return new LCH(
            Math.random(),
            -Math.log(1 - Math.random()),
            Math.random() * Math.PI * 2,
            colorSpace
        );
    }

    /**
     * Calculates the maximum possible chroma value in the specified target color space
     * for a specified lightness and hue.
     */
    static maxChromaIn(
        targetColorSpace: RGBColorSpace,
        lightness: number,
        hue: number,
        perceptual: PerceptualColorSpace,
    ): number {
        let min = 0, max = 1;

        // Magic number
        while((max - min) > 0.0001) {
            const mid = (min + max) / 2;

            if(new LCH(lightness, mid, hue, perceptual)
                .toLAB()
                .toCIE1931XYZ()
                .toLinearRGB(targetColorSpace)
                .toRGB()
                .isBounded()) {
                min = mid;
            } else {
                max = mid;
            }
        }

        return min;
    }
}