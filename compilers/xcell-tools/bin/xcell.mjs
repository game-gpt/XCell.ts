#!/usr/bin/env node

/**
 * XCell 命令行工具
 * 使用 src 目录下的包装层执行 XCell 功能
 */

import { XCell } from "../../../runtimes/xcell/dist/index.mjs";

async function main() {
    console.log("XCell 命令行工具");
    console.log("================");

    try {
        console.log("初始化 XCell 引擎...");

        // 初始化 XCell
        await XCell.init();

        console.log("\n测试 WASI 组件...");
        const helloMessage = await XCell.testWasi();
        console.log("WASI 组件测试成功:", helloMessage);

        console.log("\n测试表格处理...");
        const testData = { id: 1, name: "Test", value: 100 };
        const processedData = await XCell.processTable(testData);
        console.log("表格处理结果:", processedData);

        console.log("\n测试表格验证...");
        const validationResult = await XCell.validateTable(testData);
        console.log("表格验证结果:", validationResult);

        console.log("\n所有测试完成!");
    } catch (error) {
        console.error("错误:", error);
    }
}

main();
