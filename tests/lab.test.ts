import {test} from "vitest";
import {LAB, LCH} from "../src";

test("maxChromaIn", () => {
    const c = LAB.maxChromaIn(
        "Adobe RGB",
        0.747,
        352.58 / 180 * Math.PI,
        "CIE",
    );

    console.log(c);
});

test("...", () => {
    const color = new LCH(0.75, 0.1783, 352.58 / 180 * Math.PI, "Ok")
        .toLAB();

    console.log(color);
});