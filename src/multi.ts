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
    toCIE1931XYZZFromLMS, toCIELABAFromCIE1931XYZ, toCIELABBFromCIE1931XYZ,
    toCIELABLFromCIE1931XYZ, toCSSFromCIE1931XYZ,
    toDisplayP3ComponentFromLinearDisplayP3Component,
    toHexStringFromRGB, toHSIHFromRGB, toHSIIFromRGB, toHSISFromRGB, toHSLLFromRGB, toHSVSFromRGB, toHSVVFromRGB,
    toIntegerFromRGB,
    toLABAFromLCH,
    toLABBFromLCH, toLCHCFromLAB, toLCHHFromLAB,
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
    toOklabAFromLMSDash, toOklabBFromLMSDash,
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
    toRGBRFromInteger, toSharedHueFromRGB,
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

export class Color {
    private constructor(
        private readonly _X: number,
        private readonly _Y: number,
        private readonly _Z: number,
    ) {
    }

    // CIE 1931 XYZ

    X(): number {
        return this._X;
    }

    Y(): number {
        return this._Y;
    }

    Z(): number {
        return this._Z;
    }

    static fromCIE1931XYZ(X: number, Y: number, Z: number): Color {
        return new Color(X, Y, Z);
    }

    // CIE 1931 xyY

    x(): number {
        return toCIE1931xyYxFromCIE1931XYZ(this._X, this._Y, this._Z);
    }

    y(): number {
        return toCIE1931xyYyFromCIE1931XYZ(this._X, this._Y, this._Z);
    }

    static fromCIE1931xyY(x: number, y: number, Y: number): Color {
        const X = toCIE1931XYZXFromCIE1931xyY(x, y, Y),
            Z = toCIE1931XYZZFromCIE1931xyY(x, y, Y);

        return new Color(X, Y, Z);
    }

    // RGB

    /**
     * The red component of the color in RGB.
     * @param colorSpace The color space to use.
     */
    r(colorSpace: RGBColorSpace): number {
        return MAP_LINEAR_TO_RGB[colorSpace](this.lr(colorSpace));
    }

    /**
     * The green component of the color in RGB.
     * @param colorSpace The color space to use.
     */
    g(colorSpace: RGBColorSpace): number {
        return MAP_LINEAR_TO_RGB[colorSpace](this.lg(colorSpace));
    }

    /**
     * The blue component of the color in RGB.
     * @param colorSpace The color space to use.
     */
    b(colorSpace: RGBColorSpace): number {
        return MAP_LINEAR_TO_RGB[colorSpace](this.lb(colorSpace));
    }

    hex(colorSpace: RGBColorSpace, alpha: number): string {
        return toHexStringFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
            alpha,
        );
    }

    int(colorSpace: RGBColorSpace, alpha: number): number {
        return toIntegerFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
            alpha,
        );
    }

    /**
     * Constructs a new color from the given RGB components and color space.
     */
    static fromRGB(r: number, g: number, b: number, colorSpace: RGBColorSpace): Color {
        const toLinear = MAP_RGB_TO_LINEAR[colorSpace];
        return Color.fromLinearRGB(toLinear(r), toLinear(g), toLinear(b), colorSpace);
    }

    static fromHexString(hex: string, colorSpace: RGBColorSpace): Color {
        return Color.fromRGB(
            toRGBRFromHexString(hex),
            toRGBGFromHexString(hex),
            toRGBBFromHexString(hex),
            colorSpace,
        );
    }

    static fromInteger(integer: number, colorSpace: RGBColorSpace): Color {
        return Color.fromRGB(
            toRGBRFromInteger(integer),
            toRGBGFromInteger(integer),
            toRGBBFromInteger(integer),
            colorSpace,
        );
    }

    // Cylindrical

    h(colorSpace: RGBColorSpace): number {
        return toSharedHueFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
        );
    }

    h2(colorSpace: RGBColorSpace): number {
        return toHSIHFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
        );
    }

    sl(colorSpace: RGBColorSpace): number {
        return toHSLLFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
        );
    }

    sv(colorSpace: RGBColorSpace): number {
        return toHSVSFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
        );
    }

    si(colorSpace: RGBColorSpace): number {
        return toHSISFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
        );
    }

    l(colorSpace: RGBColorSpace): number {
        return toHSLLFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
        );
    }

    v(colorSpace: RGBColorSpace): number {
        return toHSVVFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
        );
    }

    i(colorSpace: RGBColorSpace): number {
        return toHSIIFromRGB(
            this.r(colorSpace),
            this.g(colorSpace),
            this.b(colorSpace),
        );
    }

    static fromHSV(h: number, s: number, v: number, colorSpace: RGBColorSpace): Color {
        return Color.fromRGB(
            toRGBRFromHSV(h, s, v),
            toRGBGFromHSV(h, s, v),
            toRGBBFromHSV(h, s, v),
            colorSpace,
        );
    }

    static fromHSL(h: number, s: number, l: number, colorSpace: RGBColorSpace): Color {
        return Color.fromRGB(
            toRGBRFromHSL(h, s, l),
            toRGBGFromHSL(h, s, l),
            toRGBBFromHSL(h, s, l),
            colorSpace,
        );
    }

    static fromHSI(h: number, s: number, i: number, colorSpace: RGBColorSpace): Color {
        return Color.fromRGB(
            toRGBRFromHSI(h, s, i),
            toRGBGFromHSI(h, s, i),
            toRGBBFromHSI(h, s, i),
            colorSpace,
        );
    }

    // Linear RGB

    /**
     * The red component of the color in linear RGB.
     * @param colorSpace The color space to use.
     */
    lr(colorSpace: RGBColorSpace): number {
        return MAP_CIE_1931_XYZ_TO_LINEAR_RGB_R[colorSpace](this._X, this._Y, this._Z);
    }

    /**
     * The green component of the color in linear RGB.
     * @param colorSpace The color space to use.
     */
    lg(colorSpace: RGBColorSpace): number {
        return MAP_CIE_1931_XYZ_TO_LINEAR_RGB_G[colorSpace](this._X, this._Y, this._Z);
    }

    /**
     * The blue component of the color in linear RGB.
     * @param colorSpace The color space to use.
     */
    lb(colorSpace: RGBColorSpace): number {
        return MAP_CIE_1931_XYZ_TO_LINEAR_RGB_B[colorSpace](this._X, this._Y, this._Z);
    }

    static fromLinearRGB(lr: number, lg: number, lb: number, colorSpace: RGBColorSpace): Color {
        const [tr, tg, tb] = MAP_LINEAR_TO_CIE_1931_XYZ[colorSpace];
        return new Color(
            tr(lr, lg, lb),
            tg(lr, lg, lb),
            tb(lr, lg, lb),
        );
    }

    // LAB / LCH

    /**
     * The shared luminance component of the color in the LAB/LCH color model.
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
     * The a component of the color in the LAB color model.
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
     * The b component of the color in the LAB color model.
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
     * The chromaticity component of the color in the LCH color model.
     * @param colorSpace The color space to use.
     */
    pc(colorSpace: PerceptualColorSpace): number {
        return toLCHCFromLAB(this.pa(colorSpace), this.pb(colorSpace));
    }

    /**
     * The hue component of the color in the LCH color model.
     * It is called h4 because it has four primaries. Range: unbounded, in radians.
     * @param colorSpace The color space to use.
     */
    ph(colorSpace: PerceptualColorSpace): number {
        return toLCHHFromLAB(this.pa(colorSpace), this.pb(colorSpace));
    }

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

    static fromLCH(l: number, c: number, h: number, colorSpace: PerceptualColorSpace): Color {
        return Color.fromLAB(
            l,
            toLABAFromLCH(c, h),
            toLABBFromLCH(c, h),
            colorSpace,
        );
    }

    // Common

    css(): string {
        return toCSSFromCIE1931XYZ(this._X, this._Y, this._Z);
    }
}