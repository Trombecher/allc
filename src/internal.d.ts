import {RGB, RGBColorSpace} from "./rgb";
import {ColorSpace} from "./index";

export type Matrix3X3 = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
];

export function applyMatrix3X3(
    x: number,
    y: number,
    z: number,
    matrix: Matrix3X3
): [number, number, number];

export function mathMin(...values: number[]): number;
export function mathMax(...values: number[]): number;
export function mathRandom(): number;

/**
 * Calculates hue, chroma and value of the given {@link RGB} color.
 *
 * This function returns a tuple because this is rather an internal function,
 * but part of the public API for convenience.
 */
export function toHCVFromRGB<CS extends RGBColorSpace>(
    rgb: Readonly<RGB<CS>>
): [
    number, // H
    number, // C
    number, // L
];

export function conditionalAssign<O extends Object>(
    target: O,
    alpha: number | undefined,
    tag: ColorSpace | undefined
) : O & {
    a?: number,
    _?: ColorSpace
};