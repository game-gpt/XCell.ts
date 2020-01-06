# Enum Table

Enumerate tables are used to define enum types, and can also attach additional data to each enum value.

## Conventions

- **First column is treated as primary key**
- **Use `@enum` marker to explicitly declare as Enum type**
- **Generated name defaults to the filename, can be specified via `@enum Name`**

## Storage Structure

Enum tables are stored as **enum + static fields/static methods**, enjoying additional optimizations.

> ⚠️ If the program has no special requirements, it is recommended to use the default dict type.

## Marking Method

Use the `@enum` marker in the first row, first column:

| @enum | Comment | Icon |
| ----- | ------- | ---- |
| name | comment | icon |
| text | utf8 | utf8 |
| Norma | Normal Quality | icon_01.png |
| Rare | Rare Quality | icon_02.png |
| Epic | Epic Quality | icon_03.png |
| Super | Legendary Quality | icon_04.png |

## Code Generation

### TypeScript (Cocos, Laya)

```typescript
/**
 * Quality interface
 */
export interface Quality {
    /**
     * Quality ID
     */
    id: number;
    /**
     * Quality name
     */
    name: string;
    /**
     * Quality comment
     */
    comment: string;
    /**
     * Quality icon
     */
    icon: string;
}

/**
 * Quality enum
 */
export const Quality = {
    /**
     * Norma Quality
     */
    Norma: {
        id: 0,
        name: "Norma",
        comment: "Normal Quality",
        icon: "icon_01.png"
    },
    /**
     * Rare Quality
     */
    Rare: {
        id: 1,
        name: "Rare",
        comment: "Rare Quality",
        icon: "icon_02.png"
    },
    /**
     * Epic Quality
     */
    Epic: {
        id: 2,
        name: "Epic",
        comment: "Epic Quality",
        icon: "icon_03.png"
    },
    /**
     * Super Quality
     */
    Super: {
        id: 3,
        name: "Super",
        comment: "Legendary Quality",
        icon: "icon_04.png"
    }
} as const as Record<string, Quality>;
```

### C# (Unity, Godot)

```csharp
/// <summary>
/// Quality enum
/// </summary>
public enum Quality
{
    /// <summary>
    /// Normal Quality
    /// </summary>
    Norma = 0,
    /// <summary>
    /// Rare Quality
    /// </summary>
    Rare = 1,
    /// <summary>
    /// Epic Quality
    /// </summary>
    Epic = 2,
    /// <summary>
    /// Legendary Quality
    /// </summary>
    Super = 3
}

/// <summary>
/// Quality extension data
/// </summary>
public static class QualityExtension
{
    private static readonly QualityData[] _data = new QualityData[]
    {
        new QualityData { Id = 0, Name = "Norma", Comment = "Normal Quality", Icon = "icon_01.png" },
        new QualityData { Id = 1, Name = "Rare", Comment = "Rare Quality", Icon = "icon_02.png" },
        new QualityData { Id = 2, Name = "Epic", Comment = "Epic Quality", Icon = "icon_03.png" },
        new QualityData { Id = 3, Name = "Super", Comment = "Legendary Quality", Icon = "icon_04.png" }
    };

    public static QualityData GetData(this Quality quality)
    {
        return _data[(int)quality];
    }
}

public class QualityData
{
    public int Id;
    public string Name;
    public string Comment;
    public string Icon;
}
```

## Use Cases

- Item quality definitions
- Character status definitions
- Event type definitions
- Any scenario requiring enums with additional data attached
