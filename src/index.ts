export * from "./conversions";
export * from "./multi";
export * from "./distances";
export * from "./illuminants";
export * from "./primaries";

/**
 * A color space that is applicable to RGB-like color models. These are:
 *
 * * Linear RGB
 * * RGB
 * * HSL
 * * HSV
 * * HSI
 */
export type RGBColorSpace = "sRGB" | "Adobe RGB" | "Display P3";

/**
 * A _perceptual_ color space. Applicable to LAB-like color models. These are:
 *
 * * LAB
 * * LCH
 */
export type PerceptualColorSpace = "Ok" | "CIE";