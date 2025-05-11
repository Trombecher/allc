/**
 * Calculates the a component of LAB from LCH.
 * The luminance component of LCH is omitted because it is unnecessary for the computation.
 *
 * This function is color space invariant.
 *
 * @param c The chroma component of LCH, non-negative, unbounded.
 * @param h The hue component of LCH, unbounded, in radians.
 *
 * @returns The a component of LCH.
 * @see https://bottosson.github.io/posts/oklab/#the-oklab-color-space
 */
export const toLABAFromLCH = (
    c: number,
    h: number,
) => c * Math.cos(h);

/**
 * Calculates the b component of LAB from LCH.
 * The luminance component of LCH is omitted because it is unnecessary for the computation.
 *
 * This function is color space invariant.
 *
 * @param c The chroma component of LCH, non-negative, unbounded.
 * @param h The hue component of LCH, unbounded, in radians.
 *
 * @returns The b component of LCH.
 * @see https://bottosson.github.io/posts/oklab/#the-oklab-color-space
 */
export const toLABBFromLCH = (
    c: number,
    h: number,
) => c * Math.sin(h);