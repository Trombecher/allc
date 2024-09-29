import {CIE1931XYZ} from "./cie1931xyz";
import {HSV} from "./hsv";
import {HSL} from "./hsl";
import {RGB} from "./rgb";

/**
 * An untagged enum of all colors this package is providing.
 */
export type Color = RGB | HSL | HSV | CIE1931XYZ;

/**
 * Any color object you could possibly get.
 */
export type AnyColor = MaybeTagged<MaybeWithAlpha<Color>>;

/**
 * Infers the color space of a color type.
 */
export type ColorSpace<C extends Color = Color> = C extends RGB<infer CS>
    ? CS
    : C extends HSL<infer CS>
        ? CS
        : C extends HSV<infer CS>
            ? CS
            : CIE1931XYZ;

/**
 * Adds an alpha field to the target color (modifies).
 *
 * @returns the parameter `color`.
 */
export function withAlpha<C extends AnyColor>(
    color: C,
    alpha: number
): WithAlpha<C>;

/**
 * Represents a color that has an alpha value.
 */
export type WithAlpha<C extends Color> = {
    a: number,
} & C;

/**
 * Tags (modifies) the target color.
 *
 * @returns the parameter `color`.
 */
export function tag<C extends AnyColor>(
    color: C,
    colorSpace: ColorSpace<C>,
): Tagged<C>;

/**
 * Tags a color with its color space string using {@link ColorSpace}.
 */
export type Tagged<C extends Color> = {
    _: ColorSpace<C>,
} & C;

/**
 * Clamps the given number `x` be equal to or in between zero and one.
 */
export function clamp01(x: number): number;

/**
 * Modifies the input color so that all components are clamped between zero and one (in their ranges).
 *
 * @returns the input color
 */
export function clampColor<C extends AnyColor>(color: C): void;

/**
 * Interpolates linearly between parameters `a` and `b`
 * via an interpolation value `t` in range [0, 1].
 */
export function lerp(a: number, b: number, t: number): number;

/**
 * Interpolates linearly between colors `a` and `b`
 * via an interpolation value `t` in range [0, 1].
 */
export function lerpColor<C extends AnyColor>(a: Readonly<C>, b: Readonly<C>, t: number): C;