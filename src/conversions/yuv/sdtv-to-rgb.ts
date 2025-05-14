import {YUV_SDTV_W_B, YUV_SDTV_W_G, YUV_SDTV_W_R, YUV_U_MAX, YUV_V_MAX} from "./index";

// TODO: docs
export const toRGBRFromYUVSDTV = (
    y: number,
    v: number,
) => y + v * (1 - YUV_SDTV_W_R) / (YUV_V_MAX);

// TODO: docs
export const toRGBGFromYUVSDTV = (
    y: number,
    u: number,
    v: number,
) => y
    - u * YUV_SDTV_W_B * (1 - YUV_SDTV_W_B) / (YUV_U_MAX * YUV_SDTV_W_G)
    - v * YUV_SDTV_W_R * (1 - YUV_SDTV_W_R) / (YUV_V_MAX * YUV_SDTV_W_G);

// TODO: docs
export const toRGBBFromYUVSDTV = (
    y: number,
    u: number,
) => y + u * (1 - YUV_SDTV_W_G) / YUV_U_MAX;