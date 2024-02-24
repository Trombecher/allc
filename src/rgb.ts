import {HSL} from "./hsl";
import {clamp01, HSV} from "./index";
import {CMYK} from "./cmyk";

/**
 * A representation of the [RGB color model](https://en.wikipedia.org/wiki/RGB_color_model).
 */
export type RGB = {
    /** The red component in the range [0, 1]. */
    r: number;
    /** The green component in the range [0, 1]. */
    g: number;
    /** The blue component in the range [0, 1]. */
    b: number;
}

/**
 * Converts an RGB number to {@link RGB}.
 */
export function toRGBFromRGBNumber(rgbNumber: number): RGB {
    return {
        r: (rgbNumber >> 16) / 255,
        g: ((rgbNumber >> 8) & 255) / 255,
        b: (rgbNumber & 255) / 255
    };
}

/**
 * Creates a random {@link RGB} color.
 *
 * This is a uniform distribution.
 */
export function randomRGB(): RGB {
    return {
        r: Math.random(),
        g: Math.random(),
        b: Math.random()
    };
}

/**
 * Converts {@link HSL} to {@link RGB}.
 *
 * Based on https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative.
 */
export function toRGBFromHSL({h, s, l}: Readonly<HSL>): RGB {
    const a = s * Math.min(l, 1 - l),
        f = (n: number) => {
            const k = (n + h / 30) % 12;
            return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
        };

    return {
        r: f(0),
        g: f(8),
        b: f(4),
    };
}

/**
 * Converts {@link HSV} to {@link RGB}.
 *
 * Based on https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative.
 */
export function toRGBFromHSV({h, s, v}: Readonly<HSV>): RGB {
    const f = (n: number) => {
        const k = (n + h / 60) % 6;
        return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
    };
    return {
        r: f(5),
        g: f(3),
        b: f(1)
    };
}

/**
 * Converts {@link CMYK} to {@link RGB}.
 *
 * Based on https://www.rapidtables.com/convert/color/cmyk-to-rgb.html.
 */
export function toRGBFromCMYK({c, m, y, k}: Readonly<CMYK>): RGB {
    return {
        r: (1 - c) * (1 - k),
        g: (1 - m) * (1 - k),
        b: (1 - y) * (1 - k),
    };
}

/**
 * Ensures that all components are clamped between zero and one (in their ranges).
 */
export function clampRGB(rgb: RGB) {
    rgb.r = clamp01(rgb.r);
    rgb.g = clamp01(rgb.g);
    rgb.b = clamp01(rgb.b);
}