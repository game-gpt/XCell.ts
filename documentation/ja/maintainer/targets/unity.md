# Unity 統合

> ⚠️ **注意**：Unity コードジェネレーターは現在無効状態で、リファクタリング中です。以下のドキュメントは参考用で、機能が利用できない可能性があります。

XCell は Unity エンジンとの深い統合を提供し、C# コード、バイナリデータファイルなど複数のフォーマットの生成をサポートしています。

## 現在の状態

Unity コードジェネレーター (`unity`) は現在無効状態です。理由は以下の通り：

1. アーキテクチャのリファクタリング中
2. 型マッピングシステムの更新が必要
3. コード生成テンプレートの最適化が必要

### 代替案

Unity コードジェネレーターが再有効化されるまで、以下の代替案を検討してください：

1. **JSON データフォーマットを使用**：[JSON](json.md) ジェネレーターでデータをエクスポートし、Unity で `JsonUtility` または `Newtonsoft.Json` で解析
2. **TypeScript ジェネレーターを使用**：[TypeScript](typescript.md) で型定義を生成し、手動で C# クラスを作成
3. **Dejavu テンプレートを使用**：[Dejavu テンプレートエンジン](../architecture/index.md#コード生成) でカスタムコード生成

## 設定オプション（参考）

`ProjectSettings.toml` ファイルで、Unity 統合設定は `[unity]` セクションにあります：

```toml
[unity]
enable = false  # 現在無効
project = "../"
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
```

## 期待される生成コード構造

### テーブルクラス構造

各設定表は対応する C# クラスを生成し、以下を含みます：
- テーブルデータクラス（Table）
- 要素データクラス（Element）
- マネージャークラス（Manager）

### サンプル生成コード構造：

```csharp
namespace DataTable.Generated
{
    public class BuffTable
    {
        public Dictionary<int, BuffElement> Data { get; }
        public BuffElement Get(int id);
        public bool TryGet(int id, out BuffElement element);
    }

    public class BuffElement
    {
        public int Id { get; }
        public string Name { get; }
        public int Value { get; }
        // ... その他のフィールド
    }

    public class DataTableManager
    {
        public BuffTable BuffTable { get; }
        public void LoadAll();
        public void UnloadAll();
    }
}
```

## 型マッピング

XCell 型から C# 型へのマッピング：

| XCell 型 | C# 型 |
|------------|---------|
| bool | bool |
| i8 | sbyte |
| i16 | short |
| i32 | int |
| i64 | long |
| u8 | byte |
| u16 | ushort |
| u32 | uint |
| u64 | ulong |
| f32 | float |
| f64 | double |
| string | string |
| color | UnityEngine.Color |
| vec2 | UnityEngine.Vector2 |
| vec3 | UnityEngine.Vector3 |
| vec4 | UnityEngine.Vector4 |
| quaternion | UnityEngine.Quaternion |

## よくある問題

### なぜ Unity ジェネレーターが無効なのか？

Unity コードジェネレーターは、より良い型システムとコード生成アーキテクチャをサポートするためにリファクタリング中です。将来のバージョンで再有効化される予定です。

### 最新の状態を確認するには？

プロジェクトの更新ログを確認するか、`backends/xcell-generator/src/codegen/unity/` ディレクトリのコード変更を確認してください。

## ベストプラクティス

1. **メタ表フォーマットを使用**：複雑な設定表にはメタ表フォーマットを推奨、より豊富なメタデータ定義をサポート
2. **表結合ルールを適切に使用**：大規模プロジェクトでは表結合ルールで複雑なテーブルを管理
3. **データ構造を最適化**：実際の使用シナリオに応じて適切なデータ型と構造を選択
4. **定期的にクリーンアップ**：不要な設定表とデータを定期的にクリーンアップし、プロジェクトを整潔に保つ
