# Language Table

Language tables are used to manage multi-language text. XCell provides complete internationalization support.

## Conventions

- **First row, first column is the `@language` marker**
- **Optional `@group` field for grouping**
- **Remaining columns are language IDs**
- **Generated name defaults to the filename, can be specified via `@language Name`**

## Marking Method

Use the `@language` marker in the first row, first column, optional `@group`, remaining columns are language IDs:

| @language | @group | zh_cn | en_us | ja_jp |
|-----------|--------|-------|-------|-------|
| Ui_Start | ui | Start | Start | スタート |
| Ui_Settings | ui | Settings | Settings | 設定 |
| Ui_Exit | ui | Exit | Exit | 終了 |

## Code Generation

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

## Use Cases

- Game UI multi-language support
- Application internationalization
- Multi-language documentation systems
- Any project requiring multi-language support
