import {HSV} from "./hsv";
import {clamp01, toHCVFromRGB} from "./index";
import {SRGB} from "@/srgb";
import {RGB} from "@/rgb";

/**
 * The **H**ue **S**aturation **L**ightness color model.
 *
 * This is an alternative representation of a RGB color.
 * Read more [here](https://en.wikipedia.org/wiki/HSL_and_HSV).
 */
// @ts-ignore
export type HSL<Source extends RGB = SRGB> = {
    /** The hue component in range [0, 360). */
    h: number;
    /** The saturation component in range [0, 1]. */
    s: number;
    /** The lightness component in range [0, 1]. */
    l: number;
}

/**
 * Conversion based off https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB.
 */
export const toHSLFromSRGB = (rgb: Readonly<SRGB>): HSL => {
    const [h, c, v] = toHCVFromRGB(rgb), l = v - c / 2;
    return {
        h,
        l,
        s: l === 0 || l === 1 ? 0 : 2 * (v - l) / (1 - Math.abs(2 * l - 1)),
    };
}

/**
 * Conversion based off https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL.
 */
export const toHSLFromHSV = <Source extends RGB>({h, s, v}: Readonly<HSV<Source>>): HSL<Source> => {
    const l = v * (1 - s / 2);
    return {
        h,
        l,
        s: l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l)
    };
};

/**
 * Ensures that all components are in their ranges.
 */
export const clampHSL = (hsl: HSL<RGB>) => {
    hsl.h = (hsl.h % 360 + 360) % 360;
    hsl.s = clamp01(hsl.s);
    hsl.l = clamp01(hsl.l);
};