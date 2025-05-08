import type {PerceptualColorSpace, RGBColorSpace} from "./index";

export declare class Color {
    private constructor();

    // CIE1931XYZ

    static fromCIE1931XYZ(X: number, Y: number, Z: number): Color;

    static fromCIE1931xyY(x: number, y: number, Y: number): Color;

    /**
     * Constructs a new color from the given RGB components and color space.
     */
    static fromRGB(r: number, g: number, b: number, colorSpace: RGBColorSpace): Color;

    static fromHex(hex: string, colorSpace: RGBColorSpace): Color;

    // CIE1931xyY

    static fromInt(int: number, colorSpace: RGBColorSpace): Color;

    static fromHSV(h: number, s: number, v: number, colorSpace: RGBColorSpace): Color;

    static fromHSL(h: number, s: number, l: number, colorSpace: RGBColorSpace): Color;

    // RGB

    static fromHSI(h: number, s: number, l: number, colorSpace: RGBColorSpace): Color;

    static fromLAB(l: number, a: number, b: number, colorSpace: PerceptualColorSpace): Color;

    static fromLCH(l: number, c: number, h: number, colorSpace: PerceptualColorSpace): Color;

    X(): number;

    // Serialization

    Y(): number;

    Z(): number;

    x(): number;

    y(): number;

    // HSL / HSV / HSI

    /**
     * The RGB red component of the color.
     * @param colorSpace The color space to use.
     */
    r(colorSpace: RGBColorSpace): number;

    /**
     * The RGB green component of the color.
     * @param colorSpace The color space to use.
     */
    g(colorSpace: RGBColorSpace): number;

    /**
     * The RGB blue component of the color.
     * @param colorSpace The color space to use.
     */
    b(colorSpace: RGBColorSpace): number;

    hex(colorSpace: RGBColorSpace, alpha: number): string;

    int(colorSpace: RGBColorSpace, alpha: number): number;

    h6(colorSpace: RGBColorSpace): number;

    v(colorSpace: RGBColorSpace): number;

    li(colorSpace: RGBColorSpace): number;

    // Linear RGB

    s(colorSpace: RGBColorSpace): number;

    i(colorSpace: RGBColorSpace): number;

    lr(colorSpace: RGBColorSpace): number;

    // LAB / LCH

    lg(colorSpace: RGBColorSpace): number;

    lb(colorSpace: RGBColorSpace): number;

    /**
     * The _luminance_ component of the color in the LAB/LCH color model.
     * @param colorSpace The color space to use.
     */
    lu(colorSpace: PerceptualColorSpace): number;

    /**
     * The _a_ component of the color in the LAB color model.
     * @param colorSpace The color space to use.
     */
    a(colorSpace: PerceptualColorSpace): number;

    /**
     * The _b_ component of the color in the LAB color model.
     * @param colorSpace The color space to use
     */
    b(colorSpace: PerceptualColorSpace): number;

    /**
     * The _chromaticity_ component of the color in the LCH color model.
     * @param colorSpace The color space to use.
     */
    c(colorSpace: PerceptualColorSpace): number;

    /**
     * The _hue_ component of the color in the LCH color model.
     * It is called _h4_ because it has four primaries. Range: unbounded, in radians.
     * @param colorSpace The color space to use.
     */
    h4(colorSpace: PerceptualColorSpace): number;

    // Common

    distance(other: Color): number;

    css(): string;
}