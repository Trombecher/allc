/**
 * Calculates the 3D Euclidean distance between two HSV colors.
 *
 * This function first calculates the 3D position of the HSV parameters
 * **in the HSV cone**, and then it calculates the Euclidean distance.
 * This is different and more accurate than the Euclidean distance
 * of just the HSV components.
 *
 * @param h1 The hue component of the first HSV color, unbounded, in radians.
 * @param s1 The saturation component of the first HSV color, typically in the range [0, 1].
 * @param v1 The value component of the first HSV color, typically in the range [0, 1].
 * @param h2 The hue component of the second HSV color, unbounded, in radians.
 * @param s2 The saturation component of the second HSV color, typically in the range [0, 1].
 * @param v2 The value component of the second HSV color, typically in the range [0, 1].
 *
 * @returns The color distance.
 */
export const distance3DHSV = (
    h1: number,
    s1: number,
    v1: number,
    h2: number,
    s2: number,
    v2: number,
) => Math.hypot(
    s1 * v1 * Math.cos(h1) - s2 * v2 * Math.cos(h2),
    s1 * v1 * Math.sin(h1) - s2 * v2 * Math.sin(h2),
    v1 - v2,
);

/**
 * Calculates the 3D Euclidean distance between two HSL colors.
 *
 * This function first calculates the 3D position of the HSL parameters
 * **in the HSL bicone**, and then it calculates the Euclidean distance.
 * This is different and more accurate than the Euclidean distance
 * of just the HSL components.
 *
 * @param h1 The hue component of the first HSL color, unbounded, in radians.
 * @param s1 The saturation component of the first HSL color, typically in the range [0, 1].
 * @param l1 The lightness component of the first HSL color, typically in the range [0, 1].
 * @param h2 The hue component of the second HSL color, unbounded, in radians.
 * @param s2 The saturation component of the second HSL color, typically in the range [0, 1].
 * @param l2 The lightness component of the second HSL color, typically in the range [0, 1].
 *
 * @returns The color distance.
 */
export const distance3DHSL = (
    h1: number,
    s1: number,
    l1: number,
    h2: number,
    s2: number,
    l2: number,
) => {
    const r1 = s1 * (1 - Math.abs(2 * l1 - 1)),
        r2 = s2 * (1 - Math.abs(2 * l2 - 1));

    return Math.hypot(
        r1 * Math.cos(h1) - r2 * Math.cos(h2),
        r1 * Math.sin(h1) - r2 * Math.sin(h2),
        l1 - l2,
    );
};

/**
 * Calculates the 3D Euclidean distance between two HSI colors.
 *
 * This function first calculates the 3D position of the HSI parameters,
 * and then it calculates the Euclidean distance.
 * This is different and more accurate than the Euclidean distance
 * of just the HSI components.
 *
 * @param h1 The hue component of the first HSI color, unbounded, in radians.
 * @param s1 The saturation component of the first HSI color, typically in the range [0, 1].
 * @param i1 The intensity component of the first HSI color, typically in the range [0, 1].
 * @param h2 The hue component of the second HSI color, unbounded, in radians.
 * @param s2 The saturation component of the second HSI color, typically in the range [0, 1].
 * @param i2 The intensity component of the second HSI color, typically in the range [0, 1].
 *
 * @returns The color distance.
 */
export const distance3DHSI = (
    h1: number,
    s1: number,
    i1: number,
    h2: number,
    s2: number,
    i2: number,
) => Math.hypot(
    i1 - i2,
    Math.cos(h1) * s1 - Math.cos(h2) * s2,
    Math.sin(h1) * s1 - Math.sin(h2) * s2,
);

/**
 * Calculates the CMC l:c (1984) color difference "ΔE*" between two CIELCH colors.
 *
 * @param l1 The luminance component of the first CIELCH color, range [0, 1].
 * @param c1 The chroma component of the first CIELCH color, unbounded, non-negative.
 * @param h1 The hue component of the first CIELCH color, unbounded, in radians.
 * @param l2 The luminance component of the second CIELCH color, range [0, 1].
 * @param c2 The chroma component of the second CIELCH color, unbounded, non-negative.
 * @param h2 The hue component of the second CIELCH color, unbounded, in radians.
 * @param l An optional lightness weight, defaults to 2.
 * @param c An optional chroma weight, defaults to 1.
 *
 * @returns The color difference.
 * @see https://en.wikipedia.org/wiki/Color_difference#CMC_l:c_(1984)
 */
export const distanceCMClc = (
    l1: number,
    c1: number,
    h1: number,
    l2: number,
    c2: number,
    h2: number,
    l: number = 2,
    c: number = 1,
) => {
    const h1Normalized = betterMod(h1, Math.PI / 2),
        h2Normalized = betterMod(h2, Math.PI / 2);

    const sl = l1 < 16
        ? 0.511
        : (0.040975 * l1) / (1 + 0.01765 * l1);

    const sc = 0.0638 * c1 / (1 + 0.0131 * c1) + 0.638;

    const f = Math.sqrt(c1 ** 4 / (c1 ** 4 + 1900));

    // Constant values `164 / 180 * Math.PI` and `345 / 180 * Math.PI`.
    const t = 2.8623399732707004 <= h1Normalized && h1Normalized <= 6.021385919380437
        ? 0.56 + Math.abs(0.2 * Math.cos(h1Normalized + 2.9321531433504737)) // Constant value `Math.PI * 168 / 180`
        : 0.36 + Math.abs(0.4 * Math.cos(h1Normalized + 0.6108652381980153)); // Constant value `Math.PI * 35 / 180`

    const sh = sc * (f * t + 1 - f);
    const dh = Math.abs(h2Normalized - h1Normalized);

    return Math.hypot(
        (l2 - l1) / (l * sl),
        (c2 - c1) / (c * sc),

        // Calculate Delta H ab, the smallest angle in degrees between h1 and h2.
        (Math.min(dh, Math.PI * 2 * dh) / Math.PI * 180) / sh,
    );
};

export const CIE94_GRAPHICS_KL = 1;
export const CIE94_GRAPHICS_KC = 1;
export const CIE94_GRAPHICS_KH = 1;
export const CIE94_GRAPHICS_K1 = 0.045;
export const CIE94_GRAPHICS_K2 = 0.015;

export const CIE94_TEXTILE_KL = 2;
export const CIE94_TEXTILE_KC = 1;
export const CIE94_TEXTILE_KH = 1;
export const CIE94_TEXTILE_K1 = 0.048;
export const CIE94_TEXTILE_K2 = 0.015;

/**
 * Calculates the CIE94 color difference "ΔE*" between two CIELAB colors.
 * Below, there is a table for the application-dependent parameters.
 *
 * | Parameter | Graphics (default)                            | Textile                                     |
 * |-----------|-----------------------------------------------|---------------------------------------------|
 * | `kl`      | {@link CIE94_GRAPHICS_KL `CIE94_GRAPHICS_KL`} | {@link CIE94_TEXTILE_KL `CIE94_TEXTILE_KL`} |
 * | `kc`      | {@link CIE94_GRAPHICS_KC `CIE94_GRAPHICS_KC`} | {@link CIE94_TEXTILE_KC `CIE94_TEXTILE_KC`} |
 * | `kh`      | {@link CIE94_GRAPHICS_KH `CIE94_GRAPHICS_KH`} | {@link CIE94_TEXTILE_KH `CIE94_TEXTILE_KH`} |
 * | `K1`      | {@link CIE94_GRAPHICS_K1 `CIE94_GRAPHICS_K1`} | {@link CIE94_TEXTILE_K1 `CIE94_TEXTILE_K1`} |
 * | `K2`      | {@link CIE94_GRAPHICS_K2 `CIE94_GRAPHICS_K2`} | {@link CIE94_TEXTILE_K2 `CIE94_TEXTILE_K2`} |
 *
 * @param l1 The luminance component of the first CIELAB color, range [0, 1].
 * @param a1 The a component of the first CIELAB color, unbounded.
 * @param b1 The b component of the first CIELAB color, unbounded.
 * @param l2 The luminance component of the second CIELAB color, range [0, 1].
 * @param a2 The a component of the second CIELAB color, unbounded.
 * @param b2 The b component of the second CIELAB color, unbounded.
 * @param kl An optional, application-dependent luminance weight.
 * @param kc An optional, application-dependent chroma weight.
 * @param kh An optional, application-dependent hue weight.
 * @param K1 An optional, application-dependent value.
 * @param K2 An optional, application-dependent value.
 *
 * @returns The color difference.
 * @see https://en.wikipedia.org/wiki/Color_difference#CIE94
 */
export const distanceCIE94 = (
    l1: number,
    a1: number,
    b1: number,
    l2: number,
    a2: number,
    b2: number,
    kl: number = CIE94_GRAPHICS_KL,
    kc: number = CIE94_GRAPHICS_KC,
    kh: number = CIE94_GRAPHICS_KH,
    K1: number = CIE94_GRAPHICS_K1,
    K2: number = CIE94_GRAPHICS_K2,
) => {
    const c1 = Math.hypot(a1, b1),
        c2 = Math.hypot(a2, b2);

    return Math.hypot(
        (l2 - l1) / kl,
        (c2 - c1) / (kc * (1 + K1 * c1)),
        Math.hypot(
            a2 - a1,
            b2 - b1,
            c2 - c1,
        ) / (kh * (1 + K2 * c1)),
    );
};

/**
 * Calculates the CIEDE2000 color difference "ΔE*" between two CIELAB colors.
 *
 * @param l1 The luminance component of the first CIELAB color, range [0, 1].
 * @param a1 The a component of the first CIELAB color, unbounded.
 * @param b1 The b component of the first CIELAB color, unbounded.
 * @param l2 The luminance component of the second CIELAB color, range [0, 1].
 * @param a2 The a component of the second CIELAB color, unbounded.
 * @param b2 The b component of the second CIELAB color, unbounded.
 * @param kl An optional, application-dependent luminance weight, defaults to 1.
 * @param kc An optional, application-dependent chroma weight, defaults to 1.
 * @param kh An optional, application-dependent hue weight, defaults to 1.
 *
 * @returns The color difference.
 * @see https://en.wikipedia.org/wiki/Color_difference#CIEDE2000
 */
export const distanceCIEDE2000 = (
    l1: number,
    a1: number,
    b1: number,
    l2: number,
    a2: number,
    b2: number,
    kl: number = 1,
    kc: number = 1,
    kh: number = 1,
) => {
    const c1 = Math.hypot(a1, b1),
        c2 = Math.hypot(a2, b2);

    const cAverage = (c1 + c2) / 2;

    const aDashTerm = (1 - Math.sqrt(cAverage ** 7 / (cAverage ** 7 + 25 ** 7)));
    const a1Dash = a1 + a1 / 2 * aDashTerm,
        a2Dash = a2 + a2 / 2 * aDashTerm;

    const c1Dash = Math.hypot(a2Dash, b1),
        c2Dash = Math.hypot(a2Dash, b2);

    const lAverage = (l1 + l2) / 2;
    const lAverage50 = (lAverage - 50) * (lAverage - 50);
    const sl = 1 + 0.015 * lAverage50 / Math.sqrt(20 + lAverage50);

    const cDashAverage = (c1Dash + c2Dash) / 2;

    const h1Dash = Math.atan2(b1, a1Dash) % (2 * Math.PI),
        h2Dash = Math.atan2(b2, a2Dash) % (2 * Math.PI);

    const hDashDiff = Math.abs(h2Dash - h1Dash);

    /*
    const deltaHDashSmall = hDashDiff <= Math.PI
        ? h2Dash - h1Dash
        : h2Dash <= h1Dash
            ? h2Dash - h1Dash + 2 * Math.PI
            : h2Dash - h1Dash - 2 * Math.PI;
    */

    const deltaHDash = 2 * Math.sqrt(c1Dash * c2Dash) * Math.sin(Math.PI * (a1Dash - a2Dash) / 360);

    const hDashAverage = hDashDiff <= Math.PI
        ? (h1Dash + h2Dash) / 2
        : h1Dash + h2Dash < Math.PI * 2
            ? (h1Dash + h2Dash + Math.PI * 2) / 2
            : (h2Dash - h1Dash - Math.PI * 2) / 2;

    const t = 1
        - 0.17 * Math.cos(hDashAverage - Math.PI / 6)
        + 0.24 * Math.cos(2 * hDashAverage)
        + 0.32 * Math.cos(3 * hDashAverage + Math.PI / 30)
        // Constant value `63 * Math.PI / 180`
        - 0.2 * Math.cos(4 * hDashAverage - 1.0995574287564271);

    const sc = 1 + 0.045 * cDashAverage,
        sh = 1 + 0.015 * cDashAverage * cDashAverage * t;

    const rt = -2 * Math.sqrt(cAverage ** 7 / (cAverage ** 7 + 25 ** 7))
        // Constant values `275 * Math.PI / 180` and `25 * Math.PI / 180`
        * Math.sin(Math.PI / 3 * Math.exp(-(((hDashAverage - 4.799655442984406) / 0.4363323129985824) ** 2)));

    return Math.sqrt(
        (l2 - l1) * (l2 - l1) / (kl * sl * kl * sl)
        + (c2Dash - c1Dash) * (c2Dash - c1Dash) / (kc * sc * kc * sc)
        + deltaHDash * deltaHDash / (kh * sh * kh * sh)
        + rt * (c2Dash - c1Dash) / (kc * sc) * deltaHDash * (kh * sh),
    );
};

const betterMod = (x: number, m: number) => ((x % m) + m) % m;