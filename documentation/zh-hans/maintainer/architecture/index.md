# XCell 架构设计文档

## 1. 项目整体架构说明

XCell 是一个配置表管理工具，采用 Rust 编写，采用模块化设计，各模块职责清晰，耦合度低。项目整体分为以下几个主要部分：

- **后端模块**：位于 `backends/` 目录，包含核心业务逻辑
  - `xcell` - 命令行工具和主入口
  - `xcell-analyzer` - 工作空间管理和表格分析
  - `xcell-generator` - 代码生成器
  - `xcell-provider` - 表格读取抽象
  - `xcell-core` - 类型系统和核心功能
  - `xcell-config` - 配置管理
  - `xcell-macros` - 宏定义
  - `xcell-parser` - 类型解析器
  - `xcell-plugin` - 插件系统
  - `xcell-wasi` - WebAssembly 支持

- **前端模块**：位于 `frontends/` 目录，包含用户界面
  - `homepage` - 项目官网
  - `xcell` - 前端 SDK
  - `xcell-desktop` - 桌面应用
  - `xcell-h5` - 网页应用

- **文档**：位于 `documentation/` 目录，包含项目文档

- **示例**：位于 `examples/` 目录，包含使用示例

### 技术栈

- **后端**：Rust
- **前端**：Vue.js, TypeScript, Tauri
- **表格读取**：calamine (Excel), csv (CSV/TSV)
- **模板引擎**：dejavu
- **异步运行时**：tokio
- **错误处理**：anyhow
- **日志**：tracing

## 2. 模块划分与职责说明

### 2.1 xcell - 命令行工具

**职责**：
- 提供命令行接口
- 解析命令行参数
- 协调整个工作流程
- 调用其他后端模块执行任务

**核心文件**：
- `backends/xcell/src/main.rs` - 程序入口点
- `backends/xcell/src/workspace.rs` - 工作空间管理
- `backends/xcell/src/commands/toml.rs` - TOML 配置处理

**主要功能**：
- 生成代码和数据文件
- 检查配置
- 清理输出
- 文件监控模式

### 2.2 xcell-analyzer - 工作空间管理和表格分析

**职责**：
- 管理工作空间和配置
- 扫描和识别表格文件
- 解析表格数据
- 识别表格类型
- 处理表格数据
- 链接枚举定义

**核心文件**：
- `backends/xcell-analyzer/src/lib.rs` - 模块导出
- `backends/xcell-analyzer/src/config/mod.rs` - 工作空间管理器
- `backends/xcell-analyzer/src/x_table/mod.rs` - 表格数据结构

**核心组件**：
- `WorkspaceManager` - 工作空间管理器，负责协调整个工作流程
- `XClassTable` - 类表类型
- `XDictTable` - 字典表类型
- `XEnumerateTable` - 枚举表类型
- `XLanguageTable` - 语言表类型
- `DefineManager` - 枚举定义管理器
- `LanguageManager` - 语言表管理器

### 2.3 xcell-generator - 代码生成器

**职责**：
- 生成各种格式的代码和数据文件
- 支持多种目标平台
- 提供插件化的代码生成架构

**核心文件**：
- `backends/xcell-generator/src/lib.rs` - 模块导出
- `backends/xcell-generator/src/codegen/mod.rs` - 代码生成器接口
- `backends/xcell-generator/src/config.rs` - 生成器配置

**支持的代码生成器**：
- `json` - JSON 数据生成 ✅
- `binary` - 二进制数据生成 ✅
- `cocos` - Cocos 平台代码生成 ✅
- `typescript` - TypeScript 代码生成 ✅
- `dejavu` - 模板引擎代码生成 ✅
- `unity` - Unity 平台代码生成 ⚠️ (当前禁用)
- `xlua` - XLua 脚本代码生成
- `sql` - SQL 数据库代码生成
- `xml` - XML 数据生成

### 2.4 xcell-provider - 表格读取抽象

**职责**：
- 提供统一的表格读取接口
- 支持多种表格格式（Excel、CSV、TSV）
- 屏蔽不同表格格式的差异
- 提供表格头部解析

**核心文件**：
- `backends/xcell-provider/src/lib.rs` - 模块导出
- `backends/xcell-provider/src/table/mod.rs` - 表格读取接口
- `backends/xcell-provider/src/standard/mod.rs` - 标准流实现

**核心组件**：
- `TableReader` - 表格读取器 trait
- `ExcelTable` - Excel 表格读取实现
- `CsvTable` - CSV 表格读取实现
- `TsvTable` - TSV 表格读取实现
- `FileFormatDetector` - 文件格式检测器
- `load_table` - 统一表格加载函数

### 2.5 xcell-core - 类型系统和核心功能

**职责**：
- 定义所有数据类型
- 提供类型转换和解析
- 支持各种平台的类型映射
- 提供值处理和转换
- 提供字节序读写接口

**核心文件**：
- `backends/xcell-core/src/lib.rs` - 模块导出
- `backends/xcell-core/src/typing/mod.rs` - 类型定义
- `backends/xcell-core/src/value/mod.rs` - 值处理

**支持的类型**：
- 整数类型 (Integer)
- 小数类型 (Decimal)
- 布尔类型 (Boolean)
- 字符串类型 (String)
- 数组类型 (Array)
- 向量类型 (Vector)
- 语言类型 (Language)
- 枚举类型 (Enumerate)
- 颜色类型 (Color)
- 时间类型 (Time)

### 2.6 xcell-config - 配置管理

**职责**：
- 定义项目配置结构
- 提供配置解析和验证
- 支持不同平台的配置选项

**核心文件**：
- `backends/xcell-config/src/lib.rs` - 模块导出
- `backends/xcell-config/src/project/mod.rs` - 项目配置
- `backends/xcell-config/src/cocos/mod.rs` - Cocos 平台配置
- `backends/xcell-config/src/unity/mod.rs` - Unity 平台配置

**核心组件**：
- `ProjectConfig` - 项目配置
- `CocosCodegen` - Cocos 代码生成配置
- `UnityCodegen` - Unity 代码生成配置
- `MergeRules` - 合表规则

### 2.7 xcell-parser - 类型解析器

**职责**：
- 解析类型表达式
- 解析字段定义
- 解析元数据

**核心文件**：
- `backends/xcell-parser/src/lib.rs` - 模块导出
- `backends/xcell-parser/src/lexer.rs` - 词法分析器
- `backends/xcell-parser/src/parser.rs` - 语法分析器
- `backends/xcell-parser/src/ast.rs` - 抽象语法树

## 3. 数据流说明

### 3.1 整体流程

从表格文件读取到代码导出的完整流程如下：

```
表格文件 (Excel/CSV/TSV) → 读取解析 → 表格识别 → 数据处理 → 代码生成 → 输出文件
```

### 3.2 详细步骤

#### 步骤 1: 初始化工作空间

1. 解析命令行参数或配置文件
2. 创建 `WorkspaceManager` 实例
3. 加载项目配置 (`ProjectConfig`)

#### 步骤 2: 扫描文件

1. 扫描工作目录
2. 使用 `WalkDir` 遍历目录
3. 根据配置的 `include` 模式过滤文件

#### 步骤 3: 读取表格文件

1. 使用 `load_table()` 函数读取表格文件（自动检测格式）
2. 解析表格头部 (`XCellHeader`)
3. 读取所有数据行

#### 步骤 4: 识别表格类型

依次尝试识别以下表格类型：

1. `XListTable` - 列表表
2. `XDictTable` - 字典表
3. `XEnumerateTable` - 枚举表
4. `XClassTable` - 类表
5. `XLanguageTable` - 语言表
6. `XLanguageID` - 语言 ID 表

#### 步骤 5: 处理表格数据

根据表格类型执行相应操作：

- 对于枚举表：添加到 `DefineManager`
- 对于语言表：添加到 `LanguageManager`
- 对于其他表：进行数据验证和存储

#### 步骤 6: 链接枚举

调用 `link_enumerate()` 方法将枚举定义链接到对应的数据字段

#### 步骤 7: 代码生成

1. 创建 `Generator` 实例
2. 配置启用的代码生成器
3. 遍历所有启用的产物
4. 为每个产物调用相应的代码生成器
5. 生成对应格式的代码和数据文件

#### 步骤 8: 文件监控（可选）

如果启用了文件监控：
1. 启动文件监控器
2. 监听文件变更
3. 自动重新处理变更的文件

## 4. 核心代码位置引用

### 工作空间管理
- `WorkspaceManager` - `backends/xcell-analyzer/src/config/mod.rs`
- `WorkspaceManager::new()` - 创建工作空间管理器
- `WorkspaceManager::classes()` - 获取类表数据
- `WorkspaceManager::lists()` - 获取列表表数据
- `WorkspaceManager::dicts()` - 获取字典表数据
- `WorkspaceManager::enumerates()` - 获取枚举表数据

### 表格读取
- `load_table()` - `backends/xcell-provider/src/table/mod.rs` - 统一表格加载函数
- `TableReader` - `backends/xcell-provider/src/table/mod.rs` - 表格读取器 trait
- `XCellHeader` - `backends/xcell-provider/src/table/mod.rs` - 表格头部

### 表格类型
- `XClassTable` - `backends/xcell-analyzer/src/x_table/class/mod.rs` - 类表类型
- `XDictTable` - `backends/xcell-analyzer/src/x_table/dictionary/mod.rs` - 字典表类型
- `XEnumerateTable` - `backends/xcell-analyzer/src/x_table/enumerate/mod.rs` - 枚举表类型
- `XLanguageTable` - `backends/xcell-analyzer/src/x_table/language/mod.rs` - 语言表类型

### 代码生成
- `Generator` - `backends/xcell-generator/src/lib.rs` - 生成器主入口
- `Codegen` - `backends/xcell-generator/src/codegen/mod.rs` - 代码生成器 trait
- `CocosCodegen` - `backends/xcell-generator/src/codegen/cocos/mod.rs` - Cocos 代码生成
- `UnityCodegen` - `backends/xcell-generator/src/codegen/unity/mod.rs` - Unity 代码生成 (当前禁用)
- `JsonCodegen` - `backends/xcell-generator/src/codegen/json/mod.rs` - JSON 数据生成

### 类型系统
- `TypeDescription` - `backends/xcell-core/src/typing/mod.rs` - 类型描述
- `XCellValue` - `backends/xcell-core/src/value/mod.rs` - 单元格值
- `CSharpReader`/`CSharpWriter` - `backends/xcell-core/src/codegen/csharp_ffi/mod.rs` - C# 类型映射

### 配置管理
- `ProjectConfig` - `backends/xcell-config/src/project/mod.rs` - 项目配置
- `CocosCodegen` - `backends/xcell-config/src/cocos/mod.rs` - Cocos 代码生成配置
- `UnityCodegen` - `backends/xcell-config/src/unity/mod.rs` - Unity 代码生成配置

## 5. 抽象隔离设计

### 5.1 核心抽象层次

XCell 采用多层抽象设计，确保各模块职责清晰，避免抽象泄露：

1. **表格读取层** (`xcell-provider`)：
   - 提供统一的 `TableReader` trait
   - 屏蔽不同表格格式（Excel、CSV、TSV）的差异
   - 上层模块无需关心具体的表格格式

2. **表格分析层** (`xcell-analyzer`)：
   - 基于 `TableReader` 读取表格数据
   - 识别表格类型并进行相应处理
   - 提供 `WorkspaceManager` 统一管理所有表格数据

3. **代码生成层** (`xcell-generator`)：
   - 基于 `WorkspaceManager` 获取表格数据
   - 不直接与表格文件交互
   - 通过 `Codegen` trait 支持多种代码生成器

4. **类型系统层** (`xcell-core`)：
   - 定义统一的数据类型
   - 提供类型转换和解析
   - 支持多平台类型映射

### 5.2 抽象隔离原则

- **单一职责**：每个模块只负责一个特定的功能
- **依赖倒置**：高层模块依赖抽象，不依赖具体实现
- **接口隔离**：使用 trait 定义最小化接口
- **里氏替换**：实现可以被其子类替换
- **开闭原则**：对扩展开放，对修改关闭

## 6. 扩展开发指南

### 添加新的表格格式

1. 在 `backends/xcell-provider/src/table/` 下创建新的表格读取实现
2. 实现 `TableReader` trait
3. 在 `FileFormatDetector` 中添加格式检测逻辑
4. 在 `load_table` 函数中添加新格式的支持

### 添加新的数据类型

1. 在 `backends/xcell-core/src/` 下创建新模块
2. 实现类型解析和转换逻辑
3. 在 `backends/xcell-core/src/lib.rs` 中导出
4. 添加相应平台的类型映射支持

### 添加新的代码生成器

1. 在 `backends/xcell-generator/src/codegen/` 下创建新模块
2. 实现 `Codegen` trait
3. 在 `Generator::new()` 中注册新的生成器
4. 添加相应的配置选项

### 添加新的平台支持

1. 在 `backends/xcell-config/src/` 下创建新的平台配置模块
2. 在 `backends/xcell-generator/src/codegen/` 下创建新的平台代码生成器
3. 实现平台特定的代码生成逻辑
4. 更新文档和示例
