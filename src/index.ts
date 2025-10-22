export * from "./multi";

/**
 * A color space that is based off interpolating three primaries: red, green, and blue.
 */
export type RGBColorSpace =
    | "sRGB"
    | "Adobe RGB"
    | "Display P3"
    | "Rec. 2020"
    | "ProPhoto RGB";

/**
 * A _perceptual_ color space. Applicable to LAB-like color models. These are:
 *
 * * LAB
 * * LCH
 */
export type PerceptualColorSpace = "Ok" | "CIE";
