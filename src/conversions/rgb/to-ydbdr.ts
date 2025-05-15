import {
    MATRIX_YDbDr_FROM_RGB_0_0,
    MATRIX_YDbDr_FROM_RGB_0_1,
    MATRIX_YDbDr_FROM_RGB_0_2,
    MATRIX_YDbDr_FROM_RGB_1_0,
    MATRIX_YDbDr_FROM_RGB_1_1,
    MATRIX_YDbDr_FROM_RGB_1_2,
    MATRIX_YDbDr_FROM_RGB_2_0,
    MATRIX_YDbDr_FROM_RGB_2_1,
    MATRIX_YDbDr_FROM_RGB_2_2,
} from "../../matrices";

// TODO: docs
export const toYDbDrYFromRGB = (
    r: number,
    g: number,
    b: number,
) => MATRIX_YDbDr_FROM_RGB_0_0 * r
    + MATRIX_YDbDr_FROM_RGB_0_1 * g
    + MATRIX_YDbDr_FROM_RGB_0_2 * b;

// TODO: docs
export const toYDbDrDbFromRGB = (
    r: number,
    g: number,
    b: number,
) => MATRIX_YDbDr_FROM_RGB_1_0 * r
    + MATRIX_YDbDr_FROM_RGB_1_1 * g
    + MATRIX_YDbDr_FROM_RGB_1_2 * b;

// TODO: docs
export const toYDbDrDrFromRGB = (
    r: number,
    g: number,
    b: number,
) => MATRIX_YDbDr_FROM_RGB_2_0 * r
    + MATRIX_YDbDr_FROM_RGB_2_1 * g
    + MATRIX_YDbDr_FROM_RGB_2_2 * b;