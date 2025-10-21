/**
 * Calculates an LMS' component from an LMS component.
 * This function is relevant for the conversion between
 * Oklab and CIE 1931 XYZ.
 *
 * @param component The LMS component.
 *
 * @returns The LMS' component.
 * @see https://bottosson.github.io/posts/oklab/#converting-from-xyz-to-oklab
 */
export const toLMSDashComponentFromLMSComponent = (component: number) =>
    Math.cbrt(component);

/*
The following constants stem from https://bottosson.github.io/posts/oklab/#converting-from-xyz-to-oklab.
*/

/**
 * Calculates the l component of LMS (Oklab) from CIE 1931 XYZ.
 *
 * @param x The X component of CIE 1931 XYZ.
 * @param y The Y component of CIE 1931 XYZ.
 * @param z The Z component of CIE 1931 XYZ.
 *
 * @returns The l component of LMS (Oklab).
 * @see https://bottosson.github.io/posts/oklab/#converting-from-xyz-to-oklab
 */
export const toLMSLFromCIE1931XYZ = (x: number, y: number, z: number) =>
    x * 0.8189330101 + y * 0.3618667424 + z * -0.1288597137;

/**
 * Calculates the m component of LMS (Oklab) from CIE 1931 XYZ.
 *
 * @param x The X component of CIE 1931 XYZ.
 * @param y The Y component of CIE 1931 XYZ.
 * @param z The Z component of CIE 1931 XYZ.
 *
 * @returns The m component of LMS (Oklab).
 * @see https://bottosson.github.io/posts/oklab/#converting-from-xyz-to-oklab
 */
export const toLMSMFromCIE1931XYZ = (x: number, y: number, z: number) =>
    x * 0.0329845436 + y * 0.9293118715 + z * 0.0361456387;

/**
 * Calculates the s component of LMS (Oklab) from CIE 1931 XYZ.
 *
 * @param x The X component of CIE 1931 XYZ.
 * @param y The Y component of CIE 1931 XYZ.
 * @param z The Z component of CIE 1931 XYZ.
 *
 * @returns The s component of LMS (Oklab).
 * @see https://bottosson.github.io/posts/oklab/#converting-from-xyz-to-oklab
 */
export const toLMSSFromCIE1931XYZ = (x: number, y: number, z: number) =>
    x * 0.0482003018 + y * 0.2643662691 + z * 0.633851707;

/*
The following constants stem from https://bottosson.github.io/posts/oklab/#converting-from-xyz-to-oklab.
*/

/**
 * Calculates the luminance component of Oklab from LMS' (Oklab).
 *
 * @param l The l component of LMS' (Oklab).
 * @param m The m component of LMS' (Oklab).
 * @param s The s component of LMS' (Oklab).
 *
 * @returns The luminance component of Oklab, typically in the range [0, 1].
 * @see https://bottosson.github.io/posts/oklab/#converting-from-xyz-to-oklab
 */
export const toOklabLFromLMSDash = (l: number, m: number, s: number) =>
    l * 0.2104542553 + m * 0.793617785 + s * -0.0040720468;

/**
 * Calculates the a component of Oklab from LMS' (Oklab).
 *
 * @param l The l component of LMS' (Oklab).
 * @param m The m component of LMS' (Oklab).
 * @param s The s component of LMS' (Oklab).
 *
 * @returns The a component of Oklab.
 * @see https://bottosson.github.io/posts/oklab/#converting-from-xyz-to-oklab
 */
export const toOklabAFromLMSDash = (l: number, m: number, s: number) =>
    l * 1.9779984951 + m * -2.428592205 + s * +0.4505937099;

/**
 * Calculates the b component of Oklab from LMS' (Oklab).
 *
 * @param l The l component of LMS' (Oklab).
 * @param m The m component of LMS' (Oklab).
 * @param s The s component of LMS' (Oklab).
 *
 * @returns The b component of Oklab.
 * @see https://bottosson.github.io/posts/oklab/#converting-from-xyz-to-oklab
 */
export const toOklabBFromLMSDash = (l: number, m: number, s: number) =>
    l * +0.0259040371 + m * 0.7827717662 + s * -0.808675766;
