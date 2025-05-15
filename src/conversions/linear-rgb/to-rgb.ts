import {clamp01} from "../../internal";

/**
 * Calculates a sRGB component from a linear sRGB component by
 * applying the sRGB transfer function.
 *
 * @param component The linear sRGB component (r, g, or b), range [0, 1].
 *
 * @returns The sRGB component, range [0, 1].
 * @see https://en.wikipedia.org/wiki/SRGB#Transfer_function_(%22gamma%22)
 */
export const toSRGBComponentFromLinearSRGBComponent = (
    component: number,
) => component <= 0.0031308
    ? 12.92 * component
    : 1.055 * component ** (1 / 2.4) - 0.055;

/**
 * Calculates a Display P3 component from a linear Display P3 component by
 * applying the sRGB transfer function.
 * This function is identical to
 * {@link toSRGBComponentFromLinearSRGBComponent `toSRGBComponentFromLinearSRGBComponent(...)`}.
 *
 * @param component The linear Display P3 component (r, g, or b), range [0, 1].
 *
 * @returns The Display P3 component, range [0, 1].
 * @see https://en.wikipedia.org/wiki/SRGB#Transfer_function_(%22gamma%22)
 */
export const toDisplayP3ComponentFromLinearDisplayP3Component = toSRGBComponentFromLinearSRGBComponent;

/**
 * Calculates an Adobe RGB component from a linear Adobe RGB component by
 * applying a gamma of 563 / 256.
 *
 @param component The linear Adobe RGB component (r, g, or b), range [0, 1].
 *
 * @returns The Adobe RGB component, range [0, 1].
 * @see https://en.wikipedia.org/wiki/Adobe_RGB_color_space#Reference_viewing_conditions
 */
export const toAdobeRGBComponentFromLinearAdobeRGBComponent = (
    component: number,
) =>  component ** (256 / 563);

/**
 * Calculates a Rec. 2020 component from a linear Rec. 2020 component
 * by applying gamma correction using the BT.709 piecewise component transfer function.
 *
 * @param component The linear Rec. 2020 component (r, g, or b), range [0, 1].
 *
 * @returns The Rec. 2020 component, range [0, 1].
 * @see https://en.wikipedia.org/wiki/Rec._2020#Transfer_characteristics
 */
export const toRec2020ComponentFromLinearRec2020Component = (
    component: number,
) => component < 0.018053968510807
    ? 4.5 * component
    : 1.09929682680944 * component ** 0.45 - 0.09929682680944008;

/**
 * Calculates a DCI-P3 component from a linear DCI-P3 component
 * by applying gamma correction using a simple 2.6 gamma curve.
 *
 * @param component The linear DCI-P3 component (r, g, or b), range [0, 1].
 *
 * @returns The DCI-P3 component, range [0, 1].
 * @see https://en.wikipedia.org/wiki/DCI-P3#DCI_P3
 */
export const toDCIP3ComponentFromLinearDCIP3Component = (
    component: number,
) => component ** (1 / 2.6);

/**
 * Calculates a DCI-P3 "D60 sim" component from a linear DCI-P3 "D60 sim" component
 * by applying gamma correction using a simple 2.6 gamma curve.
 * This function is identical to
 * {@link toDCIP3ComponentFromLinearDCIP3Component `toDCIP3ComponentFromLinearDCIP3Component(...)`}.
 *
 * @param component The linear DCI-P3 "D60 sim" component (r, g, or b), range [0, 1].
 *
 * @returns The DCI-P3 "D60 sim" component, range [0, 1].
 * @see https://en.wikipedia.org/wiki/DCI-P3#DCI_P3
 */
export const toDCIP3D60ComponentFromLinearDCIP3D60Component = toDCIP3ComponentFromLinearDCIP3Component;

/**
 * Calculates a ProPhoto RGB component from a linear ProPhoto RGB Component
 * by applying gamma correction and clamping to [0, 1].
 *
 * @param component The linear ProPhoto RGB component (r, g, or b), unbounded, non-negative.
 *
 * @returns The ProPhoto RGB component, range [0, 1].
 * @see https://en.wikipedia.org/wiki/ProPhoto_RGB_color_space#Encoding_function
 */
export const toProPhotoRGBComponentFromLinearProPhotoRGBComponent = (
    component: number,
) => clamp01(component < 1 / 512
    ? 16 * component
    : component ** (1 / 1.8));

/**
 * Calculates a NTSC (1953) component from a linear NTSC (1953) component
 * by applying gamma correction using a gamma of 2.2.
 *
 * @param component The linear NTSC (1953) component, range [0, 1].
 *
 * @returns The NTSC (1953) component, range [0, 1].
 */
export const toNTSCComponentFromLinearNTSCComponent = (
    component: number,
) => component ** (1 / 2.2);

/**
 * Calculates a SMPTE C (1987) component from a linear SMPTE C (1987) component
 * by applying gamma correction using the BT.709 piecewise component transfer function.
 * This function is identical to
 * {@link toRec2020ComponentFromLinearRec2020Component `toRec2020ComponentFromLinearRec2020Component(...)`}.
 *
 * @param component The linear SMPTE C (1987) component (r, g, or b), range [0, 1].
 *
 * @returns The SMPTE C (1987) component, range [0, 1].
 */
export const toSMPTECComponentFromLinearSMPTECComponent = toRec2020ComponentFromLinearRec2020Component;