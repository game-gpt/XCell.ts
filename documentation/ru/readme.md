# XCell

XCell — это инструмент управления конфигурационными таблицами, написанный на Rust, предназначенный для игрового движка Unity.

## Быстрый старт

### Установка

Скачайте последнюю версию `xcell.exe` и поместите её в корневую директорию проекта.

### Настройка проекта

Создайте файл `XCell.toml` в корневой директории проекта:

```toml
version = "0.0.0"

exclude = ""
include = "*.xlsx"

line.field = 1
line.type = 2
line.comment = 3
line.data = 4

[type.bool]
accept = ["true", "√"]
reject = ["false", "x"]

[type.string]

[unity]
enable = true
project = "./"
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

[unity.protobuf]
enable = false
```

## Создайте свою первую конфигурационную таблицу

### Структура таблицы Excel

XCell использует определённую структуру таблицы Excel, где первые 3 строки являются заголовками, а данные начинаются с 4-й строки:

| Номер строки | Назначение | Описание |
|------------|---------|-------------|
| 1 | Имя поля | Имена полей конфигурационной таблицы |
| 2 | Тип данных | Типы данных для полей |
| 3 | Комментарий | Описательный текст для полей |
| 4+ | Строки данных | Фактические конфигурационные данные |

### Пример таблицы

Создайте таблицу `Tables/Hero.xlsx`:

| id | name | hp | attack | is_boss |
|----|------|----|--------|---------|
| int | string | int | int | bool |
| ID героя | Имя героя | Очки здоровья | Сила атаки | Является боссом |
| 1 | Рыцарь | 1000 | 100 | false |
| 2 | Маг | 800 | 150 | false |
| 3 | Дракон | 5000 | 500 | true |

## Запуск XCell

### Базовая команда

Откройте командную строку в корневой директории проекта и выполните:

```bash
xcell.exe
```

XCell автоматически:
1. Сканирует все таблицы Excel в текущей директории
2. Проверяет данные таблиц
3. Генерирует соответствующий код C# и бинарные файлы данных

### Параметры командной строки

```bash
xcell.exe [OPTIONS] [COMMAND]
```

#### Команды

- `check`: Проверить конфигурационные таблицы без экспорта файлов
- `clear`: Очистить базу данных и кэш

#### Параметры

- `--workspace <WORKSPACE>`: Указать рабочую директорию вручную, по умолчанию используется текущая директория
- `-w, --watch`: Включить режим наблюдения, обновлять только соответствующие файлы при обнаружении изменений
- `--disable-xml`: Принудительно отключить генерацию XML
- `--disable-json`: Принудительно отключить генерацию JSON
- `-h, --help`: Показать справку
- `-V, --version`: Показать версию

### Примеры использования

#### Проверка конфигурационных таблиц

```bash
xcell.exe check
```

#### Включение режима наблюдения

```bash
xcell.exe --watch
```

#### Очистка кэша

```bash
xcell.exe clear
```

## Просмотр результатов генерации

После успешного выполнения вы увидите следующие сгенерированные файлы:

```
MyProject/
├── Assets/
│   ├── Scripts/DataTable/Generated/
│   │   ├── HeroTable.cs
│   │   └── DataTableManager.cs
│   └── Tables/Generated/
│       └── HeroTable.bytes
```

### Пример сгенерированного кода C#

`HeroTable.cs` будет содержать примерно следующее:

```csharp
namespace DataTable.Generated
{
    public partial class HeroTable
    {
        public readonly Dictionary<int, HeroElement> dict = new();

        public HeroElement GetElement(int id)
        {
            return dict.TryGetValue(id, out var item) ? item : null;
        }
    }

    public partial class HeroElement
    {
        public int id;
        public string name;
        public int hp;
        public int attack;
        public bool is_boss;
    }
}
```

## Следующие шаги

- Ознакомьтесь с [Индексом вариантов использования](use-cases/index.md) для более конкретных примеров
- Пользователи Unity могут обратиться к документации [Интеграция с Unity](use-cases/unity-integration.md)
