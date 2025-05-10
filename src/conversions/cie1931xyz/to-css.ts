/**
 * Calculates the CSS representation of the given CIE 1931 XYZ color.
 * **The alpha component will be clamped to [0, 1] before processing.**
 *
 * @param x The X component of CIE 1931 XYZ.
 * @param y The Y component of CIE 1931 XYZ.
 * @param z The Z component of CIE 1931 XYZ.
 * @param withAlpha The alpha component of the color, range [0, 1], defaults to 1.
 *
 * @returns The CSS representation of the color.
 */
export const toCSSFromCIE1931XYZ = (
    x: number,
    y: number,
    z: number,
    withAlpha?: number,
) => `color(xyz-d65 ${x} ${y} ${z}${withAlpha !== undefined ? `/${withAlpha}` : ""})`;