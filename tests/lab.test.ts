import {test} from "vitest";
import {LCH} from "../src";

test("...", () => {
    const color = new LCH(0.75, 0.1783, 352.58 / 180 * Math.PI, "Ok")
        .toLAB();

    console.log(color);
});