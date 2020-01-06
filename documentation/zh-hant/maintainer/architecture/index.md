# XCell 架構设计檔案

## 1. 專案整體架構說明

XCell 是一個設定資料表管理工具，采用 Rust 編寫，采用模組化设计，各模組职责清晰，耦合度低。專案整體分為以下幾個主要部分：

- **後端模組**：位於 `backends/` 目錄，包含核心業務逻辑
  - `xcell` - 命令列工具和主入口
  - `xcell-analyzer` - 工作空间管理和資料表格分析
  - `xcell-generator` - 程式碼產生器
  - `xcell-provider` - 資料表格讀取抽象
  - `xcell-core` - 類型系統和核心功能
  - `xcell-config` - 設定管理
  - `xcell-macros` - 巨集定義
  - `xcell-parser` - 類型剖析器
  - `xcell-plugin` - 外掛程式系統
  - `xcell-wasi` - WebAssembly 支援

- **前端模組**：位於 `frontends/` 目錄，包含使用者介面
  - `homepage` - 專案官网
  - `xcell` - 前端 SDK
  - `xcell-desktop` - 桌面套用
  - `xcell-h5` - 网页套用

- **檔案**：位於 `documentation/` 目錄，包含專案檔案

- **範例**：位於 `examples/` 目錄，包含使用範例

### 技术栈

- **後端**：Rust
- **前端**：Vue.js, TypeScript, Tauri
- **資料表格讀取**：calamine (Excel), csv (CSV/TSV)
- **範本引擎**：dejavu
- **非同步執行階段**：tokio
- **錯誤處理**：anyhow
- **日誌**：tracing

## 2. 模組劃分與职责說明

### 2.1 xcell - 命令列工具

**职责**：
- 提供命令列介面
- 剖析命令列參數
- 協調整個工作流程
- 调用其他後端模組執行任務

**核心檔案**：
- `backends/xcell/src/main.rs` - 程式入口点
- `backends/xcell/src/workspace.rs` - 工作空间管理
- `backends/xcell/src/commands/toml.rs` - TOML 設定處理

**主要功能**：
- 生成程式碼和資料檔案
- 檢查設定
- 清理輸出
- 檔案监控模式

### 2.2 xcell-analyzer - 工作空间管理和資料表格分析

**职责**：
- 管理工作空间和設定
- 掃描和識別資料表格檔案
- 剖析資料表格資料
- 識別資料表格類型
- 處理資料表格資料
- 連結列舉定義

**核心檔案**：
- `backends/xcell-analyzer/src/lib.rs` - 模組匯出
- `backends/xcell-analyzer/src/config/mod.rs` - 工作空间管理器
- `backends/xcell-analyzer/src/x_table/mod.rs` - 資料表格資料結構

**核心元件**：
- `WorkspaceManager` - 工作空间管理器，负责協調整個工作流程
- `XClassTable` - 类資料表類型
- `XDictTable` - 字典資料表類型
- `XEnumerateTable` - 列舉資料表類型
- `XLanguageTable` - 語言資料表類型
- `DefineManager` - 列舉定義管理器
- `LanguageManager` - 語言資料表管理器

### 2.3 xcell-generator - 程式碼產生器

**职责**：
- 生成各种格式的程式碼和資料檔案
- 支援多种目標平台
- 提供外掛程式化的程式碼產生架構

**核心檔案**：
- `backends/xcell-generator/src/lib.rs` - 模組匯出
- `backends/xcell-generator/src/codegen/mod.rs` - 程式碼產生器介面
- `backends/xcell-generator/src/config.rs` - 生成器設定

**支援的程式碼產生器**：
- `json` - JSON 資料生成 ✅
- `binary` - 二進位資料生成 ✅
- `cocos` - Cocos 平台程式碼產生 ✅
- `typescript` - TypeScript 程式碼產生 ✅
- `dejavu` - 範本引擎程式碼產生 ✅
- `unity` - Unity 平台程式碼產生 ⚠️ (當前停用)
- `xlua` - XLua 指令碼程式碼產生
- `sql` - SQL 資料庫程式碼產生
- `xml` - XML 資料生成

### 2.4 xcell-provider - 資料表格讀取抽象

**职责**：
- 提供统一的資料表格讀取介面
- 支援多种資料表格格式（Excel、CSV、TSV）
- 屏蔽不同資料表格格式的差異
- 提供資料表格頭部剖析

**核心檔案**：
- `backends/xcell-provider/src/lib.rs` - 模組匯出
- `backends/xcell-provider/src/table/mod.rs` - 資料表格讀取介面
- `backends/xcell-provider/src/standard/mod.rs` - 标准流實现

**核心元件**：
- `TableReader` - 資料表格讀取器 trait
- `ExcelTable` - Excel 資料表格讀取實现
- `CsvTable` - CSV 資料表格讀取實现
- `TsvTable` - TSV 資料表格讀取實现
- `FileFormatDetector` - 檔案格式检测器
- `load_table` - 统一資料表格載入函式

### 2.5 xcell-core - 類型系統和核心功能

**职责**：
- 定義所有資料類型
- 提供類型转换和剖析
- 支援各种平台的類型對應
- 提供值處理和转换
- 提供位元組順序读寫介面

**核心檔案**：
- `backends/xcell-core/src/lib.rs` - 模組匯出
- `backends/xcell-core/src/typing/mod.rs` - 類型定義
- `backends/xcell-core/src/value/mod.rs` - 值處理

**支援的類型**：
- 整數類型 (Integer)
- 小数類型 (Decimal)
- 布爾類型 (Boolean)
- 字串類型 (String)
- 陣列類型 (Array)
- 向量類型 (Vector)
- 語言類型 (Language)
- 列舉類型 (Enumerate)
- 顏色類型 (Color)
- 时间類型 (Time)

### 2.6 xcell-config - 設定管理

**职责**：
- 定義專案設定結構
- 提供設定剖析和驗證
- 支援不同平台的設定選項

**核心檔案**：
- `backends/xcell-config/src/lib.rs` - 模組匯出
- `backends/xcell-config/src/project/mod.rs` - 專案設定
- `backends/xcell-config/src/cocos/mod.rs` - Cocos 平台設定
- `backends/xcell-config/src/unity/mod.rs` - Unity 平台設定

**核心元件**：
- `ProjectConfig` - 專案設定
- `CocosCodegen` - Cocos 程式碼產生設定
- `UnityCodegen` - Unity 程式碼產生設定
- `MergeRules` - 合資料表規則

### 2.7 xcell-parser - 類型剖析器

**职责**：
- 剖析類型運算式
- 剖析欄位定義
- 剖析元資料

**核心檔案**：
- `backends/xcell-parser/src/lib.rs` - 模組匯出
- `backends/xcell-parser/src/lexer.rs` - 詞法分析器
- `backends/xcell-parser/src/parser.rs` - 語法分析器
- `backends/xcell-parser/src/ast.rs` - 抽象語法樹

## 3. 資料流說明

### 3.1 整體流程

從資料表格檔案讀取到程式碼匯出的完整流程如下：

```
資料表格檔案 (Excel/CSV/TSV) → 讀取剖析 → 資料表格識別 → 資料處理 → 程式碼產生 → 輸出檔案
```

### 3.2 詳細步骤

#### 步骤 1: 初始化工作空间

1. 剖析命令列參數或設定檔案
2. 建立 `WorkspaceManager` 實例
3. 載入專案設定 (`ProjectConfig`)

#### 步骤 2: 掃描檔案

1. 掃描工作目錄
2. 使用 `WalkDir` 遍歷目錄
3. 根据設定的 `include` 模式篩選檔案

#### 步骤 3: 讀取資料表格檔案

1. 使用 `load_table()` 函式讀取資料表格檔案（自動检测格式）
2. 剖析資料表格頭部 (`XCellHeader`)
3. 讀取所有資料行

#### 步骤 4: 識別資料表格類型

依次尝试識別以下資料表格類型：

1. `XListTable` - 串串列
2. `XDictTable` - 字典資料表
3. `XEnumerateTable` - 列舉資料表
4. `XClassTable` - 类資料表
5. `XLanguageTable` - 語言資料表
6. `XLanguageID` - 語言 ID 資料表

#### 步骤 5: 處理資料表格資料

根据資料表格類型執行相應操作：

- 對於列舉資料表：新增到 `DefineManager`
- 對於語言資料表：新增到 `LanguageManager`
- 對於其他資料表：進行資料驗證和儲存

#### 步骤 6: 連結列舉

调用 `link_enumerate()` 方法將列舉定義連結到對應的資料欄位

#### 步骤 7: 程式碼產生

1. 建立 `Generator` 實例
2. 設定啟用的程式碼產生器
3. 遍歷所有啟用的產物
4. 為每個產物调用相應的程式碼產生器
5. 生成對應格式的程式碼和資料檔案

#### 步骤 8: 檔案监控（可选）

如果啟用了檔案监控：
1. 啟動檔案监控器
2. 監聽檔案變更
3. 自動重新處理變更的檔案

## 4. 核心程式碼位置參照

### 工作空间管理
- `WorkspaceManager` - `backends/xcell-analyzer/src/config/mod.rs`
- `WorkspaceManager::new()` - 建立工作空间管理器
- `WorkspaceManager::classes()` - 获取类資料表資料
- `WorkspaceManager::lists()` - 获取串串列資料
- `WorkspaceManager::dicts()` - 获取字典資料表資料
- `WorkspaceManager::enumerates()` - 获取列舉資料表資料

### 資料表格讀取
- `load_table()` - `backends/xcell-provider/src/table/mod.rs` - 统一資料表格載入函式
- `TableReader` - `backends/xcell-provider/src/table/mod.rs` - 資料表格讀取器 trait
- `XCellHeader` - `backends/xcell-provider/src/table/mod.rs` - 資料表格頭部

### 資料表格類型
- `XClassTable` - `backends/xcell-analyzer/src/x_table/class/mod.rs` - 类資料表類型
- `XDictTable` - `backends/xcell-analyzer/src/x_table/dictionary/mod.rs` - 字典資料表類型
- `XEnumerateTable` - `backends/xcell-analyzer/src/x_table/enumerate/mod.rs` - 列舉資料表類型
- `XLanguageTable` - `backends/xcell-analyzer/src/x_table/language/mod.rs` - 語言資料表類型

### 程式碼產生
- `Generator` - `backends/xcell-generator/src/lib.rs` - 生成器主入口
- `Codegen` - `backends/xcell-generator/src/codegen/mod.rs` - 程式碼產生器 trait
- `CocosCodegen` - `backends/xcell-generator/src/codegen/cocos/mod.rs` - Cocos 程式碼產生
- `UnityCodegen` - `backends/xcell-generator/src/codegen/unity/mod.rs` - Unity 程式碼產生 (當前停用)
- `JsonCodegen` - `backends/xcell-generator/src/codegen/json/mod.rs` - JSON 資料生成

### 類型系統
- `TypeDescription` - `backends/xcell-core/src/typing/mod.rs` - 類型描述
- `XCellValue` - `backends/xcell-core/src/value/mod.rs` - 單元格值
- `CSharpReader`/`CSharpWriter` - `backends/xcell-core/src/codegen/csharp_ffi/mod.rs` - C# 類型對應

### 設定管理
- `ProjectConfig` - `backends/xcell-config/src/project/mod.rs` - 專案設定
- `CocosCodegen` - `backends/xcell-config/src/cocos/mod.rs` - Cocos 程式碼產生設定
- `UnityCodegen` - `backends/xcell-config/src/unity/mod.rs` - Unity 程式碼產生設定

## 5. 抽象隔离设计

### 5.1 核心抽象層次

XCell 采用多層抽象设计，確保各模組职责清晰，避免抽象泄露：

1. **資料表格讀取層** (`xcell-provider`)：
   - 提供统一的 `TableReader` trait
   - 屏蔽不同資料表格格式（Excel、CSV、TSV）的差異
   - 上層模組无需關心具體的資料表格格式

2. **資料表格分析層** (`xcell-analyzer`)：
   - 基於 `TableReader` 讀取資料表格資料
   - 識別資料表格類型並進行相應處理
   - 提供 `WorkspaceManager` 统一管理所有資料表格資料

3. **程式碼產生層** (`xcell-generator`)：
   - 基於 `WorkspaceManager` 获取資料表格資料
   - 不直接與資料表格檔案交互
   - 通过 `Codegen` trait 支援多种程式碼產生器

4. **類型系統層** (`xcell-core`)：
   - 定義统一的資料類型
   - 提供類型转换和剖析
   - 支援多平台類型對應

### 5.2 抽象隔离原則

- **單一职责**：每個模組只负责一個特定的功能
- **相依性倒置**：高層模組相依性抽象，不相依性具體實现
- **介面隔离**：使用 trait 定義最小化介面
- **里氏取代**：實现可以被其子類別取代
- **開闭原則**：對擴充開放，對修改關閉

## 6. 擴充開發指南

### 新增新的資料表格格式

1. 在 `backends/xcell-provider/src/table/` 下建立新的資料表格讀取實现
2. 實现 `TableReader` trait
3. 在 `FileFormatDetector` 中新增格式检测逻辑
4. 在 `load_table` 函式中新增新格式的支援

### 新增新的資料類型

1. 在 `backends/xcell-core/src/` 下建立新模組
2. 實现類型剖析和转换逻辑
3. 在 `backends/xcell-core/src/lib.rs` 中匯出
4. 新增相應平台的類型對應支援

### 新增新的程式碼產生器

1. 在 `backends/xcell-generator/src/codegen/` 下建立新模組
2. 實现 `Codegen` trait
3. 在 `Generator::new()` 中註冊新的生成器
4. 新增相應的設定選項

### 新增新的平台支援

1. 在 `backends/xcell-config/src/` 下建立新的平台設定模組
2. 在 `backends/xcell-generator/src/codegen/` 下建立新的平台程式碼產生器
3. 實现平台特定的程式碼產生逻辑
4. 更新檔案和範例
