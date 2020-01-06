# 扩展性文档

本文档介绍如何扩展 XCell 配置表管理工具的功能，包括自定义类型系统、扩展代码生成器以及插件开发。

## 目录

1. [自定义类型系统](#自定义类型系统)
2. [扩展代码生成器](#扩展代码生成器)
3. [插件开发指南](#插件开发指南)

***

## 自定义类型系统

XCell 提供了灵活的类型系统，支持多种内置数据类型，并允许开发者自定义新的数据类型。

### 内置类型概览

XCell 支持以下内置类型：

| 类型类别  | 支持的类型                                                                                                            |
| ----- | ---------------------------------------------------------------------------------------------------------------- |
| 布尔型   | `bool`, `boolean`                                                                                                |
| 整数型   | `byte`/`i8`, `short`/`i16`, `int`/`i32`, `long`/`i64`, `sbyte`/`u8`, `ushort`/`u16`, `uint`/`u32`, `ulong`/`u64` |
| 小数型   | `float`/`f32`, `double`/`f64`, `decimal`/`d128`/`f128`                                                           |
| 字符串   | `string`                                                                                                         |
| 特殊类型  | `color`/`colour`, `color32`, `time`/`date`/`datetime`                                                            |
| 向量/数组 | `v2`/`vec2`, `v3`/`vec3`, `v4`/`vec4`, `q4`/`quaternion`                                                         |
| 枚举    | 自定义枚举类型                                                                                                          |

### 类型系统架构

XCell 的类型系统核心位于 `xcell-types` 模块中，主要包含以下组件：

- `XCellTyped`：类型枚举，定义了所有支持的数据类型
- `TypeMetaInfo`：类型元信息，包含类型的配置信息
- `XCellValue`：类型值，存储解析后的数据
- 各类型描述器：如 `IntegerDescription`、`DecimalDescription` 等

### 自定义类型实现步骤

要添加自定义类型，请按照以下步骤操作：

#### 1. 创建类型描述模块

在 `projects/xcell-types/src/` 目录下创建新的类型模块，例如 `my_type/mod.rs`：

```rust
use serde::{Deserialize, Serialize};
use xcell_errors::XResult;
use crate::value::XCellValue;

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct MyTypeDescription {
    pub default: Option<String>,
}

impl MyTypeDescription {
    pub fn parse_cell(&self, cell: &str) -> XResult<XCellValue> {
        todo!("实现单元格解析逻辑")
    }
}
```

#### 2. 扩展 XCellTyped 枚举

在 `projects/xcell-types/src/typing/mod.rs` 中扩展 `XCellTyped` 枚举：

```rust
pub enum XCellTyped {
    // ... 现有类型 ...
    MyType(Box<MyTypeDescription>),
}
```

#### 3. 实现类型解析

在 `projects/xcell-types/src/typing/parser.rs` 中添加类型解析逻辑：

```rust
impl XCellTyped {
    pub fn parse(input: &str, info: &TypeMetaInfo) -> Self {
        let normed = Self::norm_typing(input);
        match normed.as_str() {
            // ... 现有类型 ...
            "mytype" | "my_type" => info.my_type.clone().into(),
            _ => XCellTyped::parse_complex(input, &normed, info),
        }
    }
}
```

#### 4. 更新 TypeMetaInfo

在 `projects/xcell-types/src/typing/mod.rs` 中更新 `TypeMetaInfo` 结构体：

```rust
#[derive(Debug, Clone, Default, Serialize)]
pub struct TypeMetaInfo {
    // ... 现有字段 ...
    pub my_type: MyTypeDescription,
}
```

#### 5. 添加代码生成支持

在 `projects/xcell-types/src/codegen/` 中为新类型添加代码生成逻辑，确保能够正确生成目标语言（如 C#）的类型定义。

***

## 扩展代码生成器

XCell 支持多种代码生成目标，包括 Unity C#、二进制文件、XML、JSON 等。您可以扩展这些生成器或创建新的生成器。

### 代码生成架构

代码生成主要在 `xcell-core/src/codegen/` 模块中实现：

- `binary/`：二进制格式生成
- `readable/`：可读格式生成（XML、JSON）
- `unity/`：Unity C# 代码生成

### 扩展 Unity 代码生成器

Unity 代码生成器是最常用的生成器之一，以下是扩展它的步骤：

#### 1. 查看现有模板

Unity 代码生成使用模板文件，位于 `projects/xcell-core/templates/` 目录：

- `BuildClass.cs`：类表模板
- `BuildDictionary.cs`：字典表模板
- `BuildEnumerate.cs`：枚举表模板
- `BuildLanguage.cs`：语言表模板
- `BuildManager.cs`：管理器模板

#### 2. 修改或创建模板

根据需要修改现有模板或创建新的模板文件。

#### 3. 更新 UnityCodegen 配置

在 `projects/xcell-core/src/config/unity/mod.rs` 中更新配置：

```rust
#[derive(Debug, Clone)]
pub struct UnityCodegen {
    // ... 现有字段 ...
    pub my_custom_option: bool,
}
```

#### 4. 实现生成逻辑

在 `projects/xcell-core/src/codegen/unity/` 中实现具体的生成逻辑。

### 创建新的代码生成器

要创建全新的代码生成器，请按照以下步骤：

#### 1. 创建生成器模块

在 `projects/xcell-core/src/codegen/` 目录下创建新模块，例如 `cocos/mod.rs`：

```rust
use xcell_errors::XResult;
use crate::config::ProjectConfig;

pub struct CocosCodegen {
    // 配置字段
}

impl CocosCodegen {
    pub fn write(&self, config: &ProjectConfig) -> XResult<()> {
        todo!("实现 Cocos 代码生成逻辑")
    }
}
```

#### 2. 集成到配置系统

在 `ProjectConfig` 中添加新生成器的配置选项。

#### 3. 连接到工作流

在 `WorkspaceManager::write_unity()` 或类似方法中调用新生成器。

***

## 插件开发指南

XCell 支持通过插件系统扩展功能。插件可以添加新的表格类型、自定义验证逻辑或扩展代码生成能力。

### 插件架构

插件系统基于 Rust 的 trait 系统，主要接口包括：

- 表格处理器 trait
- 验证器 trait
- 代码生成器 trait

### 开发插件步骤

#### 1. 创建插件项目

创建新的 Rust 项目，并添加对 `xcell-core` 和 `xcell-types` 的依赖：

```toml
[package]
name = "xcell-my-plugin"
version = "0.1.0"
edition = "2024"

[dependencies]
xcell-core = { path = "../xcell-core" }
xcell-types = { path = "../xcell-types" }
```

#### 2. 实现插件 trait

根据需要实现相应的 trait。例如，实现自定义表格处理器：

```rust
use xcell_core::x_table::table::CalamineTable;
use xcell_errors::XResult;

pub struct MyCustomTable;

impl MyCustomTable {
    pub fn confirm(table: &CalamineTable) -> XResult<Self> {
        todo!("检查表格是否符合自定义格式")
    }

    pub fn perform(&self, workspace: &mut WorkspaceManager) -> XResult<()> {
        todo!("执行表格处理逻辑")
    }
}
```

#### 3. 注册插件

在 `WorkspaceManager::try_perform_file()` 方法中注册您的插件，使其能够被识别和处理。

### 插件最佳实践

1. **保持插件独立**：插件应该尽量独立，减少对 XCell 内部实现的依赖
2. **提供配置选项**：通过 `XCell.toml` 提供插件配置
3. **错误处理**：妥善处理错误，提供清晰的错误信息
4. **文档**：为插件提供完整的使用文档
5. **测试**：编写充分的测试用例

***

## 总结

XCell 提供了强大的扩展能力，允许开发者根据自己的需求定制功能。无论是添加新的数据类型、扩展代码生成器，还是开发独立的插件，XCell 的模块化架构都能很好地支持这些需求。

如果您在扩展过程中遇到问题，请参考项目源代码或提交 Issue 获取帮助。
