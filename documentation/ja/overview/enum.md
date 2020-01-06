# enum 表

Enumerate 表は列挙型を定義するために使用され、各列挙値に追加データを付加することもできます。

## 規約

- **最初の列を主キーとして扱う**
- **`@enum` マーカーで明示的に Enum タイプとして宣言**
- **生成される名前はデフォルトでファイル名、`@enum 名前` で指定可能**

## 格納構造

Enum 表は **enum + 静的フィールド/静的メソッド** として格納され、追加の最適化を受けます。

> ⚠️ プログラムに特別な要件がない場合、デフォルトの dict タイプの使用を推奨します。

## マーカー方法

最初の行の最初の列に `@enum` マーカーを使用：

| @enum | コメント | アイコン |
| ----- | ---- | ---- |
| name | comment | icon |
| text | utf8 | utf8 |
| Norma | 通常品質 | icon_01.png |
| Rare | レア品質 | icon_02.png |
| Epic | エピック品質 | icon_03.png |
| Super | 伝説品質 | icon_04.png |

## コード生成

### TypeScript (Cocos, Laya)

```typescript
/**
 * Quality インターフェース
 */
export interface Quality {
    /**
     * Quality ID
     */
    id: number;
    /**
     * Quality 名
     */
    name: string;
    /**
     * Quality コメント
     */
    comment: string;
    /**
     * Quality アイコン
     */
    icon: string;
}

/**
 * Quality 列挙
 */
export const Quality = {
    /**
     * Norma Quality
     */
    Norma: {
        id: 0,
        name: "Norma",
        comment: "通常品質",
        icon: "icon_01.png"
    },
    /**
     * Rare Quality
     */
    Rare: {
        id: 1,
        name: "Rare",
        comment: "レア品質",
        icon: "icon_02.png"
    },
    /**
     * Epic Quality
     */
    Epic: {
        id: 2,
        name: "Epic",
        comment: "エピック品質",
        icon: "icon_03.png"
    },
    /**
     * Super Quality
     */
    Super: {
        id: 3,
        name: "Super",
        comment: "伝説品質",
        icon: "icon_04.png"
    }
} as const as Record<string, Quality>;
```

### C# (Unity, Godot)

```csharp
/// <summary>
/// Quality 列挙
/// </summary>
public enum Quality
{
    /// <summary>
    /// 通常品質
    /// </summary>
    Norma = 0,
    /// <summary>
    /// レア品質
    /// </summary>
    Rare = 1,
    /// <summary>
    /// エピック品質
    /// </summary>
    Epic = 2,
    /// <summary>
    /// 伝説品質
    /// </summary>
    Super = 3
}

/// <summary>
/// Quality 拡張データ
/// </summary>
public static class QualityExtension
{
    private static readonly QualityData[] _data = new QualityData[]
    {
        new QualityData { Id = 0, Name = "Norma", Comment = "通常品質", Icon = "icon_01.png" },
        new QualityData { Id = 1, Name = "Rare", Comment = "レア品質", Icon = "icon_02.png" },
        new QualityData { Id = 2, Name = "Epic", Comment = "エピック品質", Icon = "icon_03.png" },
        new QualityData { Id = 3, Name = "Super", Comment = "伝説品質", Icon = "icon_04.png" }
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

## 使用シナリオ

- アイテム品質定義
- キャラクターステータス定義
- イベントタイプ定義
- 列挙が必要で追加データも必要なあらゆるシナリオ
