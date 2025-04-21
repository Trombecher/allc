import {CIE1931XYZ} from "./cie1931xyz";
import {
    clamp01,
    D_65_XN,
    D_65_YN,
    D_65_ZN,
    Matrix3x3,
    matrixTimesVector,
    sharedDistanceImplementation,
} from "./internal";
import {Color} from "./index";
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
    +0.9999999984505198, +0.3963377921737679, +0.2158037580607588,
    +1.0000000088817607, -0.10556134232365635, -0.06385417477170591,
    +1.0000000546724108, -0.08948418209496575, -1.2914855378640917,
];

/**
 * @see https://www.emathhelp.net/calculators/linear-algebra/inverse-of-matrix-calculator/?i=%5B%5B0.8189330101%2C0.3618667424%2C-0.1288597137%5D%2C%5B0.0329845436%2C0.9293118715%2C-0.0361456387%5D%2C%5B0.0482003018%2C0.2643662691%2C0.6338517070%5D%5D&m=g
 */
const M_LMS_TO_CIE_1931_XYZ: Matrix3x3 = [
    +1.2300027843910823, -0.5413066534768036, +0.2191868072453721,
    -0.046540131268799995, +1.0793690655838948, +0.05209000135688532,
    -0.0741228019687791, -0.40901937460024457, +1.5392627008008688,
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

    distance(other: LAB<S>) {
        return sharedDistanceImplementation(this, other);
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
}