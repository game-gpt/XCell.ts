
# Unity 集成

本教程将详细介绍如何将 XCell 配置表管理工具与 Unity 项目无缝集成。

## 项目结构

建议的 Unity 项目与 XCell 工作目录结构如下：

```
MyUnityGame/
├── UnityProject/          # Unity 项目根目录
│   ├── Assets/
│   │   ├── Scripts/
│   │   │   └── DataTable/
│   │   │       └── Generated/    # 自动生成的 C# 代码
│   │   └── Tables/
│   │       └── Generated/         # 自动生成的二进制数据
│   └── ProjectSettings/
└── XCellWork/             # XCell 工作目录
    ├── xcell.exe
    ├── ProjectConfig.toml
    └── Tables/
        ├── Hero.xlsx
        ├── Item.xlsx
        └── Skill.xlsx
```

## 配置 ProjectConfig.toml

在 XCell 工作目录中创建 `ProjectConfig.toml`，配置如下：

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

### 配置说明

| 配置项 | 说明 |
|--------|------|
| `unity.project` | Unity 项目的相对路径 |
| `unity.output` | C# 代码生成路径 |
| `unity.namespace` | 生成代码的命名空间 |
| `unity.manager` | 数据管理器类名 |
| `unity.suffix_table` | 表格类名后缀 |
| `unity.suffix_element` | 数据元素类名后缀 |
| `unity.binary.output` | 二进制数据输出路径 |

## 创建配置表示例

### 1. 英雄配置表 (Hero.xlsx)

| id | name | name_key | hp | attack | defense | speed | rarity | skill_ids |
|----|------|----------|----|--------|---------|-------|--------|-----------|
| int | string | string | int | int | int | float | int | int[] |
| 英雄ID | 英雄名称 | 名称多语言Key | 生命值 | 攻击力 | 防御力 | 速度 | 稀有度 | 技能ID列表 |
| 1001 | 骑士 | hero_knight | 1500 | 120 | 80 | 1.2 | 2 | [101, 102] |
| 1002 | 法师 | hero_mage | 900 | 180 | 40 | 1.5 | 2 | [201, 202] |
| 1003 | 弓手 | hero_archer | 1000 | 150 | 50 | 1.8 | 2 | [301, 302] |

### 2. 物品配置表 (Item.xlsx)

| id | name | type | price | stackable | max_stack | description |
|----|------|------|-------|-----------|-----------|-------------|
| int | string | int | int | bool | int | string |
| 物品ID | 物品名称 | 物品类型 | 价格 | 是否可堆叠 | 最大堆叠 | 描述 |
| 1 | 生命药水 | 1 | 50 | true | 99 | 恢复500点生命值 |
| 2 | 魔法药水 | 1 | 60 | true | 99 | 恢复300点魔法值 |
| 3 | 铁剑 | 2 | 500 | false | 1 | 基础武器，攻击力+50 |

### 3. 技能配置表 (Skill.xlsx)

| id | name | damage | cooldown | mp_cost | target_type |
|----|------|--------|----------|---------|-------------|
| int | string | int | float | int | int |
| 技能ID | 技能名称 | 伤害值 | 冷却时间 | 魔法消耗 | 目标类型 |
| 101 | 斩击 | 100 | 2.0 | 0 | 1 |
| 102 | 盾击 | 80 | 3.0 | 10 | 1 |
| 201 | 火球术 | 200 | 3.5 | 30 | 2 |

## 运行 XCell 生成代码

在 XCell 工作目录中打开命令行，运行：

```bash
xcell.exe
```

生成完成后，您将在 Unity 项目中看到以下文件：

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

## 创建数据加载器

在 Unity 项目中创建 `DataTableLoader.cs` 脚本：

```csharp
using System;
using System.IO;
using UnityEngine;
using MyGame.DataTable;

public class DataTableLoader : MonoBehaviour
{
    private static DataTableLoader _instance;
    public static DataTableLoader Instance =&gt; _instance;

    public HeroTable HeroTable { get; private set; }
    public ItemTable ItemTable { get; private set; }
    public SkillTable SkillTable { get; private set; }

    private void Awake()
    {
        if (_instance != null &amp;&amp; _instance != this)
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
        HeroTable = LoadTable&lt;HeroTable&gt;("HeroTable");
        ItemTable = LoadTable&lt;ItemTable&gt;("ItemTable");
        SkillTable = LoadTable&lt;SkillTable&gt;("SkillTable");
    }

    private T LoadTable&lt;T&gt;(string tableName) where T : class, new()
    {
        TextAsset textAsset = Resources.Load&lt;TextAsset&gt;($"Tables/{tableName}");
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

## 在游戏中使用配置表

### 示例 1：获取英雄数据

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
        Debug.Log($"加载英雄: {_heroData.name}");
        Debug.Log($"生命值: {_heroData.hp}");
        Debug.Log($"攻击力: {_heroData.attack}");
    }
}
```

### 示例 2：物品系统集成

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
        Debug.Log($"使用物品: {item.name}");
    }

    private void EquipWeapon(ItemData item)
    {
        Debug.Log($"装备武器: {item.name}");
    }
}
```

### 示例 3：技能系统

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

        Debug.Log($"释放技能: {skillData.name}, 伤害: {skillData.damage}");
    }
}
```

## 工作流程建议

### 开发阶段

1. 在 Excel 中编辑配置表
2. 运行 `xcell.exe` 生成代码和数据
3. 刷新 Unity 项目
4. 在 Unity 中测试

### 监听模式

在开发过程中，可以使用监听模式自动检测文件变化：

```bash
xcell.exe --watch
```

这样，当您修改 Excel 表格后，XCell 会自动重新生成代码和数据文件。

## 最佳实践

1. **版本控制**：将 Excel 表格和 `ProjectConfig.toml` 纳入版本控制，不纳入生成的代码和二进制文件
2. **文件夹组织**：按功能模块组织 Excel 表格文件
3. **命名规范**：使用一致的命名规范，如 PascalCase 或 snake_case
4. **数据验证**：定期使用 `xcell.exe check` 验证配置表数据的正确性
5. **文档维护**：为复杂的配置表添加说明文档
