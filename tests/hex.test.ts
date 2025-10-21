import {expect, test} from "vitest";
import {toHexStringFromRGB} from "../src/conversions/rgb/encode";

test("rgb <-> hex", () => {
    expect(toHexStringFromRGB(0, 0, 0)).toBe("000000");
    expect(toHexStringFromRGB(1, 1, 1)).toBe("ffffff");
    expect(toHexStringFromRGB(0.5, 0.5, 0.5)).toBe("808080");

    expect(toHexStringFromRGB(0, 1, 0, 1)).toBe("00ff00ff");
});
