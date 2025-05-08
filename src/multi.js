import {
    fromCIE1931XYZToLMSL,
    fromCIE1931XYZToLMSM,
    fromCIE1931XYZToLMSS,
    fromLMSDashToOklabL
} from "./conversions/index.js";

const SOURCE_SRGB = 0;
const SOURCE_ADOBE_RGB = 1;
const SOURCE_DISPLAY_P3 = 2;
const SOURCE_CIE1931XYZ = 3;
const SOURCE_CIE1931xyY = 4;
const SOURCE_OKLAB = 5;
const SOURCE_OKLCH = 6;
const SOURCE_CIELAB = 7;
const SOURCE_CIELCH = 8;

export class Color {
    // IPD-START
    _internal_source = SOURCE_SRGB;

    // CIE 1931 XYZ / xyY
    _internal_CIE1931_X = 0;
    _internal_CIE1931_Y = 0;
    _internal_CIE1931_Z = 0;
    _internal_CIE1931_x = 0;
    _internal_CIE1931_y = 0;

    // sRGB
    _internal_linear_sRGB_r = 0;
    _internal_linear_sRGB_g = 0;
    _internal_linear_sRGB_b = 0;
    _internal_sRGB_r = 0;
    _internal_sRGB_g = 0;
    _internal_sRGB_b = 0;
    _internal_sRGB_h = 0;
    _internal_sRGB_h2 = 0;
    _internal_sRGB_sv = 0;
    _internal_sRGB_sl = 0;
    _internal_sRGB_si = 0;
    _internal_sRGB_v = 0;
    _internal_sRGB_l = 0;
    _internal_sRGB_i = 0;

    // Adobe RGB
    _internal_linear_AdobeRGB_r = 0;
    _internal_linear_AdobeRGB_g = 0;
    _internal_linear_AdobeRGB_b = 0;
    _internal_AdobeRGB_r = 0;
    _internal_AdobeRGB_g = 0;
    _internal_AdobeRGB_b = 0;
    _internal_AdobeRGB_h = 0;
    _internal_AdobeRGB_h2 = 0;
    _internal_AdobeRGB_sv = 0;
    _internal_AdobeRGB_sl = 0;
    _internal_AdobeRGB_si = 0;
    _internal_AdobeRGB_v = 0;
    _internal_AdobeRGB_l = 0;
    _internal_AdobeRGB_i = 0;

    // Display P3
    _internal_linear_DisplayP3_r = 0;
    _internal_linear_DisplayP3_g = 0;
    _internal_linear_DisplayP3_b = 0;
    _internal_DisplayP3_r = 0;
    _internal_DisplayP3_g = 0;
    _internal_DisplayP3_b = 0;
    _internal_DisplayP3_h = 0;
    _internal_DisplayP3_h2 = 0;
    _internal_DisplayP3_sv = 0;
    _internal_DisplayP3_sl = 0;
    _internal_DisplayP3_si = 0;
    _internal_DisplayP3_v = 0;
    _internal_DisplayP3_l = 0;
    _internal_DisplayP3_i = 0;

    // Oklab / Oklch

    _internal_Ok_l = 0;
    _internal_Ok_a = 0;
    _internal_Ok_b = 0;
    _internal_Ok_c = 0;
    _internal_Ok_h = 0;

    // CIELAB / CIELCH
    _internal_CIE_l = 0;
    _internal_CIE_a = 0;
    _internal_CIE_b = 0;
    _internal_CIE_c = 0;
    _internal_CIE_h = 0;

    // IPD-END

    static fromRGB(r, g, b, colorSpace) {
        const color = new Color();

        if(colorSpace === "sRGB") {
            color._internal_source = SOURCE_SRGB;
            color._internal_sRGB_r = r;
            color._internal_sRGB_g = g;
            color._internal_sRGB_b = b;
        } else if(colorSpace === "Adobe RGB") {
            color._internal_source = SOURCE_ADOBE_RGB;
            color._internal_AdobeRGB_r = r;
            color._internal_AdobeRGB_g = g;
            color._internal_AdobeRGB_b = b;
        } else {
            color._internal_source = SOURCE_DISPLAY_P3;
            color._internal_DisplayP3_r = r;
            color._internal_DisplayP3_g = g;
            color._internal_DisplayP3_b = b;
        }

        return color;
    }

    static fromHSL(h, s, l, colorSpace) {
        const color = new Color();

        if(colorSpace === "sRGB") {
            // TODO: source
            color._internal_sRGB_h = h;
            color._internal_sRGB_sl = s;
            color._internal_sRGB_l = l;
        } else if(colorSpace === "Adobe RGB") {
            color._internal_AdobeRGB_h = h;
            color._internal_AdobeRGB_sl = s;
            color._internal_AdobeRGB_l = l;
        } else {
            color._internal_DisplayP3_h = h;
            color._internal_DisplayP3_sl = s;
            color._internal_DisplayP3_l = l;
        }

        return color;
    }

    static fromHSV(h, s, v, colorSpace) {
        const color = new Color();

        if(colorSpace === "sRGB") {
            // TODO: source
            color._internal_sRGB_h = h;
            color._internal_sRGB_sv = s;
            color._internal_sRGB_v = v;
        } else if(colorSpace === "Adobe RGB") {
            color._internal_AdobeRGB_h = h;
            color._internal_AdobeRGB_sv = s;
            color._internal_AdobeRGB_v = v;
        } else {
            color._internal_DisplayP3_h = h;
            color._internal_DisplayP3_sv = s;
            color._internal_DisplayP3_v = v;
        }

        return color;
    }

    static fromHSI(h, s, i, colorSpace) {
        const color = new Color();

        if(colorSpace === "sRGB") {
            // TODO: source
            color._internal_sRGB_h2 = h;
            color._internal_sRGB_si = s;
            color._internal_sRGB_i = i;
        } else if(colorSpace === "Adobe RGB") {
            color._internal_AdobeRGB_h2 = h;
            color._internal_AdobeRGB_si = s;
            color._internal_AdobeRGB_i = i;
        } else {
            color._internal_DisplayP3_h2 = h;
            color._internal_DisplayP3_si = s;
            color._internal_DisplayP3_i = i;
        }

        return color;
    }

    X() {
        if(this._internal_CIE1931_X !== undefined) {
        }
        // TODO
        return this._internal_CIE1931_X;
    }

    r(colorSpace) {
        if(colorSpace === "sRGB") {
            if(this._internal_sRGB_r !== undefined) {
            }
            // TODO
            return this._internal_sRGB_r;
        }

        if(colorSpace === "Adobe RGB") {
            if(this._internal_AdobeRGB_r !== undefined) {
            }
            // TODO
            return this._internal_AdobeRGB_r;
        }

        // Display P3
        if(this._internal_DisplayP3_r !== undefined) {
        }
        // TODO
        return this._internal_DisplayP3_r;
    }

    g(colorSpace) {
        if(colorSpace === "sRGB") {
            if(this._internal_sRGB_g !== undefined) {
            }
            // TODO
            return this._internal_sRGB_g;
        }

        if(colorSpace === "Ab") {
        }
    }

    lu(colorSpace) {
        if(colorSpace === "Ok") {
            if(this._internal_Ok_l === undefined) {
                const x = this.X(),
                    y = this.Y(),
                    z = this.Z();

                // TODO: maybe cache LMS

                this._internal_Ok_l = fromLMSDashToOklabL(
                    Math.cbrt(fromCIE1931XYZToLMSL(x, y, z)),
                    Math.cbrt(fromCIE1931XYZToLMSM(x, y, z)),
                    Math.cbrt(fromCIE1931XYZToLMSS(x, y, z)),
                );
            }

            return this._internal_Ok_l;
        }

        if(this._internal_CIE_l === undefined) {

        }
    }
}