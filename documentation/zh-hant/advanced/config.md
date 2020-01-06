# 設定檔案

XCell 使用 TOML 格式的設定檔案来管理專案設定，設定檔案命名為 `XCell.toml`，位於專案根目錄。

## 基本設定

| 設定项 | 類型 | 說明 | 預設值 |
|--------|------|------|--------|
| version | string | 設定檔案版本號 | "0.0.0" |
| include | string | 包含的 Excel 檔案路徑模式（優先级最高） | "*.xlsx" |
| exclude | string | 排除的 Excel 檔案路徑模式（優先级低於 include） | "" |

### 行列設定 (line)

定義資料表格中各資訊所在的行號（從 1 開始）。

| 設定项 | 類型 | 說明 | 預設值 |
|--------|------|------|--------|
| line.field | int | 欄位名所在行 | 1 |
| line.type | int | 資料類型所在行 | 2 |
| line.comment | int | 註解所在行 | 3 |
| line.data | int | 資料起始行 | 4 |

#### 旧資料表迁移

XCell 預設的資料表格格式為：

| 行號 | 內容 |
|------|------|
| 第 1 行 | 欄位註解 |
| 第 2 行 | 欄位名 |
| 第 3 行 | 欄位類型 |
| 第 4 行+ | 資料行 |

如果您的旧資料表格式不同，可通过 line 對應調整。例如旧資料表格式為：

| 行號 | 內容 |
|------|------|
| 第 1 行 | 欄位名 |
| 第 2 行 | 欄位類型 |
| 第 3 行+ | 資料行 |

設定如下：

```toml
line.field = 1
line.type = 2
line.comment = 0  # 无註解行
line.data = 3
```

> 注：`line.comment = 0` 資料表示无註解行。

### 類型剖析設定 (type)

設定各种資料類型的剖析規則。

#### 布爾類型 (bool)

| 設定项 | 類型 | 說明 |
|--------|------|------|
| type.bool.accept | array[string] | 接受為 true 的值串列 |
| type.bool.reject | array[string] | 接受為 false 的值串列 |

範例：
```toml
[type.bool]
accept = ["true", "√", "是", "1"]
reject = ["false", "x", "否", "0"]
```

### Unity 程式碼產生設定 (unity)

設定 C# 程式碼產生相關設定。

| 設定项 | 類型 | 說明 | 預設值 |
|--------|------|------|--------|
| unity.enable | bool | 是否啟用 Unity 程式碼產生 | true |
| unity.project | string | Unity 專案路徑 | "../" |
| unity.output | string | 程式碼輸出目錄 | "Assets/Scripts/DataTable/Generated" |
| unity.namespace | string | 生成程式碼的命名空間 | "DataTable.Generated" |
| unity.manager | string | 管理器類別名 | "DataTableManager" |
| unity.suffix_table | string | 資料表格类後缀 | "Table" |
| unity.suffix_element | string | 元素类後缀 | "Element" |
| unity.support_clone | bool | 是否支援複製 | true |
| unity.legacy_using | bool | 是否使用旧版 using | false |
| unity.legacy_null_null | bool | 是否使用旧版 null 處理 | false |

### 資料輸出格式設定

設定不同格式的資料檔案輸出。

#### Binary 格式

| 設定项 | 類型 | 說明 | 預設值 |
|--------|------|------|--------|
| unity.binary.enable | bool | 是否啟用 Binary 輸出 | true |
| unity.binary.output | string | Binary 檔案輸出目錄 | "Assets/Tables/Generated" |

#### XML 格式

| 設定项 | 類型 | 說明 | 預設值 |
|--------|------|------|--------|
| unity.xml.enable | bool | 是否啟用 XML 輸出 | false |
| unity.xml.output | string | XML 檔案輸出目錄 | "Assets/Tables/Readable" |

#### JSON 格式

| 設定项 | 類型 | 說明 | 預設值 |
|--------|------|------|--------|
| unity.json.enable | bool | 是否啟用 JSON 輸出 | false |
| unity.json.output | string | JSON 檔案輸出目錄 | "Assets/Tables/Readable" |

#### 其他格式

- **xlua**: Lua 程式碼產生
- **protobuf**: Protobuf 格式輸出

## 使用說明

1. 在專案根目錄建立 `XCell.toml` 檔案
2. 根据需要修改設定项
3. 執行 XCell 工具时會自動載入設定
4. 資料表格設定可覆盖全局設定（建立同名 `.toml` 檔案）
