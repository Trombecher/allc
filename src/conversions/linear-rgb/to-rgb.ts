/**
 * Calculates the sRGB component from a linear sRGB component by
 * applying the inverse sRGB transfer function.
 *
 * @param component The linear sRGB component (r, g, or b), typically in the range [0, 1].
 *
 * @returns The sRGB component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/SRGB#Transfer_function_(%22gamma%22)
 */
export const toSRGBComponentFromLinearSRGBComponent = (
    component: number,
) => component <= 0.0031308
    ? 12.92 * component
    : 1.055 * component ** (1 / 2.4) - 0.055;

/**
 * Calculates the Display P3 component from a linear Display P3 component by
 * applying the inverse sRGB transfer function.
 * This function is identical to
 * {@link toSRGBComponentFromLinearSRGBComponent `toSRGBComponentFromLinearSRGBComponent(...)`}.
 *
 * @param component The linear Display P3 component (r, g, or b), typically in the range [0, 1].
 *
 * @returns The Display P3 component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/SRGB#Transfer_function_(%22gamma%22)
 */
export const toDisplayP3ComponentFromLinearDisplayP3Component = toSRGBComponentFromLinearSRGBComponent;

/**
 * Calculates the Adobe RGB component from a linear Adobe RGB component by
 * applying the inverse Adobe RGB transfer function.
 * This function is identical to
 * {@link toSRGBComponentFromLinearSRGBComponent `toSRGBComponentFromLinearSRGBComponent(...)`}.
 *
 * @param component The linear Adobe RGB component (r, g, or b), typically in the range [0, 1].
 *
 * @returns The Adobe RGB component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/Adobe_RGB_color_space#ICC_PCS_color_image_encoding
 */
export const toAdobeRGBComponentFromLinearAdobeRGBComponent = toSRGBComponentFromLinearSRGBComponent;

/**
 * Calculates the Rec. 2020 component from a linear Rec. 2020 component
 * by applying gamma correction using the Rec. 2020 component transfer function.
 *
 * @param component The linear Rec. 2020 component (r, g, or b), typically in the range [0, 1].
 *
 * @returns The Rec. 2020 component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/Rec._2020#Transfer_characteristics
 */
export const toRec2020ComponentFromLinearRec2020Component = (
    component: number,
) => component < 0.018053968510807
    ? 4.5 * component
    : 1.09929682680944 * component ** 0.45 - 0.09929682680944008;