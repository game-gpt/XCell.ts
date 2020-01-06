# enum 表

Enumerate 表格用于定义枚举类型，同时还可以为每个枚举值附加额外的数据。

## 约定

- **第一列视为主键**
- **使用 `@enum` 标记显式声明为 Enum 类型**
- **生成的名称默认以文件名为准，可通过 `@enum 名称` 指定**

## 存储结构

Enum 表格存储为 **enum + 静态字段/静态方法**，享受额外的优化。

> ⚠️ 如果程序没有特殊要求，建议使用默认的 dict 类型。

## 标记方式

在第一行第一列使用 `@enum` 标记：

| @enum | 注释 | 图标 |
| ----- | ---- | ---- |
| name | comment | icon |
| text | utf8 | utf8 |
| Norma | 普通品质 | icon_01.png |
| Rare | 稀有品质 | icon_02.png |
| Epic | 史诗品质 | icon_03.png |
| Super | 传说品质 | icon_04.png |

## 代码生成

### TypeScript (Cocos, Laya)

```typescript
/**
 * Quality 接口
 */
export interface Quality {
    /**
     * Quality ID
     */
    id: number;
    /**
     * Quality 名称
     */
    name: string;
    /**
     * Quality 注释
     */
    comment: string;
    /**
     * Quality 图标
     */
    icon: string;
}

/**
 * Quality 枚举
 */
export const Quality = {
    /**
     * Norma Quality
     */
    Norma: {
        id: 0,
        name: "Norma",
        comment: "普通品质",
        icon: "icon_01.png"
    },
    /**
     * Rare Quality
     */
    Rare: {
        id: 1,
        name: "Rare",
        comment: "稀有品质",
        icon: "icon_02.png"
    },
    /**
     * Epic Quality
     */
    Epic: {
        id: 2,
        name: "Epic",
        comment: "史诗品质",
        icon: "icon_03.png"
    },
    /**
     * Super Quality
     */
    Super: {
        id: 3,
        name: "Super",
        comment: "传说品质",
        icon: "icon_04.png"
    }
} as const as Record<string, Quality>;
```

### C# (Unity, Godot)

```csharp
/// <summary>
/// Quality 枚举
/// </summary>
public enum Quality
{
    /// <summary>
    /// 普通品质
    /// </summary>
    Norma = 0,
    /// <summary>
    /// 稀有品质
    /// </summary>
    Rare = 1,
    /// <summary>
    /// 史诗品质
    /// </summary>
    Epic = 2,
    /// <summary>
    /// 传说品质
    /// </summary>
    Super = 3
}

/// <summary>
/// Quality 扩展数据
/// </summary>
public static class QualityExtension
{
    private static readonly QualityData[] _data = new QualityData[]
    {
        new QualityData { Id = 0, Name = "Norma", Comment = "普通品质", Icon = "icon_01.png" },
        new QualityData { Id = 1, Name = "Rare", Comment = "稀有品质", Icon = "icon_02.png" },
        new QualityData { Id = 2, Name = "Epic", Comment = "史诗品质", Icon = "icon_03.png" },
        new QualityData { Id = 3, Name = "Super", Comment = "传说品质", Icon = "icon_04.png" }
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

## 使用场景

- 物品品质定义
- 角色状态定义
- 事件类型定义
- 任何需要枚举且需要附加额外数据的场景
