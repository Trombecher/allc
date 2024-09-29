import {RGB, RGBColorSpace} from "./rgb";
import {HSV} from "./hsv.js";

/**
 * The **H**ue **S**aturation **L**ightness color model.
 *
 * This is an alternative representation of a RGB color.
 * Read more [here](https://en.wikipedia.org/wiki/HSL_and_HSV).
 */
export type HSL<ColorSpace extends RGBColorSpace = "srgb"> = {
    /** The hue component in range [0, 360). */
    h: number;
    /** The saturation component in range [0, 1]. */
    s: number;
    /** The lightness component in range [0, 1]. */
    l: number;
};

/**
 * Conversion based off https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB.
 */
export function toHSLFromRGB<CS extends RGBColorSpace>(
    rgb: Readonly<RGB<CS>>
): HSL<CS>;

/**
 * Conversion based off https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL.
 */
export function toHSLFromHSV<CS extends RGBColorSpace>(
    hsv: Readonly<HSV<CS>>
): HSL<CS>;