# 拡張性ドキュメント

このドキュメントでは、XCell 設定表管理ツールの機能を拡張する方法について説明します。カスタム型システム、コードジェネレーターの拡張、プラグイン開発が含まれます。

## 目次

1. [カスタム型システム](#カスタム型システム)
2. [コードジェネレーターの拡張](#コードジェネレーターの拡張)
3. [プラグイン開発ガイド](#プラグイン開発ガイド)

***

## カスタム型システム

XCell は柔軟な型システムを提供し、複数の組み込みデータ型をサポートし、開発者が新しいデータ型をカスタマイズすることも可能です。

### 組み込み型の概要

XCell は以下の組み込み型をサポート：

| 型カテゴリ  | サポートされる型                                                                                                            |
| ----- | ---------------------------------------------------------------------------------------------------------------- |
| ブール型   | `bool`, `boolean`                                                                                                |
| 整数型   | `byte`/`i8`, `short`/`i16`, `int`/`i32`, `long`/`i64`, `sbyte`/`u8`, `ushort`/`u16`, `uint`/`u32`, `ulong`/`u64` |
| 小数型   | `float`/`f32`, `double`/`f64`, `decimal`/`d128`/`f128`                                                           |
| 文字列   | `string`                                                                                                         |
| 特殊型  | `color`/`colour`, `color32`, `time`/`date`/`datetime`                                                            |
| ベクトル/配列 | `v2`/`vec2`, `v3`/`vec3`, `v4`/`vec4`, `q4`/`quaternion`                                                         |
| 列挙    | カスタム列挙型                                                                                                          |

### 型システムアーキテクチャ

XCell の型システムのコアは `xcell-types` モジュールにあり、主に以下のコンポーネントが含まれます：

- `XCellTyped`：型列挙、サポートされるすべてのデータ型を定義
- `TypeMetaInfo`：型メタ情報、型の設定情報を含む
- `XCellValue`：型値、解析後のデータを格納
- 各型記述子：`IntegerDescription`、`DecimalDescription` など

### カスタム型の実装手順

カスタム型を追加するには、以下の手順に従ってください：

#### 1. 型記述モジュールの作成

`projects/xcell-types/src/` ディレクトリに新しい型モジュールを作成、例：`my_type/mod.rs`：

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
        todo!("セル解析ロジックを実装")
    }
}
```

#### 2. XCellTyped 列挙の拡張

`projects/xcell-types/src/typing/mod.rs` で `XCellTyped` 列挙を拡張：

```rust
pub enum XCellTyped {
    // ... 既存の型 ...
    MyType(Box<MyTypeDescription>),
}
```

#### 3. 型解析の実装

`projects/xcell-types/src/typing/parser.rs` に型解析ロジックを追加：

```rust
impl XCellTyped {
    pub fn parse(input: &str, info: &TypeMetaInfo) -> Self {
        let normed = Self::norm_typing(input);
        match normed.as_str() {
            // ... 既存の型 ...
            "mytype" | "my_type" => info.my_type.clone().into(),
            _ => XCellTyped::parse_complex(input, &normed, info),
        }
    }
}
```

#### 4. TypeMetaInfo の更新

`projects/xcell-types/src/typing/mod.rs` で `TypeMetaInfo` 構造体を更新：

```rust
#[derive(Debug, Clone, Default, Serialize)]
pub struct TypeMetaInfo {
    // ... 既存のフィールド ...
    pub my_type: MyTypeDescription,
}
```

#### 5. コード生成サポートの追加

`projects/xcell-types/src/codegen/` で新しい型のコード生成ロジックを追加し、ターゲット言語（C# など）の型定義を正しく生成できるようにします。

***

## コードジェネレーターの拡張

XCell は複数のコード生成ターゲットをサポートし、Unity C#、バイナリファイル、XML、JSON などが含まれます。これらのジェネレーターを拡張したり、新しいジェネレーターを作成したりできます。

### コード生成アーキテクチャ

コード生成は主に `xcell-core/src/codegen/` モジュールで実装：

- `binary/`：バイナリフォーマット生成
- `readable/`：可読フォーマット生成（XML、JSON）
- `unity/`：Unity C# コード生成

### Unity コードジェネレーターの拡張

Unity コードジェネレーターは最もよく使用されるジェネレーターの1つです。以下は拡張手順：

#### 1. 既存テンプレートの確認

Unity コード生成はテンプレートファイルを使用し、`projects/xcell-core/templates/` ディレクトリに配置：

- `BuildClass.cs`：クラステンプレート
- `BuildDictionary.cs`：辞書表テンプレート
- `BuildEnumerate.cs`：列挙表テンプレート
- `BuildLanguage.cs`：言語表テンプレート
- `BuildManager.cs`：マネージャーテンプレート

#### 2. テンプレートの変更または作成

必要に応じて既存のテンプレートを変更するか、新しいテンプレートファイルを作成。

#### 3. UnityCodegen 設定の更新

`projects/xcell-core/src/config/unity/mod.rs` で設定を更新：

```rust
#[derive(Debug, Clone)]
pub struct UnityCodegen {
    // ... 既存のフィールド ...
    pub my_custom_option: bool,
}
```

#### 4. 生成ロジックの実装

`projects/xcell-core/src/codegen/unity/` で具体的な生成ロジックを実装。

### 新しいコードジェネレーターの作成

完全に新しいコードジェネレーターを作成するには、以下の手順に従ってください：

#### 1. ジェネレーターモジュールの作成

`projects/xcell-core/src/codegen/` ディレクトリに新しいモジュールを作成、例：`cocos/mod.rs`：

```rust
use xcell_errors::XResult;
use crate::config::ProjectConfig;

pub struct CocosCodegen {
    // 設定フィールド
}

impl CocosCodegen {
    pub fn write(&self, config: &ProjectConfig) -> XResult<()> {
        todo!("Cocos コード生成ロジックを実装")
    }
}
```

#### 2. 設定システムへの統合

`ProjectConfig` に新しいジェネレーターの設定オプションを追加。

#### 3. ワークフローへの接続

`WorkspaceManager::write_unity()` または類似のメソッドで新しいジェネレーターを呼び出す。

***

## プラグイン開発ガイド

XCell はプラグインシステムによる機能拡張をサポートしています。プラグインは新しいテーブル型、カスタム検証ロジック、またはコード生成機能の拡張を追加できます。

### プラグインアーキテクチャ

プラグインシステムは Rust の trait システムに基づいており、主なインターフェースは：

- テーブルプロセッサ trait
- バリデーター trait
- コードジェネレーター trait

### プラグイン開発手順

#### 1. プラグインプロジェクトの作成

新しい Rust プロジェクトを作成し、`xcell-core` と `xcell-types` への依存を追加：

```toml
[package]
name = "xcell-my-plugin"
version = "0.1.0"
edition = "2024"

[dependencies]
xcell-core = { path = "../xcell-core" }
xcell-types = { path = "../xcell-types" }
```

#### 2. プラグイン trait の実装

必要に応じて対応する trait を実装。例えば、カスタムテーブルプロセッサ：

```rust
use xcell_core::x_table::table::CalamideTable;
use xcell_errors::XResult;

pub struct MyCustomTable;

impl MyCustomTable {
    pub fn confirm(table: &CalamideTable) -> XResult<Self> {
        todo!("テーブルがカスタムフォーマットに準拠しているかチェック")
    }

    pub fn perform(&self, workspace: &mut WorkspaceManager) -> XResult<()> {
        todo!("テーブル処理ロジックを実行")
    }
}
```

#### 3. プラグインの登録

`WorkspaceManager::try_perform_file()` メソッドにプラグインを登録し、認識と処理を可能にします。

### プラグイン開発のベストプラクティス

1. **プラグインの独立性を維持**：プラグインはできるだけ独立させ、XCell 内部実装への依存を減らす
2. **設定オプションの提供**：`XCell.toml` でプラグイン設定を提供
3. **エラー処理**：エラーを適切に処理し、明確なエラーメッセージを提供
4. **ドキュメント**：プラグインに完全な使用ドキュメントを提供
5. **テスト**：十分なテストケースを作成

***

## まとめ

XCell は強力な拡張機能を提供し、開発者が自分のニーズに合わせて機能をカスタマイズできます。新しいデータ型の追加、コードジェネレーターの拡張、または独立したプラグインの開発のいずれにおいても、XCell のモジュラーアーキテクチャがこれらのニーズを十分にサポートします。

拡張過程で問題が発生した場合は、プロジェクトのソースコードを参照するか、Issue を提出してヘルプを得てください。
