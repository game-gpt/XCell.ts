# Интеграция с React

XCell обеспечивает глубокую интеграцию с фреймворком React, поддерживая генерацию кода TypeScript, файлов данных JSON и других форматов.

## Параметры конфигурации

В файле `XCell.toml` конфигурация интеграции React расположена в секции `[react]`:

```toml
[react]
enable = true
project = "../"
output = "src/data-table/generated"
namespace = "DataTable"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"

[react.json]
enable = true
output = "public/tables"

[react.graphql]
enable = false
output = "src/data-table/graphql"
```

## Структура сгенерированного кода

### Структура класса таблицы

Каждая конфигурационная таблица генерирует соответствующие классы TypeScript, включая:
- Класс данных таблицы (Table)
- Класс данных элемента (Element)
- Класс менеджера (Manager)
- React Hooks

### Пример структуры сгенерированного кода:

```typescript
// BuffTable.ts
export class BuffTable {
    private data: Map<number, BuffElement> = new Map();

    public get(id: number): BuffElement | undefined {
        return this.data.get(id);
    }

    public load(data: any[]): void {
        for (const item of data) {
            const element = new BuffElement();
            element.id = item.id;
            element.name = item.name;
            element.value = item.value;
            this.data.set(item.id, element);
        }
    }
}

// BuffElement.ts
export class BuffElement {
    public id: number = 0;
    public name: string = "";
    public value: number = 0;
    // ... другие поля
}

// DataTableManager.ts
export class DataTableManager {
    public buffTable: BuffTable = new BuffTable();

    public async loadAll(): Promise<void> {
        // Загрузка всех данных таблиц
    }
}

// useDataTable.ts
export function useDataTable() {
    const [manager, setManager] = useState<DataTableManager | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const newManager = new DataTableManager();
            await newManager.loadAll();
            setManager(newManager);
            setLoading(false);
        };

        loadData();
    }, []);

    return { manager, loading };
}
```

## Загрузка данных

### Использование в компонентах React:

```typescript
import { useDataTable } from './data-table/generated/useDataTable';

function BuffList() {
    const { manager, loading } = useDataTable();

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!manager) {
        return <div>Не удалось загрузить данные</div>;
    }

    return (
        <div>
            <h1>Список баффов</h1>
            {Array.from(manager.buffTable.data.values()).map(buff => (
                <div key={buff.id}>
                    <h2>{buff.name}</h2>
                    <p>Значение: {buff.value}</p>
                </div>
            ))}
        </div>
    );
}
```

### Поддерживаемые функции:
- Асинхронная загрузка
- Инкрементальная загрузка
- Управление памятью
- Поддержка горячих обновлений
- Интеграция с React Hooks

## Маппинг типов

Маппинг типов XCell в типы TypeScript:

| Тип XCell | Тип TypeScript |
| ---------- | --------------- |
| bool | boolean |
| i8 | number |
| i16 | number |
| i32 | number |
| i64 | number |
| u8 | number |
| u16 | number |
| u32 | number |
| u64 | number |
| f32 | number |
| f64 | number |
| string | string |
| color | string (шестнадцатеричный) |
| vec2 | { x: number, y: number } |
| vec3 | { x: number, y: number, z: number } |
| vec4 | { x: number, y: number, z: number, w: number } |

## Оптимизация производительности

### Оптимизация обработки больших таблиц

1. **Разумное разделение больших таблиц**
   - Разделяйте большие таблицы по функциям или модулям
   - Используйте правила слияния по строкам для объединения при сборке
   - Поддерживайте удобство сопровождения во время разработки и производительность во время выполнения

2. **Использование подходящего формата данных**
   - Используйте формат JSON в среде разработки для отладки
   - Рассмотрите использование сжатого формата в производственной среде для повышения скорости загрузки

### Оптимизация инкрементальных обновлений

1. **Режим наблюдения**
   Используйте режим наблюдения:
   ```bash
   xcell.exe --watch
   ```
   Особенности режима наблюдения:
   - Регенерация только изменённых файлов
   - Значительное повышение эффективности разработки
   - Поддержка предварительного просмотра в реальном времени

2. **Разумная конфигурация наблюдения**
   Настройте разумные шаблоны include/exclude для уменьшения количества наблюдаемых файлов.

### Оптимизация памяти

1. **Загрузка только необходимых таблиц**
   ```typescript
   // Загрузка только определённых таблиц
   await manager.buffTable.load();
   await manager.itemTable.load();
   ```

2. **Своевременная выгрузка**
   ```typescript
   // Выгрузка ненужных таблиц
   manager.buffTable.unload();
   ```

## Частые проблемы

### Ошибки компиляции сгенерированного кода

- Проверьте правильность пути к проекту React
- Проверьте соответствие пространства имён структуре проекта
- Убедитесь, что все зависимости правильно установлены

### Сбой загрузки данных

- Проверьте, сгенерированы ли JSON файлы
- Проверьте правильность путей к файлам
- Убедитесь, что структура таблицы соответствует типам данных

## Лучшие практики

1. **Используйте формат мета-таблиц**: Для сложных конфигурационных таблиц рекомендуется формат мета-таблиц, поддерживающий более богатые определения метаданных
2. **Разумно используйте правила слияния**: Для больших проектов используйте правила слияния для управления сложными таблицами
3. **Оптимизируйте структуры данных**: Выбирайте подходящие типы данных и структуры в зависимости от реальных вариантов использования
4. **Регулярная очистка**: Регулярно очищайте ненужные конфигурационные таблицы и данные для поддержания порядка в проекте
5. **Используйте React Hooks**: Используйте сгенерированные React Hooks для упрощения загрузки данных и управления состоянием

## Пример проекта

XCell предоставляет пример проекта React, демонстрирующий использование XCell в реальных проектах:

- Базовое использование конфигурационных таблиц
- Сложные структуры данных
- Поддержка многоязычности
- Интеграция горячих обновлений
- Использование React Hooks

Через пример проекта вы можете быстро освоить лучшие практики XCell в React.
