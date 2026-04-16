export type {
    LineConfig,
    BoolTypeConfig,
    TypeConfig,
    MergeMode,
    MergeRule,
    GeneratorType,
    GeneratorConfig,
    CocosCodegenConfig,
    StorageConfig,
    UnityCodegenConfig,
    ProjectConfig,
} from "./interfaces";

export {
    createDefaultLineConfig,
    createDefaultBoolTypeConfig,
    createDefaultTypeConfig,
    createDefaultProjectConfig,
} from "./defaults";

export {
    loadProjectConfig,
    loadProjectConfigFromDir,
} from "./loader";

export { validateProjectConfig } from "./validator";
