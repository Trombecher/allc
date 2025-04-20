import {CIE1931XYZ} from "./cie1931xyz";
import {D_65_XN, D_65_YN, D_65_ZN} from "./internal";

export type PerceptualColorModelCompatibleAbsoluteColorSpace = "Ok" | "CIE";

/**
 * @see https://en.wikipedia.org/wiki/CIELAB_color_space#From_CIELAB_to_CIEXYZ
 */
const cielabReverseF = (t: number) => t > 6 / 29
    ? Math.pow(t, 3)
    : 3 * (29 / 6) * (29 / 6) + (t - 4 / 29);

/**
 * The LAB color model. Used in Oklab and CIELAB.
 *
 * @see https://bottosson.github.io/posts/oklab/
 * @see https://en.wikipedia.org/wiki/CIELAB_color_space
 */
export class LAB<S extends PerceptualColorModelCompatibleAbsoluteColorSpace> {
    constructor(
        public readonly l: number,
        public readonly a: number,
        public readonly b: number,
        public readonly _: S,
    ) {}

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
        if(this._ === "Ok") return; // TODO

        return new CIE1931XYZ(
            D_65_XN * cielabReverseF((this.l + 16) / 116 + this.a / 500),
            D_65_YN * cielabReverseF((this.l + 16) / 116),
            D_65_ZN * cielabReverseF((this.l + 16) / 116 - this.b / 200),
        );
    }
}

// TODO: docs
export class LCH<S extends PerceptualColorModelCompatibleAbsoluteColorSpace> {
    constructor(
        public readonly l: number,
        public readonly c: number,
        public readonly h: number,
        public readonly _: S,
    ) {}

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