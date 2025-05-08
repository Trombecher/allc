import type {PerceptualColorSpace, RGBColorSpace} from "./index";

export declare class Color {
    private constructor();

    // CIE 1931 XYZ

    X(): number;

    Y(): number;

    Z(): number;

    static fromCIE1931XYZ(x: number, y: number, z: number): Color;

    // CIE 1931 xyY

    x(): number;

    y(): number;

    static fromCIE1931xyY(x: number, y: number, Y: number): Color;

    // RGB

    /**
     * The red component of the color in RGB.
     * @param colorSpace The color space to use.
     */
    r(colorSpace: RGBColorSpace): number;

    /**
     * The green component of the color in RGB.
     * @param colorSpace The color space to use.
     */
    g(colorSpace: RGBColorSpace): number;

    /**
     * The blue component of the color in RGB.
     * @param colorSpace The color space to use.
     */
    b(colorSpace: RGBColorSpace): number;

    hex(colorSpace: RGBColorSpace, alpha: number): string;

    int(colorSpace: RGBColorSpace, alpha: number): number;

    /**
     * Constructs a new color from the given RGB components and color space.
     */
    static fromRGB(r: number, g: number, b: number, colorSpace: RGBColorSpace): Color;

    static fromHex(hex: string, colorSpace: RGBColorSpace): Color;

    static fromInt(int: number, colorSpace: RGBColorSpace): Color;

    // Cylindrical

    h6(colorSpace: RGBColorSpace): number;

    h2(colorSpace: RGBColorSpace): number;

    sl(colorSpace: RGBColorSpace): number;

    sv(colorSpace: RGBColorSpace): number;

    si(colorSpace: RGBColorSpace): number;

    li(colorSpace: RGBColorSpace): number;

    v(colorSpace: RGBColorSpace): number;

    i(colorSpace: RGBColorSpace): number;

    static fromHSV(h: number, s: number, v: number, colorSpace: RGBColorSpace): Color;

    static fromHSL(h: number, s: number, l: number, colorSpace: RGBColorSpace): Color;

    static fromHSI(h: number, s: number, l: number, colorSpace: RGBColorSpace): Color;

    // Linear RGB

    /**
     * The red component of the color in linear RGB.
     * @param colorSpace The color space to use.
     */
    lr(colorSpace: RGBColorSpace): number;

    /**
     * The green component of the color in linear RGB.
     * @param colorSpace The color space to use.
     */
    lg(colorSpace: RGBColorSpace): number;

    /**
     * The blue component of the color in linear RGB.
     * @param colorSpace The color space to use.
     */
    lb(colorSpace: RGBColorSpace): number;

    static fromLinearRGB(lr: number, lg: number, lb: number, colorSpace: RGBColorSpace): Color;

    // LAB / LCH

    /**
     * The shared luminance component of the color in the LAB/LCH color model.
     * @param colorSpace The color space to use.
     */
    lu(colorSpace: PerceptualColorSpace): number;

    /**
     * The a component of the color in the LAB color model.
     * @param colorSpace The color space to use.
     */
    a(colorSpace: PerceptualColorSpace): number;

    /**
     * The b component of the color in the LAB color model.
     * @param colorSpace The color space to use
     */
    b(colorSpace: PerceptualColorSpace): number;

    /**
     * The chromaticity component of the color in the LCH color model.
     * @param colorSpace The color space to use.
     */
    c(colorSpace: PerceptualColorSpace): number;

    /**
     * The hue component of the color in the LCH color model.
     * It is called h4 because it has four primaries. Range: unbounded, in radians.
     * @param colorSpace The color space to use.
     */
    h4(colorSpace: PerceptualColorSpace): number;

    static fromLAB(l: number, a: number, b: number, colorSpace: PerceptualColorSpace): Color;

    static fromLCH(l: number, c: number, h: number, colorSpace: PerceptualColorSpace): Color;

    // Common

    distance(other: Color): number;

    css(): string;
}