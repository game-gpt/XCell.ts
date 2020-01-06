# XCell アーキテクチャ設計ドキュメント

## 1. プロジェクト全体アーキテクチャ説明

XCell は設定表管理ツールで、Rust で記述され、モジュラー設計を採用し、各モジュールの責任が明確で、結合度が低いです。プロジェクト全体は以下の主要部分に分かれます：

- **バックエンドモジュール**：`backends/` ディレクトリに配置、コアビジネスロジックを含む
  - `xcell` - コマンドラインツールとメインエントリ
  - `xcell-analyzer` - ワークスペース管理とテーブル分析
  - `xcell-generator` - コードジェネレーター
  - `xcell-provider` - テーブル読み取り抽象
  - `xcell-core` - 型システムとコア機能
  - `xcell-config` - 設定管理
  - `xcell-macros` - マクロ定義
  - `xcell-parser` - 型パーサー
  - `xcell-plugin` - プラグインシステム
  - `xcell-wasi` - WebAssembly サポート

- **フロントエンドモジュール**：`frontends/` ディレクトリに配置、ユーザーインターフェースを含む
  - `homepage` - プロジェクト公式サイト
  - `xcell` - フロントエンド SDK
  - `xcell-desktop` - デスクトップアプリケーション
  - `xcell-h5` - Web アプリケーション

- **ドキュメント**：`documentation/` ディレクトリに配置、プロジェクトドキュメントを含む

- **サンプル**：`examples/` ディレクトリに配置、使用例を含む

### 技術スタック

- **バックエンド**：Rust
- **フロントエンド**：Vue.js, TypeScript, Tauri
- **テーブル読み取り**：calamine (Excel), csv (CSV/TSV)
- **テンプレートエンジン**：dejavu
- **非同期ランタイム**：tokio
- **エラー処理**：anyhow
- **ログ**：tracing

## 2. モジュール分割と責任説明

### 2.1 xcell - コマンドラインツール

**責任**：
- コマンドラインインターフェースの提供
- コマンドライン引数の解析
- ワークフロー全体の調整
- 他のバックエンドモジュールを呼び出してタスクを実行

**コアファイル**：
- `backends/xcell/src/main.rs` - プログラムエントリポイント
- `backends/xcell/src/workspace.rs` - ワークスペース管理
- `backends/xcell/src/commands/toml.rs` - TOML 設定処理

**主な機能**：
- コードとデータファイルの生成
- 設定のチェック
- 出力のクリア
- ファイル監視モード

### 2.2 xcell-analyzer - ワークスペース管理とテーブル分析

**責任**：
- ワークスペースと設定の管理
- テーブルファイルのスキャンと識別
- テーブルデータの解析
- テーブルタイプの識別
- テーブルデータの処理
- 列挙定義のリンク

**コアファイル**：
- `backends/xcell-analyzer/src/lib.rs` - モジュールエクスポート
- `backends/xcell-analyzer/src/config/mod.rs` - ワークスペースマネージャー
- `backends/xcell-analyzer/src/x_table/mod.rs` - テーブルデータ構造

**コアコンポーネント**：
- `WorkspaceManager` - ワークスペースマネージャー、ワークフロー全体の調整を担当
- `XClassTable` - クラステーブルタイプ
- `XDictTable` - 辞書テーブルタイプ
- `XEnumerateTable` - 列挙テーブルタイプ
- `XLanguageTable` - 言語テーブルタイプ
- `DefineManager` - 列挙定義マネージャー
- `LanguageManager` - 言語テーブルマネージャー

### 2.3 xcell-generator - コードジェネレーター

**責任**：
- 様々なフォーマットのコードとデータファイルの生成
- 複数のターゲットプラットフォームのサポート
- プラグイン可能なコード生成アーキテクチャの提供

**コアファイル**：
- `backends/xcell-generator/src/lib.rs` - モジュールエクスポート
- `backends/xcell-generator/src/codegen/mod.rs` - コードジェネレーターインターフェース
- `backends/xcell-generator/src/config.rs` - ジェネレーター設定

**サポートされるコードジェネレーター**：
- `json` - JSON データ生成 ✅
- `binary` - バイナリデータ生成 ✅
- `cocos` - Cocos プラットフォームコード生成 ✅
- `typescript` - TypeScript コード生成 ✅
- `dejavu` - テンプレートエンジンコード生成 ✅
- `unity` - Unity プラットフォームコード生成 ⚠️ (現在無効)
- `xlua` - XLua スクリプトコード生成
- `sql` - SQL データベースコード生成
- `xml` - XML データ生成

### 2.4 xcell-provider - テーブル読み取り抽象

**責任**：
- 統一されたテーブル読み取りインターフェースの提供
- 複数のテーブルフォーマット（Excel、CSV、TSV）のサポート
- 異なるテーブルフォーマットの差異を隠蔽
- テーブルヘッダー解析の提供

**コアファイル**：
- `backends/xcell-provider/src/lib.rs` - モジュールエクスポート
- `backends/xcell-provider/src/table/mod.rs` - テーブル読み取りインターフェース
- `backends/xcell-provider/src/standard/mod.rs` - 標準ストリーム実装

**コアコンポーネント**：
- `TableReader` - テーブルリーダー trait
- `ExcelTable` - Excel テーブル読み取り実装
- `CsvTable` - CSV テーブル読み取り実装
- `TsvTable` - TSV テーブル読み取り実装
- `FileFormatDetector` - ファイルフォーマット検出器
- `load_table` - 統一テーブル読み込み関数

### 2.5 xcell-core - 型システムとコア機能

**責任**：
- すべてのデータ型の定義
- 型変換と解析の提供
- 様々なプラットフォームの型マッピングのサポート
- 値処理と変換の提供
- バイトオーダー読み書きインターフェースの提供

**コアファイル**：
- `backends/xcell-core/src/lib.rs` - モジュールエクスポート
- `backends/xcell-core/src/typing/mod.rs` - 型定義
- `backends/xcell-core/src/value/mod.rs` - 値処理

**サポートされる型**：
- 整数型 (Integer)
- 小数型 (Decimal)
- ブール型 (Boolean)
- 文字列型 (String)
- 配列型 (Array)
- ベクトル型 (Vector)
- 言語型 (Language)
- 列挙型 (Enumerate)
- カラー型 (Color)
- 時間型 (Time)

### 2.6 xcell-config - 設定管理

**責任**：
- プロジェクト設定構造の定義
- 設定解析と検証の提供
- 異なるプラットフォームの設定オプションのサポート

**コアファイル**：
- `backends/xcell-config/src/lib.rs` - モジュールエクスポート
- `backends/xcell-config/src/project/mod.rs` - プロジェクト設定
- `backends/xcell-config/src/cocos/mod.rs` - Cocos プラットフォーム設定
- `backends/xcell-config/src/unity/mod.rs` - Unity プラットフォーム設定

**コアコンポーネント**：
- `ProjectConfig` - プロジェクト設定
- `CocosCodegen` - Cocos コード生成設定
- `UnityCodegen` - Unity コード生成設定
- `MergeRules` - 表結合ルール

### 2.7 xcell-parser - 型パーサー

**責任**：
- 型式の解析
- フィールド定義の解析
- メタデータの解析

**コアファイル**：
- `backends/xcell-parser/src/lib.rs` - モジュールエクスポート
- `backends/xcell-parser/src/lexer.rs` - 字句解析器
- `backends/xcell-parser/src/parser.rs` - 構文解析器
- `backends/xcell-parser/src/ast.rs` - 抽象構文木

## 3. データフロー説明

### 3.1 全体フロー

テーブルファイルの読み取りからコードエクスポートまでの完全なフロー：

```
テーブルファイル (Excel/CSV/TSV) → 読み取り解析 → テーブル識別 → データ処理 → コード生成 → 出力ファイル
```

### 3.2 詳細手順

#### ステップ1：ワークスペースの初期化

1. コマンドライン引数または設定ファイルの解析
2. `WorkspaceManager` インスタンスの作成
3. プロジェクト設定 (`ProjectConfig`) の読み込み

#### ステップ2：ファイルのスキャン

1. 作業ディレクトリのスキャン
2. `WalkDir` でディレクトリを走査
3. 設定された `include` パターンでファイルをフィルタリング

#### ステップ3：テーブルファイルの読み取り

1. `load_table()` 関数でテーブルファイルを読み取り（フォーマット自動検出）
2. テーブルヘッダー (`XCellHeader`) の解析
3. すべてのデータ行の読み取り

#### ステップ4：テーブルタイプの識別

以下のテーブルタイプを順番に識別：

1. `XListTable` - リストテーブル
2. `XDictTable` - 辞書テーブル
3. `XEnumerateTable` - 列挙テーブル
4. `XClassTable` - クラステーブル
5. `XLanguageTable` - 言語テーブル
6. `XLanguageID` - 言語 ID テーブル

#### ステップ5：テーブルデータの処理

テーブルタイプに応じて適切な操作を実行：

- 列挙テーブルの場合：`DefineManager` に追加
- 言語テーブルの場合：`LanguageManager` に追加
- その他のテーブル：データ検証と保存

#### ステップ6：列挙のリンク

`link_enumerate()` メソッドを呼び出して、列挙定義を対応するデータフィールドにリンク

#### ステップ7：コード生成

1. `Generator` インスタンスの作成
2. 有効なコードジェネレーターの設定
3. すべての有効な生成物の走査
4. 各生成物に対して対応するコードジェネレーターを呼び出し
5. 対応するフォーマットのコードとデータファイルを生成

#### ステップ8：ファイル監視（オプション）

ファイル監視が有効な場合：
1. ファイル監視器の起動
2. ファイル変更の監視
3. 変更されたファイルの自動再処理

## 4. コアコード位置参照

### ワークスペース管理
- `WorkspaceManager` - `backends/xcell-analyzer/src/config/mod.rs`
- `WorkspaceManager::new()` - ワークスペースマネージャーの作成
- `WorkspaceManager::classes()` - クラステーブルデータの取得
- `WorkspaceManager::lists()` - リストテーブルデータの取得
- `WorkspaceManager::dicts()` - 辞書テーブルデータの取得
- `WorkspaceManager::enumerates()` - 列挙テーブルデータの取得

### テーブル読み取り
- `load_table()` - `backends/xcell-provider/src/table/mod.rs` - 統一テーブル読み込み関数
- `TableReader` - `backends/xcell-provider/src/table/mod.rs` - テーブルリーダー trait
- `XCellHeader` - `backends/xcell-provider/src/table/mod.rs` - テーブルヘッダー

### テーブルタイプ
- `XClassTable` - `backends/xcell-analyzer/src/x_table/class/mod.rs` - クラステーブルタイプ
- `XDictTable` - `backends/xcell-analyzer/src/x_table/dictionary/mod.rs` - 辞書テーブルタイプ
- `XEnumerateTable` - `backends/xcell-analyzer/src/x_table/enumerate/mod.rs` - 列挙テーブルタイプ
- `XLanguageTable` - `backends/xcell-analyzer/src/x_table/language/mod.rs` - 言語テーブルタイプ

### コード生成
- `Generator` - `backends/xcell-generator/src/lib.rs` - ジェネレーターメインエントリ
- `Codegen` - `backends/xcell-generator/src/codegen/mod.rs` - コードジェネレーター trait
- `CocosCodegen` - `backends/xcell-generator/src/codegen/cocos/mod.rs` - Cocos コード生成
- `UnityCodegen` - `backends/xcell-generator/src/codegen/unity/mod.rs` - Unity コード生成 (現在無効)
- `JsonCodegen` - `backends/xcell-generator/src/codegen/json/mod.rs` - JSON データ生成

### 型システム
- `TypeDescription` - `backends/xcell-core/src/typing/mod.rs` - 型記述
- `XCellValue` - `backends/xcell-core/src/value/mod.rs` - セル値
- `CSharpReader`/`CSharpWriter` - `backends/xcell-core/src/codegen/csharp_ffi/mod.rs` - C# 型マッピング

### 設定管理
- `ProjectConfig` - `backends/xcell-config/src/project/mod.rs` - プロジェクト設定
- `CocosCodegen` - `backends/xcell-config/src/cocos/mod.rs` - Cocos コード生成設定
- `UnityCodegen` - `backends/xcell-config/src/unity/mod.rs` - Unity コード生成設定

## 5. 抽象分離設計

### 5.1 コア抽象レイヤー

XCell は多層抽象設計を採用し、各モジュールの責任が明確で、抽象漏れを回避：

1. **テーブル読み取り層** (`xcell-provider`)：
   - 統一された `TableReader` trait を提供
   - 異なるテーブルフォーマット（Excel、CSV、TSV）の差異を隠蔽
   - 上層モジュールは具体的なテーブルフォーマットを気にする必要がない

2. **テーブル分析層** (`xcell-analyzer`)：
   - `TableReader` に基づいてテーブルデータを読み取り
   - テーブルタイプを識別して適切な処理を実行
   - `WorkspaceManager` ですべてのテーブルデータを統一管理

3. **コード生成層** (`xcell-generator`)：
   - `WorkspaceManager` に基づいてテーブルデータを取得
   - テーブルファイルと直接対話しない
   - `Codegen` trait で複数のコードジェネレーターをサポート

4. **型システム層** (`xcell-core`)：
   - 統一されたデータ型を定義
   - 型変換と解析を提供
   - マルチプラットフォーム型マッピングをサポート

### 5.2 抽象分離原則

- **単一責任**：各モジュールは特定の機能のみを担当
- **依存性逆転**：高層モジュールは抽象に依存し、具象実装に依存しない
- **インターフェース分離**：trait で最小化インターフェースを定義
- **リスコフ置換**：実装はサブクラスで置換可能
- **開放閉鎖原則**：拡張に対して開き、修正に対して閉じる

## 6. 拡張開発ガイド

### 新しいテーブルフォーマットの追加

1. `backends/xcell-provider/src/table/` に新しいテーブル読み取り実装を作成
2. `TableReader` trait を実装
3. `FileFormatDetector` にフォーマット検出ロジックを追加
4. `load_table` 関数に新しいフォーマットのサポートを追加

### 新しいデータ型の追加

1. `backends/xcell-core/src/` に新しいモジュールを作成
2. 型解析と変換ロジックを実装
3. `backends/xcell-core/src/lib.rs` でエクスポート
4. 対応するプラットフォームの型マッピングサポートを追加

### 新しいコードジェネレーターの追加

1. `backends/xcell-generator/src/codegen/` に新しいモジュールを作成
2. `Codegen` trait を実装
3. `Generator::new()` で新しいジェネレーターを登録
4. 対応する設定オプションを追加

### 新しいプラットフォームサポートの追加

1. `backends/xcell-config/src/` に新しいプラットフォーム設定モジュールを作成
2. `backends/xcell-generator/src/codegen/` に新しいプラットフォームコードジェネレーターを作成
3. プラットフォーム固有のコード生成ロジックを実装
4. ドキュメントとサンプルを更新
