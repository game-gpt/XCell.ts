# Таблица Enum

Таблицы перечислений используются для определения типов перечислений, а также могут прикреплять дополнительные данные к каждому значению перечисления.

## Соглашения

- **Первый столбец считается первичным ключом**
- **Используйте маркер `@enum` для явного объявления типа Enum**
- **Сгенерированное имя по умолчанию совпадает с именем файла, может быть указано через `@enum Name`**

## Структура хранения

Таблицы Enum хранятся как **enum + статические поля/статические методы**, получая дополнительные оптимизации.

> ⚠️ Если программа не имеет особых требований, рекомендуется использовать тип dict по умолчанию.

## Способ маркировки

Используйте маркер `@enum` в первой строке, первом столбце:

| @enum | Comment | Icon |
| ----- | ------- | ---- |
| name | comment | icon |
| text | utf8 | utf8 |
| Norma | Обычное качество | icon_01.png |
| Rare | Редкое качество | icon_02.png |
| Epic | Эпическое качество | icon_03.png |
| Super | Легендарное качество | icon_04.png |

## Генерация кода

### TypeScript (Cocos, Laya)

```typescript
/**
 * Интерфейс качества
 */
export interface Quality {
    /**
     * ID качества
     */
    id: number;
    /**
     * Название качества
     */
    name: string;
    /**
     * Комментарий качества
     */
    comment: string;
    /**
     * Иконка качества
     */
    icon: string;
}

/**
 * Перечисление качества
 */
export const Quality = {
    /**
     * Обычное качество
     */
    Norma: {
        id: 0,
        name: "Norma",
        comment: "Обычное качество",
        icon: "icon_01.png"
    },
    /**
     * Редкое качество
     */
    Rare: {
        id: 1,
        name: "Rare",
        comment: "Редкое качество",
        icon: "icon_02.png"
    },
    /**
     * Эпическое качество
     */
    Epic: {
        id: 2,
        name: "Epic",
        comment: "Эпическое качество",
        icon: "icon_03.png"
    },
    /**
     * Легендарное качество
     */
    Super: {
        id: 3,
        name: "Super",
        comment: "Легендарное качество",
        icon: "icon_04.png"
    }
} as const as Record<string, Quality>;
```

### C# (Unity, Godot)

```csharp
/// <summary>
/// Перечисление качества
/// </summary>
public enum Quality
{
    /// <summary>
    /// Обычное качество
    /// </summary>
    Norma = 0,
    /// <summary>
    /// Редкое качество
    /// </summary>
    Rare = 1,
    /// <summary>
    /// Эпическое качество
    /// </summary>
    Epic = 2,
    /// <summary>
    /// Легендарное качество
    /// </summary>
    Super = 3
}

/// <summary>
/// Расширенные данные качества
/// </summary>
public static class QualityExtension
{
    private static readonly QualityData[] _data = new QualityData[]
    {
        new QualityData { Id = 0, Name = "Norma", Comment = "Обычное качество", Icon = "icon_01.png" },
        new QualityData { Id = 1, Name = "Rare", Comment = "Редкое качество", Icon = "icon_02.png" },
        new QualityData { Id = 2, Name = "Epic", Comment = "Эпическое качество", Icon = "icon_03.png" },
        new QualityData { Id = 3, Name = "Super", Comment = "Легендарное качество", Icon = "icon_04.png" }
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

## Варианты использования

- Определения качества предметов
- Определения статусов персонажей
- Определения типов событий
- Любые сценарии, требующие перечислений с дополнительными данными
