# dict 表

Dict 是最常用的配置形式，若没有特殊类型标记，默认视为 Dict 类型。Dict 以字符串作为主键，适用于需要按名称访问的数据。

## 约定

- **第一列视为主键**
- **默认即为 Dict 类型，无需显式标记**
- **可使用 `@dict` 标记显式声明**
- **生成的名称默认以文件名为准，可通过 `@dict 名称` 指定**

## 标记方式

默认情况下无需标记，第一列自动识别为字符串主键：

| 品质键 | 物品图标 | 显示颜色 |
|--------|----------|----------|
| quality_key | item_icon | display_color |
| string | string | string |
| common | item_01.png | #FFFFFF |
| rare | item_02.png | #00FFFF |
| epic | item_03.png | #FF00FF |

也可以显式使用 `@dict` 标记，放在第一行第一列：

| @dict | 物品图标 | 显示颜色 |
|--------|----------|----------|
| quality_key | item_icon | display_color |
| string | string | string |
| common | item_01.png | #FFFFFF |
| rare | item_02.png | #00FFFF |
| epic | item_03.png | #FF00FF |

## 代码生成

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

## 使用场景

品质配置、UI 配置、音效配置等需要按名称访问的数据。
