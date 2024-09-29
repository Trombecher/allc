import {RGB} from "./rgb";
import {CIE1931XYZ} from "./cie1931xyz.js";
import {IsAlpha, MaybeTagged, MaybeWithAlpha} from "./index";

export function toSRGBFromCIE1931XYZ<C extends MaybeWithAlpha<MaybeTagged<CIE1931XYZ>>>(
    xyz: Readonly<C>
): IsAlpha<any>;