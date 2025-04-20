import {Matrix3x3, matrixTimesVector} from "./internal";
import {CIE1931XYZ} from "./cie1931xyz";
import {EngineeringColorModelCompatibleAbsoluteColorSpace, RGB} from "./rgb";

const UNLINEARIZE_MAP: Record<EngineeringColorModelCompatibleAbsoluteColorSpace, (x: number) => number> = {
    "sRGB": x => x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055,
    "Display P3": x => x,
    "Adobe RGB": x => x,
    "Adobe Wide Gamut RGB": x => x,
};

const M_LINEAR_TO_CIE_1931_XYZ = [
    0.4124, 0.3576, 0.1805,
    0.2126, 0.7152, 0.0722,
    0.0193, 0.1192, 0.9505,
] as Matrix3x3;

export class LinearRGB<S extends EngineeringColorModelCompatibleAbsoluteColorSpace> {
    constructor(
        public readonly r: number,
        public readonly g: number,
        public readonly b: number,
        public readonly _: S,
    ) {
    }

    toCIE1931XYZ(): CIE1931XYZ {
        return new CIE1931XYZ(...matrixTimesVector(M_LINEAR_TO_CIE_1931_XYZ, [this.r, this.g, this.b]));
    }

    toRGB(): RGB<S> {
        const unlinerize = UNLINEARIZE_MAP[this._];

        return new RGB(
            unlinerize(this.r),
            unlinerize(this.g),
            unlinerize(this.b),
            this._,
        );
    }
}