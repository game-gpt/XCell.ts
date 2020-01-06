# Таблица Language

Таблицы языков используются для управления многоязычным текстом. XCell обеспечивает полную поддержку интернационализации.

## Соглашения

- **Первая строка, первый столбец — маркер `@language`**
- **Необязательное поле `@group` для группировки**
- **Остальные столбцы — идентификаторы языков**
- **Сгенерированное имя по умолчанию совпадает с именем файла, может быть указано через `@language Name`**

## Способ маркировки

Используйте маркер `@language` в первой строке, первом столбце, необязательный `@group`, остальные столбцы — идентификаторы языков:

| @language | @group | zh_cn | en_us | ja_jp |
|-----------|--------|-------|-------|-------|
| Ui_Start | ui | Начало | Start | スタート |
| Ui_Settings | ui | Настройки | Settings | 設定 |
| Ui_Exit | ui | Выход | Exit | 終了 |

## Генерация кода

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

## Варианты использования

- Многоязычная поддержка игрового UI
- Интернационализация приложений
- Системы многоязычной документации
- Любые проекты, требующие многоязычной поддержки
