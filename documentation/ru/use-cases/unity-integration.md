
# Интеграция с Unity

Это руководство подробно описывает, как бесшовно интегрировать инструмент управления конфигурационными таблицами XCell с проектами Unity.

## Структура проекта

Рекомендуемая структура директорий проекта Unity и рабочей директории XCell:

```
MyUnityGame/
├── UnityProject/          # Корневая директория проекта Unity
│   ├── Assets/
│   │   ├── Scripts/
│   │   │   └── DataTable/
│   │   │       └── Generated/    # Автоматически сгенерированный код C#
│   │   └── Tables/
│   │       └── Generated/         # Автоматически сгенерированные бинарные данные
│   └── ProjectSettings/
└── XCellWork/             # Рабочая директория XCell
    ├── xcell.exe
    ├── ProjectConfig.toml
    └── Tables/
        ├── Hero.xlsx
        ├── Item.xlsx
        └── Skill.xlsx
```

## Настройка ProjectConfig.toml

Создайте `ProjectConfig.toml` в рабочей директории XCell со следующей конфигурацией:

```toml
version = "1.0.0"

exclude = ""
include = "*.xlsx"

line.field = 1
line.type = 2
line.comment = 3
line.data = 4

[type.bool]
accept = ["true", "√", "是"]
reject = ["false", "x", "否"]

[type.string]

[unity]
enable = true
project = "../UnityProject"
output = "Assets/Scripts/DataTable/Generated"
namespace = "MyGame.DataTable"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Data"
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

### Описание конфигурации

| Параметр конфигурации | Описание |
|--------------------|-------------|
| `unity.project` | Относительный путь к проекту Unity |
| `unity.output` | Путь генерации кода C# |
| `unity.namespace` | Пространство имён сгенерированного кода |
| `unity.manager` | Имя класса менеджера данных |
| `unity.suffix_table` | Суффикс имени класса таблицы |
| `unity.suffix_element` | Суффикс имени класса элемента данных |
| `unity.binary.output` | Путь вывода бинарных данных |

## Создание примеров конфигурационных таблиц

### 1. Таблица конфигурации героев (Hero.xlsx)

| id | name | name_key | hp | attack | defense | speed | rarity | skill_ids |
|----|------|----------|----|--------|---------|-------|--------|-----------|
| int | string | string | int | int | int | float | int | int[] |
| ID героя | Имя героя | Ключ локализации имени | Очки здоровья | Сила атаки | Защита | Скорость | Редкость | Список ID навыков |
| 1001 | Рыцарь | hero_knight | 1500 | 120 | 80 | 1.2 | 2 | [101, 102] |
| 1002 | Маг | hero_mage | 900 | 180 | 40 | 1.5 | 2 | [201, 202] |
| 1003 | Лучник | hero_archer | 1000 | 150 | 50 | 1.8 | 2 | [301, 302] |

### 2. Таблица конфигурации предметов (Item.xlsx)

| id | name | type | price | stackable | max_stack | description |
|----|------|------|-------|-----------|-----------|-------------|
| int | string | int | int | bool | int | string |
| ID предмета | Имя предмета | Тип предмета | Цена | Складируется | Макс. стопка | Описание |
| 1 | Зелье здоровья | 1 | 50 | true | 99 | Восстанавливает 500 HP |
| 2 | Зелье маны | 1 | 60 | true | 99 | Восстанавливает 300 MP |
| 3 | Железный меч | 2 | 500 | false | 1 | Базовое оружие, Атака +50 |

### 3. Таблица конфигурации навыков (Skill.xlsx)

| id | name | damage | cooldown | mp_cost | target_type |
|----|------|--------|----------|---------|-------------|
| int | string | int | float | int | int |
| ID навыка | Имя навыка | Урон | Перезарядка | Стоимость MP | Тип цели |
| 101 | Удар | 100 | 2.0 | 0 | 1 |
| 102 | Удар щитом | 80 | 3.0 | 10 | 1 |
| 201 | Огненный шар | 200 | 3.5 | 30 | 2 |

## Запуск XCell для генерации кода

Откройте командную строку в рабочей директории XCell и выполните:

```bash
xcell.exe
```

После завершения генерации вы увидите следующие файлы в проекте Unity:

```
UnityProject/
├── Assets/
│   ├── Scripts/DataTable/Generated/
│   │   ├── HeroTable.cs
│   │   ├── ItemTable.cs
│   │   ├── SkillTable.cs
│   │   └── DataTableManager.cs
│   └── Tables/Generated/
│       ├── HeroTable.bytes
│       ├── ItemTable.bytes
│       └── SkillTable.bytes
```

## Создание загрузчика данных

Создайте скрипт `DataTableLoader.cs` в проекте Unity:

```csharp
using System;
using System.IO;
using UnityEngine;
using MyGame.DataTable;

public class DataTableLoader : MonoBehaviour
{
    private static DataTableLoader _instance;
    public static DataTableLoader Instance => _instance;

    public HeroTable HeroTable { get; private set; }
    public ItemTable ItemTable { get; private set; }
    public SkillTable SkillTable { get; private set; }

    private void Awake()
    {
        if (_instance != null && _instance != this)
        {
            Destroy(gameObject);
            return;
        }

        _instance = this;
        DontDestroyOnLoad(gameObject);
        LoadAllTables();
    }

    private void LoadAllTables()
    {
        HeroTable = LoadTable<HeroTable>("HeroTable");
        ItemTable = LoadTable<ItemTable>("ItemTable");
        SkillTable = LoadTable<SkillTable>("SkillTable");
    }

    private T LoadTable<T>(string tableName) where T : class, new()
    {
        TextAsset textAsset = Resources.Load<TextAsset>($"Tables/{tableName}");
        if (textAsset == null)
        {
            Debug.LogError($"Не удалось загрузить таблицу: {tableName}");
            return null;
        }

        using (MemoryStream stream = new MemoryStream(textAsset.bytes))
        using (BinaryReader reader = new BinaryReader(stream))
        {
            T table = new T();
            var method = typeof(T).GetMethod("Read");
            if (method != null)
            {
                method.Invoke(table, new object[] { reader });
            }
            return table;
        }
    }
}
```

## Использование конфигурационных таблиц в игре

### Пример 1: Получение данных героя

```csharp
public class Hero : MonoBehaviour
{
    public int heroId;
    private HeroData _heroData;

    private void Start()
    {
        _heroData = DataTableLoader.Instance.HeroTable.GetElement(heroId);
        if (_heroData == null)
        {
            Debug.LogError($"Данные героя не найдены: {heroId}");
            return;
        }

        InitializeHero();
    }

    private void InitializeHero()
    {
        Debug.Log($"Загрузка героя: {_heroData.name}");
        Debug.Log($"Очки здоровья: {_heroData.hp}");
        Debug.Log($"Сила атаки: {_heroData.attack}");
    }
}
```

### Пример 2: Интеграция системы предметов

```csharp
public class InventoryManager : MonoBehaviour
{
    public void UseItem(int itemId)
    {
        ItemData itemData = DataTableLoader.Instance.ItemTable.GetElement(itemId);
        if (itemData == null)
        {
            Debug.LogError($"Предмет не найден: {itemId}");
            return;
        }

        switch (itemData.type)
        {
            case 1:
                UseConsumable(itemData);
                break;
            case 2:
                EquipWeapon(itemData);
                break;
        }
    }

    private void UseConsumable(ItemData item)
    {
        Debug.Log($"Использование предмета: {item.name}");
    }

    private void EquipWeapon(ItemData item)
    {
        Debug.Log($"Экипировка оружия: {item.name}");
    }
}
```

### Пример 3: Система навыков

```csharp
public class SkillController : MonoBehaviour
{
    public void CastSkill(int skillId, GameObject caster, GameObject target)
    {
        SkillData skillData = DataTableLoader.Instance.SkillTable.GetElement(skillId);
        if (skillData == null)
        {
            Debug.LogError($"Навык не найден: {skillId}");
            return;
        }

        Debug.Log($"Применение навыка: {skillData.name}, Урон: {skillData.damage}");
    }
}
```

## Рекомендации по рабочему процессу

### Фаза разработки

1. Редактируйте конфигурационные таблицы в Excel
2. Запустите `xcell.exe` для генерации кода и данных
3. Обновите проект Unity
4. Тестируйте в Unity

### Режим наблюдения

Во время разработки вы можете использовать режим наблюдения для автоматического обнаружения изменений файлов:

```bash
xcell.exe --watch
```

Таким образом, при изменении таблиц Excel XCell будет автоматически перегенерировать код и файлы данных.

## Лучшие практики

1. **Управление версиями**: Включите таблицы Excel и `ProjectConfig.toml` в управление версиями, исключите сгенерированный код и бинарные файлы
2. **Организация папок**: Организуйте файлы таблиц Excel по функциональным модулям
3. **Соглашения об именовании**: Используйте единые соглашения об именовании, такие как PascalCase или snake_case
4. **Валидация данных**: Регулярно используйте `xcell.exe check` для проверки корректности данных конфигурационных таблиц
5. **Сопровождение документации**: Добавляйте документацию для сложных конфигурационных таблиц
