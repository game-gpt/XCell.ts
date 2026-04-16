import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var DOCS_VIRTUAL_MODULE_ID = "virtual:docs";
var RESOLVED_DOCS_VIRTUAL_MODULE_ID = "\0" + DOCS_VIRTUAL_MODULE_ID;
function traverseDir(dir, relativePath, docs) {
    if (relativePath === void 0) {
        relativePath = "";
    }
    var files = fs.readdirSync(dir);
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        // 排除维护者文档目录
        if (file === "maintainer") {
            continue;
        }
        var fullPath = path.join(dir, file);
        var stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            traverseDir(fullPath, path.join(relativePath, file), docs);
        } else if (file.endsWith(".md")) {
            var content = fs.readFileSync(fullPath, "utf-8");
            var key = path.join(relativePath, file).replace(/\\/g, "/");
            docs[key] = content;
            if (file === "readme.md") {
                console.log("Found readme.md file: ".concat(key));
            }
        }
    }
}
export default function docsPlugin() {
    return {
        name: "vite-plugin-docs",
        resolveId: function (id) {
            if (id === DOCS_VIRTUAL_MODULE_ID) {
                return RESOLVED_DOCS_VIRTUAL_MODULE_ID;
            }
            return null;
        },
        load: function (id) {
            if (id === RESOLVED_DOCS_VIRTUAL_MODULE_ID) {
                var docsDir = void 0;
                try {
                    docsDir = path.dirname(
                        new URL(
                            import.meta.resolve("@lingame/xcell-documentation"),
                        ).pathname,
                    );
                    console.log(
                        "Resolved docsDir from package: ".concat(docsDir),
                    );
                } catch (e) {
                    docsDir = path.resolve(__dirname, "../../documentation");
                    console.log(
                        "Resolved docsDir from fallback: ".concat(docsDir),
                    );
                }
                console.log("Using docsDir: ".concat(docsDir));
                console.log("DocsDir exists: ".concat(fs.existsSync(docsDir)));
                var docs_1 = {};
                traverseDir(docsDir, "", docs_1);
                console.log(
                    "Found ".concat(Object.keys(docs_1).length, " files"),
                );
                console.log("First 5 files:", Object.keys(docs_1).slice(0, 5));
                // 确保所有值都是字符串
                Object.keys(docs_1).forEach(function (key) {
                    if (typeof docs_1[key] !== "string") {
                        docs_1[key] = String(docs_1[key]);
                    }
                });
                return "\n\t\t\t\t  export const docsModules = ".concat(
                    JSON.stringify(docs_1),
                    "\n\t\t\t\t",
                );
            }
            return null;
        },
    };
}
