import {
    MATRIX_RGB_FROM_YDbDr_0_0,
    MATRIX_RGB_FROM_YDbDr_0_1,
    MATRIX_RGB_FROM_YDbDr_0_2,
    MATRIX_RGB_FROM_YDbDr_1_0,
    MATRIX_RGB_FROM_YDbDr_1_1,
    MATRIX_RGB_FROM_YDbDr_1_2,
    MATRIX_RGB_FROM_YDbDr_2_0,
    MATRIX_RGB_FROM_YDbDr_2_1,
    MATRIX_RGB_FROM_YDbDr_2_2,
} from "../matrices";

// TODO: docs
export const toRGBRFromYDbDr = (y: number, db: number, dr: number) =>
    MATRIX_RGB_FROM_YDbDr_0_0 * y +
    MATRIX_RGB_FROM_YDbDr_0_1 * db +
    MATRIX_RGB_FROM_YDbDr_0_2 * dr;

// TODO: docs
export const toRGBGFromYDbDr = (y: number, db: number, dr: number) =>
    MATRIX_RGB_FROM_YDbDr_1_0 * y +
    MATRIX_RGB_FROM_YDbDr_1_1 * db +
    MATRIX_RGB_FROM_YDbDr_1_2 * dr;

// TODO: docs
export const toRGBBFromYDbDr = (y: number, db: number, dr: number) =>
    MATRIX_RGB_FROM_YDbDr_2_0 * y +
    MATRIX_RGB_FROM_YDbDr_2_1 * db +
    MATRIX_RGB_FROM_YDbDr_2_2 * dr;
