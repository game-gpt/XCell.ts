# Unreal Engine 統合

XCell は Unreal Engine との深い統合を提供し、C++ コード、バイナリデータファイルなど複数のフォーマットの生成をサポートしています。

## 設定オプション

`XCell.toml` ファイルで、Unreal Engine 統合設定は `[unreal]` セクションにあります：

```toml
[unreal]
enable = true
project = "../"
output = "Source/DataTable/Generated"
namespace = "DataTable::Generated"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"

[unreal.binary]
enable = true
output = "Content/Tables/Generated"

[unreal.json]
enable = false
output = "Content/Tables/Readable"
```

## 生成されるコード構造

### テーブルクラス構造

各設定表は対応する C++ クラスを生成し、以下を含みます：
- テーブルデータクラス（Table）
- 要素データクラス（Element）
- マネージャークラス（Manager）

### サンプル生成コード構造：

```cpp
namespace DataTable::Generated {
    class BuffTable {
    public:
        const BuffElement* Get(int32 Id) const;
        bool TryGet(int32 Id, const BuffElement*& OutElement) const;
    
    private:
        TMap<int32, BuffElement> Data;
    };

    class BuffElement {
    public:
        int32 Id = 0;
        FString Name = "";
        int32 Value = 0;
        // ... その他のフィールド
    };

    class DataTableManager {
    public:
        BuffTable BuffTable;
        void LoadAll();
        void UnloadAll();
    };
}
```

## データ読み込み

### バイナリデータの読み込み：

```cpp
auto Manager = MakeShared<DataTableManager>();
Manager->LoadAll();
```

### サポートされる機能：
- 非同期読み込み
- 増分読み込み
- メモリ管理
- ホットアップデートサポート

## 型マッピング

XCell 型から C++ 型へのマッピング：

| XCell 型 | C++ 型 |
|------------|---------|
| bool | bool |
| i8 | int8 |
| i16 | int16 |
| i32 | int32 |
| i64 | int64 |
| u8 | uint8 |
| u16 | uint16 |
| u32 | uint32 |
| u64 | uint64 |
| f32 | float |
| f64 | double |
| string | FString |
| color | FColor |
| vec2 | FVector2D |
| vec3 | FVector |
| vec4 | FVector4 |
| quaternion | FQuat |

## パフォーマンス最適化

### 大きなテーブルの処理最適化

1. **大きなテーブルを適切に分割**
   - 大きなテーブルを機能またはモジュールごとに分割
   - ビルド時に結合ルールを使用して結合
   - 開発時の保守性とランタイムのパフォーマンスを維持

2. **バイナリフォーマットを使用**
   - バイナリフォーマットの読み込み速度が最速
   - 本番環境ではバイナリフォーマットの使用を推奨
   - 開発環境では JSON を使用してデバッグを容易に

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
   ```cpp
   // 特定の表のみ読み込み
   Manager->BuffTable.Load();
   Manager->ItemTable.Load();
   ```

2. **適時アンロード**
   ```cpp
   // 不要な表をアンロード
   Manager->BuffTable.Unload();
   ```

## よくある問題

### 生成されたコードのコンパイルエラー

- Unreal Engine プロジェクトパスが正しいか確認
- 名前空間がプロジェクト構造と一致するか確認
- すべての依存関係が正しくインストールされているか確認

### データ読み込み失敗

- バイナリファイルが生成されているか確認
- ファイルパスが正しいか確認
- テーブル構造とデータ型が一致しているか確認

## ベストプラクティス

1. **メタ表フォーマットを使用**：複雑な設定表にはメタ表フォーマットを推奨、より豊富なメタデータ定義をサポート
2. **表結合ルールを適切に使用**：大規模プロジェクトでは表結合ルールで複雑なテーブルを管理
3. **データ構造を最適化**：実際の使用シナリオに応じて適切なデータ型と構造を選択
4. **定期的にクリーンアップ**：不要な設定表とデータを定期的にクリーンアップし、プロジェクトを整潔に保つ

## サンプルプロジェクト

XCell は Unreal Engine サンプルプロジェクトを提供し、実際のプロジェクトで XCell を使用する方法を示しています：

- 基本的な設定表の使用
- 複雑なデータ構造
- 多言語サポート
- ホットアップデート統合

サンプルプロジェクトを通じて、Unreal Engine での XCell のベストプラクティスを素早く理解できます。
