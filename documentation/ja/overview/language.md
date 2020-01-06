# language 表

Language 表は多言語テキストの管理に使用され、XCell は完全な国際化サポートを提供しています。

## 規約

- **最初の行の最初の列に `@language` マーカー**
- **オプションの `@group` フィールドでグループ化**
- **残りの列は言語 ID**
- **生成される名前はデフォルトでファイル名、`@language 名前` で指定可能**

## マーカー方法

最初の行の最初の列に `@language` マーカー、オプションで `@group`、残りは言語 ID：

| @language | @group | zh_cn | en_us | ja_jp |
|-----------|--------|-------|-------|-------|
| Ui_Start | ui | 开始 | Start | スタート |
| Ui_Settings | ui | 设置 | Settings | 設定 |
| Ui_Exit | ui | 退出 | Exit | 終了 |

## コード生成

### TypeScript (Cocos, Laya)

```typescript
export class LanguageTable {
    private static _items: Map<string, string>;
    
    public static get(key: string): string {
        return this._items.get(key) ?? key;
    }
}
```

### C# (Unity, Godot)

```csharp
public static class LanguageTable
{
    private static Dictionary<string, string> _items;
    
    public static string Get(string key)
    {
        return _items.TryGetValue(key, out var value) ? value : key;
    }
}
```

## 使用シナリオ

- ゲーム UI 多言語サポート
- アプリケーション国際化
- 多言語ドキュメントシステム
- 多言語サポートが必要なあらゆるプロジェクト
