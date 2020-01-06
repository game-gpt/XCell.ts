# language 表

Language 表格用于管理多语言文本，XCell 提供了完整的国际化支持。

## 约定

- **第一行第一列为 `@language` 标记**
- **可选 `@group` 字段用于分组**
- **其余列为语言 ID**
- **生成的名称默认以文件名为准，可通过 `@language 名称` 指定**

## 标记方式

第一行第一列使用 `@language` 标记，可选 `@group`，其余为语言 ID：

| @language | @group | zh_cn | en_us | ja_jp |
|-----------|--------|-------|-------|-------|
| Ui_Start | ui | 开始 | Start | スタート |
| Ui_Settings | ui | 设置 | Settings | 設定 |
| Ui_Exit | ui | 退出 | Exit | 終了 |

## 代码生成

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

## 使用场景

- 游戏 UI 多语言支持
- 应用程序国际化
- 多语言文档系统
- 需要支持多种语言的任何项目
