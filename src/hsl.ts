import {RGB} from "./rgb";
import {HSV} from "./hsv";
import {clamp01, toHCVFromRGB} from "./index";

/**
 * A representation of the [HSL color model](https://en.wikipedia.org/wiki/HSL_and_HSV).
 */
export type HSL = {
    /** The hue component in range [0, 360). */
    h: number;
    /** The saturation component in range [0, 1]. */
    s: number;
    /** The lightness component in range [0, 1]. */
    l: number;
}

/**
 * Converts {@link RGB} to {@link HSL}.
 *
 * Based on https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB.
 */
export function toHSLFromRGB(rgb: Readonly<RGB>): HSL {
    const [h, c, v] = toHCVFromRGB(rgb),
        l = v - c / 2;
    return {
        h,
        l,
        s: l === 0 || l === 1 ? 0 : 2 * (v - l) / (1 - Math.abs(2 * l - 1)),
    }
}

/**
 * Converts {@link HSL} to {@link HSV}.
 *
 * Based on https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL.
 */
export function toHSLFromHSV({h, s, v}: Readonly<HSV>): HSL {
    const l = v * (1 - s / 2);
    return {
        h,
        l,
        s: l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l)
    }
}

/**
 * Creates a random {@link HSL} color.
 *
 * This is not a uniform distribution due to
 * [the HSL color model](https://en.wikipedia.org/wiki/HSL_and_HSV#Basic_principle);
 * lighter and darker colors are less dense and therefore more likely.
 * If you want a uniform distribution, use {@link randomRGB}
 * and {@link toHSLFromRGB} to convert to {@link HSL}.
 */
export function randomHSL(): HSL {
    return {
        h: Math.random(),
        l: Math.random(),
        s: Math.random()
    }
}

/**
 * Ensures that all components are in their ranges.
 */
export function clampHSL(hsl: HSL) {
    hsl.h = (hsl.h % 360 + 360) % 360;
    hsl.s = clamp01(hsl.s);
    hsl.l = clamp01(hsl.l);
}