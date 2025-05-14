/**
 * Calculates the linear sRGB component from a sRGB component by
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
 * Calculates the linear Display P3 component from a Display P3 component by
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
 * Calculates the linear Adobe RGB component from an Adobe RGB component by
 * applying the Adobe RGB transfer function.
 * This function is identical to
 * {@link toLinearSRGBComponentFromSRGBComponent `toLinearSRGBComponentFromSRGBComponent(...)`}.
 *
 * @param x The input component (r, g, or b), typically in the range [0, 1].
 *
 * @returns The linear Adobe RGB component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/SRGB#Transfer_function_(%22gamma%22)
 */
export const toLinearAdobeRGBComponentFromAdobeRGBComponent = toLinearSRGBComponentFromSRGBComponent;

/**
 * Calculates the linear Rec. 2020 component from a Rec. 2020 component
 * by applying the inverse Rec. 2020 component transfer function.
 *
 * @param component The Rec. 2020 component (r, g, or b), typically in the range [0, 1].
 *
 * @return The linear Rec. 2020 component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/Rec._2020#Transfer_characteristics
 */
export const toLinearRec2020ComponentFromRec2020Component = (
    component: number
) => component < 0.08124285829863151
    ? component / 4.5
    : ((component + 0.09929682680944) / component) ** (1 / 0.45)