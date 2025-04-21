/**
 * Interface to standardize documentation for color models and spaces.
 * 
 * @template This This is the current class.
 */
export interface Color<This extends Color<This>> {
    /**
     * Clamps all components to their respective ranges (depending on the color model).
     *
     * @returns A new instance of the current color with the components clamped.
     */
    clamp(): This;

    /**
     * Converts the current color to CSS.
     *
     * @param withAlpha If omitted, the alpha channel will be omitted.
     * @returns A CSS string representing the color.
     */
    toCSS(withAlpha?: number): string;

    /**
     * Calculates the Euclidean difference between the current color and the given color.
     * 
     * @see https://en.wikipedia.org/wiki/Color_difference#Euclidean
     */
    distance(other: This): number;
}