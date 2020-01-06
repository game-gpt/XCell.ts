
# 快速開始

本教學將指導您從零開始使用 XCell 設定資料表管理工具。

## 環境准備

### 系統要求

- Windows 作業系統
- Rust 開發環境（如需從原始碼編譯）

### 安裝方式

#### 方式一：使用預編譯版本

1. 從專案發布页面下載最新的 `xcell.exe`
2. 將 `xcell.exe` 放置到您的專案目錄中

#### 方式二：從原始碼編譯

1. 確保已安裝 Rust 開發環境
2. 複製或下載專案原始碼
3. 在專案根目錄執行：

```bash
cargo build --release
```

4. 編譯完成後，可執行檔位於 `target/release/xcell.exe`

## 專案初始化

### 建立專案結構

在您的工作目錄中建立以下結構：

```
MyProject/
├── xcell.exe
├── ProjectConfig.toml
└── Tables/
    └── Hero.xlsx
```

### 建立設定檔案

在專案根目錄建立 `ProjectConfig.toml` 檔案：

```toml
version = "0.1.0"

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

[unity]
enable = true
project = "./"
output = "Assets/Scripts/DataTable/Generated"
namespace = "DataTable.Generated"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"
support_clone = true
legacy_using = false
legacy_null_null = false

[unity.binary]
enable = true
output = "Assets/Tables/Generated"

[unity.xlua]
enable = false

[unity.xml]
enable = false
output = "Assets/Tables/Readable"

[unity.json]
enable = false
output = "Assets/Tables/Readable"

[unity.protobuf]
enable = false
```

## 建立第一個設定資料表

### Excel 資料表格結構

XCell 使用特定的 Excel 資料表格結構，前 3 行為資料表頭，從第 4 行開始是資料：

| 行號 | 用途 | 說明 |
|------|------|------|
| 1 | 欄位名 | 設定資料表的欄位名稱 |
| 2 | 資料類型 | 欄位的資料類型 |
| 3 | 註解 | 欄位的說明文字 |
| 4+ | 資料行 | 實际的設定資料 |

### 範例資料表格

建立 `Tables/Hero.xlsx` 資料表格：

| id | name | hp | attack | is_boss |
|----|------|----|--------|---------|
| int | string | int | int | bool |
| 英雄ID | 英雄名稱 | 生命值 | 攻擊力 | 是否Boss |
| 1 | 騎士 | 1000 | 100 | false |
| 2 | 法師 | 800 | 150 | false |
| 3 | 巨龍 | 5000 | 500 | true |

## 執行 XCell

### 基本命令

在專案根目錄打開命令列，執行：

```bash
xcell.exe
```

XCell 會自動：
1. 掃描目前目錄下的所有 Excel 資料表格
2. 驗證資料表格資料
3. 生成對應的 C# 程式碼和二進位資料檔案

### 命令列選項

```bash
xcell.exe [OPTIONS] [COMMAND]
```

#### 命令

- `check`: 檢查設定資料表，但不匯出任何檔案
- `clear`: 清除資料庫與快取

#### 選項

- `--workspace <WORKSPACE>`: 手動設定工作目錄，不輸入資料表示目前目錄
- `-w, --watch`: 啟用監聽模式，當有檔案修改時只更新對應檔案
- `--disable-xml`: 強制關閉 xml 生成
- `--disable-json`: 強制關閉 json 生成
- `-h, --help`: 顯示說明
- `-V, --version`: 顯示版本

### 使用範例

#### 檢查設定資料表

```bash
xcell.exe check
```

#### 啟用監聽模式

```bash
xcell.exe --watch
```

#### 清除快取

```bash
xcell.exe clear
```

## 查看生成結果

執行成功後，您將看到以下生成的檔案：

```
MyProject/
├── Assets/
│   ├── Scripts/DataTable/Generated/
│   │   ├── HeroTable.cs
│   │   └── DataTableManager.cs
│   └── Tables/Generated/
│       └── HeroTable.bytes
```

### 生成的 C# 程式碼範例

`HeroTable.cs` 將包含類似以下內容：

```csharp
namespace DataTable.Generated
{
    public partial class HeroTable
    {
        public readonly Dictionary<int, HeroElement> dict = new();

        public HeroElement GetElement(int id)
        {
            return dict.TryGetValue(id, out var item) ? item : null;
        }
    }

    public partial class HeroElement
    {
        public int id;
        public string name;
        public int hp;
        public int attack;
        public bool is_boss;
    }
}
```

## 下一步

- 查看 [使用場景索引](use-cases/index.md) 了解更多具體套用
- Unity 使用者可以參考 [Unity 集成](use-cases/unity-integration.md) 檔案
