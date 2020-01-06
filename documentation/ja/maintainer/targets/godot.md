# Godot 統合

XCell は Godot エンジンとの深い統合を提供し、GDScript コード、JSON データファイルなど複数のフォーマットの生成をサポートしています。

## 設定オプション

`XCell.toml` ファイルで、Godot 統合設定は `[godot]` セクションにあります：

```toml
[godot]
enable = true
project = "../"
output = "scripts/DataTable/Generated"
namespace = "DataTable"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"

[godot.json]
enable = true
output = "res://tables/Generated"

[godot.binary]
enable = false
output = "res://tables/Binary"
```

## 生成されるコード構造

### テーブルクラス構造

各設定表は対応する GDScript クラスを生成し、以下を含みます：
- テーブルデータクラス（Table）
- 要素データクラス（Element）
- マネージャークラス（Manager）

### サンプル生成コード構造：

```gdscript
# BuffTable.gd
class_name BuffTable

var data = {}

func get(id):
    return data.get(id)

func try_get(id):
    return data.get(id, null)

func load(data_array):
    for item in data_array:
        var element = BuffElement.new()
        element.id = item.id
        element.name = item.name
        element.value = item.value
        data[item.id] = element

# BuffElement.gd
class_name BuffElement

var id = 0
var name = ""
var value = 0
# ... その他のフィールド

# DataTableManager.gd
class_name DataTableManager

var buff_table = BuffTable.new()

func load_all():
    # すべてのテーブルデータをロード
    pass

func unload_all():
    # すべてのテーブルデータをアンロード
    pass
```

## データ読み込み

### JSON データの読み込み：

```gdscript
var manager = DataTableManager.new()
manager.load_all()

# データを使用
var buff = manager.buff_table.get(1)
if buff:
    print(buff.name)
```

### サポートされる機能：
- 非同期読み込み
- 増分読み込み
- メモリ管理
- ホットアップデートサポート

## 型マッピング

XCell 型から GDScript 型へのマッピング：

| XCell 型 | GDScript 型 |
|------------|-------------|
| bool | bool |
| i8 | int |
| i16 | int |
| i32 | int |
| i64 | int |
| u8 | int |
| u16 | int |
| u32 | int |
| u64 | int |
| f32 | float |
| f64 | float |
| string | String |
| color | Color |
| vec2 | Vector2 |
| vec3 | Vector3 |
| vec4 | Vector4 |

## パフォーマンス最適化

### 大きなテーブルの処理最適化

1. **大きなテーブルを適切に分割**
   - 大きなテーブルを機能またはモジュールごとに分割
   - ビルド時に結合ルールを使用して結合
   - 開発時の保守性とランタイムのパフォーマンスを維持

2. **適切なデータフォーマットを使用**
   - 開発環境では JSON フォーマットを使用してデバッグを容易に
   - 本番環境ではバイナリフォーマットの使用を検討して読み込み速度を向上

### 増分更新の最適化

1. **監視モード**
   監視モードを使用：
   ```bash
   xcell.exe --watch
   ```
   監視モードの特徴：
   - 変更されたファイルのみ再生成
   - 開発効率を大幅に向上
   - リアルタイムプレビューをサポート

2. **監視の適切な設定**
   適切な include/exclude パターンを設定し、監視ファイル数を削減。

### メモリ最適化

1. **必要な表のみ読み込み**
   ```gdscript
   # 特定の表のみ読み込み
   manager.buff_table.load()
   manager.item_table.load()
   ```

2. **適時アンロード**
   ```gdscript
   # 不要な表をアンロード
   manager.buff_table.unload()
   ```

## よくある問題

### 生成されたコードのコンパイルエラー

- Godot プロジェクトパスが正しいか確認
- 名前空間がプロジェクト構造と一致するか確認
- すべての依存関係が正しくインストールされているか確認

### データ読み込み失敗

- JSON ファイルが生成されているか確認
- ファイルパスが正しいか確認
- テーブル構造とデータ型が一致しているか確認

## ベストプラクティス

1. **メタ表フォーマットを使用**：複雑な設定表にはメタ表フォーマットを推奨、より豊富なメタデータ定義をサポート
2. **表結合ルールを適切に使用**：大規模プロジェクトでは表結合ルールで複雑なテーブルを管理
3. **データ構造を最適化**：実際の使用シナリオに応じて適切なデータ型と構造を選択
4. **定期的にクリーンアップ**：不要な設定表とデータを定期的にクリーンアップし、プロジェクトを整潔に保つ

## サンプルプロジェクト

XCell は Godot サンプルプロジェクトを提供し、実際のプロジェクトで XCell を使用する方法を示しています：

- 基本的な設定表の使用
- 複雑なデータ構造
- 多言語サポート
- ホットアップデート統合

サンプルプロジェクトを通じて、Godot での XCell のベストプラクティスを素早く理解できます。
