import {HSV} from "./hsv";
import {toHCVFromRGB} from "./index";
import {RGB, RGBColorSpace} from "@/rgb";

/**
 * The **H**ue **S**aturation **L**ightness color model.
 *
 * This is an alternative representation of a RGB color.
 * Read more [here](https://en.wikipedia.org/wiki/HSL_and_HSV).
 */
// @ts-ignore
export type HSL<ColorSpace extends RGBColorSpace = "srgb"> = {
    /** The hue component in range [0, 360). */
    h: number;
    /** The saturation component in range [0, 1]. */
    s: number;
    /** The lightness component in range [0, 1]. */
    l: number;
};

/**
 * Creates a new {@link HSL} color.
 */
export const hsl = <CS extends RGBColorSpace = "srgb">(h: number, s: number, l: number): HSL<CS> => ({h, s, l});

/**
 * Conversion based off https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB.
 */
export const toHSLFromRGB = <ColorSpace extends RGBColorSpace>(rgb: Readonly<RGB<ColorSpace>>): HSL<ColorSpace> => {
    const [h, c, v] = toHCVFromRGB(rgb), l = v - c / 2;
    return hsl(h, l === 0 || l === 1 ? 0 : 2 * (v - l) / (1 - Math.abs(2 * l - 1)), l);
}

/**
 * Conversion based off https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL.
 */
export const toHSLFromHSV = <ColorSpace extends RGBColorSpace>({h, s, v}: Readonly<HSV<ColorSpace>>): HSL<ColorSpace> => {
    const l = v * (1 - s / 2);
    return hsl(h, s, l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l));
};