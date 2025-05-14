// Formulas and constants stem from https://en.wikipedia.org/wiki/YDbDr#Formulas.

// TODO: docs
export const toYDbDrYFromRGB = (
    r: number,
    g: number,
    b: number,
) => 0.299 * r + 0.587 * g + 0.114 * b;

// TODO: docs
export const toYDbDrDbFromRGB = (
    r: number,
    g: number,
    b: number,
) => -0.450 * r - 0.883 * g + 1.333 * b;

// TODO: docs
export const toYDbDrDrFromRGB = (
    r: number,
    g: number,
    b: number,
) => -1.333 * r + 1.116 * g + 0.217 * b;