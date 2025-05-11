const SIN_60 = Math.sin(Math.PI / 3);

/**
 * Calculates the shared hue component of HSL and HSV (six primaries) from RGB.
 *
 * @param r The red component of RGB, typically in the range [0, 1].
 * @param g The green component of RGB, typically in the range [0, 1].
 * @param b The blue component of RGB, typically in the range [0, 1].
 *
 * @returns The shared hue component of HSL and HSV, in radians.
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
 */
export const toSharedHueFromRGB = (
    r: number,
    g: number,
    b: number,
) => {
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        chroma = max - min;

    if(chroma === 0) return 0;
    if(max === r) return Math.PI / 3 * (((g - b) / chroma) % 6);
    if(max === g) return Math.PI / 3 * (2 + (b - r) / chroma);
    return Math.PI / 3 * (4 + (r - g) / chroma);
};

/**
 * Calculates the lightness component of HSL from RGB.
 *
 * @param r The red component of RGB, typically in the range [0, 1].
 * @param g The green component of RGB, typically in the range [0, 1].
 * @param b The blue component of RGB, typically in the range [0, 1].
 *
 * @returns The lightness component of HSL, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
 */
export const toHSLLFromRGB = (
    r: number,
    g: number,
    b: number,
) => {
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    return (max + min) / 2;
};

/**
 * Calculates the saturation component of HSL from RGB.
 *
 * @param r The red component of RGB, typically in the range [0, 1].
 * @param g The green component of RGB, typically in the range [0, 1].
 * @param b The blue component of RGB, typically in the range [0, 1].
 *
 * @returns The saturation component of HSL, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
 */
export const toHSLSFromRGB = (
    r: number,
    g: number,
    b: number,
) => {
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        l = (max + min) / 2,
        chroma = max - min;

    return (l === 0 || l === 1)
        ? 0
        : chroma / (1 - Math.abs(2 * Math.max(r, g, b) - chroma - 1));
};

/**
 * Calculates the saturation component of HSV from RGB.
 *
 * @param r The red component of RGB, typically in the range [0, 1].
 * @param g The green component of RGB, typically in the range [0, 1].
 * @param b The blue component of RGB, typically in the range [0, 1].
 *
 * @returns The saturation component of HSV, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
 */
export const toHSVSFromRGB = (
    r: number,
    g: number,
    b: number,
) => {
    const value = Math.max(r, g, b),
        min = Math.min(r, g, b),
        chroma = value - min;

    return value === 0 ? 0 : chroma / value;
};

/**
 * Calculates the value component of HSV from RGB.
 *
 * @param r The red component of RGB, typically in the range [0, 1].
 * @param g The green component of RGB, typically in the range [0, 1].
 * @param b The blue component of RGB, typically in the range [0, 1].
 *
 * @returns The value component of HSV, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
 */
export const toHSVVFromRGB = (
    r: number,
    g: number,
    b: number,
) => Math.max(r, g, b);

/**
 * Calculates the hue component of HSI (typically called _h2_) from RGB.
 *
 * @param r The red component of RGB, typically in the range [0, 1].
 * @param g The green component of RGB, typically in the range [0, 1].
 * @param b The blue component of RGB, typically in the range [0, 1].
 *
 * @returns The hue component of HSI, in radians.
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma
 */
export const toHSIHFromRGB = (
    r: number,
    g: number,
    b: number,
) => {
    const alpha = (2 * r - g - b) / 2;
    const beta = SIN_60 * (g - b) / 2;
    return Math.atan2(beta, alpha);
};

/**
 * Calculates the saturation component of HSI from RGB.
 *
 * @param r The red component, typically in the range [0, 1].
 * @param g The green component, typically in the range [0, 1].
 * @param b The blue component, typically in the range [0, 1].
 *
 * @returns The saturation component of HSI, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma
 */
export const toHSISFromRGB = (
    r: number,
    g: number,
    b: number,
) => {
    const i = (r + g + b) / 3;
    return i === 0 ? 0 : 1 - Math.min(r, g, b) / i;
};

/**
 * Calculates the intensity component of HSI from RGB.
 *
 * @param r The red component of RGB, typically in the range [0, 1].
 * @param g The green component of RGB, typically in the range [0, 1].
 * @param b The blue component of RGB, typically in the range [0, 1].
 *
 * @returns The intensity component of HSI, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma
 */
export const toHSIIFromRGB = (
    r: number,
    g: number,
    b: number,
) => (r + g + b) + 3;