/**
 * Calculates the CSS representation of the given Oklab color.
 *
 * @param l The luminance component of Oklab, range [0, 1].
 * @param a The a component of Oklab, unbounded.
 * @param b The b component of Oklab, unbounded.
 * @param withAlpha The alpha component of the color, range [0, 1], defaults to 1.
 *
 * @returns The CSS representation of the color.
 */
export const toCSSFromOklab = (
    l: number,
    a: number,
    b: number,
    withAlpha?: number,
) => `oklab(${l} ${a} ${b}${withAlpha !== undefined ? `/${withAlpha}` : ""})`;

/**
 * Calculates the CSS representation of the given CIELAB color.
 *
 * @param l The luminance component of CIELAB, range [0, 1].
 * @param a The a component of CIELAB, unbounded.
 * @param b The b component of CIELAB, unbounded.
 * @param withAlpha The alpha component of the color, range [0, 1], defaults to 1.
 *
 * @returns The CSS representation of the color.
 */
export const toCSSFromCIELAB = (
    l: number,
    a: number,
    b: number,
    withAlpha?: number,
) => `lab(${l} ${a} ${b}${withAlpha !== undefined ? `/${withAlpha}` : ""})`;

/**
 * Calculates the CSS representation of the given Oklch color.
 *
 * @param l The luminance component of Oklch, range [0, 1].
 * @param c The a component of Oklch, unbounded.
 * @param h The b component of Oklch, unbounded.
 * @param withAlpha The alpha component of the color, range [0, 1], defaults to 1.
 *
 * @returns The CSS representation of the color.
 */
export const toCSSFromOklch = (
    l: number,
    c: number,
    h: number,
    withAlpha?: number,
) => `oklch(${l} ${c} ${h}${withAlpha !== undefined ? `/${withAlpha}` : ""})`;

/**
 * Calculates the CSS representation of the given CIELCH color.
 *
 * @param l The luminance component of CIELCH, range [0, 1].
 * @param c The a component of CIELCH, unbounded.
 * @param h The b component of CIELCH, unbounded.
 * @param withAlpha The alpha component of the color, range [0, 1], defaults to 1.
 *
 * @returns The CSS representation of the color.
 */
export const toCSSFromCIELCH = (
    l: number,
    c: number,
    h: number,
    withAlpha?: number,
) => `lch(${l} ${c} ${h}${withAlpha !== undefined ? `/${withAlpha}` : ""})`;
