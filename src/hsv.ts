import {HSL} from "./hsl";
import {clamp01, toHCVFromRGB} from "./index";
import {SRGB} from "@/srgb";
import {RGB} from "@/rgb";

/**
 * The **H**ue **S**aturation **V**alue color model.
 *
 * This is an alternative representation of a RGB color.
 * Read more [here](https://en.wikipedia.org/wiki/HSL_and_HSV).
 */
// @ts-ignore
export type HSV<Source extends RGB> = {
    /** The hue component in range [0, 360) */
    h: number;
    /** The saturation component in range [0; 1] */
    s: number;
    /** The value component in range [0; 1] */
    v: number;
}

/**
 * Conversion based off https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_HSV.
 */
export function toHSVFromHSL<Source extends RGB>({h, s, l}: Readonly<HSL<Source>>): HSV<Source> {
    const v = l + s * Math.min(l, 1 - l);
    return {
        h,
        v,
        s: v === 0 ? 0 : 2 * (1 - l / v)
    };
}

/**
 * Conversion based off https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB.
 */
export function toHSVFromSRGB(srgb: SRGB): HSV<SRGB> {
    const [h, c, v] = toHCVFromRGB(srgb);
    return {
        h,
        s: v === 0 ? 0 : c / v,
        v
    };
}

/**
 * Ensures that all components are in their ranges.
 */
export function clampHSV(hsv: HSV<RGB>) {
    hsv.h = (hsv.h % 360 + 360) % 360;
    hsv.s = clamp01(hsv.s);
    hsv.v = clamp01(hsv.v);
}