# enum 資料表

Enumerate 資料表格用於定義列舉類型，同时还可以為每個列舉值附加額外的資料。

## 約定

- **第一列视為主鍵**
- **使用 `@enum` 標記显式聲明為 Enum 類型**
- **生成的名稱預設以檔案名為准，可通过 `@enum 名稱` 指定**

## 儲存結構

Enum 資料表格儲存為 **enum + 静態欄位/静態方法**，享受額外的最佳化。

> ⚠️ 如果程式没有特殊要求，建議使用預設的 dict 類型。

## 標記方式

在第一行第一列使用 `@enum` 標記：

| @enum | 註解 | 圖示 |
| ----- | ---- | ---- |
| name | comment | icon |
| text | utf8 | utf8 |
| Norma | 普通品質 | icon_01.png |
| Rare | 稀有品質 | icon_02.png |
| Epic | 史诗品質 | icon_03.png |
| Super | 傳说品質 | icon_04.png |

## 程式碼產生

### TypeScript (Cocos, Laya)

```typescript
/**
 * Quality 介面
 */
export interface Quality {
    /**
     * Quality ID
     */
    id: number;
    /**
     * Quality 名稱
     */
    name: string;
    /**
     * Quality 註解
     */
    comment: string;
    /**
     * Quality 圖示
     */
    icon: string;
}

/**
 * Quality 列舉
 */
export const Quality = {
    /**
     * Norma Quality
     */
    Norma: {
        id: 0,
        name: "Norma",
        comment: "普通品質",
        icon: "icon_01.png"
    },
    /**
     * Rare Quality
     */
    Rare: {
        id: 1,
        name: "Rare",
        comment: "稀有品質",
        icon: "icon_02.png"
    },
    /**
     * Epic Quality
     */
    Epic: {
        id: 2,
        name: "Epic",
        comment: "史诗品質",
        icon: "icon_03.png"
    },
    /**
     * Super Quality
     */
    Super: {
        id: 3,
        name: "Super",
        comment: "傳说品質",
        icon: "icon_04.png"
    }
} as const as Record<string, Quality>;
```

### C# (Unity, Godot)

```csharp
/// <summary>
/// Quality 列舉
/// </summary>
public enum Quality
{
    /// <summary>
    /// 普通品質
    /// </summary>
    Norma = 0,
    /// <summary>
    /// 稀有品質
    /// </summary>
    Rare = 1,
    /// <summary>
    /// 史诗品質
    /// </summary>
    Epic = 2,
    /// <summary>
    /// 傳说品質
    /// </summary>
    Super = 3
}

/// <summary>
/// Quality 擴充資料
/// </summary>
public static class QualityExtension
{
    private static readonly QualityData[] _data = new QualityData[]
    {
        new QualityData { Id = 0, Name = "Norma", Comment = "普通品質", Icon = "icon_01.png" },
        new QualityData { Id = 1, Name = "Rare", Comment = "稀有品質", Icon = "icon_02.png" },
        new QualityData { Id = 2, Name = "Epic", Comment = "史诗品質", Icon = "icon_03.png" },
        new QualityData { Id = 3, Name = "Super", Comment = "傳说品質", Icon = "icon_04.png" }
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

## 使用場景

- 物品品質定義
- 角色狀態定義
- 事件類型定義
- 任何需要列舉且需要附加額外資料的場景
