# 參照類型

## 為什麼需要參照類型？

在設定遊戲資料时，经常會遇到这样的問題：

**ID 配错**

道具資料表里填寫了品質 ID `comon`，但品質資料表里實际是 `common`，少了一個 `m`。这种拼寫錯誤很难發现，遊戲執行階段就會出問題。

**ID 改了，參照没同步**

品質資料表里的 `common` 改成了 `normal`，但道具資料表里还在用 `common`。結果就是道具找不到對應的品質設定。

---

參照類型就是為了解決这些問題而设计的。XCell 會自動檢查參照是否正确，確保：
- 填寫的 ID 一定存在於目標資料表中
- 如果 ID 不存在，會立即報错提示

## 基本格式

- `&T` - 指向 T 資料表的參照

## 什麼是參照？

簡單来说，參照就是"指向另一張資料表中某一行資料"的連結。

舉個例子：道具資料表中需要記錄"这個道具屬於哪個品質"，这时就可以用參照類型指向品質資料表。

## 範例

### 第一步：建立品質資料表

先建立一張品質資料表：

| @dict | 顏色 | 描述 |
| ----- | ---- | ---- |
| quality_id | color | desc |
| string | string | string |
| common | #FFFFFF | 普通品質 |
| rare | #00FFFF | 稀有品質 |
| epic | #FF00FF | 史诗品質 |

### 第二步：建立道具資料表（參照品質資料表）

道具資料表中的 `quality_id` 欄位使用 `&Quality` 類型，資料表示它參照的是品質資料表：

| @dict | 名稱 | 品質 | 攻擊力 |
| ----- | ---- | ---- | ------ |
| item_id | name | quality_id | attack |
| string | string | &Quality | i32 |
| sword_001 | 铁劍 | common | 10 |
| sword_002 | 精钢劍 | rare | 50 |
| sword_003 | 龙牙劍 | epic | 200 |

## 常见使用場景

| 場景 | 說明 |
| ---- | ---- |
| 道具→品質 | 道具屬於哪個品質等级 |
| 裝備→角色 | 裝備可以裝備在哪個角色上 |
| 技能→职業 | 技能屬於哪個职業 |
| 怪物→掉落資料表 | 怪物掉落哪個掉落資料表 |


## 可參照的資料表格類型

以下類型的資料表格可以被參照：

| 類型 | 說明 |
| ---- | ---- |
| dict 資料表 | 字串主鍵，如物品ID、技能ID |
| list 資料表 | 整數主鍵，如怪物編號、道具編號 |
| language 資料表 | 語言鍵，格式為 `組名/語言鍵`，如 `&Language` |

### language 資料表參照的特殊格式

參照 language 資料表时，填寫的值格式為 `組名/語言鍵`：

| @dict | 名稱 | 提示文字 |
| ----- | ---- | -------- |
| item_id | name | tip |
| string | string | &Language |
| sword_001 | 铁劍 | ui/item_tip_001 |

以下類型**不可參照**：

| 類型 | 原因 |
| ---- | ---- |
| enum 資料表 | 列舉是固定選項，不是資料資料表 |
| class 資料表 | 全局設定只有一個實例 |
| 基本類型 | i32、string 等是值類型，不是資料表 |


## 巢狀類別型中的參照

參照類型可以與其他類型组合使用，形成更複雜的資料結構。

### 參照陣列

當需要參照多個目標时，可以使用參照陣列：

| 格式 | 說明 |
| ---- | ---- |
| `[&T]` | 參照陣列，儲存多個目標資料表的主鍵 |

**範例：掉落資料表參照多個道具**

| @dict | 名稱 | 掉落道具 |
| ----- | ---- | -------- |
| drop_id | name | items |
| string | string | [&Item] |
| drop_001 | 新手禮包 | sword_001, potion_001 |
| drop_002 | 精英獎勵 | sword_002, armor_001, gem_001 |

### 其他嵌套组合

| 格式 | 說明 |
| ---- | ---- |
| `[&T]` | 參照陣列 |
| `Vec<&T>` | 參照向量 |
| `HashMap<string, &T>` | 字串到參照的對應 |

## 參照驗證

XCell 會自動檢查參照是否正确：

- ✅ 參照的ID必须存在於目標資料表中
- ✅ 不能填寫不存在的ID
- ✅ 迴圈參照會被检测並提示

## 程式碼產生

### TypeScript (Cocos, Laya)

```typescript
export class Item {
    public itemId: string;
    public name: string;
    public qualityId: string;  // 儲存主鍵值
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
    public string QualityId;  // 儲存主鍵值
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

## 注意事项

- 參照的目標資料表必须存在
- 目標資料表必须是 dict、list 或 language 類型
- enum、class 資料表不能被參照
- 基本類型（i32、string 等）不能被參照
- 資料表名建議使用大驼峰命名，如 `&QualityTable`
