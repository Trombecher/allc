import {CIE1931XYZ, Color} from "./index";
import {clamp01} from "./internal";

/**
 * Represents a color in the CIE 1931 xyY color space.
 *
 * @see https://en.wikipedia.org/wiki/CIE_1931_color_space#CIE_xyY_color_space
 */
export class CIE1931xyY implements Color<CIE1931xyY> {
    constructor(
        /**
         * The x component, range [0, 1].
         */
        public readonly x: number,
        /**
         * The y component, range [0, 1].
         */
        public readonly y: number,
        /**
         * The Y component (luminance), range [0, 1].
         */
        public readonly Y: number,
    ) {
    }

    isBounded(): boolean {
        return this.x >= 0 && this.x <= 1
            && this.y >= 0 && this.y <= 1
            && this.Y >= 0 && this.Y <= 1;
    }

    clamp(): CIE1931xyY {
        return new CIE1931xyY(
            clamp01(this.x),
            clamp01(this.y),
            clamp01(this.Y)
        )
    }

    distance(other: CIE1931xyY): number {
        return Math.hypot(
            this.x - other.x,
            this.y - other.y,
            this.Y - other.Y,
        );
    }

    toCSS(withAlpha?: number): string {
        return this.toCIE1931XYZ().toCSS(withAlpha);
    }

    /**
     * Converts this color to {@link CIE1931XYZ `CIE1931XYZ`}.
     *
     * @see https://en.wikipedia.org/wiki/CIE_1931_color_space#CIE_xyY_color_space
     */
    toCIE1931XYZ(): CIE1931XYZ {
        return new CIE1931XYZ(
            this.x * this.Y / this.y,
            this.Y,
            (1 - this.x - this.y) * this.Y / this.y
        );
    }
}