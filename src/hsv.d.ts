import {RGB, RGBColorSpace} from "./rgb";
import {HSL} from "./hsl";
import {Tagged, WithAlpha} from "./index";

/**
 * The **H**ue **S**aturation **V**alue color model.
 *
 * This is an alternative representation of an RGB color.
 * Read more [here](https://en.wikipedia.org/wiki/HSL_and_HSV).
 */
export type HSV<CS extends RGBColorSpace = "srgb"> = {
    /** The hue component in range [0, 360) */
    h: number;
    /** The saturation component in range [0; 1] */
    s: number;
    /** The value component in range [0; 1] */
    v: number;
};

/**
 * Conversion based off https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_HSV.
 */
export function toHSVFromHSL<CS extends RGBColorSpace>(hsv: Readonly<HSL<CS>>): HSV<CS>;
export function toHSVFromHSL<CS extends RGBColorSpace>(hsv: Readonly<Tagged<HSL<CS>>>): Tagged<HSV<CS>>;
export function toHSVFromHSL<CS extends RGBColorSpace>(hsv: Readonly<WithAlpha<HSL<CS>>>): WithAlpha<HSV<CS>>;
export function toHSVFromHSL<CS extends RGBColorSpace>(hsv: Readonly<Tagged<WithAlpha<HSL<CS>>>>): Tagged<WithAlpha<HSV<CS>>>;

/**
 * Conversion based off https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB.
 */
export function toHSVFromRGB<CS extends RGBColorSpace>(rgb: Readonly<RGB<CS>>): HSV<CS>;
export function toHSVFromRGB<CS extends RGBColorSpace>(rgb: Readonly<Tagged<RGB<CS>>>): Tagged<HSV<CS>>;
export function toHSVFromRGB<CS extends RGBColorSpace>(rgb: Readonly<WithAlpha<RGB<CS>>>): WithAlpha<HSV<CS>>;
export function toHSVFromRGB<CS extends RGBColorSpace>(rgb: Readonly<Tagged<WithAlpha<RGB<CS>>>>): Tagged<WithAlpha<HSV<CS>>>;