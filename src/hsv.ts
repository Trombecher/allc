import {HSL} from "./hsl";
import {RGB} from "./rgb";
import {clamp01, toHCVFromRGB} from "./index";

/**
 * A representation of the [HSV color model](https://en.wikipedia.org/wiki/HSL_and_HSV).
 */
export type HSV = {
    /** The hue component in range [0, 360) */
    h: number;
    /** The saturation component in range [0; 1] */
    s: number;
    /** The value component in range [0; 1] */
    v: number;
}

/**
 * Converts {@link HSL} to {@link HSV}.
 *
 * Based on https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_HSV.
 */
export function toHSVFromHSL({h, s, l}: Readonly<HSL>): HSV {
    const v = l + s * Math.min(l, 1 - l);
    return {
        h,
        v,
        s: v === 0 ? 0 : 2 * (1 - l / v)
    };
}

/**
 * Converts {@link RGB} to {@link HSV}.
 *
 * Based on https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB.
 */
export function toHSVFromRGB(rgb: RGB): HSV {
    const [h, c, v] = toHCVFromRGB(rgb);
    return {
        h,
        s: v === 0 ? 0 : c / v,
        v
    };
}

/**
 * Creates a random {@link HSV} color.
 *
 * This is not a uniform distribution due to
 * [the HSV color model](https://en.wikipedia.org/wiki/HSL_and_HSV#Basic_principle);
 * darker colors are less dense and therefore more likely.
 * If you want a uniform distribution, use {@link randomRGB}
 * and {@link toHSVFromRGB} to convert to {@link HSV}.
 */
export function randomHSV(): HSV {
    return {
        h: Math.random(),
        s: Math.random(),
        v: Math.random(),
    }
}

/**
 * Ensures that all components are in their ranges.
 */
export function clampHSV(hsv: HSV) {
    hsv.h = (hsv.h % 360 + 360) % 360;
    hsv.s = clamp01(hsv.s);
    hsv.v = clamp01(hsv.v);
}