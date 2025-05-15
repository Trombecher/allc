import type {PerceptualColorSpace, RGBColorSpace} from "../../index";
import {
    toLinearAdobeRGBBFromCIE1931XYZ,
    toLinearAdobeRGBGFromCIE1931XYZ,
    toLinearAdobeRGBRFromCIE1931XYZ,
    toLinearDisplayP3BFromCIE1931XYZ,
    toLinearDisplayP3GFromCIE1931XYZ,
    toLinearDisplayP3RFromCIE1931XYZ,
    toLinearSRGBBFromCIE1931XYZ,
    toLinearSRGBGFromCIE1931XYZ,
    toLinearSRGBRFromCIE1931XYZ,
} from "../cie-1931-xyz";
import {
    toAdobeRGBComponentFromLinearAdobeRGBComponent,
    toDisplayP3ComponentFromLinearDisplayP3Component,
    toSRGBComponentFromLinearSRGBComponent,
} from "../linear-rgb";
import {toCIE1931XYZXFromCIELAB, toCIE1931XYZYFromCIELAB, toCIE1931XYZZFromCIELAB} from "./cielab-to-cie-1931-xyz";
import {toLABAFromLCH, toLABBFromLCH} from "./lch-to-lab";
import {
    toCIE1931XYZXFromLMS,
    toCIE1931XYZYFromLMS,
    toCIE1931XYZZFromLMS,
    toLMSComponentFromLMSDashComponent,
    toLMSDashLFromOklab,
    toLMSDashMFromOklab,
    toLMSDashSFromOklab,
} from "./oklab-to-cie-1931-xyz";

export const maxChromaIn = (
    targetColorSpace: RGBColorSpace,
    luminance: number,
    hue: number,
    chromaColorSpace: PerceptualColorSpace,
) => {
    let min = 0, max = 1;

    // Magic number
    while(max - min > 0.0001) {
        const mid = (min + max) / 2;

        const a = toLABAFromLCH(mid, hue),
            b = toLABBFromLCH(mid, hue);

        let x, y, z;

        if(chromaColorSpace === "Ok") {
            const lmsL = toLMSComponentFromLMSDashComponent(toLMSDashLFromOklab(luminance, a, b)),
                lmsM = toLMSComponentFromLMSDashComponent(toLMSDashMFromOklab(luminance, a, b)),
                lmsS = toLMSComponentFromLMSDashComponent(toLMSDashSFromOklab(luminance, a, b));

            x = toCIE1931XYZZFromLMS(lmsL, lmsM, lmsS);
            y = toCIE1931XYZYFromLMS(lmsL, lmsM, lmsS);
            z = toCIE1931XYZXFromLMS(lmsL, lmsM, lmsS);
        } else {
            x = toCIE1931XYZXFromCIELAB(luminance, a);
            y = toCIE1931XYZYFromCIELAB(luminance);
            z = toCIE1931XYZZFromCIELAB(luminance, b);
        }

        let red, green, blue;

        if(targetColorSpace === "sRGB") {
            red = toSRGBComponentFromLinearSRGBComponent(toLinearSRGBRFromCIE1931XYZ(x, y, z));
            green = toSRGBComponentFromLinearSRGBComponent(toLinearSRGBGFromCIE1931XYZ(x, y, z));
            blue = toSRGBComponentFromLinearSRGBComponent(toLinearSRGBBFromCIE1931XYZ(x, y, z));
        } else if(targetColorSpace === "Display P3") {
            red = toDisplayP3ComponentFromLinearDisplayP3Component(toLinearDisplayP3RFromCIE1931XYZ(x, y, z));
            green = toDisplayP3ComponentFromLinearDisplayP3Component(toLinearDisplayP3GFromCIE1931XYZ(x, y, z));
            blue = toDisplayP3ComponentFromLinearDisplayP3Component(toLinearDisplayP3BFromCIE1931XYZ(x, y, z));
        } else {
            // Adobe RGB
            red = toAdobeRGBComponentFromLinearAdobeRGBComponent(toLinearAdobeRGBRFromCIE1931XYZ(x, y, z));
            green = toAdobeRGBComponentFromLinearAdobeRGBComponent(toLinearAdobeRGBGFromCIE1931XYZ(x, y, z));
            blue = toAdobeRGBComponentFromLinearAdobeRGBComponent(toLinearAdobeRGBBFromCIE1931XYZ(x, y, z));
        }

        if(0 <= red && red <= 1
            && 0 <= green && green <= 1
            && 0 <= blue && blue <= 1) {
            min = mid;
        } else {
            max = mid;
        }
    }

    return min;
};