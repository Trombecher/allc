import {RGB} from "./rgb";
import {clamp01} from "./index";

/**
 * A representation of the [CMYK color model](https://en.wikipedia.org/wiki/CMYK_color_model).
 */
export type CMYK = {
    /** The cyan component in range [0, 1]. */
    c: number;
    /** The magenta component in range [0, 1]. */
    m: number;
    /** The yellow component in range [0, 1]. */
    y: number;
    /** The key (black) component in range [0, 1]. */
    k: number;
};

/**
 * Converts {@link RGB} to {@link CMYK}.
 *
 * Based on https://www.rapidtables.com/convert/color/rgb-to-cmyk.html.
 */
export function toCMYKFromRGB({r, g, b}: Readonly<RGB>): CMYK {
    const k = 1 - Math.max(r, g, b);
    return {
        c: (1 - r - k) / (1 - k),
        m: (1 - g - k) / (1 - k),
        y: (1 - b - k) / (1 - k),
        k,
    };
}

/**
 * Ensures that all components are in their ranges.
 */
export function clampCMYK(cmyk: CMYK) {
    cmyk.c = clamp01(cmyk.c);
    cmyk.m = clamp01(cmyk.m);
    cmyk.y = clamp01(cmyk.y);
    cmyk.k = clamp01(cmyk.k);
}