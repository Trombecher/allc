export * from "./sdtv-to-rgb";
export * from "./hdtv-to-rgb";

// Taken from https://en.wikipedia.org/wiki/Y%E2%80%B2UV#SDTV_with_BT.470.

/**
 * The U_max value from the Y'UV <-> RGB conversion. Used in Y'UV SDTV and HDTV.
 */
export const YUV_U_MAX = 0.436;

/**
 * The V_max value from the Y'UV <-> RGB conversion. Used in Y'UV SDTV and HDTV.
 */
export const YUV_V_MAX = 0.615;

/**
 * The W_R value from the Y'UV SDTV <-> RGB conversion.
 */
export const YUV_SDTV_W_R = 0.299;

/**
 * The W_G value from the Y'UV SDTV <-> RGB conversion.
 */
export const YUV_SDTV_W_G = 0.587;

/**
 * The W_B value from the Y'UV SDTV <-> RGB conversion.
 */
export const YUV_SDTV_W_B = 0.114;

/**
 * The W_R value from the Y'UV HDTV <-> RGB conversion.
 */
export const YUV_HDTV_W_R = 0.2126;

/**
 * The W_G value from the Y'UV HDTV <-> RGB conversion.
 */
export const YUV_HDTV_W_G = 0.7152;

/**
 * The W_B value from the Y'UV HDTV <-> RGB conversion.
 */
export const YUV_HDTV_W_B = 0.0722;