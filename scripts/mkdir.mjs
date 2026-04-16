import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const root = "e:\\灵之镜有限公司\\XCell copy";

const dirs = [
    "compilers/xcell-core/src",
    "compilers/xcell-parser/src",
    "compilers/xcell-config/src",
    "compilers/xcell-analyzer/src",
    "compilers/xcell-generator/src",
    "compilers/xcell/src",
    "runtimes/xcell-runtime/src",
];

for (const dir of dirs) {
    const full = join(root, dir);
    await mkdir(full, { recursive: true });
    console.log(`Created: ${dir}`);
}

console.log("Done.");
