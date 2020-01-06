# dict 表

Dict は最も一般的な設定形式で、特別なタイプマーカーがない場合、デフォルトで Dict タイプとして扱われます。Dict は文字列を主キーとして使用し、名前でアクセスする必要があるデータに適しています。

## 規約

- **最初の列を主キーとして扱う**
- **デフォルトで Dict タイプ、明示的なマーカー不要**
- **`@dict` マーカーで明示的に宣言可能**
- **生成される名前はデフォルトでファイル名、`@dict 名前` で指定可能**

## マーカー方法

デフォルトではマーカー不要、最初の列が自動的に文字列主キーとして認識されます：

| 品質キー | アイテムアイコン | 表示色 |
|--------|----------|----------|
| quality_key | item_icon | display_color |
| string | string | string |
| common | item_01.png | #FFFFFF |
| rare | item_02.png | #00FFFF |
| epic | item_03.png | #FF00FF |

また、明示的に `@dict` マーカーを使用することもでき、最初の行の最初の列に配置：

| @dict | アイテムアイコン | 表示色 |
|--------|----------|----------|
| quality_key | item_icon | display_color |
| string | string | string |
| common | item_01.png | #FFFFFF |
| rare | item_02.png | #00FFFF |
| epic | item_03.png | #FF00FF |

## コード生成

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

## 使用シナリオ

品質設定、UI 設定、効果音設定など、名前でアクセスする必要があるデータ。
