
# Unity 統合

本チュートリアルでは、XCell 設定表管理ツールを Unity プロジェクトとシームレスに統合する方法を詳しく説明します。

## プロジェクト構造

推奨される Unity プロジェクトと XCell 作業ディレクトリの構造は以下の通りです：

```
MyUnityGame/
├── UnityProject/          # Unity プロジェクトのルートディレクトリ
│   ├── Assets/
│   │   ├── Scripts/
│   │   │   └── DataTable/
│   │   │       └── Generated/    # 自動生成される C# コード
│   │   └── Tables/
│   │       └── Generated/         # 自動生成されるバイナリデータ
│   └── ProjectSettings/
└── XCellWork/             # XCell 作業ディレクトリ
    ├── xcell.exe
    ├── ProjectConfig.toml
    └── Tables/
        ├── Hero.xlsx
        ├── Item.xlsx
        └── Skill.xlsx
```

## ProjectConfig.toml の設定

XCell 作業ディレクトリに `ProjectConfig.toml` を作成し、以下のように設定：

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

### 設定項目の説明

| 設定項 | 説明 |
|--------|------|
| `unity.project` | Unity プロジェクトの相対パス |
| `unity.output` | C# コード生成パス |
| `unity.namespace` | 生成コードの名前空間 |
| `unity.manager` | データマネージャークラス名 |
| `unity.suffix_table` | テーブルクラス名のサフィックス |
| `unity.suffix_element` | データ要素クラス名のサフィックス |
| `unity.binary.output` | バイナリデータ出力パス |

## 設定表の作成例

### 1. 英雄設定表 (Hero.xlsx)

| id | name | name_key | hp | attack | defense | speed | rarity | skill_ids |
|----|------|----------|----|--------|---------|-------|--------|-----------|
| int | string | string | int | int | int | float | int | int[] |
| 英雄ID | 英雄名 | 名前多言語Key | HP | 攻撃力 | 防御力 | 速度 | レアリティ | スキルIDリスト |
| 1001 | 騎士 | hero_knight | 1500 | 120 | 80 | 1.2 | 2 | [101, 102] |
| 1002 | 魔法使い | hero_mage | 900 | 180 | 40 | 1.5 | 2 | [201, 202] |
| 1003 | 弓使い | hero_archer | 1000 | 150 | 50 | 1.8 | 2 | [301, 302] |

### 2. アイテム設定表 (Item.xlsx)

| id | name | type | price | stackable | max_stack | description |
|----|------|------|-------|-----------|-----------|-------------|
| int | string | int | int | bool | int | string |
| アイテムID | アイテム名 | アイテムタイプ | 価格 | スタック可 | 最大スタック | 説明 |
| 1 | HPポーション | 1 | 50 | true | 99 | HPを500回復 |
| 2 | MPポーション | 1 | 60 | true | 99 | MPを300回復 |
| 3 | 鉄の剣 | 2 | 500 | false | 1 | 基礎武器、攻撃力+50 |

### 3. スキル設定表 (Skill.xlsx)

| id | name | damage | cooldown | mp_cost | target_type |
|----|------|--------|----------|---------|-------------|
| int | string | int | float | int | int |
| スキルID | スキル名 | ダメージ | クールダウン | MP消費 | ターゲットタイプ |
| 101 | 斬撃 | 100 | 2.0 | 0 | 1 |
| 102 | シールドバッシュ | 80 | 3.0 | 10 | 1 |
| 201 | ファイアボール | 200 | 3.5 | 30 | 2 |

## XCell でコードを生成

XCell 作業ディレクトリでコマンドラインを開き、以下を実行：

```bash
xcell.exe
```

生成完了後、Unity プロジェクトに以下のファイルが生成されます：

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

## データローダーの作成

Unity プロジェクトに `DataTableLoader.cs` スクリプトを作成：

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

## ゲームで設定表を使用

### 例1：英雄データの取得

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
        Debug.Log($"英雄をロード: {_heroData.name}");
        Debug.Log($"HP: {_heroData.hp}");
        Debug.Log($"攻撃力: {_heroData.attack}");
    }
}
```

### 例2：アイテムシステムの統合

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
        Debug.Log($"アイテムを使用: {item.name}");
    }

    private void EquipWeapon(ItemData item)
    {
        Debug.Log($"武器を装備: {item.name}");
    }
}
```

### 例3：スキルシステム

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

        Debug.Log($"スキルを発動: {skillData.name}, ダメージ: {skillData.damage}");
    }
}
```

## ワークフローの推奨

### 開発フェーズ

1. Excel で設定表を編集
2. `xcell.exe` を実行してコードとデータを生成
3. Unity プロジェクトをリフレッシュ
4. Unity でテスト

### 監視モード

開発中は監視モードを使用してファイルの変更を自動検出：

```bash
xcell.exe --watch
```

これにより、Excel 表を変更すると、XCell が自動的にコードとデータファイルを再生成します。

## ベストプラクティス

1. **バージョン管理**：Excel 表と `ProjectConfig.toml` をバージョン管理に含めるが、生成されたコードとバイナリファイルは含めない
2. **フォルダー構成**：機能モジュールごとに Excel 表ファイルを整理
3. **命名規則**：一貫した命名規則を使用（PascalCase や snake_case など）
4. **データ検証**：定期的に `xcell.exe check` で設定表データの正確性を検証
5. **ドキュメント管理**：複雑な設定表には説明ドキュメントを追加
