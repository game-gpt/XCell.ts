/** 行号映射配置，定义表格中各信息所在的行号（从 1 开始，0 表示无） */
export interface LineConfig {
    /** 字段名所在行号 */
    field: number;
    /** 数据类型所在行号 */
    type: number;
    /** 注释所在行号，0 表示无注释行 */
    comment: number;
    /** 数据起始行号 */
    data: number;
}

/** 布尔类型解析配置 */
export interface BoolTypeConfig {
    /** 被识别为 true 的值列表 */
    accept: string[];
    /** 被识别为 false 的值列表 */
    reject: string[];
}

/** 类型解析配置 */
export interface TypeConfig {
    /** 布尔类型配置 */
    bool: BoolTypeConfig;
}

/** 合并模式 */
export type MergeMode = "row" | "column";

/** 合表规则 */
export interface MergeRule {
    /** 合并模式 */
    mode: MergeMode;
    /** 输入文件模式，支持通配符 */
    input: string;
    /** 目标表格名称 */
    target: string;
}

/** 生成器类型 */
export type GeneratorType = "cocos" | "unity" | "typescript" | "json" | "sql" | "xml" | "xlua";

/** 生成器配置 */
export interface GeneratorConfig {
    /** 生成器类型 */
    type: GeneratorType;
    /** 是否启用 */
    enable: boolean;
    /** 项目路径 */
    project: string;
    /** 代码输出目录 */
    output: string;
    /** 命名空间（Unity/C# 使用） */
    namespace?: string;
    /** 管理器类名 */
    managerName?: string;
    /** 表类后缀 */
    suffixTable?: string;
    /** 元素类后缀 */
    suffixElement?: string;
    /** 数据加载器路径 */
    loader?: string;
    /** 数据存储路径 */
    storage?: string;
    /** 运行时存储类型 */
    storageType?: string;
    /** 调试存储类型 */
    storageDebugType?: string;
}

/** Cocos 生成器配置 */
export interface CocosCodegenConfig {
    /** 是否启用 Cocos 代码生成 */
    enable: boolean;
    /** Cocos 项目目录 */
    project: string;
    /** TypeScript 代码输出目录 */
    output: string;
    /** 管理器类名 */
    managerName: string;
    /** 表类后缀 */
    suffixTable: string;
    /** 实例名称 */
    instanceName: string;
    /** 表数据路径前缀 */
    tableDataPath: string;
    /** JSON 存储配置 */
    storageJson?: StorageConfig;
    /** 调试环境 JSON 存储配置 */
    storageDebugJson?: StorageConfig;
}

/** 存储配置 */
export interface StorageConfig {
    /** 是否启用 */
    enable: boolean;
    /** 输出目录 */
    output: string;
}

/** Unity 生成器配置 */
export interface UnityCodegenConfig {
    /** 是否启用 Unity 代码生成 */
    enable: boolean;
    /** Unity 项目路径 */
    project: string;
    /** C# 代码输出目录 */
    output: string;
    /** 生成代码的命名空间 */
    namespace: string;
    /** 管理器类名 */
    manager: string;
    /** 表格类名后缀 */
    suffixTable: string;
    /** 元素类名后缀 */
    suffixElement: string;
    /** 是否支持克隆 */
    supportClone: boolean;
    /** 是否使用旧版 using */
    legacyUsing: boolean;
    /** 是否使用旧版 null 处理 */
    legacyNullNull: boolean;
    /** 二进制输出配置 */
    binary?: StorageConfig;
    /** XML 输出配置 */
    xml?: StorageConfig;
    /** JSON 输出配置 */
    json?: StorageConfig;
    /** XLua 配置 */
    xlua?: { enable: boolean };
    /** Protobuf 配置 */
    protobuf?: { enable: boolean };
}

/** 项目配置 */
export interface ProjectConfig {
    /** 配置文件版本号 */
    version: string;
    /** 包含的文件路径模式 */
    include: string;
    /** 排除的文件路径模式 */
    exclude: string;
    /** 行号映射配置 */
    line: LineConfig;
    /** 类型解析配置 */
    type: TypeConfig;
    /** 生成器配置列表 */
    generators: GeneratorConfig[];
    /** 合表规则映射（键为规则编号） */
    merge: Map<string, MergeRule>;
    /** Cocos 生成器配置 */
    cocos?: CocosCodegenConfig;
    /** Unity 生成器配置 */
    unity?: UnityCodegenConfig;
}
