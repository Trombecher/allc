import {withAlpha, WithAlpha} from "@/index";
import {HSV} from "@/hsv";
import {HSL} from "@/hsl";

export * from "./hex";
export * from "./number";

export type RGBColorSpace = "srgb";

/**
 * An RGB color. All components in the range [0, 1].
 */
// @ts-ignore
export type RGB<ColorSpace extends RGBColorSpace = "srgb"> = {
    r: number,
    g: number,
    b: number,
};

/**
 * Creates a new {@link RGB} color.
 */
export const rgb = <ColorSpace extends RGBColorSpace>(r: number, g: number, b: number): RGB<ColorSpace> => ({r, g, b});

/**
 * Shorthand for `withAlpha(rgb(r, g, b), a)`.
 */
export const rgba = <CS extends RGBColorSpace>(r: number, g: number, b: number, a: number): WithAlpha<RGB<CS>> => withAlpha(rgb(r, g, b), a);

export const toRGBFromRGBNumber = <ColorSpace extends RGBColorSpace>(rgbNumber: number): RGB<ColorSpace> => rgb(
    (rgbNumber >> 16) / 255,
    ((rgbNumber >> 8) & 255) / 255,
    (rgbNumber & 255) / 255,
);

/**
 * Creates a random {@link RGB} color from `Math.random()`.
 */
export const randomRGB = <ColorSpace extends RGBColorSpace>(): RGB<ColorSpace> =>
    rgb(Math.random(), Math.random(), Math.random());

/**
 * Conversion based off https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative.
 */
export const toRGBFromHSL = <ColorSpace extends RGBColorSpace>({
                                                                   h,
                                                                   s,
                                                                   l,
                                                               }: Readonly<HSL<ColorSpace>>): RGB<ColorSpace> => {
    const a = s * Math.min(l, 1 - l),
        f = (n: number) => {
            const k = (n + h / 30) % 12;
            return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
        };
    return rgb(f(0), f(8), f(4));
};

/**
 * Conversion based off https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative.
 */
export const toRGBFromHSV = <ColorSpace extends RGBColorSpace>({
                                                                   h,
                                                                   s,
                                                                   v,
                                                               }: Readonly<HSV<ColorSpace>>): RGB<ColorSpace> => {
    const f = (n: number) => {
        const k = (n + h / 60) % 6;
        return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
    };
    return rgb(f(5), f(3), f(1));
};