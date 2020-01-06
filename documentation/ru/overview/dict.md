# Таблица Dict

Dict — наиболее часто используемая форма конфигурации. Если нет специального маркера типа, по умолчанию используется тип Dict. Dict использует строку в качестве первичного ключа, подходит для данных, к которым нужен доступ по имени.

## Соглашения

- **Первый столбец считается первичным ключом**
- **Тип Dict по умолчанию, явная маркировка не требуется**
- **Можно использовать маркер `@dict` для явного объявления**
- **Сгенерированное имя по умолчанию совпадает с именем файла, может быть указано через `@dict Name`**

## Способ маркировки

По умолчанию маркировка не требуется, первый столбец автоматически распознаётся как строковый первичный ключ:

| quality_key | item_icon | display_color |
|-------------|-----------|---------------|
| string | string | string |
| common | item_01.png | #FFFFFF |
| rare | item_02.png | #00FFFF |
| epic | item_03.png | #FF00FF |

Также можно явно использовать маркер `@dict` в первой строке, первом столбце:

| @dict | item_icon | display_color |
|-------|-----------|---------------|
| quality_key | string | string |
| common | item_01.png | #FFFFFF |
| rare | item_02.png | #00FFFF |
| epic | item_03.png | #FF00FF |

## Генерация кода

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

## Варианты использования

Конфигурация качества, конфигурация UI, конфигурация звуковых эффектов и другие данные, требующие доступа по имени.
