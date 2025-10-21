/**
 * Calculates the CSS representation of the given sRGB color.
 *
 * @param r The red component of sRGB, typically in the range [0, 1].
 * @param g The green component of sRGB, typically in the range [0, 1].
 * @param b The blue component of sRGB, typically in the range [0, 1].
 * @param withAlpha The alpha component of the color, range [0, 1], defaults to 1.
 *
 * @returns The CSS representation of the color.
 */
export const toCSSFromSRGB = (
    r: number,
    g: number,
    b: number,
    withAlpha?: number,
) =>
    `rgb(${r * 255} ${g * 255} ${b * 255}${withAlpha !== undefined ? `/${withAlpha}` : ""})`;

/**
 * Calculates the CSS representation of the given Display P3 color.
 *
 * @param r The red component of Display P3, typically in the range [0, 1].
 * @param g The green component of Display P3, typically in the range [0, 1].
 * @param b The blue component of Display P3, typically in the range [0, 1].
 * @param withAlpha The alpha component of the color, range [0, 1], defaults to 1.
 *
 * @returns The CSS representation of the color.
 */
export const toCSSFromDisplayP3 = (
    r: number,
    g: number,
    b: number,
    withAlpha?: number,
) =>
    `color(display-p3 ${r} ${g} ${b}${withAlpha !== undefined ? `/${withAlpha}` : ""})`;

/**
 * Calculates the CSS representation of the given Adobe RGB color.
 *
 * @param r The red component of Adobe RGB, typically in the range [0, 1].
 * @param g The green component of Adobe RGB, typically in the range [0, 1].
 * @param b The blue component of Adobe RGB, typically in the range [0, 1].
 * @param withAlpha The alpha component of the color, range [0, 1], defaults to 1.
 *
 * @returns The CSS representation of the color.
 */
export const toCSSFromAdobeRGB = (
    r: number,
    g: number,
    b: number,
    withAlpha?: number,
) =>
    `color(a98-rgb ${r} ${g} ${b}${withAlpha !== undefined ? `/${withAlpha}` : ""})`;
