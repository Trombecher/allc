import {RGB} from "./rgb";
import {CIE1931XYZ} from "./cie1931xyz.js";
import {IsAlpha, MaybeTagged, MaybeWithAlpha, Tagged, WithAlpha} from "./index";

export function toSRGBFromCIE1931XYZ(xyz: Readonly<CIE1931XYZ>): RGB;
export function toSRGBFromCIE1931XYZ(xyz: Readonly<Tagged<CIE1931XYZ>>): Tagged<RGB>;
export function toSRGBFromCIE1931XYZ(xyz: Readonly<WithAlpha<CIE1931XYZ>>): WithAlpha<RGB>;
export function toSRGBFromCIE1931XYZ(xyz: Readonly<Tagged<WithAlpha<CIE1931XYZ>>>): Tagged<WithAlpha<RGB>>;