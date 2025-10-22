import {test} from "vitest";
import {Color} from "../src";

test("other", () => {
    console.log(Color.fromHexString("#ffffff", "sRGB").css());
});
