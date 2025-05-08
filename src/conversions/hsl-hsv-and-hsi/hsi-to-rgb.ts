/*
switch(hPrime | 0) {
    case 0: return new RGB(c + m, x + m, m, this._);
    case 1: return new RGB(x + m, c + m, m, this._);
    case 2: return new RGB(m, c + m, x + m, this._);
    case 3: return new RGB(m, x + m, c + m, this._);
    case 4: return new RGB(x + m, m, c + m, this._);
}
return new RGB(c + m, m, x + m, this._);
 */

/**
 * Calculates the red component of RGB from HSI.
 *
 * @param h The HSI hue component, sometimes called _h6_, in radians.
 * @param s The HSI saturation component, typically in the range [0, 1].
 * @param i The HSI intensity component, typically in the range [0, 1].
 *
 * @returns The red component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSI_to_RGB
 */
export const toRGBRFromHSI = (
    h: number,
    s: number,
    i: number,
) => {
    const hPrime = (h * 3 / Math.PI) % 6;
    const z = 1 - Math.abs(hPrime % 2 - 1);
    const c = 3 * i * s / (1 + z);

    return i * (1 - s) // m
        // Equivalent to adding `x = c * z` if `(hPrime | 0) == 1 || (hPrime | 0) == 4`.
        + (hPrime | 0) % 3 % 2 * c * z
        // Equivalent to adding `c` if `(hPrime | 0) == 0 || (hPrime | 0) == 5`.
        + +!((hPrime | 0) % 5) * c;
};

/**
 * Calculates the green component of RGB from HSI.
 *
 * @param h The HSI hue component, sometimes called _h6_, in radians.
 * @param s The HSI saturation component, typically in the range [0, 1].
 * @param i The HSI intensity component, typically in the range [0, 1].
 *
 * @returns The green component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSI_to_RGB
 */
export const toRGBGFromHSI = (
    h: number,
    s: number,
    i: number,
) => {
    const hPrime = (h * 3 / Math.PI) % 6;
    const z = 1 - Math.abs(hPrime % 2 - 1);
    const c = 3 * i * s / (1 + z);

    return i * (1 - s) // m
        // Equivalent to adding `x = c * z` if `(hPrime | 0) == 0 || (hPrime | 0) == 3`.
        + +!((hPrime | 0) % 3) * c * z
        // Equivalent to adding `c` if `(hPrime | 0) == 1 || (hPrime | 0) == 2`.
        + +!(((hPrime | 0) + 5) % 6 > 1) * c;
};

/**
 * Calculates the blue component of RGB from HSI.
 *
 * @param h The HSI hue component, sometimes called _h6_, in radians.
 * @param s The HSI saturation component, typically in the range [0, 1].
 * @param i The HSI intensity component, typically in the range [0, 1].
 *
 * @returns The blue component, typically in the range [0, 1].
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSI_to_RGB
 */
export const toRGBBFromHSI = (
    h: number,
    s: number,
    i: number,
) => {
    const hPrime = (h * 3 / Math.PI) % 6;
    const z = 1 - Math.abs(hPrime % 2 - 1);
    const c = 3 * i * s / (1 + z);

    return i * (1 - s) // m
        // Equivalent to adding `x = c * z` if `(hPrime | 0) == 2 || (hPrime | 0) == 5`.
        + +!((hPrime | 0) % 3 - 2) * c * z
        // Equivalent to adding `c` if `(hPrime | 0) == 3 || (hPrime | 0) == 4`.
        + +!(((hPrime | 0) + 1) % 6 < 4) * c;
};