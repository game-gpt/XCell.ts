# 高級功能檔案

本檔案詳細介绍 XCell 設定資料表管理工具的高級功能，包含高級設定選項、合資料表規則详解以及效能最佳化技巧。

## 目錄

1. [高級設定選項](#高級設定選項)
2. [合資料表規則详解](#合資料表規則详解)
3. [效能最佳化技巧](#效能最佳化技巧)
4. [引擎集成](#引擎集成)

---

## 高級設定選項

XCell 的設定檔案 `XCell.toml` 提供了豐富的設定選項，讓您可以灵活地定制工具的行為。

### 基本設定結構

一個完整的 `XCell.toml` 設定檔案包含以下主要部分：

```toml
version = "0.0.0"

exclude = ""
include = "*.xlsx"

line.field = 1
line.type = 2
line.comment = 3
line.data = 4

[type.bool]
accept = ["true", "√"]
reject = ["false", "x"]

[type.string]

[merge]
```

### 版本控制設定

```toml
version = "0.0.0"
```

- **version**: 當前專案的版本號，用於標識生成的程式碼和資料檔案版本

### 檔案包含/排除設定

```toml
exclude = ""
include = "*.xlsx"
```

- **include**: 指定要包含的 Excel 檔案模式，支援通配字元
- **exclude**: 指定要排除的 Excel 檔案模式，優先级低於 include

範例：
```toml
include = "tables/**/*.xlsx"
exclude = "tables/temp/*.xlsx"
```

### 資料表格行設定

```toml
line.field = 1
line.type = 2
line.comment = 3
line.data = 4
```

- **line.field**: 欄位名所在的行號（從 1 開始）
- **line.type**: 類型聲明所在的行號
- **line.comment**: 註解所在的行號
- **line.data**: 資料開始的行號

### 類型設定

#### 布爾類型設定

```toml
[type.bool]
accept = ["true", "√"]
reject = ["false", "x"]
```

- **accept**: 被識別為 true 的值串列
- **reject**: 被識別為 false 的值串列

#### 字串類型設定

```toml
[type.string]
# 可擴充設定
```

---

## 合資料表規則详解

合資料表規則允许您將多個 Excel 資料表格合併為一個，支援按行或按列合併。

### 合資料表規則設定

合資料表規則在 `[merge]` 部分設定，每個規則使用一個唯一的編號標識。

```toml
[merge.10001]
mode = "row"
input = "Language_CN*"
target = "Language_CN"

[merge.10002]
mode = "row"
input = "Language_EN*"
target = "Language_EN"

[merge.20001]
mode = "column"
input = "Language*"
target = "Language"
```

### 合資料表模式

#### 行合併模式 (row)

```toml
mode = "row"
```

行合併將多個資料表格的資料行合併到一個資料表格中。适用於：
- 同一資料表格資料量大需要拆分管理
- 多語言資料分离管理

範例目錄結構：
```
LanguageTable/
  - CN/
    - Language_CN_UI.xlsx
    - Language_CN_Item.xlsx
  - EN/
    - Language_EN_UI.xlsx
    - Language_EN_Item.xlsx
```

#### 列合併模式 (column)

```toml
mode = "column"
```

列合併將多個資料表格的列合併到一個資料表格中。适用於：
- 將多列資料分散在不同檔案中
- 不同團队協作編輯同一資料表格的不同部分

### 合資料表規則參數

- **mode**: 合併模式，`row` 或 `column`
- **input**: 輸入檔案模式，支援通配字元
- **target**: 目標資料表格名稱

### 合資料表執行顺序

規則編號決定了合資料表的執行顺序，編號越小越早執行。建議：
- 行合併使用 10000-19999 范圍
- 列合併使用 20000-29999 范圍
- 其他自訂規則使用更高編號

---

## 效能最佳化技巧

### 大資料表處理最佳化

#### 1. 合理拆分大資料表

- 將大資料表按功能或模組拆分
- 使用行合併規則在建置时合併
- 保持開發时的可维護性和執行階段的效能

#### 2. 使用二進位格式

- 二進位格式載入速度最快
- 生產環境推荐使用二進位格式
- 開發環境可以使用 XML/JSON 便於偵錯

### 增量更新最佳化

#### 1. 監聽模式

使用監聽模式：

```bash
xcell.exe --watch
```

監聽模式特点：
- 只重新生成變更的檔案
- 大幅提升開發效率
- 支援即時預覽

#### 2. 合理設定監聽

設定合理的 include/exclude 模式，減少監聽檔案數量。

### 記憶體最佳化

#### 1. 只載入需要的資料表

根据不同引擎的 API，只載入當前場景或功能需要的資料表，避免一次性載入所有資料表。

#### 2. 及时卸載

當不再需要某些資料表时，及时卸載以釋放記憶體。

### 建置最佳化

#### 1. 平行處理

XCell 支援平行處理多個檔案，大幅提升建置速度。

#### 2. 快取机制

合理使用快取，避免重復處理。

---

## 引擎集成

XCell 支援與多种遊戲引擎集成，详情请參考以下檔案：

- [Unity 集成](./unity.md) - 詳細介绍 XCell 與 Unity 引擎的集成
- [Cocos 集成](./cocos.md) - 詳細介绍 XCell 與 Cocos 引擎的集成

---

## 總結

XCell 提供了豐富的高級功能，通过合理設定和最佳化，可以满足各种複雜專案的需求。

- 使用高級設定選項定制 XCell 行為
- 使用合資料表規則管理複雜資料表格
- 通过效能最佳化提升執行階段和建置时效率
- 利用引擎集成提高開發效率

如有問題或建議，欢迎認可 Issue 或 PR！
