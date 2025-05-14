/**
 * Calculates the sRGB component of a linear sRGB component by
 * applying the inverse sRGB transfer function.
 *
 * @param component The linear sRGB component (r, g, or b), typically in the range [0, 1].
 *
 * @return The sRGB component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/SRGB#Transfer_function_(%22gamma%22)
 */
export const toSRGBComponentFromLinearSRGBComponent = (
    component: number,
) => component <= 0.0031308
    ? 12.92 * component
    : 1.055 * component ** (1 / 2.4) - 0.055;

/**
 * Calculates the Display P3 component of a linear Display P3 component by
 * applying the inverse sRGB transfer function.
 * This function is identical to
 * {@link toSRGBComponentFromLinearSRGBComponent `toSRGBComponentFromLinearSRGBComponent(...)`}.
 *
 * @param component The linear Display P3 component (r, g, or b), typically in the range [0, 1].
 *
 * @return The Display P3 component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/SRGB#Transfer_function_(%22gamma%22)
 */
export const toDisplayP3ComponentFromLinearDisplayP3Component = toSRGBComponentFromLinearSRGBComponent;

/**
 * Calculates the Adobe RGB component of a linear Adobe RGB component by
 * applying the inverse Adobe RGB transfer function.
 * This function is identical to
 * {@link toSRGBComponentFromLinearSRGBComponent `toSRGBComponentFromLinearSRGBComponent(...)`}.
 *
 * @param component The linear Adobe RGB component (r, g, or b), typically in the range [0, 1].
 *
 * @return The Adobe RGB component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/Adobe_RGB_color_space#ICC_PCS_color_image_encoding
 */
export const toAdobeRGBComponentFromLinearAdobeRGBComponent = toSRGBComponentFromLinearSRGBComponent;