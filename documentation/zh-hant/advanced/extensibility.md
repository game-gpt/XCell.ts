# 擴充性檔案

本檔案介绍如何擴充 XCell 設定資料表管理工具的功能，包含自訂類型系統、擴充程式碼產生器以及外掛程式開發。

## 目錄

1. [自訂類型系統](#自訂類型系統)
2. [擴充程式碼產生器](#擴充程式碼產生器)
3. [外掛程式開發指南](#外掛程式開發指南)

***

## 自訂類型系統

XCell 提供了灵活的類型系統，支援多种內置資料類型，並允许開發者自訂新的資料類型。

### 內置類型概览

XCell 支援以下內置類型：

| 類型类別  | 支援的類型                                                                                                            |
| ----- | ---------------------------------------------------------------------------------------------------------------- |
| 布爾型   | `bool`, `boolean`                                                                                                |
| 整數型   | `byte`/`i8`, `short`/`i16`, `int`/`i32`, `long`/`i64`, `sbyte`/`u8`, `ushort`/`u16`, `uint`/`u32`, `ulong`/`u64` |
| 小数型   | `float`/`f32`, `double`/`f64`, `decimal`/`d128`/`f128`                                                           |
| 字串   | `string`                                                                                                         |
| 特殊類型  | `color`/`colour`, `color32`, `time`/`date`/`datetime`                                                            |
| 向量/陣列 | `v2`/`vec2`, `v3`/`vec3`, `v4`/`vec4`, `q4`/`quaternion`                                                         |
| 列舉    | 自訂列舉類型                                                                                                          |

### 類型系統架構

XCell 的類型系統核心位於 `xcell-types` 模組中，主要包含以下元件：

- `XCellTyped`：類型列舉，定義了所有支援的資料類型
- `TypeMetaInfo`：類型元資訊，包含類型的設定資訊
- `XCellValue`：類型值，儲存剖析後的資料
- 各類型描述器：如 `IntegerDescription`、`DecimalDescription` 等

### 自訂類型實现步骤

要新增自訂類型，请按照以下步骤操作：

#### 1. 建立類型描述模組

在 `projects/xcell-types/src/` 目錄下建立新的類型模組，例如 `my_type/mod.rs`：

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
        todo!("實现單元格剖析逻辑")
    }
}
```

#### 2. 擴充 XCellTyped 列舉

在 `projects/xcell-types/src/typing/mod.rs` 中擴充 `XCellTyped` 列舉：

```rust
pub enum XCellTyped {
    // ... 現有類型 ...
    MyType(Box<MyTypeDescription>),
}
```

#### 3. 實现類型剖析

在 `projects/xcell-types/src/typing/parser.rs` 中新增類型剖析逻辑：

```rust
impl XCellTyped {
    pub fn parse(input: &str, info: &TypeMetaInfo) -> Self {
        let normed = Self::norm_typing(input);
        match normed.as_str() {
            // ... 現有類型 ...
            "mytype" | "my_type" => info.my_type.clone().into(),
            _ => XCellTyped::parse_complex(input, &normed, info),
        }
    }
}
```

#### 4. 更新 TypeMetaInfo

在 `projects/xcell-types/src/typing/mod.rs` 中更新 `TypeMetaInfo` 結構體：

```rust
#[derive(Debug, Clone, Default, Serialize)]
pub struct TypeMetaInfo {
    // ... 現有欄位 ...
    pub my_type: MyTypeDescription,
}
```

#### 5. 新增程式碼產生支援

在 `projects/xcell-types/src/codegen/` 中為新類型新增程式碼產生逻辑，確保能夠正确生成目標語言（如 C#）的類型定義。

***

## 擴充程式碼產生器

XCell 支援多种程式碼產生目標，包含 Unity C#、二進位檔案、XML、JSON 等。您可以擴充这些生成器或建立新的生成器。

### 程式碼產生架構

程式碼產生主要在 `xcell-core/src/codegen/` 模組中實现：

- `binary/`：二進位格式生成
- `readable/`：可读格式生成（XML、JSON）
- `unity/`：Unity C# 程式碼產生

### 擴充 Unity 程式碼產生器

Unity 程式碼產生器是最常用的生成器之一，以下是擴充它的步骤：

#### 1. 查看現有範本

Unity 程式碼產生使用範本檔案，位於 `projects/xcell-core/templates/` 目錄：

- `BuildClass.cs`：类資料表範本
- `BuildDictionary.cs`：字典資料表範本
- `BuildEnumerate.cs`：列舉資料表範本
- `BuildLanguage.cs`：語言資料表範本
- `BuildManager.cs`：管理器範本

#### 2. 修改或建立範本

根据需要修改現有範本或建立新的範本檔案。

#### 3. 更新 UnityCodegen 設定

在 `projects/xcell-core/src/config/unity/mod.rs` 中更新設定：

```rust
#[derive(Debug, Clone)]
pub struct UnityCodegen {
    // ... 現有欄位 ...
    pub my_custom_option: bool,
}
```

#### 4. 實现生成逻辑

在 `projects/xcell-core/src/codegen/unity/` 中實现具體的生成逻辑。

### 建立新的程式碼產生器

要建立全新的程式碼產生器，请按照以下步骤：

#### 1. 建立生成器模組

在 `projects/xcell-core/src/codegen/` 目錄下建立新模組，例如 `cocos/mod.rs`：

```rust
use xcell_errors::XResult;
use crate::config::ProjectConfig;

pub struct CocosCodegen {
    // 設定欄位
}

impl CocosCodegen {
    pub fn write(&self, config: &ProjectConfig) -> XResult<()> {
        todo!("實现 Cocos 程式碼產生逻辑")
    }
}
```

#### 2. 集成到設定系統

在 `ProjectConfig` 中新增新生成器的設定選項。

#### 3. 連線到工作流

在 `WorkspaceManager::write_unity()` 或類似方法中调用新生成器。

***

## 外掛程式開發指南

XCell 支援通过外掛程式系統擴充功能。外掛程式可以新增新的資料表格類型、自訂驗證逻辑或擴充程式碼產生能力。

### 外掛程式架構

外掛程式系統基於 Rust 的 trait 系統，主要介面包含：

- 資料表格處理器 trait
- 驗證器 trait
- 程式碼產生器 trait

### 開發外掛程式步骤

#### 1. 建立外掛程式專案

建立新的 Rust 專案，並新增對 `xcell-core` 和 `xcell-types` 的相依性：

```toml
[package]
name = "xcell-my-plugin"
version = "0.1.0"
edition = "2024"

[dependencies]
xcell-core = { path = "../xcell-core" }
xcell-types = { path = "../xcell-types" }
```

#### 2. 實现外掛程式 trait

根据需要實现相應的 trait。例如，實现自訂資料表格處理器：

```rust
use xcell_core::x_table::table::CalamineTable;
use xcell_errors::XResult;

pub struct MyCustomTable;

impl MyCustomTable {
    pub fn confirm(table: &CalamineTable) -> XResult<Self> {
        todo!("檢查資料表格是否符合自訂格式")
    }

    pub fn perform(&self, workspace: &mut WorkspaceManager) -> XResult<()> {
        todo!("執行資料表格處理逻辑")
    }
}
```

#### 3. 註冊外掛程式

在 `WorkspaceManager::try_perform_file()` 方法中註冊您的外掛程式，使其能夠被識別和處理。

### 外掛程式最佳做法

1. **保持外掛程式独立**：外掛程式應该盡量独立，減少對 XCell 內部實现的相依性
2. **提供設定選項**：通过 `XCell.toml` 提供外掛程式設定
3. **錯誤處理**：妥善處理錯誤，提供清晰的錯誤資訊
4. **檔案**：為外掛程式提供完整的使用檔案
5. **測試**：編寫充分的測試案例

***

## 總結

XCell 提供了強大的擴充能力，允许開發者根据自己的需求定制功能。无论是新增新的資料類型、擴充程式碼產生器，还是開發独立的外掛程式，XCell 的模組化架構都能很好地支援这些需求。

如果您在擴充过程中遇到問題，请參考專案原始程式碼或認可 Issue 获取說明。
