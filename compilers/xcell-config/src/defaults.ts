import type { BoolTypeConfig, LineConfig, ProjectConfig, TypeConfig } from "./interfaces";

/** 创建默认行号映射配置 */
export function createDefaultLineConfig(): LineConfig {
    return {
        field: 1,
        type: 2,
        comment: 3,
        data: 4,
    };
}

/** 创建默认布尔类型解析配置 */
export function createDefaultBoolTypeConfig(): BoolTypeConfig {
    return {
        accept: ["true", "√"],
        reject: ["false", "x"],
    };
}

/** 创建默认类型解析配置 */
export function createDefaultTypeConfig(): TypeConfig {
    return {
        bool: createDefaultBoolTypeConfig(),
    };
}

/** 创建默认项目配置 */
export function createDefaultProjectConfig(): ProjectConfig {
    return {
        version: "0.0.0",
        include: "*.xlsx",
        exclude: "",
        line: createDefaultLineConfig(),
        type: createDefaultTypeConfig(),
        generators: [],
        merge: new Map(),
    };
}
