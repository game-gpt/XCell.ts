import type { Plugin } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_VIRTUAL_MODULE_ID = "virtual:docs";
const RESOLVED_DOCS_VIRTUAL_MODULE_ID = "\0" + DOCS_VIRTUAL_MODULE_ID;

function traverseDir(
    dir: string,
    relativePath: string = "",
    docs: Record<string, string>,
) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        // 排除维护者文档目录
        if (file === "maintainer") {
            continue;
        }

        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            traverseDir(fullPath, path.join(relativePath, file), docs);
        } else if (file.endsWith(".md")) {
            const content = fs.readFileSync(fullPath, "utf-8");
            const key = path.join(relativePath, file).replace(/\\/g, "/");
            docs[key] = content;
            if (file === "readme.md") {
                console.log(`Found readme.md file: ${key}`);
            }
        }
    }
}

export default function docsPlugin(): Plugin {
    return {
        name: "vite-plugin-docs",
        resolveId(id) {
            if (id === DOCS_VIRTUAL_MODULE_ID) {
                return RESOLVED_DOCS_VIRTUAL_MODULE_ID;
            }
            return null;
        },
        load(id) {
            if (id === RESOLVED_DOCS_VIRTUAL_MODULE_ID) {
                let docsDir: string;
                try {
                    docsDir = path.dirname(
                        new URL(
                            import.meta.resolve("@lingame/xcell-documentation"),
                        ).pathname,
                    );
                    console.log(`Resolved docsDir from package: ${docsDir}`);
                } catch (e) {
                    docsDir = path.resolve(__dirname, "../../documentation");
                    console.log(`Resolved docsDir from fallback: ${docsDir}`);
                }

                console.log(`Using docsDir: ${docsDir}`);
                console.log(`DocsDir exists: ${fs.existsSync(docsDir)}`);

                const docs: Record<string, string> = {};

                traverseDir(docsDir, "", docs);

                console.log(`Found ${Object.keys(docs).length} files`);
                console.log(`First 5 files:`, Object.keys(docs).slice(0, 5));

                // 确保所有值都是字符串
                Object.keys(docs).forEach((key) => {
                    if (typeof docs[key] !== "string") {
                        docs[key] = String(docs[key]);
                    }
                });

                return `
				  export const docsModules = ${JSON.stringify(docs)}
				`;
            }
            return null;
        },
    };
}
