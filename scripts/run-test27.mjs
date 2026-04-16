import { spawn } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const EXAMPLE = join(ROOT, "examples", "real-project-27");
const BACKEND = join(EXAMPLE, "backend-placeholder", "src", "table");
const BACKEND_DATA = join(BACKEND, "data");
const TIMEOUT_MS = 120_000;

function runWithTimeout(command, args, cwd, timeout) {
    return new Promise((resolve, reject) => {
        const proc = spawn(command, args, { cwd, shell: true, stdio: "pipe" });
        let stdout = "";
        let stderr = "";

        proc.stdout.on("data", (d) => {
            stdout += d;
        });
        proc.stderr.on("data", (d) => {
            stderr += d;
        });

        const timer = setTimeout(() => {
            proc.kill("SIGKILL");
            reject(new Error(`进程超时 (${timeout / 1000}s)，已强制终止`));
        }, timeout);

        proc.on("close", (code) => {
            clearTimeout(timer);
            if (code === 0) resolve({ stdout, stderr });
            else
                reject(
                    new Error(`进程退出码: ${code}\n${stderr.slice(-2000)}`),
                );
        });

        proc.on("error", (err) => {
            clearTimeout(timer);
            reject(err);
        });
    });
}

function validateTsFiles(dir) {
    const errors = [];
    if (!existsSync(dir)) {
        errors.push(`目录不存在: ${dir}`);
        return errors;
    }

    const files = readdirSync(dir).filter((f) => f.endsWith(".ts"));
    for (const file of files) {
        const path = join(dir, file);
        const content = readFileSync(path, "utf-8");

        if (content.length === 0) {
            errors.push(`[空文件] ${file}`);
            continue;
        }

        if (content.includes("<%") && content.includes("%>")) {
            errors.push(
                `[未渲染模板] ${file} — 包含原始 DejaVu 语法 <% ... %>`,
            );
        }

        if (file !== "XCellManager.ts" && !content.includes("export class")) {
            errors.push(`[缺少导出类] ${file} — 不包含 export class`);
        }
    }
    return errors;
}

function validateJsonFiles(dir) {
    const errors = [];
    if (!existsSync(dir)) {
        errors.push(`目录不存在: ${dir}`);
        return errors;
    }

    const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
    for (const file of files) {
        const path = join(dir, file);
        const content = readFileSync(path, "utf-8");

        if (content.length === 0) {
            errors.push(`[空文件] ${file}`);
            continue;
        }

        let data;
        try {
            data = JSON.parse(content);
        } catch {
            errors.push(`[JSON 解析失败] ${file}`);
            continue;
        }

        if (Array.isArray(data)) {
            if (data.length === 0) {
                errors.push(`[空数组] ${file} — 数据为空数组`);
                continue;
            }
            const first = data[0];
            if (
                typeof first === "object" &&
                first !== null &&
                "field" in first &&
                "default" in first
            ) {
                errors.push(
                    `[Schema 格式] ${file} — class 表 JSON 应为运行时数据 [{field_name: value}]，而非 schema [{field, default}]`,
                );
            }
        } else if (typeof data === "object" && data !== null) {
            const keys = Object.keys(data);
            if (keys.length === 0) {
                errors.push(`[空对象] ${file} — 数据为空 Map`);
            }
        } else {
            errors.push(`[非预期格式] ${file} — JSON 既非数组也非对象`);
        }
    }
    return errors;
}

async function main() {
    console.log("=== XCell build:27 测试脚本 ===\n");
    console.log(`工作目录: ${ROOT}`);
    console.log(`超时设置: ${TIMEOUT_MS / 1000}s\n`);

    console.log(
        "[1/3] 执行 cargo run -- --workspace examples/real-project-27 ...",
    );
    const startTime = Date.now();
    try {
        const result = await runWithTimeout(
            "cargo",
            ["run", "--", "--workspace", "examples/real-project-27"],
            ROOT,
            TIMEOUT_MS,
        );
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`      完成 (${elapsed}s)\n`);
        if (result.stderr.trim()) {
            const lines = result.stderr
                .trim()
                .split("\n")
                .filter((l) => l.includes("error") || l.includes("warning"));
            if (lines.length > 0) {
                console.log("      stderr 摘要:");
                for (const line of lines.slice(0, 5)) {
                    console.log(`        ${line.trim()}`);
                }
                console.log();
            }
        }
    } catch (err) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`      失败 (${elapsed}s): ${err.message}\n`);
        process.exit(1);
    }

    console.log("[2/3] 验证 TypeScript 产物 ...");
    const tsErrors = validateTsFiles(BACKEND);
    if (tsErrors.length === 0) {
        const tsFiles = readdirSync(BACKEND).filter((f) => f.endsWith(".ts"));
        console.log(`      通过 (${tsFiles.length} 个 .ts 文件)\n`);
    } else {
        console.log(`      发现 ${tsErrors.length} 个问题:`);
        for (const e of tsErrors) {
            console.log(`        ${e}`);
        }
        console.log();
    }

    console.log("[3/3] 验证 JSON 数据产物 ...");
    const jsonErrors = validateJsonFiles(BACKEND_DATA);
    if (jsonErrors.length === 0) {
        if (existsSync(BACKEND_DATA)) {
            const jsonFiles = readdirSync(BACKEND_DATA).filter((f) =>
                f.endsWith(".json"),
            );
            console.log(`      通过 (${jsonFiles.length} 个 .json 文件)\n`);
        } else {
            console.log("      跳过 (data 目录不存在)\n");
        }
    } else {
        console.log(`      发现 ${jsonErrors.length} 个问题:`);
        for (const e of jsonErrors) {
            console.log(`        ${e}`);
        }
        console.log();
    }

    const totalErrors = tsErrors.length + jsonErrors.length;
    if (totalErrors > 0) {
        console.log(`=== 失败: 共 ${totalErrors} 个问题 ===`);
        process.exit(1);
    } else {
        console.log("=== 全部通过 ===");
    }
}

main();
