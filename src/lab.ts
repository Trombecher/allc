import {CIE1931XYZ} from "./cie1931xyz";
import {
    clamp01,
    D_65_XN,
    D_65_YN,
    D_65_ZN,
    Matrix3x3,
    matrixTimesVector,
} from "./internal";
import {Color, RGBColorSpace} from "./index";
import {LCH} from "./lch";

/**
 * Oklab or CIELAB.
 */
export type PerceptualColorSpace = "Ok" | "CIE";

/**
 * @see https://en.wikipedia.org/wiki/CIELAB_color_space#From_CIELAB_to_CIEXYZ
 */
const cielabReverseF = (t: number) => t > 6 / 29
    ? Math.pow(t, 3)
    : 3 * (29 / 6) * (29 / 6) + (t - 4 / 29);

/**
 * @see https://www.emathhelp.net/calculators/linear-algebra/inverse-of-matrix-calculator/?i=%5B%5B0.2104542553%2C0.7936177850%2C-0.0040720468%5D%2C%5B1.9779984951%2C-2.4285922050%2C0.4505937099%5D%2C%5B0.0259040371%2C0.7827717662%E2%80%8B%E2%80%8B%2C-0.8086757660%E2%80%8B%E2%80%8B%E2%80%8B%5D%5D&m=g
 */
const M_OKLAB_TO_LMS_DASH: Matrix3x3 = [
    +0.999999998450520, +0.396337792173768, +0.215803758060759,
    +1.000000008881761, -0.105561342323656, -0.063854174771706,
    +1.000000054672411, -0.089484182094966, -1.291485537864092,
];

/**
 * @see https://www.emathhelp.net/calculators/linear-algebra/inverse-of-matrix-calculator/?i=%5B%5B0.8189330101%2C0.3618667424%2C-0.1288597137%5D%2C%5B0.0329845436%2C0.9293118715%2C-0.0361456387%5D%2C%5B0.0482003018%2C0.2643662691%2C0.6338517070%5D%5D&m=g
 */
const M_LMS_TO_CIE_1931_XYZ: Matrix3x3 = [
    +1.227013851103521, -0.557799980651822, +0.281256148966468,
    -0.040580178423281, +1.112256869616830, -0.071676678665601,
    -0.076381284505707, -0.421481978418013, +1.586163220440795,
];

/**
 * The LAB color model. Used in Oklab and CIELAB.
 *
 * @see https://bottosson.github.io/posts/oklab/
 * @see https://en.wikipedia.org/wiki/CIELAB_color_space
 */
export class LAB<S extends PerceptualColorSpace> implements Color<LAB<S>> {
    constructor(
        /**
         * The (perceived) lightness component, range [0, 1].
         */
        public readonly l: number,
        /**
         * The `a` component (how green/red the color is), unbounded.
         */
        public readonly a: number,
        /**
         * The `b` component (how blue/yellow the color is), unbounded.
         */
        public readonly b: number,
        /**
         * The color space.
         */
        public readonly _: S,
    ) {
    }

    isBounded(): boolean {
        return 0 <= this.l && this.l <= 1;
    }

    distance(other: LAB<S>) {
        return Math.hypot(
            this.l - other.l,
            this.a - other.a,
            this.b - other.b,
        );
    }

    clamp(): LAB<S> {
        return new LAB(
            clamp01(this.l),
            this.a,
            this.b,
            this._,
        );
    }

    toCSS(withAlpha?: number): string {
        return `${this._ === "Ok" ? "ok" : ""}lab(${this.l} ${this.a} ${this.b}${withAlpha !== undefined ? `/${withAlpha}` : ""})`;
    }

    /**
     * Converts the color to {@link LCH `LCH`}.
     * The conversion is the same for both Oklab and CIELAB.
     *
     * @see https://bottosson.github.io/posts/oklab/#the-oklab-color-space
     */
    toLCH(): LCH<S> {
        return new LCH(
            this.l,
            Math.hypot(this.a, this.b),
            Math.atan2(this.b, this.a),
            this._,
        );
    }

    /**
     * Converts the current color to {@link CIE1931XYZ `CIE1931XYZ`}.
     * The conversion is different for Oklab and CIELAB.
     *
     * * For Oklab the matrices were inverted: https://bottosson.github.io/posts/oklab/#converting-from-xyz-to-oklab
     * * For CIELAB: https://en.wikipedia.org/wiki/CIELAB_color_space#From_CIELAB_to_CIEXYZ
     */
    toCIE1931XYZ(): CIE1931XYZ {
        if(this._ === "Ok") {
            const lms = matrixTimesVector(M_OKLAB_TO_LMS_DASH, [this.l, this.a, this.b]);

            for(let i = 0; i < 3; i++)
                lms[i] = Math.pow(lms[i]!, 3);

            return new CIE1931XYZ(...matrixTimesVector(M_LMS_TO_CIE_1931_XYZ, lms));
        }

        return new CIE1931XYZ(
            D_65_XN * cielabReverseF((this.l + 16) / 116 + this.a / 500),
            D_65_YN * cielabReverseF((this.l + 16) / 116),
            D_65_ZN * cielabReverseF((this.l + 16) / 116 - this.b / 200),
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
        while((max - min) > 0.00001) {
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