/**
 * Clamps the given number `x` be equal to or in between zero and one.
 */
export const clamp01 = (x: number): number => Math.max(0, Math.min(x, 1));

/**
 * Interpolates linearly between parameters `a` and `b`
 * via an interpolation value `t` in range [0, 1].
 */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Interpolates linearly between colors `a` and `b`
 * via an interpolation value `t` in range [0, 1].
 */
export const lerpColor = <C extends Record<string, number>>(a: C, b: C, t: number): C =>
    // @ts-ignore This works, I promise!
    Object.keys(a).reduce((o, key) => (o[key] = lerp(a[key], b[key], t), o), {});

/**
 * Calculates hue, chroma and value of the given {@link RGB} color.
 *
 * This function returns a tuple because this is rather an internal function,
 * but part of the public API for convenience.
 */
export const toHCVFromRGB = ({r, g, b}: RGB): [number, number, number] => {
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
};