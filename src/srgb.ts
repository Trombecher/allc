import {RGB} from "@/rgb";

export * from "./rgb/hex";
export * from "./rgb/rgb-number";

import {CIE1931XYZ} from "@/cie1931xyz";
import {applyMatrix3X3, Matrix3X3} from "@/matrix";
import {HSL} from "@/hsl";
import {HSV} from "@/hsv";
import {clamp01} from "@/index";

/**
 * A color in the sRGB color space. All components are in the range [0, 1].
 */
export type SRGB = {} & RGB;

const TO_SRGB_FROM_CIE1931XYZ_MATRIX: Readonly<Matrix3X3> = [
    3.2406,
    -1.5372,
    -.4986,
    -.9689,
    1.8758,
    .0415,
    .0557,
    -.2040,
    1.0570,
] as const;

const gammaCorrectChannel = (channel: number) => channel <= .0031308
    ? 12.92 * channel
    : 1.055 * channel ** (1 / 2.4) - .055;

export const toSRGBFromCIE1931XYZ = ({x, y, z}: CIE1931XYZ): SRGB => {
    const [lr, lg, lb] = applyMatrix3X3(x, y, z, TO_SRGB_FROM_CIE1931XYZ_MATRIX);
    return {
        r: gammaCorrectChannel(lr),
        g: gammaCorrectChannel(lg),
        b: gammaCorrectChannel(lb)
    };
}

export function toSRGBFromSRGBNumber(rgbNumber: number): SRGB {
    return {
        r: (rgbNumber >> 16) / 255,
        g: ((rgbNumber >> 8) & 255) / 255,
        b: (rgbNumber & 255) / 255
    };
}

/**
 * Creates a random {@link SRGB} color from `Math.random()`.
 */
export function randomSRGB(): SRGB {
    return {
        r: Math.random(),
        g: Math.random(),
        b: Math.random()
    };
}

/**
 * Conversion based off https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative.
 */
export function toSRGBFromHSL({h, s, l}: Readonly<HSL<SRGB>>): SRGB {
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
 * Conversion based off https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative.
 */
export function toSRGBFromHSV({h, s, v}: Readonly<HSV<SRGB>>): SRGB {
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
 * Ensures that all components are clamped between zero and one (in their ranges).
 */
export function clampSRGB(rgb: SRGB) {
    rgb.r = clamp01(rgb.r);
    rgb.g = clamp01(rgb.g);
    rgb.b = clamp01(rgb.b);
}