// TODO: docs
export const toLABAFromLCH = (
    c: number,
    h: number,
) => c * Math.cos(h);

// TODO: docs
export const toLABBFromLCH = (
    c: number,
    h: number,
) => c * Math.sin(h);