// Common color operations

export interface Color<ColorClass extends Color<ColorClass>> {
    /**
     * Clamps all components to their respective ranges (depending on the color model).
     *
     * @returns A new instance of the current color with the components clamped.
     */
    clamp(): ColorClass;

    /**
     * Converts the current color to CSS.
     *
     * @param withAlpha If omitted, the alpha channel will be omitted.
     * @returns A CSS string representing the color.
     */
    toCSS(withAlpha?: number): string;
}