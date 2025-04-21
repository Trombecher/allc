import {CIE1931XYZ} from "./cie1931xyz";
import {clamp01, D_65_XN, D_65_YN, D_65_ZN, Matrix3x3, matrixTimesVector} from "./internal";
import {Color} from "./common";

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

// TODO: docs
const M_OKLAB_TO_LMS_DASH: Matrix3x3 = [ // TODO: check values
    +0.4122214708, +0.5363325363, +0.0514459929,
    +0.2119034982, +0.6806995451, +0.1073969566,
    +0.0883024619, +0.2817188376, +0.6299787005,
];

// TODO: docs
const M_LMS_TO_CIE_1931_XYZ: Matrix3x3 = [ // TODO: check values
    +0.955576671, -0.0230393101, +0.0631636364,
    +0.0282895228, +1.009941694, -0.0210077094,
    -0.0146146987, -0.0240030322, +1.019297077,
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
    ) {}

    clamp(): LAB<S> {
        return new LAB(
            clamp01(this.l),
            this.a,
            this.b,
            this._
        );
    }

    toCSS(withAlpha?: number): string {
        return `${this._ === "Ok" ? "ok" : ""}lab(${this.l} ${this.a} ${this.b}${withAlpha !== undefined ? `/${withAlpha}` : ""})`;
    }

    // TODO: docs
    toLCH(): LCH<S> {
        return new LCH(
            this.l,
            Math.hypot(this.a, this.b),
            Math.atan2(this.b, this.a),
            this._
        );
    }

    // TODO: docs
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
    ) {}

    clamp(): LCH<S> {
        return new LCH(
            clamp01(this.l),
            Math.max(0, this.c),
            this.h,
            this._
        );
    }

    toCSS(withAlpha?: number): string {
        return `${this._ === "Ok" ? "ok" : ""}lch(${this.l} ${this.c} ${this.h}rad${withAlpha !== undefined ? `/${withAlpha}` : ""})`;
    }

    // TODO: docs
    toLAB(): LAB<S> {
        return new LAB(
            this.l,
            this.c * Math.cos(this.h),
            this.c * Math.sin(this.h),
            this._
        );
    }
}