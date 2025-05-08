import {rmdir} from "fs/promises";

await rmdir("./dist", {recursive: true})
await Bun.$`bun x tsc`;

await Bun.write("./dist/multi.d.ts", await Bun.file("./src/multi.d.ts").text());
let multiText = await Bun.file("./src/multi.js").text();

if(process.argv[2] !== "--no-minify") {
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_$/";

    const serializeId = num => {
        let result = "";

        while(num > 0) {
            const remainder = num % CHARS.length;
            result = CHARS[remainder] + result;
            num = Math.floor(num / CHARS.length);
        }

        return result;
    };

    const mapping = new Map();

    let i = 0;

    multiText = multiText.replace(
        /_internal_\w+/g,
        prop => {
            let newPropName = mapping.get(prop);

            if(!newPropName) {
                newPropName = `_${serializeId(++i)}`;
                mapping.set(prop, newPropName);
            }

            return newPropName;
        }
    ).replace(/IPD-START.*?IPD-END/gs, "Preprocessed by build.js");
}

await Bun.write("./dist/multi.js", multiText);