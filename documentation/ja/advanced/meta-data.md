# メタ属性（Meta Data）

メタ属性はフィールドに追加の設定情報を追加するために使用され、検証ルールやデフォルト値などが含まれます。

## 基本フォーマット

メタ属性は `@` で始まり、3つの位置に記述できます：

| 位置 | 例 |
| ---- | ---- |
| フィールド名の後 | `id @primary` |
| 型の後 | `i32 @min(1)` |
| Excel コメント | `@default(100)` |

> **推奨**：メタ属性は任意の数だけ設定可能です。Excel セルのコメントに統一して記述することを推奨し、管理と保守が容易になります。

## よく使用されるメタ属性

### フィールドメタ属性

| メタ属性 | 説明 | 例 |
| ------ | ---- | ---- |
| `@primary` | 主キー | `id @primary` |
| `@default(value)` | デフォルト値 | `level @default(1)` |
| `@virtual` | 仮想フィールド | `user @virtual` |

### 型メタ属性

| メタ属性 | 説明 | 例 |
| ------ | ---- | ---- |
| `@min(value)` | 最小値 | `i32 @min(0)` |
| `@max(value)` | 最大値 | `i32 @max(100)` |
| `@range(min, max)` | 範囲 | `i32 @range(1, 100)` |

### コメントメタ属性

Excel セルのコメントにメタ属性を記述：

```
@default(100)
@min(1)
@max(9999)
```

## 仮想フィールド

仮想フィールドは特別なフィールドで、実際のデータを格納せず、他の表のデータを参照して値を取得します。

### 例

| @dict | 名前 | 品質ID | 品質 |
| ----- | ---- | ------ | ---- |
| item_id | name | quality_id | quality @virtual |
| string | string | &Quality | Quality |
| sword_001 | 鉄の剣 | common | |
| sword_002 | 鋼の剣 | rare | |

- `quality_id` は実際に格納されるフィールド、型は `&Quality`
- `quality` は仮想フィールド、`@virtual` でマーク、型はターゲット表名 `Quality`

## 計算プロパティ

計算プロパティは式で計算されるフィールドで、実際のデータを格納する必要がありません。

### 例

| @dict | 基礎攻撃力 | 強化レベル | 総攻撃力 |
| ----- | -------- | -------- | ------ |
| item_id | base_atk | enhance | total_atk @computed |
| string | i32 | i32 | i32 |
| sword_001 | 100 | 5 | base_atk * (1 + enhance * 0.1) |

- `total_atk` は計算プロパティ、`@computed` でマーク
- 式は同じ表の他のフィールドを参照可能

## 例

### 検証付きフィールド

| @dict | レベル | ゴールド |
| ----- | ---- | ---- |
| user_id | level | gold |
| string | i32 @range(1, 100) | i32 @min(0) |
| user_001 | 10 | 1000 |
| user_002 | 50 | 5000 |

### デフォルト値付きフィールド

| @dict | 名前 | 品質 |
| ----- | ---- | ---- |
| item_id | name | quality |
| string | string | string @default(common) |
| sword_001 | 鉄の剣 | |
| sword_002 | 鋼の剣 | rare |

## メタ属性とコード生成

メタ属性は生成されるコードに影響します：

### 検証属性

```
level i32 @range(1, 100)
```

生成される C# コード：

```csharp
[Range(1, 100)]
public int Level { get; set; }
```

### デフォルト値

```
quality string @default(common)
```

生成される C# コード：

```csharp
public string Quality { get; set; } = "common";
```

## 注意事項

- メタ属性は `@` で始まります
- フィールド名、型、または Excel コメントに記述可能
- 複数のメタ属性を組み合わせて使用可能
- 一部のメタ属性はコード生成とデータ検証に影響します
