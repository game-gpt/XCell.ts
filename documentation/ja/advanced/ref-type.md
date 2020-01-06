# 参照型

## なぜ参照型が必要か？

ゲームデータを設定する際、よくこのような問題に遭遇します：

**ID の入力ミス**

アイテム表に品質 ID `comon` を入力したが、品質表では実際は `common` で、`m` が1つ足りない。このようなスペルミスは発見が難しく、ゲーム実行時に問題が発生します。

**ID が変更され、参照が同期されていない**

品質表の `common` が `normal` に変更されたが、アイテム表ではまだ `common` を使用している。結果として、アイテムが対応する品質設定を見つけられなくなります。

---

参照型はこれらの問題を解決するために設計されています。XCell は自動的に参照が正しいかどうかをチェックし、以下を保証します：
- 入力された ID は必ずターゲット表に存在する
- ID が存在しない場合、即座にエラーを報告する

## 基本フォーマット

- `&T` - T 表への参照

## 参照とは？

簡単に言えば、参照とは「別の表の某行データへのリンク」です。

例えば：アイテム表で「このアイテムがどの品質に属するか」を記録する必要がある場合、参照型を使用して品質表を指すことができます。

## 例

### ステップ1：品質表の作成

まず品質表を作成：

| @dict | 色 | 説明 |
| ----- | ---- | ---- |
| quality_id | color | desc |
| string | string | string |
| common | #FFFFFF | 通常品質 |
| rare | #00FFFF | レア品質 |
| epic | #FF00FF | エピック品質 |

### ステップ2：アイテム表の作成（品質表を参照）

アイテム表の `quality_id` フィールドは `&Quality` 型を使用し、品質表を参照していることを示します：

| @dict | 名前 | 品質 | 攻撃力 |
| ----- | ---- | ---- | ------ |
| item_id | name | quality_id | attack |
| string | string | &Quality | i32 |
| sword_001 | 鉄の剣 | common | 10 |
| sword_002 | 鋼の剣 | rare | 50 |
| sword_003 | 竜牙剣 | epic | 200 |

## よくある使用シナリオ

| シナリオ | 説明 |
| ---- | ---- |
| アイテム→品質 | アイテムがどの品質ランクに属するか |
| 装備→キャラクター | 装備をどのキャラクターに装備できるか |
| スキル→職業 | スキルがどの職業に属するか |
| モンスター→ドロップ表 | モンスターがどのドロップ表をドロップするか |


## 参照可能なテーブルタイプ

以下のタイプのテーブルは参照可能です：

| タイプ | 説明 |
| ---- | ---- |
| dict 表 | 文字列主キー、アイテムID、スキルID など |
| list 表 | 整数主キー、モンスター番号、アイテム番号 など |
| language 表 | 言語キー、フォーマットは `グループ名/言語キー`、例：`&Language` |

### language 表参照の特別なフォーマット

language 表を参照する場合、入力値のフォーマットは `グループ名/言語キー`：

| @dict | 名前 | ヒントテキスト |
| ----- | ---- | -------- |
| item_id | name | tip |
| string | string | &Language |
| sword_001 | 鉄の剣 | ui/item_tip_001 |

以下のタイプは**参照不可**：

| タイプ | 理由 |
| ---- | ---- |
| enum 表 | 列挙は固定オプション、データ表ではない |
| class 表 | グローバル設定は1つのインスタンスのみ |
| 基本型 | i32、string などは値型、表ではない |


## ネスト型での参照

参照型は他の型と組み合わせて、より複雑なデータ構造を形成できます。

### 参照配列

複数のターゲットを参照する必要がある場合、参照配列を使用：

| フォーマット | 説明 |
| ---- | ---- |
| `[&T]` | 参照配列、複数のターゲット表の主キーを格納 |

**例：ドロップ表が複数のアイテムを参照**

| @dict | 名前 | ドロップアイテム |
| ----- | ---- | -------- |
| drop_id | name | items |
| string | string | [&Item] |
| drop_001 | 初心者パック | sword_001, potion_001 |
| drop_002 | エリート報酬 | sword_002, armor_001, gem_001 |

### その他のネスト組み合わせ

| フォーマット | 説明 |
| ---- | ---- |
| `[&T]` | 参照配列 |
| `Vec<&T>` | 参照ベクトル |
| `HashMap<string, &T>` | 文字列から参照へのマッピング |

## 参照検証

XCell は自動的に参照が正しいかどうかをチェック：

- ✅ 参照された ID はターゲット表に存在する必要がある
- ✅ 存在しない ID は入力できない
- ✅ 循環参照は検出され、通知される

## コード生成

### TypeScript (Cocos, Laya)

```typescript
export class Item {
    public itemId: string;
    public name: string;
    public qualityId: string;  // 主キー値を格納
    public attack: number;
}

export class ItemTable {
    private _items: Map<string, Item>;
    private _qualityTable: QualityTable;
    
    public getQuality(itemId: string): Quality | undefined {
        const item = this._items.get(itemId);
        if (item) {
            return this._qualityTable.get(item.qualityId);
        }
        return undefined;
    }
}
```

### C# (Unity, Godot)

```csharp
public class Item
{
    public string ItemId;
    public string Name;
    public string QualityId;  // 主キー値を格納
    public int Attack;
}

public class ItemTable
{
    private Dictionary<string, Item> _items;
    private QualityTable _qualityTable;
    
    public Quality GetQuality(string itemId)
    {
        if (_items.TryGetValue(itemId, out var item))
        {
            return _qualityTable.Get(item.QualityId);
        }
        return null;
    }
}
```

## 注意事項

- 参照先のターゲット表が存在する必要がある
- ターゲット表は dict、list、または language タイプである必要がある
- enum、class 表は参照できない
- 基本型（i32、string など）は参照できない
- 表名はアッパーキャメルケースの使用を推奨、例：`&QualityTable`
