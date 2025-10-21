/**
 * Calculates the linear sRGB component from a sRGB component by
 * applying the inverse sRGB transfer function.
 *
 * @param component The input component (r, g, or b), typically in the range [0, 1].
 *
 * @returns The linear sRGB component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/SRGB#Transfer_function_(%22gamma%22)
 */
export const toLinearSRGBComponentFromSRGBComponent = (component: number) =>
    component <= 0.04045
        ? component / 12.92
        : ((component + 0.055) / 1.055) ** 2.4;

/**
 * Calculates the linear Display P3 component from a Display P3 component by
 * applying the inverse sRGB transfer function.
 * This function is identical to
 * {@link toLinearSRGBComponentFromSRGBComponent `toLinearSRGBComponentFromSRGBComponent(...)`}.
 *
 * @param component The input component (r, g, or b), typically in the range [0, 1].
 *
 * @returns The linear Display P3 component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/SRGB#Transfer_function_(%22gamma%22)
 */
export const toLinearDisplayP3ComponentFromDisplayP3Component =
    toLinearSRGBComponentFromSRGBComponent;

/**
 * Calculates the linear Adobe RGB component from an Adobe RGB component by
 * applying the inverse Adobe RGB transfer function.
 *
 * @param component The input component (r, g, or b), typically in the range [0, 1].
 *
 * @returns The linear Adobe RGB component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/Adobe_RGB_color_space#Reference_viewing_conditions
 */
export const toLinearAdobeRGBComponentFromAdobeRGBComponent = (
    component: number,
) => component ** (563 / 256);

/**
 * Calculates the linear Rec. 2020 component from a Rec. 2020 component
 * by applying the BT.709 component transfer function.
 *
 * @param component The Rec. 2020 component (r, g, or b), typically in the range [0, 1].
 *
 * @return The linear Rec. 2020 component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/Rec._2020#Transfer_characteristics
 */
export const toLinearRec2020ComponentFromRec2020Component = (
    component: number,
) =>
    component < 0.08124285829863151
        ? component / 4.5
        : ((component + 0.09929682680944) / component) ** (1 / 0.45);

/**
 * Calculates a linear DCI-P3 component from a DCI-P3 component
 * by applying inverse gamma correction using a simple 2.6 gamma curve.
 *
 * @param component The DCI-P3 component (r, g, or b), range [0, 1].
 *
 * @returns The linear DCI-P3 component, range [0, 1].
 * @see https://en.wikipedia.org/wiki/DCI-P3#DCI_P3
 */
export const toLinearDCIP3ComponentFromDCIP3Component = (component: number) =>
    component ** 2.6;

/**
 * Calculates a linear DCI-P3 "D60 sim" component from a DCI-P3 "D60 sim" component
 * by applying inverse gamma correction using a simple 2.6 gamma curve.
 * This function is identical to
 * {@link toLinearDCIP3ComponentFromDCIP3Component `toLinearDCIP3ComponentFromDCIP3Component(...)`}.
 *
 * @param component The DCI-P3 "D60 sim" component (r, g, or b), range [0, 1].
 *
 * @returns The linear DCI-P3 "D60 sim" component, range [0, 1].
 * @see https://en.wikipedia.org/wiki/DCI-P3#DCI_P3
 */
export const toLinearDCIP3D60ComponentFromDCIP3D60Component =
    toLinearDCIP3ComponentFromDCIP3Component;

/**
 * Calculates a linear ProPhoto RGB component from a ProPhoto RGB Component
 * by applying inverse gamma correction.
 *
 * @param component The ProPhoto RGB component (r, g, or b), range [0, 1].
 *
 * @returns The linear ProPhoto RGB component, range [0, 1].
 * @see https://en.wikipedia.org/wiki/ProPhoto_RGB_color_space#Encoding_function
 */
export const toLinearProPhotoRGBComponentFromProPhotoRGBComponent = (
    component: number,
) => (component < 16 / 512 ? component / 16 : component ** 1.8);

/**
 * Calculates a linear NTSC (1953) component from a NTSC (1953) component
 * by applying inverse gamma correction using a gamma of 2.2.
 *
 * @param component The NTSC (1953) component, range [0, 1].
 *
 * @returns The linear NTSC (1953) component, range [0, 1].
 */
export const toLinearNTSCComponentFromNTSCComponent = (component: number) =>
    component ** 2.2;

/**
 * Calculates a linear SMPTE C (1987) component from a SMPTE C (1987) component
 * by applying inverse gamma correction using the inverse BT.709 piecewise component transfer function.
 * This function is identical to
 * {@link toLinearRec2020ComponentFromRec2020Component `toLinearRec2020ComponentFromRec2020Component(...)`}.
 *
 * @param component The SMPTE C (1987) component (r, g, or b), range [0, 1].
 *
 * @returns The linear SMPTE C (1987) component, range [0, 1].
 */
export const toLinearSMPTECComponentFromSMPTECComponent =
    toLinearRec2020ComponentFromRec2020Component;
