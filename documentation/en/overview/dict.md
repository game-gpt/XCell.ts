# Dict Table

Dict is the most commonly used configuration form. If there is no special type marker, it is treated as Dict type by default. Dict uses string as the primary key, suitable for data that needs to be accessed by name.

## Conventions

- **First column is treated as primary key**
- **Dict type by default, no explicit marking required**
- **Can use `@dict` marker for explicit declaration**
- **Generated name defaults to the filename, can be specified via `@dict Name`**

## Marking Method

By default, no marking is required, the first column is automatically recognized as a string primary key:

| quality_key | item_icon | display_color |
|-------------|-----------|---------------|
| string | string | string |
| common | item_01.png | #FFFFFF |
| rare | item_02.png | #00FFFF |
| epic | item_03.png | #FF00FF |

You can also explicitly use the `@dict` marker in the first row, first column:

| @dict | item_icon | display_color |
|-------|-----------|---------------|
| quality_key | string | string |
| common | item_01.png | #FFFFFF |
| rare | item_02.png | #00FFFF |
| epic | item_03.png | #FF00FF |

## Code Generation

### TypeScript (Cocos, Laya)

```typescript
export class ItemQuality {
    public qualityKey: string;
    public itemIcon: string;
    public displayColor: string;
}

export class ItemQualityTable {
    private _items: Map<string, ItemQuality>;
}
```

### C# (Unity, Godot)

```csharp
public class ItemQuality
{
    public string QualityKey;
    public string ItemIcon;
    public string DisplayColor;
}

public class ItemQualityTable
{
    private Dictionary<string, ItemQuality> _items;
}
```

## Use Cases

Quality configuration, UI configuration, sound effect configuration, and other data that needs to be accessed by name.
