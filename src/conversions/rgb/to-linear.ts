/**
 * Calculates the linear sRGB component of a sRGB component by
 * applying the sRGB transfer function.
 *
 * @param x The input component (r, g, or b), typically in the range [0, 1].
 *
 * @returns The linear sRGB component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/SRGB#Transfer_function_(%22gamma%22)
 */
export const toLinearSRGBComponentFromSRGBComponent = (x: number) => x <= 0.04045
    ? x / 12.92
    : ((x + 0.055) / 1.055) ** 2.4;

/**
 * Calculates the linear Display P3 component of a Display P3 component by
 * applying the sRGB transfer function.
 * This function is identical to
 * {@link toLinearSRGBComponentFromSRGBComponent `toLinearSRGBComponentFromSRGBComponent(...)`}.
 *
 * @param x The input component (r, g, or b), typically in the range [0, 1].
 *
 * @returns The linear Display P3 component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/SRGB#Transfer_function_(%22gamma%22)
 */
export const toLinearDisplayP3ComponentFromDisplayP3Component = toLinearSRGBComponentFromSRGBComponent;

/**
 * Calculates the linear Adobe RGB component of an Adobe RGB component by
 * applying the Adobe RGB transfer function.
 *
 * @param x The input component (r, g, or b), typically in the range [0, 1].
 *
 * @returns The linear Adobe RGB component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/Adobe_RGB_color_space#ICC_PCS_color_image_encoding
 */
export const toLinearAdobeRGBComponentFromAdobeRGBComponent = (x: number) =>
    x ** (256 / 563);