#!/usr/bin/env node

/**
 * WASI 构建脚本
 * 完整构建 wasi，使用 jco 转换，编译 dist
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, rmSync, statSync } from "fs";
import { join } from "path";
import { config } from './config.mjs';

// 打印当前工作目录
console.log("当前工作目录:", process.cwd());

const ROOT_DIR = process.cwd();
const WASI_DIR = join(ROOT_DIR, config.paths.wasm.dir);
const FRONTEND_DIR = join(ROOT_DIR, config.paths.frontend.xcell);
const FRONTEND_LIB_DIR = join(FRONTEND_DIR, config.paths.frontend.lib);

// 打印计算的路径
console.log("ROOT_DIR:", ROOT_DIR);
console.log("WASI_DIR:", WASI_DIR);
console.log("FRONTEND_DIR:", FRONTEND_DIR);
console.log("FRONTEND_LIB_DIR:", FRONTEND_LIB_DIR);

/**
 * 执行命令并打印输出
 * @param {string} cmd 命令
 * @param {string} cwd 工作目录
 * @param {string} step 步骤描述
 */
function runCommand(cmd, cwd = process.cwd(), step = "") {
    const stepInfo = step ? `[${step}] ` : "";
    console.log(`${stepInfo}执行命令: ${cmd} (在 ${cwd})`);
    try {
        execSync(cmd, { cwd, stdio: "inherit" });
    } catch (error) {
        console.error(`\n${stepInfo}命令执行失败:`);
        console.error(`  命令: ${cmd}`);
        console.error(`  目录: ${cwd}`);
        console.error(`  错误: ${error.message}`);
        if (error.stdout) {
            console.error(`  标准输出: ${error.stdout.toString()}`);
        }
        if (error.stderr) {
            console.error(`  标准错误: ${error.stderr.toString()}`);
        }
        throw new Error(`${stepInfo}命令执行失败: ${error.message}`);
    }
}

/**
 * 清理目录
 * @param {string} dir 目录路径
 */
function cleanDir(dir) {
    console.log(`清理目录: ${dir}`);
    if (existsSync(dir)) {
        rmSync(dir, { recursive: true, force: true });
    }
    mkdirSync(dir, { recursive: true });
    console.log(`目录已清理: ${dir}`);
}

/**
 * 构建 WASI
 */
function buildWasi() {
    console.log("=== 开始构建 WASI ===\n");

    // 1. 检查 WASI 目录是否存在
    console.log("1. 检查 WASI 目录...");
    if (!existsSync(WASI_DIR)) {
        console.error(`❌ 错误: WASI 目录不存在: ${WASI_DIR}`);
        console.error(`   提示: 请确保 xcell-wasi 后端目录已正确创建`);
        process.exit(1);
    }
    console.log(`✓ WASI 目录存在: ${WASI_DIR}`);

    // 2. 确保前端 lib 目录存在
    console.log("\n2. 准备前端 lib 目录...");
    try {
        cleanDir(FRONTEND_LIB_DIR);
        console.log(`✓ 前端 lib 目录准备完成`);
    } catch (error) {
        console.error(`❌ 错误: 清理目录失败: ${error.message}`);
        console.error(`   目录: ${FRONTEND_LIB_DIR}`);
        console.error(`   提示: 请检查目录权限是否正确`);
        process.exit(1);
    }

    // 3. 构建 WASI 组件
    console.log("\n3. 构建 WASI 组件...");
    try {
        runCommand(
            `cargo component build --target wasm32-wasip1 --release`,
            WASI_DIR,
            "构建 WASI 组件",
        );
        console.log("✓ WASI 组件构建成功");
    } catch (error) {
        console.error(`❌ 错误: WASI 组件构建失败`);
        console.error(`   提示: 请检查 Rust 代码是否有编译错误`);
        console.error(`   建议: 进入 ${WASI_DIR} 目录运行 cargo component build 查看详细错误`);
        process.exit(1);
    }

    // 4. 检查 WASI 组件是否存在
    console.log("\n4. 检查 WASI 组件...");
    const wasmPath = join(ROOT_DIR, config.paths.wasm.output);
    if (!existsSync(wasmPath)) {
        console.error(`❌ 错误: WASI 组件不存在: ${wasmPath}`);
        console.error(`   提示: 构建过程可能被中断，或产物路径配置错误`);
        console.error(`   建议: 检查 Cargo.toml 中的包名是否为 xcell_wasi`);
        process.exit(1);
    }
    console.log(`✓ WASI 组件存在: ${wasmPath}`);

    // 5. 检查 WASI 组件大小
    console.log("\n5. 检查 WASI 组件大小...");
    try {
        const stats = statSync(wasmPath);
        console.log(`✓ WASI 组件大小: ${(stats.size / 1024).toFixed(2)} KB`);
    } catch (error) {
        console.error(`❌ 错误: 读取 WASI 组件大小失败: ${error.message}`);
        console.error(`   提示: 文件可能损坏或权限不足`);
        process.exit(1);
    }

    // 6. 使用 jco 生成异步绑定文件
    console.log("\n6. 使用 jco 生成异步绑定文件...");
    try {
        runCommand(
            `pnpm exec jco transpile ${wasmPath} -o ${FRONTEND_LIB_DIR} --name xcell_wasi --instantiation async --tla-compat --base64-cutoff 100000`,
            ROOT_DIR,
            "生成异步绑定文件",
        );
        console.log("✓ 异步绑定文件生成成功");
    } catch (error) {
        console.error(`❌ 错误: jco transpile 失败`);
        console.error(`   提示: 请确保 jco 已正确安装`);
        process.exit(1);
    }

    // 7. 检查 jco 生成产物
    console.log("\n7. 检查 jco 生成产物...");
    const jsPath = join(FRONTEND_LIB_DIR, config.paths.wasm.js);
    if (!existsSync(jsPath)) {
        console.error(`❌ 错误: jco 生成产物不存在: ${jsPath}`);
        console.error(`   提示: jco 可能未正确执行`);
        process.exit(1);
    }
    console.log(`✓ jco 生成产物存在: ${jsPath}`);

    // 8. 构建前端
    console.log("\n8. 构建前端...");
    try {
        runCommand(`pnpm build`, FRONTEND_DIR, "构建前端");
        console.log("✓ 前端构建完成");
    } catch (error) {
        console.error(`❌ 错误: 前端构建失败`);
        console.error(`   提示: 请检查前端代码是否有编译错误`);
        console.error(`   建议: 进入 ${FRONTEND_DIR} 目录运行 pnpm build 查看详细错误`);
        process.exit(1);
    }

    console.log("\n=== WASI 构建完成 ===");
}

// 运行构建
console.log("开始执行构建...");
try {
    buildWasi();
} catch (error) {
    console.error(`\n❌ 构建过程失败:`);
    console.error(`   错误信息: ${error.message}`);
    console.error(`   提示: 请查看上面的详细错误信息`);
    console.error(`   建议: 按照错误提示进行修复后重新运行构建`);
    process.exit(1);
}

export default buildWasi;