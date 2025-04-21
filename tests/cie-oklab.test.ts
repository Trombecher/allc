import {test} from "vitest";
import {RGB} from "../src";

test("testing", () => {
    console.log(new RGB(1, 1, 1, "sRGB")
        .toLinearRGB()
        .toCIE1931XYZ());
})