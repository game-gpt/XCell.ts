import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "smol-toml";
import type {
    BoolTypeConfig,
    CocosCodegenConfig,
    GeneratorConfig,
    GeneratorType,
    LineConfig,
    MergeRule,
    ProjectConfig,
    StorageConfig,
    TypeConfig,
    UnityCodegenConfig,
} from "./interfaces";
import { createDefaultProjectConfig } from "./defaults";

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

/** 配置文件搜索顺序 */
const CONFIG_FILE_NAMES: ReadonlyArray<string> = [
    "xcell.config.toml",
    "ProjectConfig.toml",
    "ProjectSettings.toml",
];

/** 规范化生成器类型名称（不区分大小写） */
function normalizeGeneratorType(raw: string): GeneratorType {
    const lower = raw.toLowerCase();
    if (KNOWN_GENERATOR_TYPES.has(lower as GeneratorType)) {
        return lower as GeneratorType;
    }
    return lower as GeneratorType;
}

/** 解析行号映射配置，缺失字段使用默认值 */
function parseLineConfig(
    raw: Record<string, unknown> | undefined,
    defaults: LineConfig,
): LineConfig {
    if (!raw) return defaults;
    return {
        field: typeof raw.field === "number" ? raw.field : defaults.field,
        type: typeof raw.type === "number" ? raw.type : defaults.type,
        comment:
            typeof raw.comment === "number" ? raw.comment : defaults.comment,
        data: typeof raw.data === "number" ? raw.data : defaults.data,
    };
}

/** 解析布尔类型配置 */
function parseBoolTypeConfig(
    raw: Record<string, unknown> | undefined,
    defaults: BoolTypeConfig,
): BoolTypeConfig {
    if (!raw) return defaults;
    return {
        accept: Array.isArray(raw.accept)
            ? (raw.accept as string[])
            : defaults.accept,
        reject: Array.isArray(raw.reject)
            ? (raw.reject as string[])
            : defaults.reject,
    };
}

/** 解析类型解析配置 */
function parseTypeConfig(
    raw: Record<string, unknown> | undefined,
    defaults: TypeConfig,
): TypeConfig {
    if (!raw) return defaults;
    return {
        bool: parseBoolTypeConfig(
            raw.bool as Record<string, unknown> | undefined,
            defaults.bool,
        ),
    };
}

/** 解析存储配置 */
function parseStorageConfig(
    raw: Record<string, unknown> | undefined,
): StorageConfig | undefined {
    if (!raw) return undefined;
    return {
        enable: typeof raw.enable === "boolean" ? raw.enable : false,
        output: typeof raw.output === "string" ? raw.output : "",
    };
}

/** 解析生成器配置列表 */
function parseGenerators(raw: unknown[] | undefined): GeneratorConfig[] {
    if (!raw || !Array.isArray(raw)) return [];
    return raw.map((item) => {
        const gen = item as Record<string, unknown>;
        return {
            type: normalizeGeneratorType(String(gen.type ?? "")),
            enable: typeof gen.enable === "boolean" ? gen.enable : true,
            project: typeof gen.project === "string" ? gen.project : ".",
            output: typeof gen.output === "string" ? gen.output : "",
            namespace:
                typeof gen.namespace === "string" ? gen.namespace : undefined,
            managerName:
                typeof gen.managerName === "string"
                    ? gen.managerName
                    : undefined,
            suffixTable:
                typeof gen.suffixTable === "string"
                    ? gen.suffixTable
                    : undefined,
            suffixElement:
                typeof gen.suffixElement === "string"
                    ? gen.suffixElement
                    : undefined,
            loader: typeof gen.loader === "string" ? gen.loader : undefined,
            storage: typeof gen.storage === "string" ? gen.storage : undefined,
            storageType:
                typeof gen.storageType === "string"
                    ? gen.storageType
                    : typeof gen.storage_type === "string"
                      ? gen.storage_type
                      : undefined,
            storageDebugType:
                typeof gen.storageDebugType === "string"
                    ? gen.storageDebugType
                    : typeof gen.storage_debug_type === "string"
                      ? gen.storage_debug_type
                      : undefined,
        } satisfies GeneratorConfig;
    });
}

/** 解析合表规则映射 */
function parseMergeRules(
    raw: Record<string, unknown> | undefined,
): Map<string, MergeRule> {
    if (!raw) return new Map();
    const result = new Map<string, MergeRule>();
    for (const [key, value] of Object.entries(raw)) {
        if (typeof value === "object" && value !== null) {
            const rule = value as Record<string, unknown>;
            result.set(key, {
                mode: rule.mode === "column" ? "column" : "row",
                input: typeof rule.input === "string" ? rule.input : "",
                target: typeof rule.target === "string" ? rule.target : "",
            });
        }
    }
    return result;
}

/** 解析 Cocos 生成器配置（旧格式 [cocos] 段） */
function parseCocosConfig(
    raw: Record<string, unknown> | undefined,
): CocosCodegenConfig | undefined {
    if (!raw) return undefined;
    return {
        enable: typeof raw.enable === "boolean" ? raw.enable : true,
        project: typeof raw.project === "string" ? raw.project : ".",
        output: typeof raw.output === "string" ? raw.output : "",
        managerName:
            typeof raw.managerName === "string"
                ? raw.managerName
                : "DataTableManager",
        suffixTable:
            typeof raw.suffixTable === "string" ? raw.suffixTable : "Table",
        instanceName:
            typeof raw.instanceName === "string"
                ? raw.instanceName
                : "dataTableManager",
        tableDataPath:
            typeof raw.tableDataPath === "string"
                ? raw.tableDataPath
                : "assets/table/data",
        storageJson: parseStorageConfig(
            raw.storageJson as Record<string, unknown> | undefined,
        ),
        storageDebugJson: parseStorageConfig(
            raw.storageDebugJson as Record<string, unknown> | undefined,
        ),
    };
}

/** 解析 Unity 生成器配置（旧格式 [unity] 段） */
function parseUnityConfig(
    raw: Record<string, unknown> | undefined,
): UnityCodegenConfig | undefined {
    if (!raw) return undefined;
    return {
        enable: typeof raw.enable === "boolean" ? raw.enable : true,
        project: typeof raw.project === "string" ? raw.project : "../",
        output:
            typeof raw.output === "string"
                ? raw.output
                : "Assets/Scripts/DataTable/Generated",
        namespace:
            typeof raw.namespace === "string"
                ? raw.namespace
                : "DataTable.Generated",
        manager:
            typeof raw.manager === "string" ? raw.manager : "DataTableManager",
        suffixTable:
            typeof raw.suffixTable === "string" ? raw.suffixTable : "Table",
        suffixElement:
            typeof raw.suffixElement === "string"
                ? raw.suffixElement
                : "Element",
        supportClone:
            typeof raw.supportClone === "boolean" ? raw.supportClone : true,
        legacyUsing:
            typeof raw.legacyUsing === "boolean" ? raw.legacyUsing : false,
        legacyNullNull:
            typeof raw.legacyNullNull === "boolean"
                ? raw.legacyNullNull
                : false,
        binary: parseStorageConfig(
            raw.binary as Record<string, unknown> | undefined,
        ),
        xml: parseStorageConfig(raw.xml as Record<string, unknown> | undefined),
        json: parseStorageConfig(
            raw.json as Record<string, unknown> | undefined,
        ),
        xlua:
            raw.xlua && typeof raw.xlua === "object"
                ? { enable: !!(raw.xlua as Record<string, unknown>).enable }
                : undefined,
        protobuf:
            raw.protobuf && typeof raw.protobuf === "object"
                ? { enable: !!(raw.protobuf as Record<string, unknown>).enable }
                : undefined,
    };
}

/** 将旧格式配置（[unity]、[cocos] 段）转换为 [[generators]] 数组中的条目 */
function convertLegacyToGenerators(
    raw: Record<string, unknown>,
): GeneratorConfig[] {
    const generators: GeneratorConfig[] = [];
    if (raw.cocos && typeof raw.cocos === "object") {
        const cocos = raw.cocos as Record<string, unknown>;
        generators.push({
            type: "cocos",
            enable: typeof cocos.enable === "boolean" ? cocos.enable : true,
            project: typeof cocos.project === "string" ? cocos.project : ".",
            output: typeof cocos.output === "string" ? cocos.output : "",
            loader: typeof cocos.loader === "string" ? cocos.loader : undefined,
            storage:
                typeof cocos.storage === "string" ? cocos.storage : undefined,
            storageType:
                typeof cocos.storageType === "string"
                    ? cocos.storageType
                    : typeof cocos.storage_type === "string"
                      ? cocos.storage_type
                      : undefined,
            storageDebugType:
                typeof cocos.storageDebugType === "string"
                    ? cocos.storageDebugType
                    : typeof cocos.storage_debug_type === "string"
                      ? cocos.storage_debug_type
                      : undefined,
        });
    }
    if (raw.unity && typeof raw.unity === "object") {
        const unity = raw.unity as Record<string, unknown>;
        generators.push({
            type: "unity",
            enable: typeof unity.enable === "boolean" ? unity.enable : true,
            project: typeof unity.project === "string" ? unity.project : "../",
            output:
                typeof unity.output === "string"
                    ? unity.output
                    : "Assets/Scripts/DataTable/Generated",
            namespace:
                typeof unity.namespace === "string"
                    ? unity.namespace
                    : "DataTable.Generated",
            managerName:
                typeof unity.manager === "string"
                    ? unity.manager
                    : "DataTableManager",
            suffixTable:
                typeof unity.suffixTable === "string"
                    ? unity.suffixTable
                    : "Table",
            suffixElement:
                typeof unity.suffixElement === "string"
                    ? unity.suffixElement
                    : "Element",
        });
    }
    return generators;
}

/** 从原始 TOML 解析结果构建完整的项目配置 */
function buildProjectConfig(raw: Record<string, unknown>): ProjectConfig {
    const defaults = createDefaultProjectConfig();
    const hasLegacySections =
        (raw.cocos && typeof raw.cocos === "object") ||
        (raw.unity && typeof raw.unity === "object");
    const hasGeneratorsArray = Array.isArray(raw.generators);
    const newGenerators = hasGeneratorsArray
        ? parseGenerators(raw.generators as unknown[])
        : [];
    const legacyGenerators = hasLegacySections
        ? convertLegacyToGenerators(raw)
        : [];
    const generators = [...legacyGenerators, ...newGenerators];

    return {
        version:
            typeof raw.version === "string" ? raw.version : defaults.version,
        include:
            typeof raw.include === "string" ? raw.include : defaults.include,
        exclude:
            typeof raw.exclude === "string" ? raw.exclude : defaults.exclude,
        line: parseLineConfig(
            raw.line as Record<string, unknown> | undefined,
            defaults.line,
        ),
        type: parseTypeConfig(
            raw.type as Record<string, unknown> | undefined,
            defaults.type,
        ),
        generators,
        merge: parseMergeRules(
            raw.merge as Record<string, unknown> | undefined,
        ),
        cocos: parseCocosConfig(
            raw.cocos as Record<string, unknown> | undefined,
        ),
        unity: parseUnityConfig(
            raw.unity as Record<string, unknown> | undefined,
        ),
    };
}

/** 从文件路径加载项目配置 */
export async function loadProjectConfig(
    filePath: string,
): Promise<ProjectConfig> {
    const content = await readFile(filePath, "utf-8");
    const raw = parse(content) as Record<string, unknown>;
    return buildProjectConfig(raw);
}

/** 从目录中查找并加载项目配置文件 */
export async function loadProjectConfigFromDir(
    dirPath: string,
): Promise<ProjectConfig> {
    for (const fileName of CONFIG_FILE_NAMES) {
        const filePath = join(dirPath, fileName);
        try {
            const config = await loadProjectConfig(filePath);
            return config;
        } catch {
            continue;
        }
    }
    return createDefaultProjectConfig();
}
