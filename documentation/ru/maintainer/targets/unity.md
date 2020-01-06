# Интеграция с Unity

> ⚠️ **Примечание**: Генератор кода Unity в настоящее время отключен и находится в процессе рефакторинга. Приведённая ниже документация предназначена только для справки, функциональность может быть недоступна.

XCell обеспечивает глубокую интеграцию с движком Unity, поддерживая генерацию кода C#, файлов бинарных данных и других форматов.

## Текущий статус

Генератор кода Unity (`unity`) в настоящее время отключён по следующим причинам:

1. Идёт рефакторинг архитектуры
2. Система маппинга типов требует обновления
3. Шаблоны генерации кода требуют оптимизации

### Альтернативные решения

До повторного включения генератора кода Unity вы можете рассмотреть следующие альтернативы:

1. **Использование формата данных JSON**: Экспортируйте данные через генератор [JSON](json.md), разбирайте в Unity с помощью `JsonUtility` или `Newtonsoft.Json`
2. **Использование генератора TypeScript**: Генерируйте определения типов через [TypeScript](typescript.md), вручную создавайте классы C#
3. **Использование шаблонов Dejavu**: Настройте генерацию кода через [шаблонизатор Dejavu](../architecture/index.md#code-generation)

## Параметры конфигурации (справочно)

В файле `ProjectSettings.toml` конфигурация интеграции Unity расположена в секции `[unity]`:

```toml
[unity]
enable = false  # В настоящее время отключено
project = "../"
output = "Assets/Scripts/DataTable/Generated"
namespace = "DataTable.Generated"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"
support_clone = true
legacy_using = false
legacy_null_null = false

[unity.binary]
enable = true
output = "Assets/Tables/Generated"

[unity.xlua]
enable = false

[unity.xml]
enable = false
output = "Assets/Tables/Readable"

[unity.json]
enable = false
output = "Assets/Tables/Readable"
```

## Ожидаемая структура сгенерированного кода

### Структура класса таблицы

Каждая конфигурационная таблица генерирует соответствующие классы C#, включая:
- Класс данных таблицы (Table)
- Класс данных элемента (Element)
- Класс менеджера (Manager)

### Пример структуры сгенерированного кода:

```csharp
namespace DataTable.Generated
{
    public class BuffTable
    {
        public Dictionary<int, BuffElement> Data { get; }
        public BuffElement Get(int id);
        public bool TryGet(int id, out BuffElement element);
    }

    public class BuffElement
    {
        public int Id { get; }
        public string Name { get; }
        public int Value { get; }
        // ... другие поля
    }

    public class DataTableManager
    {
        public BuffTable BuffTable { get; }
        public void LoadAll();
        public void UnloadAll();
    }
}
```

## Маппинг типов

Маппинг типов XCell в типы C#:

| Тип XCell | Тип C# |
| ---------- | ------- |
| bool | bool |
| i8 | sbyte |
| i16 | short |
| i32 | int |
| i64 | long |
| u8 | byte |
| u16 | ushort |
| u32 | uint |
| u64 | ulong |
| f32 | float |
| f64 | double |
| string | string |
| color | UnityEngine.Color |
| vec2 | UnityEngine.Vector2 |
| vec3 | UnityEngine.Vector3 |
| vec4 | UnityEngine.Vector4 |
| quaternion | UnityEngine.Quaternion |

## Частые проблемы

### Почему генератор Unity отключён?

Генератор кода Unity проходит рефакторинг для поддержки лучшей системы типов и архитектуры генерации кода. Ожидается, что он будет повторно включён в будущих версиях.

### Как узнать последний статус?

Следите за логами обновлений проекта или проверяйте изменения кода в директории `backends/xcell-generator/src/codegen/unity/`.

## Лучшие практики

1. **Используйте формат мета-таблиц**: Для сложных конфигурационных таблиц рекомендуется формат мета-таблиц, поддерживающий более богатые определения метаданных
2. **Разумно используйте правила слияния**: Для больших проектов используйте правила слияния для управления сложными таблицами
3. **Оптимизируйте структуры данных**: Выбирайте подходящие типы данных и структуры в зависимости от реальных вариантов использования
4. **Регулярная очистка**: Регулярно очищайте ненужные конфигурационные таблицы и данные для поддержания порядка в проекте
