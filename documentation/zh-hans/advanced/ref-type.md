# 引用类型

## 为什么需要引用类型？

在配置游戏数据时，经常会遇到这样的问题：

**ID 配错**

道具表里填写了品质 ID `comon`，但品质表里实际是 `common`，少了一个 `m`。这种拼写错误很难发现，游戏运行时就会出问题。

**ID 改了，引用没同步**

品质表里的 `common` 改成了 `normal`，但道具表里还在用 `common`。结果就是道具找不到对应的品质配置。

---

引用类型就是为了解决这些问题而设计的。XCell 会自动检查引用是否正确，确保：
- 填写的 ID 一定存在于目标表中
- 如果 ID 不存在，会立即报错提示

## 基本格式

- `&T` - 指向 T 表的引用

## 什么是引用？

简单来说，引用就是"指向另一张表中某一行数据"的链接。

举个例子：道具表中需要记录"这个道具属于哪个品质"，这时就可以用引用类型指向品质表。

## 示例

### 第一步：创建品质表

先创建一张品质表：

| @dict | 颜色 | 描述 |
| ----- | ---- | ---- |
| quality_id | color | desc |
| string | string | string |
| common | #FFFFFF | 普通品质 |
| rare | #00FFFF | 稀有品质 |
| epic | #FF00FF | 史诗品质 |

### 第二步：创建道具表（引用品质表）

道具表中的 `quality_id` 字段使用 `&Quality` 类型，表示它引用的是品质表：

| @dict | 名称 | 品质 | 攻击力 |
| ----- | ---- | ---- | ------ |
| item_id | name | quality_id | attack |
| string | string | &Quality | i32 |
| sword_001 | 铁剑 | common | 10 |
| sword_002 | 精钢剑 | rare | 50 |
| sword_003 | 龙牙剑 | epic | 200 |

## 常见使用场景

| 场景 | 说明 |
| ---- | ---- |
| 道具→品质 | 道具属于哪个品质等级 |
| 装备→角色 | 装备可以装备在哪个角色上 |
| 技能→职业 | 技能属于哪个职业 |
| 怪物→掉落表 | 怪物掉落哪个掉落表 |


## 可引用的表格类型

以下类型的表格可以被引用：

| 类型 | 说明 |
| ---- | ---- |
| dict 表 | 字符串主键，如物品ID、技能ID |
| list 表 | 整数主键，如怪物编号、道具编号 |
| language 表 | 语言键，格式为 `组名/语言键`，如 `&Language` |

### language 表引用的特殊格式

引用 language 表时，填写的值格式为 `组名/语言键`：

| @dict | 名称 | 提示文本 |
| ----- | ---- | -------- |
| item_id | name | tip |
| string | string | &Language |
| sword_001 | 铁剑 | ui/item_tip_001 |

以下类型**不可引用**：

| 类型 | 原因 |
| ---- | ---- |
| enum 表 | 枚举是固定选项，不是数据表 |
| class 表 | 全局配置只有一个实例 |
| 基本类型 | i32、string 等是值类型，不是表 |


## 嵌套类型中的引用

引用类型可以与其他类型组合使用，形成更复杂的数据结构。

### 引用数组

当需要引用多个目标时，可以使用引用数组：

| 格式 | 说明 |
| ---- | ---- |
| `[&T]` | 引用数组，存储多个目标表的主键 |

**示例：掉落表引用多个道具**

| @dict | 名称 | 掉落道具 |
| ----- | ---- | -------- |
| drop_id | name | items |
| string | string | [&Item] |
| drop_001 | 新手礼包 | sword_001, potion_001 |
| drop_002 | 精英奖励 | sword_002, armor_001, gem_001 |

### 其他嵌套组合

| 格式 | 说明 |
| ---- | ---- |
| `[&T]` | 引用数组 |
| `Vec<&T>` | 引用向量 |
| `HashMap<string, &T>` | 字符串到引用的映射 |

## 引用验证

XCell 会自动检查引用是否正确：

- ✅ 引用的ID必须存在于目标表中
- ✅ 不能填写不存在的ID
- ✅ 循环引用会被检测并提示

## 代码生成

### TypeScript (Cocos, Laya)

```typescript
export class Item {
    public itemId: string;
    public name: string;
    public qualityId: string;  // 存储主键值
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
    public string QualityId;  // 存储主键值
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

- 引用的目标表必须存在
- 目标表必须是 dict、list 或 language 类型
- enum、class 表不能被引用
- 基本类型（i32、string 等）不能被引用
- 表名建议使用大驼峰命名，如 `&QualityTable`
