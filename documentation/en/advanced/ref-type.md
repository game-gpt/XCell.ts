# Reference Types

## Why Do We Need Reference Types?

When configuring game data, you often encounter these problems:

**Wrong ID**

In the item table, you filled in quality ID `comon`, but the actual quality table has `common`, missing one `m`. This kind of spelling error is hard to discover, and problems will occur when the game runs.

**ID Changed, Reference Not Synced**

The quality table changed `common` to `normal`, but the item table is still using `common`. The result is that items cannot find the corresponding quality configuration.

---

Reference types are designed to solve these problems. XCell automatically checks whether references are correct, ensuring:
- Filled IDs must exist in the target table
- If an ID doesn't exist, an error will be reported immediately

## Basic Format

- `&T` - Reference to table T

## What is a Reference?

Simply put, a reference is a "link pointing to a row of data in another table".

For example: In an item table, you need to record "which quality this item belongs to", at this point you can use a reference type to point to the quality table.

## Example

### Step 1: Create Quality Table

First create a quality table:

| @dict | Color | Description |
| ----- | ----- | ----------- |
| quality_id | color | desc |
| string | string | string |
| common | #FFFFFF | Normal quality |
| rare | #00FFFF | Rare quality |
| epic | #FF00FF | Epic quality |

### Step 2: Create Item Table (Reference Quality Table)

The `quality_id` field in the item table uses `&Quality` type, indicating it references the quality table:

| @dict | Name | Quality | Attack |
| ----- | ---- | ------- | ------ |
| item_id | name | quality_id | attack |
| string | string | &Quality | i32 |
| sword_001 | Iron Sword | common | 10 |
| sword_002 | Steel Sword | rare | 50 |
| sword_003 | Dragon Sword | epic | 200 |

## Common Use Cases

| Scenario | Description |
| -------- | ----------- |
| Item → Quality | Which quality level an item belongs to |
| Equipment → Character | Which character can equip the equipment |
| Skill → Class | Which class a skill belongs to |
| Monster → Drop Table | Which drop table a monster drops |

## Referenceable Table Types

The following types of tables can be referenced:

| Type | Description |
| ---- | ----------- |
| dict table | String primary key, such as item ID, skill ID |
| list table | Integer primary key, such as monster number, item number |
| language table | Language key, format is `group_name/language_key`, such as `&Language` |

### Special Format for Language Table References

When referencing a language table, the filled value format is `group_name/language_key`:

| @dict | Name | Tip Text |
| ----- | ---- | -------- |
| item_id | name | tip |
| string | string | &Language |
| sword_001 | Iron Sword | ui/item_tip_001 |

The following types **cannot be referenced**:

| Type | Reason |
| ---- | ------ |
| enum table | Enums are fixed options, not data tables |
| class table | Global configuration has only one instance |
| Basic types | i32, string, etc. are value types, not tables |

## References in Nested Types

Reference types can be combined with other types to form more complex data structures.

### Reference Array

When you need to reference multiple targets, you can use a reference array:

| Format | Description |
| ------ | ----------- |
| `[&T]` | Reference array, stores multiple target table primary keys |

**Example: Drop Table Referencing Multiple Items**

| @dict | Name | Drop Items |
| ----- | ---- | ---------- |
| drop_id | name | items |
| string | string | [&Item] |
| drop_001 | Starter Pack | sword_001, potion_001 |
| drop_002 | Elite Reward | sword_002, armor_001, gem_001 |

### Other Nested Combinations

| Format | Description |
| ------ | ----------- |
| `[&T]` | Reference array |
| `Vec<&T>` | Reference vector |
| `HashMap<string, &T>` | String to reference mapping |

## Reference Validation

XCell automatically checks whether references are correct:

- ✅ Referenced IDs must exist in the target table
- ✅ Cannot fill in non-existent IDs
- ✅ Circular references will be detected and reported

## Code Generation

### TypeScript (Cocos, Laya)

```typescript
export class Item {
    public itemId: string;
    public name: string;
    public qualityId: string;  // Stores primary key value
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
    public string QualityId;  // Stores primary key value
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

## Notes

- The referenced target table must exist
- The target table must be dict, list, or language type
- enum and class tables cannot be referenced
- Basic types (i32, string, etc.) cannot be referenced
- Table names are recommended to use PascalCase, such as `&QualityTable`
