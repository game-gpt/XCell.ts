export interface DocNodeConfig {
    id: string;
    path: string;
    title: Record<string, string>;
    filePath: string;
    order: number;
    children?: DocNodeConfig[];
}

const docNodes: DocNodeConfig[] = [
    {
        id: "index",
        path: "/document",
        title: {
            "zh-hans": "快速开始",
            en: "Getting Started",
        },
        filePath: "readme.md",
        order: 1,
    },
    {
        id: "overview",
        path: "/document/overview",
        title: {
            "zh-hans": "概览",
            en: "Overview",
        },
        filePath: "overview/index.md",
        order: 2,
        children: [
            {
                id: "overview-dict",
                path: "/document/overview/dict",
                title: {
                    "zh-hans": "dict 表",
                    en: "Dict Table",
                },
                filePath: "overview/dict.md",
                order: 1,
            },
            {
                id: "overview-language",
                path: "/document/overview/language",
                title: {
                    "zh-hans": "language 表",
                    en: "Language Table",
                },
                filePath: "overview/language.md",
                order: 2,
            },
            {
                id: "overview-list",
                path: "/document/overview/list",
                title: {
                    "zh-hans": "list 表",
                    en: "List Table",
                },
                filePath: "overview/list.md",
                order: 3,
            },
            {
                id: "overview-enum",
                path: "/document/overview/enum",
                title: {
                    "zh-hans": "enum 表",
                    en: "Enum Table",
                },
                filePath: "overview/enum.md",
                order: 4,
            },
            {
                id: "overview-class",
                path: "/document/overview/class",
                title: {
                    "zh-hans": "class 表",
                    en: "Class Table",
                },
                filePath: "overview/class.md",
                order: 5,
            },
            {
                id: "overview-merge",
                path: "/document/overview/merge",
                title: {
                    "zh-hans": "合表",
                    en: "Merge",
                },
                filePath: "overview/merge.md",
                order: 6,
            },
        ],
    },
    {
        id: "advanced",
        path: "/document/advanced",
        title: {
            "zh-hans": "进阶",
            en: "Advanced",
        },
        filePath: "advanced/index.md",
        order: 3,
        children: [
            {
                id: "advanced-type-system",
                path: "/document/advanced/type-system",
                title: {
                    "zh-hans": "类型系统",
                    en: "Type System",
                },
                filePath: "advanced/type-system.md",
                order: 1,
            },
            {
                id: "advanced-key-field",
                path: "/document/advanced/key-field",
                title: {
                    "zh-hans": "字段约束",
                    en: "Field Constraints",
                },
                filePath: "advanced/key-field.md",
                order: 2,
            },
            {
                id: "advanced-ref-type",
                path: "/document/advanced/ref-type",
                title: {
                    "zh-hans": "引用类型",
                    en: "Reference Type",
                },
                filePath: "advanced/ref-type.md",
                order: 3,
            },
            {
                id: "advanced-meta-data",
                path: "/document/advanced/meta-data",
                title: {
                    "zh-hans": "元属性",
                    en: "Meta Data",
                },
                filePath: "advanced/meta-data.md",
                order: 4,
            },
            {
                id: "advanced-config",
                path: "/document/advanced/config",
                title: {
                    "zh-hans": "配置",
                    en: "Config",
                },
                filePath: "advanced/config.md",
                order: 5,
            },
            {
                id: "advanced-extensibility",
                path: "/document/advanced/extensibility",
                title: {
                    "zh-hans": "可扩展性",
                    en: "Extensibility",
                },
                filePath: "advanced/extensibility.md",
                order: 6,
            },
        ],
    },
    {
        id: "use-cases",
        path: "/document/use-cases",
        title: {
            "zh-hans": "使用案例",
            en: "Use Cases",
        },
        filePath: "use-cases/index.md",
        order: 4,
        children: [
            {
                id: "use-cases-unity-integration",
                path: "/document/use-cases/unity-integration",
                title: {
                    "zh-hans": "Unity 集成",
                    en: "Unity Integration",
                },
                filePath: "use-cases/unity-integration.md",
                order: 1,
            },
        ],
    },
];

export { docNodes };
