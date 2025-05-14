import {YUV_SDTV_W_B, YUV_SDTV_W_G, YUV_SDTV_W_R, YUV_U_MAX, YUV_V_MAX} from "../yuv";

// TODO: docs
export const toYUVSDTVYFromRGB = (
    r: number,
    g: number,
    b: number,
) => YUV_SDTV_W_R * r + YUV_SDTV_W_G * g + YUV_SDTV_W_B * b;

// TODO: docs
export const toYUVSDTVUFromRGB = (
    r: number,
    g: number,
    b: number,
) => YUV_U_MAX * (b - YUV_SDTV_W_R * r + YUV_SDTV_W_G * g + YUV_SDTV_W_B * b) / (1 - YUV_SDTV_W_B);

// TODO: docs
export const toYUVSDTVVFromRGB = (
    r: number,
    g: number,
    b: number,
) => YUV_V_MAX * (r - YUV_SDTV_W_R * r + YUV_SDTV_W_G * g + YUV_SDTV_W_B * b) / (1 - YUV_SDTV_W_R);