
# Unity 集成

本教學將詳細介绍如何將 XCell 設定資料表管理工具與 Unity 專案无缝集成。

## 專案結構

建議的 Unity 專案與 XCell 工作目錄結構如下：

```
MyUnityGame/
├── UnityProject/          # Unity 專案根目錄
│   ├── Assets/
│   │   ├── Scripts/
│   │   │   └── DataTable/
│   │   │       └── Generated/    # 自動生成的 C# 程式碼
│   │   └── Tables/
│   │       └── Generated/         # 自動生成的二進位資料
│   └── ProjectSettings/
└── XCellWork/             # XCell 工作目錄
    ├── xcell.exe
    ├── ProjectConfig.toml
    └── Tables/
        ├── Hero.xlsx
        ├── Item.xlsx
        └── Skill.xlsx
```

## 設定 ProjectConfig.toml

在 XCell 工作目錄中建立 `ProjectConfig.toml`，設定如下：

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

### 設定說明

| 設定项 | 說明 |
|--------|------|
| `unity.project` | Unity 專案的相對路徑 |
| `unity.output` | C# 程式碼產生路徑 |
| `unity.namespace` | 生成程式碼的命名空間 |
| `unity.manager` | 資料管理器類別名 |
| `unity.suffix_table` | 資料表格類別名後缀 |
| `unity.suffix_element` | 資料元素類別名後缀 |
| `unity.binary.output` | 二進位資料輸出路徑 |

## 建立設定資料表範例

### 1. 英雄設定資料表 (Hero.xlsx)

| id | name | name_key | hp | attack | defense | speed | rarity | skill_ids |
|----|------|----------|----|--------|---------|-------|--------|-----------|
| int | string | string | int | int | int | float | int | int[] |
| 英雄ID | 英雄名稱 | 名稱多語言Key | 生命值 | 攻擊力 | 防禦力 | 速度 | 稀有度 | 技能ID串列 |
| 1001 | 騎士 | hero_knight | 1500 | 120 | 80 | 1.2 | 2 | [101, 102] |
| 1002 | 法師 | hero_mage | 900 | 180 | 40 | 1.5 | 2 | [201, 202] |
| 1003 | 弓手 | hero_archer | 1000 | 150 | 50 | 1.8 | 2 | [301, 302] |

### 2. 物品設定資料表 (Item.xlsx)

| id | name | type | price | stackable | max_stack | description |
|----|------|------|-------|-----------|-----------|-------------|
| int | string | int | int | bool | int | string |
| 物品ID | 物品名稱 | 物品類型 | 價格 | 是否可堆疊 | 最大堆疊 | 描述 |
| 1 | 生命药水 | 1 | 50 | true | 99 | 還原500点生命值 |
| 2 | 魔法药水 | 1 | 60 | true | 99 | 還原300点魔法值 |
| 3 | 铁劍 | 2 | 500 | false | 1 | 基礎武器，攻擊力+50 |

### 3. 技能設定資料表 (Skill.xlsx)

| id | name | damage | cooldown | mp_cost | target_type |
|----|------|--------|----------|---------|-------------|
| int | string | int | float | int | int |
| 技能ID | 技能名稱 | 傷害值 | 冷卻时间 | 魔法消耗 | 目標類型 |
| 101 | 斩擊 | 100 | 2.0 | 0 | 1 |
| 102 | 盾擊 | 80 | 3.0 | 10 | 1 |
| 201 | 火球术 | 200 | 3.5 | 30 | 2 |

## 執行 XCell 生成程式碼

在 XCell 工作目錄中打開命令列，執行：

```bash
xcell.exe
```

生成完成後，您將在 Unity 專案中看到以下檔案：

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

## 建立資料載入器

在 Unity 專案中建立 `DataTableLoader.cs` 指令碼：

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

## 在遊戲中使用設定資料表

### 範例 1：获取英雄資料

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
        Debug.Log($"載入英雄: {_heroData.name}");
        Debug.Log($"生命值: {_heroData.hp}");
        Debug.Log($"攻擊力: {_heroData.attack}");
    }
}
```

### 範例 2：物品系統集成

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
        Debug.Log($"裝備武器: {item.name}");
    }
}
```

### 範例 3：技能系統

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

        Debug.Log($"釋放技能: {skillData.name}, 傷害: {skillData.damage}");
    }
}
```

## 工作流程建議

### 開發阶段

1. 在 Excel 中編輯設定資料表
2. 執行 `xcell.exe` 生成程式碼和資料
3. 刷新 Unity 專案
4. 在 Unity 中測試

### 監聽模式

在開發过程中，可以使用監聽模式自動检测檔案變化：

```bash
xcell.exe --watch
```

这样，當您修改 Excel 資料表格後，XCell 會自動重新生成程式碼和資料檔案。

## 最佳做法

1. **版本控制**：將 Excel 資料表格和 `ProjectConfig.toml` 纳入版本控制，不纳入生成的程式碼和二進位檔案
2. **資料夾组织**：按功能模組组织 Excel 資料表格檔案
3. **命名规范**：使用一致的命名规范，如 PascalCase 或 snake_case
4. **資料驗證**：定期使用 `xcell.exe check` 驗證設定資料表資料的正确性
5. **檔案维護**：為複雜的設定資料表新增說明檔案
