# Интеграция с Cocos

> ✅ **Доступно**: Генератор кода Cocos в настоящее время доступен, поддерживает генерацию кода TypeScript и файлов данных JSON.

XCell обеспечивает глубокую интеграцию с движком Cocos, поддерживая генерацию кода TypeScript, файлов данных JSON и других форматов.

## Параметры конфигурации

В файле `ProjectSettings.toml` конфигурация интеграции Cocos расположена в секции `[cocos]`:

```toml
[cocos]
enable = true
project = "../"                    # Директория проекта Cocos
output = "assets/scripts/DataTable/Generated"  # Директория вывода кода TypeScript
manager_name = "DataTableManager"  # Имя класса менеджера
suffix_table = "Table"             # Суффикс класса таблицы
instance_name = "dataTable"        # Имя экземпляра
table_data_path = "assets/tables"  # Префикс пути к данным таблиц

# Конфигурация хранения JSON
[cocos.storage.Json]
enable = true
output = "assets/tables/Generated" # Директория вывода данных JSON

# Конфигурация хранения для среды разработки (опционально)
[cocos.storage_debug.Json]
enable = true
output = "assets/tables/Debug"
```

## Структура сгенерированного кода

### Структура класса таблицы

Каждая конфигурационная таблица генерирует соответствующие классы TypeScript, включая:
- Класс данных таблицы (Table)
- Класс данных элемента (Element)
- Класс менеджера (Manager)

### Пример структуры сгенерированного кода:

```typescript
namespace DataTable.Generated {
    export class BuffTable {
        private data: Map<number, BuffElement> = new Map();

        public get(id: number): BuffElement {
            return this.data.get(id);
        }

        public tryGet(id: number): BuffElement | undefined {
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

    export class BuffElement {
        public id: number = 0;
        public name: string = "";
        public value: number = 0;
        // ... другие поля
    }

    export class DataTableManager {
        public buffTable: BuffTable = new BuffTable();

        public async loadAll(): Promise<void> {
            // Загрузка всех данных таблиц
        }

        public unloadAll(): void {
            // Выгрузка всех данных таблиц
        }
    }
}
```

## Загрузка данных

### Загрузка данных JSON:

```typescript
import { DataTableManager } from "../scripts/DataTable/Generated/Manager";

const manager = new DataTableManager();
await manager.loadAll();

// Использование данных
const buff = manager.buffTable.get(1);
console.log(buff?.name);
```

### Поддерживаемые функции:
- Асинхронная загрузка
- Инкрементальная загрузка
- Управление памятью
- Поддержка горячих обновлений

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

## Описание полей конфигурации

| Поле | Тип | Значение по умолчанию | Описание |
| ----- | ---- | ------------- | ----------- |
| `enable` | `bool` | `false` | Включить ли генерацию кода Cocos |
| `project` | `string` | `"../"` | Директория проекта Cocos |
| `output` | `string` | `""` | Директория вывода кода TypeScript |
| `manager_name` | `string` | `""` | Имя класса менеджера |
| `suffix_table` | `string` | `""` | Суффикс класса таблицы |
| `instance_name` | `string` | `""` | Имя экземпляра |
| `table_data_path` | `string` | `""` | Префикс пути к данным таблицы |
| `storage` | `CocosStorage` | `Json` | Конфигурация формата хранения |
| `storage_debug` | `Option<CocosStorage>` | `None` | Конфигурация хранения для среды разработки |

## Оптимизация производительности

### Оптимизация обработки больших таблиц

1. **Разумное разделение больших таблиц**
   - Разделяйте большие таблицы по функциям или модулям
   - Используйте правила слияния по строкам для объединения при сборке
   - Поддерживайте удобство сопровождения во время разработки и производительность во время выполнения

2. **Использование подходящего формата данных**
   - Используйте формат JSON в среде разработки для отладки
   - Рассмотрите использование бинарного формата в производственной среде для повышения скорости загрузки

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

- Проверьте правильность пути к проекту Cocos
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
