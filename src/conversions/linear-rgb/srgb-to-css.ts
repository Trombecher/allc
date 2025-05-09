/**
 * Calculates the CSS representation of the given linear sRGB color.
 * The given components are **not** clamped to [0, 1] before processing.
 *
 * There is no equivalent function for linear Display P3 and linear Adobe RGB.
 * If you want to convert them to CSS, first convert them to CIE 1931 XYZ and then to CSS.
 *
 * @param r The red component of linear sRGB, typically in the range [0, 1].
 * @param g The green component of linear sRGB, typically in the range [0, 1].
 * @param b The blue component of linear sRGB, typically in the range [0, 1].
 * @param withAlpha The alpha component of the color, range [0, 1], defaults to 1.
 *
 * @returns The CSS representation of the color.
 */
export const toCSSFromLinearSRGB = (
    r: number,
    g: number,
    b: number,
    withAlpha?: number,
) => `color(srgb-linear ${r} ${g} ${b}${withAlpha !== undefined ? `/${withAlpha}` : ""}`;