export * from "./hex";
export * from "./hsv";
export * from "./hsl";
export * from "./rgb";
export * from "./rgb-number";

import {RGB} from "./rgb";

/**
 * Clamps the given number `x` be equal to or in between zero and one.
 */
export function clamp01(x: number): number {
    return Math.max(0, Math.min(x, 1));
}

/**
 * Interpolates linearly between parameters `a` and `b`
 * via an interpolation value `t` in range [0, 1].
 */
export function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

/**
 * Interpolates linearly between colors `a` and `b`
 * via an interpolation value `t` in range [0, 1].
 */
export function lerpColor<C extends Record<string, number>>(a: C, b: C, t: number): C {
    const o = {} as C;
    // @ts-ignore This is the right key.
    Object.keys(a).forEach(key => o[key] = lerp(a[key], b[key], t));
    return o;
}

/**
 * Calculates hue, chroma and value of the given {@link RGB} color.
 *
 * This function returns a tuple because this is rather an internal function,
 * but part of the public API for convenience.
 */
export function toHCVFromRGB({r, g, b}: RGB): [number, number, number] {
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
        max
    ];
}