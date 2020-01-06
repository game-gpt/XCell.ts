
# クイックスタート

本チュートリアルでは、XCell 設定表管理ツールをゼロから使い始める方法を説明します。

## 環境準備

### システム要件

- Windows オペレーティングシステム
- Rust 開発環境（ソースコードからコンパイルする場合）

### インストール方法

#### 方法1：プリコンパイル版を使用

1. プロジェクトのリリースページから最新の `xcell.exe` をダウンロード
2. `xcell.exe` をプロジェクトディレクトリに配置

#### 方法2：ソースコードからコンパイル

1. Rust 開発環境がインストールされていることを確認
2. プロジェクトのソースコードをクローンまたはダウンロード
3. プロジェクトのルートディレクトリで以下を実行：

```bash
cargo build --release
```

4. コンパイル完了後、実行ファイルは `target/release/xcell.exe` にあります

## プロジェクトの初期化

### プロジェクト構造の作成

作業ディレクトリに以下の構造を作成します：

```
MyProject/
├── xcell.exe
├── ProjectConfig.toml
└── Tables/
    └── Hero.xlsx
```

### 設定ファイルの作成

プロジェクトのルートディレクトリに `ProjectConfig.toml` ファイルを作成：

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

## 最初の設定表を作成

### Excel 表構造

XCell は特定の Excel 表構造を使用し、最初の3行がヘッダー、4行目からデータとなります：

| 行番号 | 用途 | 説明 |
|------|------|------|
| 1 | フィールド名 | 設定表のフィールド名 |
| 2 | データ型 | フィールドのデータ型 |
| 3 | コメント | フィールドの説明文 |
| 4+ | データ行 | 実際の設定データ |

### サンプル表

`Tables/Hero.xlsx` 表を作成：

| id | name | hp | attack | is_boss |
|----|------|----|--------|---------|
| int | string | int | int | bool |
| 英雄ID | 英雄名 | HP | 攻撃力 | ボスフラグ |
| 1 | 騎士 | 1000 | 100 | false |
| 2 | 魔法使い | 800 | 150 | false |
| 3 | 竜 | 5000 | 500 | true |

## XCell の実行

### 基本コマンド

プロジェクトのルートディレクトリでコマンドラインを開き、以下を実行：

```bash
xcell.exe
```

XCell は自動的に：
1. 現在のディレクトリ以下のすべての Excel 表をスキャン
2. 表データを検証
3. 対応する C# コードとバイナリデータファイルを生成

### コマンドラインオプション

```bash
xcell.exe [OPTIONS] [COMMAND]
```

#### コマンド

- `check`: 設定表をチェックするが、ファイルをエクスポートしない
- `clear`: データベースとキャッシュをクリア

#### オプション

- `--workspace <WORKSPACE>`: 作業ディレクトリを手動で設定、指定しない場合は現在のディレクトリ
- `-w, --watch`: 監視モードを有効化、ファイル変更時に該当ファイルのみ更新
- `--disable-xml`: XML 生成を強制無効化
- `--disable-json`: JSON 生成を強制無効化
- `-h, --help`: ヘルプを表示
- `-V, --version`: バージョンを表示

### 使用例

#### 設定表のチェック

```bash
xcell.exe check
```

#### 監視モードの有効化

```bash
xcell.exe --watch
```

#### キャッシュのクリア

```bash
xcell.exe clear
```

## 生成結果の確認

実行成功後、以下の生成されたファイルが確認できます：

```
MyProject/
├── Assets/
│   ├── Scripts/DataTable/Generated/
│   │   ├── HeroTable.cs
│   │   └── DataTableManager.cs
│   └── Tables/Generated/
│       └── HeroTable.bytes
```

### 生成された C# コード例

`HeroTable.cs` には以下のような内容が含まれます：

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

## 次のステップ

- [使用例インデックス](use-cases/index.md) で具体的な応用例を確認
- Unity ユーザーは [Unity 統合](use-cases/unity-integration.md) ドキュメントを参照
