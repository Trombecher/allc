import {
    PerceptualColorSpace,
    RGBColorSpace,
    toAdobeRGBComponentFromLinearAdobeRGBComponent,
    toCIE1931xyYxFromCIE1931XYZ,
    toCIE1931xyYyFromCIE1931XYZ,
    toCIE1931XYZXFromCIE1931xyY,
    toCIE1931XYZXFromCIELAB,
    toCIE1931XYZXFromLinearAdobeRGB,
    toCIE1931XYZXFromLinearDisplayP3,
    toCIE1931XYZXFromLinearSRGB,
    toCIE1931XYZXFromLMS,
    toCIE1931XYZYFromCIELAB,
    toCIE1931XYZYFromLinearAdobeRGB,
    toCIE1931XYZYFromLinearDisplayP3,
    toCIE1931XYZYFromLinearSRGB,
    toCIE1931XYZYFromLMS,
    toCIE1931XYZZFromCIE1931xyY,
    toCIE1931XYZZFromCIELAB,
    toCIE1931XYZZFromLinearAdobeRGB,
    toCIE1931XYZZFromLinearDisplayP3,
    toCIE1931XYZZFromLinearSRGB,
    toCIE1931XYZZFromLMS,
    toCIELABAFromCIE1931XYZ,
    toCIELABBFromCIE1931XYZ,
    toCIELABLFromCIE1931XYZ,
    toCSSFromCIE1931XYZ,
    toDisplayP3ComponentFromLinearDisplayP3Component,
    toHexStringFromRGB,
    toHSIHFromRGB,
    toHSIIFromRGB,
    toHSISFromRGB,
    toHSLLFromRGB,
    toHSVSFromRGB,
    toHSVVFromRGB,
    toIntegerFromRGB,
    toLABAFromLCH,
    toLABBFromLCH,
    toLCHCFromLAB,
    toLCHHFromLAB,
    toLinearAdobeRGBBFromCIE1931XYZ,
    toLinearAdobeRGBComponentFromAdobeRGBComponent,
    toLinearAdobeRGBGFromCIE1931XYZ,
    toLinearAdobeRGBRFromCIE1931XYZ,
    toLinearDisplayP3BFromCIE1931XYZ,
    toLinearDisplayP3ComponentFromDisplayP3Component,
    toLinearDisplayP3GFromCIE1931XYZ,
    toLinearDisplayP3RFromCIE1931XYZ,
    toLinearSRGBBFromCIE1931XYZ,
    toLinearSRGBComponentFromSRGBComponent,
    toLinearSRGBGFromCIE1931XYZ,
    toLinearSRGBRFromCIE1931XYZ,
    toLMSComponentFromLMSDashComponent,
    toLMSDashComponentFromLMSComponent,
    toLMSDashLFromOklab,
    toLMSDashMFromOklab,
    toLMSDashSFromOklab,
    toLMSLFromCIE1931XYZ,
    toLMSMFromCIE1931XYZ,
    toLMSSFromCIE1931XYZ,
    toOklabAFromLMSDash,
    toOklabBFromLMSDash,
    toOklabLFromLMSDash,
    toRGBBFromHexString,
    toRGBBFromHSI,
    toRGBBFromHSL,
    toRGBBFromHSV,
    toRGBBFromInteger,
    toRGBGFromHexString,
    toRGBGFromHSI,
    toRGBGFromHSL,
    toRGBGFromHSV,
    toRGBGFromInteger,
    toRGBRFromHexString,
    toRGBRFromHSI,
    toRGBRFromHSL,
    toRGBRFromHSV,
    toRGBRFromInteger,
    toSharedHueFromRGB,
    toSRGBComponentFromLinearSRGBComponent,
} from "./index";

const MAP_LINEAR_TO_RGB = {
    sRGB: toSRGBComponentFromLinearSRGBComponent,
    "Display P3": toDisplayP3ComponentFromLinearDisplayP3Component,
    "Adobe RGB": toAdobeRGBComponentFromLinearAdobeRGBComponent,
} as const;

const MAP_RGB_TO_LINEAR = {
    sRGB: toLinearSRGBComponentFromSRGBComponent,
    "Display P3": toLinearDisplayP3ComponentFromDisplayP3Component,
    "Adobe RGB": toLinearAdobeRGBComponentFromAdobeRGBComponent,
} as const;

const MAP_CIE_1931_XYZ_TO_LINEAR_RGB_R = {
    sRGB: toLinearSRGBRFromCIE1931XYZ,
    "Display P3": toLinearDisplayP3RFromCIE1931XYZ,
    "Adobe RGB": toLinearAdobeRGBRFromCIE1931XYZ,
} as const;

const MAP_CIE_1931_XYZ_TO_LINEAR_RGB_G = {
    sRGB: toLinearSRGBGFromCIE1931XYZ,
    "Display P3": toLinearDisplayP3GFromCIE1931XYZ,
    "Adobe RGB": toLinearAdobeRGBGFromCIE1931XYZ,
} as const;

const MAP_CIE_1931_XYZ_TO_LINEAR_RGB_B = {
    sRGB: toLinearSRGBBFromCIE1931XYZ,
    "Display P3": toLinearDisplayP3BFromCIE1931XYZ,
    "Adobe RGB": toLinearAdobeRGBBFromCIE1931XYZ,
} as const;

const MAP_LINEAR_TO_CIE_1931_XYZ = {
    sRGB: [
        toCIE1931XYZXFromLinearSRGB,
        toCIE1931XYZYFromLinearSRGB,
        toCIE1931XYZZFromLinearSRGB,
    ] as const,
    "Display P3": [
        toCIE1931XYZXFromLinearDisplayP3,
        toCIE1931XYZYFromLinearDisplayP3,
        toCIE1931XYZZFromLinearDisplayP3,
    ] as const,
    "Adobe RGB": [
        toCIE1931XYZXFromLinearAdobeRGB,
        toCIE1931XYZYFromLinearAdobeRGB,
        toCIE1931XYZZFromLinearAdobeRGB,
    ] as const,
} as const;

/**
 * Represents a color. You can create colors from various color models and spaces.
 *
 * Instances of this class are immutable.
 * On instantiation, the color is converted to CIE 1931 XYZ internally
 * and properties are calculated from that.
 */
export class Color {
    private constructor(
        private readonly _X: number,
        private readonly _Y: number,
        private readonly _Z: number,
    ) {
    }

    // CIE 1931 XYZ

    /**
     * Creates a new color from the given CIE 1931 XYZ components.
     *
     * @param X The X component of CIE 1931 XYZ.
     * @param Y The Y component of CIE 1931 XYZ.
     * @param Z The Z component of CIE 1931 XYZ.
     *
     * @returns The new color.
     */
    static fromCIE1931XYZ(X: number, Y: number, Z: number): Color {
        return new Color(X, Y, Z);
    }

    /**
     * Creates a new color from the given CIE 1931 xyY components.
     *
     * @param x The x component of CIE 1931 xyY, range [0, 1].
     * @param y The y component of CIE 1931 xyY, range [0, 1].
     * @param Y The Y component of CIE 1931 xyY, range [0, 1].
     *
     * @returns The new color.
     */
    static fromCIE1931xyY(x: number, y: number, Y: number): Color {
        const X = toCIE1931XYZXFromCIE1931xyY(x, y, Y),
            Z = toCIE1931XYZZFromCIE1931xyY(x, y, Y);

        return new Color(X, Y, Z);
    }

    /**
     * Creates a new color from the given RGB components and color space.
     *
     * @param r The red component of RGB, typically in the range [0, 1].
     * @param g The green component of RGB, typically in the range [0, 1].
     * @param b The blue component of RGB, typically in the range [0, 1].
     * @param colorSpace The RGB color space to use.
     *
     * @returns The new color.
     */
    static fromRGB(r: number, g: number, b: number, colorSpace: RGBColorSpace): Color {
        const toLinear = MAP_RGB_TO_LINEAR[colorSpace];
        return Color.fromLinearRGB(toLinear(r), toLinear(g), toLinear(b), colorSpace);
    }

    /**
     * Creates a new color from the given hex string representation.
     * The string can be in either of the formats listed below:
     *
     * * `"RGB"`
     * * `"#RGB"`
     * * `"RRGGBB"`
     * * `"#RRGGBB"`
     *
     * Ignores any following characters. Defaults to 0 if the string/component is invalid.
     *
     * @param hex The hex string.
     * @param colorSpace The RGB color space to use.
     *
     * @returns A new color.
     */
    static fromHexString(hex: string, colorSpace: RGBColorSpace): Color {
        return Color.fromRGB(
            toRGBRFromHexString(hex),
            toRGBGFromHexString(hex),
            toRGBBFromHexString(hex),
            colorSpace,
        );
    }

    // CIE 1931 xyY

    /**
     * Creates a new color from the given integer representation in the format `0xRRGGBB`.
     * **All other bits will be ignored, including the alpha component.**
     *
     * @param integer The integer representation.
     * @param colorSpace The RGB color space to use.
     *
     * @returns A new color.
     */
    static fromInteger(integer: number, colorSpace: RGBColorSpace): Color {
        return Color.fromRGB(
            toRGBRFromInteger(integer),
            toRGBGFromInteger(integer),
            toRGBBFromInteger(integer),
            colorSpace,
        );
    }

    /**
     * Creates a new color from the given HSV components.
     *
     * @param h The hue component of HSV, unbounded, in radians.
     * @param s The saturation component of HSV, range [0, 1].
     * @param v The value component of HSV, range [0, 1].
     * @param colorSpace The color space to use.
     *
     * @returns The new color.
     */
    static fromHSV(h: number, s: number, v: number, colorSpace: RGBColorSpace): Color {
        return Color.fromRGB(
            toRGBRFromHSV(h, s, v),
            toRGBGFromHSV(h, s, v),
            toRGBBFromHSV(h, s, v),
            colorSpace,
        );
    }

    /**
     * Creates a new color from the given HSL components.
     *
     * @param h The hue component of HSL, unbounded, in radians.
     * @param s The saturation component of HSL, range [0, 1].
     * @param l The value component of HSL, range [0, 1].
     * @param colorSpace The color space to use.
     *
     * @returns The new color.
     */
    static fromHSL(h: number, s: number, l: number, colorSpace: RGBColorSpace): Color {
        return Color.fromRGB(
            toRGBRFromHSL(h, s, l),
            toRGBGFromHSL(h, s, l),
            toRGBBFromHSL(h, s, l),
            colorSpace,
        );
    }

    // RGB

    /**
     * Creates a new color from the given HSI components.
     *
     * @param h The hue component of HSI, unbounded, in radians.
     * @param s The saturation component of HSI, range [0, 1].
     * @param i The value component of HSI, range [0, 1].
     * @param colorSpace The color space to use.
     *
     * @returns The new color.
     */
    static fromHSI(h: number, s: number, i: number, colorSpace: RGBColorSpace): Color {
        return Color.fromRGB(
            toRGBRFromHSI(h, s, i),
            toRGBGFromHSI(h, s, i),
            toRGBBFromHSI(h, s, i),
            colorSpace,
        );
    }

    /**
     * Creates a new color from the given linear RGB components.
     *
     * @param lr The red component of linear RGB, range [0, 1].
     * @param lg The green component of linear RGB, range [0, 1].
     * @param lb The blue component of linear RGB, range [0, 1].
     * @param colorSpace The color space to use.
     *
     * @return The new color.
     */
    static fromLinearRGB(lr: number, lg: number, lb: number, colorSpace: RGBColorSpace): Color {
        const [tr, tg, tb] = MAP_LINEAR_TO_CIE_1931_XYZ[colorSpace];
        return new Color(
            tr(lr, lg, lb),
            tg(lr, lg, lb),
            tb(lr, lg, lb),
        );
    }

    /**
     * Creates a new color from the given LAB components.
     *
     * @param l The luminance component of LAB, range [0, 1].
     * @param a The a component of LAB, unbounded.
     * @param b The b component of LAB, unbounded.
     * @param colorSpace The color space to use.
     *
     * @return The new color.
     */
    static fromLAB(l: number, a: number, b: number, colorSpace: PerceptualColorSpace): Color {
        if(colorSpace === "Ok") {
            const _l = toLMSComponentFromLMSDashComponent(toLMSDashLFromOklab(l, a, b));
            const _m = toLMSComponentFromLMSDashComponent(toLMSDashMFromOklab(l, a, b));
            const _s = toLMSComponentFromLMSDashComponent(toLMSDashSFromOklab(l, a, b));

            return new Color(
                toCIE1931XYZXFromLMS(_l, _m, _s),
                toCIE1931XYZYFromLMS(_l, _m, _s),
                toCIE1931XYZZFromLMS(_l, _m, _s),
            );
        }

        return new Color(
            toCIE1931XYZXFromCIELAB(l, a),
            toCIE1931XYZYFromCIELAB(l),
            toCIE1931XYZZFromCIELAB(l, b),
        );
    }

    /**
     * Creates a new color from the given LCH components.
     *
     * @param l The luminance component of LCH, range [0, 1].
     * @param c The chromaticity component of LCH, unbounded.
     * @param h The hue component of LCH, unbounded, in radians.
     * @param colorSpace The color space to use.
     *
     * @returns The new color.
     */
    static fromLCH(l: number, c: number, h: number, colorSpace: PerceptualColorSpace): Color {
        return Color.fromLAB(
            l,
            toLABAFromLCH(c, h),
            toLABBFromLCH(c, h),
            colorSpace,
        );
    }

    /**
     * Calculates the X component of the color in the CIE 1931 XYZ color space.
     */
    X(): number {
        return this._X;
    }

    /**
     * Calculates the Y component of the color in the CIE 1931 XYZ color space.
     */
    Y(): number {
        return this._Y;
    }

    /**
     * Calculates the Z component of the color in the CIE 1931 XYZ color space.
     */
    Z(): number {
        return this._Z;
    }

    /**
     * Calculates the x component of the color in the CIE 1931 xyY color space.
     */
    x(): number {
        return toCIE1931xyYxFromCIE1931XYZ(this._X, this._Y, this._Z);
    }

    // Cylindrical

    /**
     * Calculates the y component of the color in the CIE 1931 xyY color space.
     */
    y(): number {
        return toCIE1931xyYyFromCIE1931XYZ(this._X, this._Y, this._Z);
    }

    /**
     * Calculates the red component of the color in the RGB color model.
     * @param colorSpace The color space to use.
     */
    r(colorSpace: RGBColorSpace): number {
        return MAP_LINEAR_TO_RGB[colorSpace](this.lr(colorSpace));
    }

    /**
     * Calculates the green component of the color in the RGB color model.
     * @param colorSpace The color space to use.
     */
    g(colorSpace: RGBColorSpace): number {
        return MAP_LINEAR_TO_RGB[colorSpace](this.lg(colorSpace));
    }

    /**
     * Calculates the blue component of the color in the RGB color model.
     * @param colorSpace The color space to use.
     */
    b(colorSpace: RGBColorSpace): number {
        return MAP_LINEAR_TO_RGB[colorSpace](this.lb(colorSpace));
    }

    /**
     * Calculates the hex string representation in the format `"RRGGBB"` of the color in RGB.
     * **Every component, including alpha, will be clamped to the range [0, 1] before processing.**
     * If an alpha value is specified, the format will be `"RRGGBBAA"`.
     *
     * Uses {@link toHexStringFromRGB `toHexStringFromRGB(...)`} internally.
     *
     * @param colorSpace The color space to use.
     * @param alpha - An optional alpha component, range [0, 1].
     *
     * @returns The hexadecimal representation of the color.
     */
    hex(colorSpace: RGBColorSpace, alpha?: number): string {
        return toHexStringFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
            alpha,
        );
    }

    /**
     * Calculates the integer representation in the format `0xAARRGGBB` of the color in RGB.
     * **Every component, including alpha, will be clamped to the range [0, 1] before processing.**
     *
     * Uses {@link toIntegerFromRGB `toIntegerFromRGB(...)`} internally.
     *
     * @param colorSpace The RGB color space to use.
     * @param alpha The alpha value to use, range [0, 1], defaults to 0.
     *
     * @returns The integer representation of the color.
     */
    int(colorSpace: RGBColorSpace, alpha: number = 0): number {
        return toIntegerFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
            alpha,
        );
    }

    /**
     * Calculates the shared hue component of the current color in the HSL/HSV color model.
     * @param colorSpace The color space to use.
     */
    h(colorSpace: RGBColorSpace): number {
        return toSharedHueFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
        );
    }

    /**
     * Calculates the hue component of the color in the HSI color model.
     * @param colorSpace The color space to use.
     */
    h2(colorSpace: RGBColorSpace): number {
        return toHSIHFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
        );
    }

    /**
     * Calculates the saturation component of the color in the HSL color model.
     * @param colorSpace The color model to use.
     */
    sl(colorSpace: RGBColorSpace): number {
        return toHSLLFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
        );
    }

    /**
     * Calculates the saturation component of the color in the HSV color model.
     * @param colorSpace The color space to use.
     */
    sv(colorSpace: RGBColorSpace): number {
        return toHSVSFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
        );
    }

    /**
     * Calculates the saturation component of the color in the HSI color model.
     * @param colorSpace The color space to use.
     */
    si(colorSpace: RGBColorSpace): number {
        return toHSISFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
        );
    }

    // Linear RGB

    /**
     * Calculates the lightness component of the color in the HSL color model.
     * @param colorSpace The color space to use.
     */
    l(colorSpace: RGBColorSpace): number {
        return toHSLLFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
        );
    }

    /**
     * Calculates the value component of the color in the HSV color model.
     * @param colorSpace The color space to use.
     */
    v(colorSpace: RGBColorSpace): number {
        return toHSVVFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
        );
    }

    /**
     * Calculates the intensity component of the color in the HSI color model.
     * @param colorSpace The color space to use.
     */
    i(colorSpace: RGBColorSpace): number {
        return toHSIIFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
        );
    }

    /**
     * Calculates the red component of the color in linear RGB.
     * @param colorSpace The color space to use.
     */
    lr(colorSpace: RGBColorSpace): number {
        return MAP_CIE_1931_XYZ_TO_LINEAR_RGB_R[colorSpace](this._X, this._Y, this._Z);
    }

    // LAB / LCH

    /**
     * Calculates the green component of the color in linear RGB.
     * @param colorSpace The color space to use.
     */
    lg(colorSpace: RGBColorSpace): number {
        return MAP_CIE_1931_XYZ_TO_LINEAR_RGB_G[colorSpace](this._X, this._Y, this._Z);
    }

    /**
     * Calculates the blue component of the color in linear RGB.
     * @param colorSpace The color space to use.
     */
    lb(colorSpace: RGBColorSpace): number {
        return MAP_CIE_1931_XYZ_TO_LINEAR_RGB_B[colorSpace](this._X, this._Y, this._Z);
    }

    /**
     * Calculates the shared luminance component of the color in the LAB/LCH color model.
     * @param colorSpace The color space to use.
     */
    pl(colorSpace: PerceptualColorSpace): number {
        if(colorSpace === "Ok") {
            const _l = toLMSDashComponentFromLMSComponent(toLMSLFromCIE1931XYZ(this._X, this._Y, this._Z)),
                _m = toLMSDashComponentFromLMSComponent(toLMSMFromCIE1931XYZ(this._X, this._Y, this._Z)),
                _s = toLMSDashComponentFromLMSComponent(toLMSSFromCIE1931XYZ(this._X, this._Y, this._Z));

            return toOklabLFromLMSDash(_l, _m, _s);
        }

        return toCIELABLFromCIE1931XYZ(this._Y);
    }

    /**
     * Calculates the a component of the color in the LAB color model.
     * @param colorSpace The color space to use.
     */
    pa(colorSpace: PerceptualColorSpace): number {
        if(colorSpace === "Ok") {
            const _l = toLMSDashComponentFromLMSComponent(toLMSLFromCIE1931XYZ(this._X, this._Y, this._Z)),
                _m = toLMSDashComponentFromLMSComponent(toLMSMFromCIE1931XYZ(this._X, this._Y, this._Z)),
                _s = toLMSDashComponentFromLMSComponent(toLMSSFromCIE1931XYZ(this._X, this._Y, this._Z));

            return toOklabAFromLMSDash(_l, _m, _s);
        }

        return toCIELABAFromCIE1931XYZ(this._X, this._Y);
    }

    /**
     * Calculates the b component of the color in the LAB color model.
     * @param colorSpace The color space to use
     */
    pb(colorSpace: PerceptualColorSpace): number {
        if(colorSpace === "Ok") {
            const _l = toLMSDashComponentFromLMSComponent(toLMSLFromCIE1931XYZ(this._X, this._Y, this._Z)),
                _m = toLMSDashComponentFromLMSComponent(toLMSMFromCIE1931XYZ(this._X, this._Y, this._Z)),
                _s = toLMSDashComponentFromLMSComponent(toLMSSFromCIE1931XYZ(this._X, this._Y, this._Z));

            return toOklabBFromLMSDash(_l, _m, _s);
        }

        return toCIELABBFromCIE1931XYZ(this._Y, this._Z);
    }

    /**
     * Calculates the chromaticity component of the color in the LCH color model.
     * @param colorSpace The color space to use.
     */
    pc(colorSpace: PerceptualColorSpace): number {
        return toLCHCFromLAB(this.pa(colorSpace), this.pb(colorSpace));
    }

    /**
     * Calculates the hue component of the color in the LCH color model.
     * @param colorSpace The color space to use.
     */
    ph(colorSpace: PerceptualColorSpace): number {
        return toLCHHFromLAB(this.pa(colorSpace), this.pb(colorSpace));
    }

    // Common

    /**
     * Calculates the CSS representation of the color.
     *
     * Uses {@link toCSSFromCIE1931XYZ `toCSSFromCIE1931XYZ(...)`} internally.
     *
     * @param alpha The alpha component, optional, range [0, 1].
     *
     * @returns The CSS representation of the color.
     */
    css(alpha?: number): string {
        return toCSSFromCIE1931XYZ(this._X, this._Y, this._Z, alpha);
    }
}