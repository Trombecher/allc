/**
 * Calculates the chroma component of LCH from LAB.
 * The luminance component of LCH is omitted because it is unnecessary for the computation.
 *
 * This function is color space invariant.
 *
 * @param a The a component of LAB, unbounded.
 * @param b The b component of LAB, unbounded.
 *
 * @returns The chroma component of LCH.
 * @see https://bottosson.github.io/posts/oklab/#the-oklab-color-space
 */
export const toLCHCFromLAB = (
    a: number,
    b: number,
) => Math.hypot(a, b);

/**
 * Calculates the hue component of LCH from LAB.
 * The luminance component of LCH is omitted because it is unnecessary for the computation.
 *
 * This function is color space invariant.
 *
 * @param a The a component of LAB, unbounded.
 * @param b The b component of LAB, unbounded.
 *
 * @returns The hue component of LCH.
 * @see https://bottosson.github.io/posts/oklab/#the-oklab-color-space
 */
export const toLCHHFromLAB = (
    a: number,
    b: number,
) => Math.atan2(b, a);