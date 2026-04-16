import type { GeneratorType, ProjectConfig } from "./interfaces";

/** 已知的生成器类型集合 */
const KNOWN_GENERATOR_TYPES: ReadonlySet<string> = new Set<GeneratorType>([
    "cocos",
    "unity",
    "typescript",
    "json",
    "sql",
    "xml",
    "xlua",
]);

/** 验证项目配置，返回验证错误消息列表（空列表表示配置有效） */
export function validateProjectConfig(config: ProjectConfig): string[] {
    const errors: string[] = [];

    if (!config.version || typeof config.version !== "string") {
        errors.push("配置缺少 version 字段或类型不正确");
    }

    if (!config.include || typeof config.include !== "string") {
        errors.push("配置缺少 include 字段或类型不正确");
    }

    if (typeof config.exclude !== "string") {
        errors.push("配置 exclude 字段类型不正确");
    }

    if (config.line) {
        if (typeof config.line.field !== "number" || config.line.field < 1) {
            errors.push("line.field 必须为正整数");
        }
        if (typeof config.line.type !== "number" || config.line.type < 1) {
            errors.push("line.type 必须为正整数");
        }
        if (typeof config.line.comment !== "number" || config.line.comment < 0) {
            errors.push("line.comment 必须为非负整数（0 表示无注释行）");
        }
        if (typeof config.line.data !== "number" || config.line.data < 1) {
            errors.push("line.data 必须为正整数");
        }
    } else {
        errors.push("配置缺少 line 段");
    }

    if (config.type) {
        if (config.type.bool) {
            if (!Array.isArray(config.type.bool.accept)) {
                errors.push("type.bool.accept 必须为字符串数组");
            }
            if (!Array.isArray(config.type.bool.reject)) {
                errors.push("type.bool.reject 必须为字符串数组");
            }
        } else {
            errors.push("配置缺少 type.bool 段");
        }
    } else {
        errors.push("配置缺少 type 段");
    }

    if (Array.isArray(config.generators)) {
        for (let i = 0; i < config.generators.length; i++) {
            const gen = config.generators[i];
            if (!gen.type || !KNOWN_GENERATOR_TYPES.has(gen.type)) {
                errors.push(`generators[${i}].type "${gen.type}" 不是已知的生成器类型`);
            }
            if (typeof gen.enable !== "boolean") {
                errors.push(`generators[${i}].enable 必须为布尔值`);
            }
            if (!gen.project || typeof gen.project !== "string") {
                errors.push(`generators[${i}].project 缺少或类型不正确`);
            }
        }
    } else {
        errors.push("配置 generators 必须为数组");
    }

    if (config.merge) {
        for (const [key, rule] of config.merge) {
            if (rule.mode !== "row" && rule.mode !== "column") {
                errors.push(`merge.${key}.mode 必须为 "row" 或 "column"`);
            }
            if (!rule.input || typeof rule.input !== "string") {
                errors.push(`merge.${key}.input 缺少或类型不正确`);
            }
            if (!rule.target || typeof rule.target !== "string") {
                errors.push(`merge.${key}.target 缺少或类型不正确`);
            }
        }
    }

    return errors;
}
