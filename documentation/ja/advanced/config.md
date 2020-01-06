# 設定ファイル

XCell は TOML 形式の設定ファイルを使用してプロジェクト設定を管理します。設定ファイルは `XCell.toml` という名前で、プロジェクトのルートディレクトリに配置されます。

## 基本設定

| 設定項 | 型 | 説明 | デフォルト値 |
|--------|------|------|--------|
| version | string | 設定ファイルのバージョン番号 | "0.0.0" |
| include | string | 含める Excel ファイルパスパターン（最優先） | "*.xlsx" |
| exclude | string | 除外する Excel ファイルパスパターン（include より優先度低） | "" |

### 行列設定 (line)

テーブル内の各情報が存在する行番号を定義します（1から開始）。

| 設定項 | 型 | 説明 | デフォルト値 |
|--------|------|------|--------|
| line.field | int | フィールド名が存在する行 | 1 |
| line.type | int | データ型が存在する行 | 2 |
| line.comment | int | コメントが存在する行 | 3 |
| line.data | int | データ開始行 | 4 |

#### 旧テーブルの移行

XCell のデフォルトのテーブルフォーマット：

| 行番号 | 内容 |
|------|------|
| 第1行 | フィールドコメント |
| 第2行 | フィールド名 |
| 第3行 | フィールド型 |
| 第4行以降 | データ行 |

旧テーブルのフォーマットが異なる場合、line マッピングで調整できます。例えば、旧テーブルのフォーマットが：

| 行番号 | 内容 |
|------|------|
| 第1行 | フィールド名 |
| 第2行 | フィールド型 |
| 第3行以降 | データ行 |

設定は以下の通り：

```toml
line.field = 1
line.type = 2
line.comment = 0  # コメント行なし
line.data = 3
```

> 注：`line.comment = 0` はコメント行がないことを意味します。

### 型解析設定 (type)

各データ型の解析ルールを設定します。

#### ブール型 (bool)

| 設定項 | 型 | 説明 |
|--------|------|------|
| type.bool.accept | array[string] | true として受け入れる値のリスト |
| type.bool.reject | array[string] | false として受け入れる値のリスト |

例：
```toml
[type.bool]
accept = ["true", "√", "是", "1"]
reject = ["false", "x", "否", "0"]
```

### Unity コード生成設定 (unity)

C# コード生成関連の設定を行います。

| 設定項 | 型 | 説明 | デフォルト値 |
|--------|------|------|--------|
| unity.enable | bool | Unity コード生成を有効にするか | true |
| unity.project | string | Unity プロジェクトパス | "../" |
| unity.output | string | コード出力ディレクトリ | "Assets/Scripts/DataTable/Generated" |
| unity.namespace | string | 生成コードの名前空間 | "DataTable.Generated" |
| unity.manager | string | マネージャークラス名 | "DataTableManager" |
| unity.suffix_table | string | テーブルクラスのサフィックス | "Table" |
| unity.suffix_element | string | 要素クラスのサフィックス | "Element" |
| unity.support_clone | bool | クローンをサポートするか | true |
| unity.legacy_using | bool | 旧版 using を使用するか | false |
| unity.legacy_null_null | bool | 旧版 null 処理を使用するか | false |

### データ出力フォーマット設定

異なるフォーマットのデータファイル出力を設定します。

#### Binary フォーマット

| 設定項 | 型 | 説明 | デフォルト値 |
|--------|------|------|--------|
| unity.binary.enable | bool | Binary 出力を有効にするか | true |
| unity.binary.output | string | Binary ファイル出力ディレクトリ | "Assets/Tables/Generated" |

#### XML フォーマット

| 設定項 | 型 | 説明 | デフォルト値 |
|--------|------|------|--------|
| unity.xml.enable | bool | XML 出力を有効にするか | false |
| unity.xml.output | string | XML ファイル出力ディレクトリ | "Assets/Tables/Readable" |

#### JSON フォーマット

| 設定項 | 型 | 説明 | デフォルト値 |
|--------|------|------|--------|
| unity.json.enable | bool | JSON 出力を有効にするか | false |
| unity.json.output | string | JSON ファイル出力ディレクトリ | "Assets/Tables/Readable" |

#### その他のフォーマット

- **xlua**: Lua コード生成
- **protobuf**: Protobuf フォーマット出力

## 使用説明

1. プロジェクトのルートディレクトリに `XCell.toml` ファイルを作成
2. 必要に応じて設定項目を変更
3. XCell ツール実行時に設定が自動的に読み込まれる
4. テーブル設定はグローバル設定を上書き可能（同名の `.toml` ファイルを作成）
