import {RGB} from "@/rgb";
import {CIE1931XYZ} from "@/cie1931xyz";
import {HSL} from "@/hsl";
import {HSV} from "@/hsv";

/**
 * An untagged enum of all colors this package is providing.
 */
export type Color = RGB | HSL | HSV | CIE1931XYZ;

/**
 * Any color object you could possibly get.
 */
export type AnyColor = Color | Tagged | WithAlpha | Tagged<WithAlpha>;

/**
 * Infers the color space of a color type.
 */
export type ColorSpace<C extends Color = Color> = C extends RGB<infer CS>
    ? CS
    : CIE1931XYZ;

export type WithAlpha<C extends Color = Color> = {
    a: number,
} & C;

/**
 * Tags a color with its color space string using {@link ColorSpace}.
 */
export type Tagged<C extends Color = Color> = {
    _: ColorSpace<C>,
} & Color;

/**
 * Tags (modifies) the target color.
 *
 * @returns the parameter `color`.
 */
export const tag = <C extends Color | WithAlpha>(colorSpace: ColorSpace<C>, color: C): Tagged<C> =>
    ((color as Tagged<C>)._ = colorSpace, color as Tagged<C>);

/**
 * Adds an alpha field to the target color (modifies).
 *
 * @returns the parameter `color`.
 */
export const withAlpha = <C extends Color | Tagged>(color: C, alpha: number): WithAlpha<C> =>
    ((color as WithAlpha<C>).a = alpha, color as WithAlpha<C>);

/**
 * Clamps the given number `x` be equal to or in between zero and one.
 */
export const clamp01 = (x: number): number => Math.max(0, Math.min(x, 1));

/**
 * Modifies the input color so that all components are clamped between zero and one (in their ranges).
 *
 * @returns the input color
 */
export const clampColor = <C extends AnyColor>(color: C): C => (
    ("h" in color && (color.h = color.h < 0 ? color.h % 360 + 360 : color.h % 360)),
        // @ts-ignore this works!!!
        Object.keys(color).reduce((color, key) => (key !== "_" && key !== "h" && (color[key] = clamp01(color[key])), color), color));

/**
 * Interpolates linearly between parameters `a` and `b`
 * via an interpolation value `t` in range [0, 1].
 */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Interpolates linearly between colors `a` and `b`
 * via an interpolation value `t` in range [0, 1].
 */
export const lerpColor = <C extends AnyColor>(a: C, b: C, t: number): C =>
    // @ts-ignore This works, I promise!
    Object.keys(a).reduce((resultColor, key) => (key !== "_" && (resultColor[key] = lerp(a[key], b[key], t)), resultColor), {});

/**
 * Calculates hue, chroma and value of the given {@link RGB} color.
 *
 * This function returns a tuple because this is rather an internal function,
 * but part of the public API for convenience.
 */
export const toHCVFromRGB = ({r, g, b}: Readonly<RGB>): [number, number, number] => {
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        c = max - min;
    return [
        c === 0 ? 0 : 60 * (
            max === r ? ((g - b) / c) % 6 : (
                max === g ? (b - r) / c + 2 : (r - g) / c + 4
            )
        ),
        c,
        max,
    ];
};