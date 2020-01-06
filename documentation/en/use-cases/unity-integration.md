
# Unity Integration

This tutorial will detail how to seamlessly integrate the XCell configuration table management tool with Unity projects.

## Project Structure

The recommended Unity project and XCell working directory structure is as follows:

```
MyUnityGame/
├── UnityProject/          # Unity project root directory
│   ├── Assets/
│   │   ├── Scripts/
│   │   │   └── DataTable/
│   │   │       └── Generated/    # Auto-generated C# code
│   │   └── Tables/
│   │       └── Generated/         # Auto-generated binary data
│   └── ProjectSettings/
└── XCellWork/             # XCell working directory
    ├── xcell.exe
    ├── ProjectConfig.toml
    └── Tables/
        ├── Hero.xlsx
        ├── Item.xlsx
        └── Skill.xlsx
```

## Configure ProjectConfig.toml

Create `ProjectConfig.toml` in the XCell working directory with the following configuration:

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

### Configuration Description

| Configuration Item | Description |
|--------------------|-------------|
| `unity.project` | Relative path to Unity project |
| `unity.output` | C# code generation path |
| `unity.namespace` | Namespace for generated code |
| `unity.manager` | Data manager class name |
| `unity.suffix_table` | Table class name suffix |
| `unity.suffix_element` | Data element class name suffix |
| `unity.binary.output` | Binary data output path |

## Create Configuration Table Examples

### 1. Hero Configuration Table (Hero.xlsx)

| id | name | name_key | hp | attack | defense | speed | rarity | skill_ids |
|----|------|----------|----|--------|---------|-------|--------|-----------|
| int | string | string | int | int | int | float | int | int[] |
| Hero ID | Hero Name | Name Localization Key | Health Points | Attack Power | Defense | Speed | Rarity | Skill ID List |
| 1001 | Knight | hero_knight | 1500 | 120 | 80 | 1.2 | 2 | [101, 102] |
| 1002 | Mage | hero_mage | 900 | 180 | 40 | 1.5 | 2 | [201, 202] |
| 1003 | Archer | hero_archer | 1000 | 150 | 50 | 1.8 | 2 | [301, 302] |

### 2. Item Configuration Table (Item.xlsx)

| id | name | type | price | stackable | max_stack | description |
|----|------|------|-------|-----------|-----------|-------------|
| int | string | int | int | bool | int | string |
| Item ID | Item Name | Item Type | Price | Stackable | Max Stack | Description |
| 1 | Health Potion | 1 | 50 | true | 99 | Restores 500 HP |
| 2 | Mana Potion | 1 | 60 | true | 99 | Restores 300 MP |
| 3 | Iron Sword | 2 | 500 | false | 1 | Basic weapon, Attack +50 |

### 3. Skill Configuration Table (Skill.xlsx)

| id | name | damage | cooldown | mp_cost | target_type |
|----|------|--------|----------|---------|-------------|
| int | string | int | float | int | int |
| Skill ID | Skill Name | Damage | Cooldown | MP Cost | Target Type |
| 101 | Slash | 100 | 2.0 | 0 | 1 |
| 102 | Shield Bash | 80 | 3.0 | 10 | 1 |
| 201 | Fireball | 200 | 3.5 | 30 | 2 |

## Run XCell to Generate Code

Open a command line in the XCell working directory and run:

```bash
xcell.exe
```

After generation completes, you will see the following files in the Unity project:

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

## Create Data Loader

Create a `DataTableLoader.cs` script in the Unity project:

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
            Debug.LogError($"Failed to load table: {tableName}");
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

## Using Configuration Tables in Game

### Example 1: Get Hero Data

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
            Debug.LogError($"Hero data not found: {heroId}");
            return;
        }

        InitializeHero();
    }

    private void InitializeHero()
    {
        Debug.Log($"Loading hero: {_heroData.name}");
        Debug.Log($"Health Points: {_heroData.hp}");
        Debug.Log($"Attack Power: {_heroData.attack}");
    }
}
```

### Example 2: Item System Integration

```csharp
public class InventoryManager : MonoBehaviour
{
    public void UseItem(int itemId)
    {
        ItemData itemData = DataTableLoader.Instance.ItemTable.GetElement(itemId);
        if (itemData == null)
        {
            Debug.LogError($"Item not found: {itemId}");
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
        Debug.Log($"Using item: {item.name}");
    }

    private void EquipWeapon(ItemData item)
    {
        Debug.Log($"Equipping weapon: {item.name}");
    }
}
```

### Example 3: Skill System

```csharp
public class SkillController : MonoBehaviour
{
    public void CastSkill(int skillId, GameObject caster, GameObject target)
    {
        SkillData skillData = DataTableLoader.Instance.SkillTable.GetElement(skillId);
        if (skillData == null)
        {
            Debug.LogError($"Skill not found: {skillId}");
            return;
        }

        Debug.Log($"Casting skill: {skillData.name}, Damage: {skillData.damage}");
    }
}
```

## Workflow Recommendations

### Development Phase

1. Edit configuration tables in Excel
2. Run `xcell.exe` to generate code and data
3. Refresh Unity project
4. Test in Unity

### Watch Mode

During development, you can use watch mode to automatically detect file changes:

```bash
xcell.exe --watch
```

This way, when you modify Excel tables, XCell will automatically regenerate code and data files.

## Best Practices

1. **Version Control**: Include Excel tables and `ProjectConfig.toml` in version control, exclude generated code and binary files
2. **Folder Organization**: Organize Excel table files by functional modules
3. **Naming Conventions**: Use consistent naming conventions, such as PascalCase or snake_case
4. **Data Validation**: Regularly use `xcell.exe check` to validate configuration table data correctness
5. **Documentation Maintenance**: Add documentation for complex configuration tables
