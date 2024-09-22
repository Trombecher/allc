import {HSL} from "./hsl";
import {clamp01, toHCVFromRGB} from "./index";
import {RGB, RGBColorSpace} from "@/rgb";

/**
 * The **H**ue **S**aturation **V**alue color model.
 *
 * This is an alternative representation of an RGB color.
 * Read more [here](https://en.wikipedia.org/wiki/HSL_and_HSV).
 */
// @ts-ignore
export type HSV<ColorSpace extends RGBColorSpace = "srgb"> = {
    /** The hue component in range [0, 360) */
    h: number;
    /** The saturation component in range [0; 1] */
    s: number;
    /** The value component in range [0; 1] */
    v: number;
};

/**
 * Creates a new {@link HSV} color.
 */
export const hsv = <CS extends RGBColorSpace = "srgb">(h: number, s: number, v: number): HSV<CS> => ({h, s, v});

/**
 * Conversion based off https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_HSV.
 */
export const toHSVFromHSL = <ColorSpace extends RGBColorSpace>({h, s, l}: Readonly<HSL<ColorSpace>>): HSV<ColorSpace> => {
    const v = l + s * Math.min(l, 1 - l);
    return hsv(h, v, v === 0 ? 0 : 2 * (1 - l / v));
};

/**
 * Conversion based off https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB.
 */
export const toHSVFromRGB = <ColorSpace extends RGBColorSpace>(rgb: Readonly<RGB<ColorSpace>>): HSV<ColorSpace> => {
    const [h, c, v] = toHCVFromRGB(rgb);
    return hsv(h, v === 0 ? 0 : c / v, v);
};

/**
 * Ensures that all components are in their ranges.
 */
export const clampHSV = (hsv: HSV) => {
    hsv.h = (hsv.h % 360 + 360) % 360;
    hsv.s = clamp01(hsv.s);
    hsv.v = clamp01(hsv.v);
};