// Constants from `src-comptime/gen-ydbdr-inverse-matrix.ts`.

// TODO: docs
export const toRGBRFromYDbDr = (
    y: number,
    db: number,
    dr: number,
) => y + 0.00009230371614763741 * db - 0.5259126306618653 * dr;

// TODO: docs
export const toRGBGFromYDbDr = (
    y: number,
    db: number,
    dr: number,
) => y - 0.1291328988905093 * db + 0.2678993282075988 * dr;

// TODO: docs
export const toRGBBFromYDbDr = (
    y: number,
    db: number,
    dr: number,
) => y + 0.6646790599789548 * db - 0.00007920254353310786 * dr;