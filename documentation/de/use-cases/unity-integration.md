
# Unity-Integration

Dieses Tutorial beschreibt detailliert, wie das XCell-Konfigurationstabellen-Verwaltungstool nahtlos in Unity-Projekte integriert wird.

## Projektstruktur

Die empfohlene Unity-Projekt- und XCell-Arbeitsverzeichnisstruktur ist wie folgt:

```
MyUnityGame/
├── UnityProject/          # Unity-Projektstammverzeichnis
│   ├── Assets/
│   │   ├── Scripts/
│   │   │   └── DataTable/
│   │   │       └── Generated/    # Automatisch generierter C#-Code
│   │   └── Tables/
│   │       └── Generated/         # Automatisch generierte Binärdaten
│   └── ProjectSettings/
└── XCellWork/             # XCell-Arbeitsverzeichnis
    ├── xcell.exe
    ├── ProjectConfig.toml
    └── Tables/
        ├── Hero.xlsx
        ├── Item.xlsx
        └── Skill.xlsx
```

## ProjectConfig.toml konfigurieren

Erstellen Sie `ProjectConfig.toml` im XCell-Arbeitsverzeichnis mit folgender Konfiguration:

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

### Konfigurationsbeschreibung

| Konfigurationselement | Beschreibung |
|--------------------|-------------|
| `unity.project` | Relativer Pfad zum Unity-Projekt |
| `unity.output` | C#-Codegenerierungspfad |
| `unity.namespace` | Namespace für generierten Code |
| `unity.manager` | Datenmanager-Klassenname |
| `unity.suffix_table` | Tabellenklassenname-Suffix |
| `unity.suffix_element` | Datenelement-Klassenname-Suffix |
| `unity.binary.output` | Binärdaten-Ausgabepfad |

## Konfigurationstabellenbeispiele erstellen

### 1. Helden-Konfigurationstabelle (Hero.xlsx)

| id | name | name_key | hp | attack | defense | speed | rarity | skill_ids |
|----|------|----------|----|--------|---------|-------|--------|-----------|
| int | string | string | int | int | int | float | int | int[] |
| Helden-ID | Heldenname | Namens-Lokalisierungsschlüssel | Gesundheitspunkte | Angriffskraft | Verteidigung | Geschwindigkeit | Seltenheit | Fähigkeiten-ID-Liste |
| 1001 | Knight | hero_knight | 1500 | 120 | 80 | 1.2 | 2 | [101, 102] |
| 1002 | Mage | hero_mage | 900 | 180 | 40 | 1.5 | 2 | [201, 202] |
| 1003 | Archer | hero_archer | 1000 | 150 | 50 | 1.8 | 2 | [301, 302] |

### 2. Artikel-Konfigurationstabelle (Item.xlsx)

| id | name | type | price | stackable | max_stack | description |
|----|------|------|-------|-----------|-----------|-------------|
| int | string | int | int | bool | int | string |
| Artikel-ID | Artikelname | Artikeltyp | Preis | Stapelbar | Max. Stapel | Beschreibung |
| 1 | Health Potion | 1 | 50 | true | 99 | Stellt 500 HP wieder her |
| 2 | Mana Potion | 1 | 60 | true | 99 | Stellt 300 MP wieder her |
| 3 | Iron Sword | 2 | 500 | false | 1 | Grundwaffe, Angriff +50 |

### 3. Fähigkeiten-Konfigurationstabelle (Skill.xlsx)

| id | name | damage | cooldown | mp_cost | target_type |
|----|------|--------|----------|---------|-------------|
| int | string | int | float | int | int |
| Fähigkeiten-ID | Fähigkeitenname | Schaden | Abklingzeit | MP-Kosten | Zieltyp |
| 101 | Slash | 100 | 2.0 | 0 | 1 |
| 102 | Shield Bash | 80 | 3.0 | 10 | 1 |
| 201 | Fireball | 200 | 3.5 | 30 | 2 |

## XCell ausführen, um Code zu generieren

Öffnen Sie eine Befehlszeile im XCell-Arbeitsverzeichnis und führen Sie aus:

```bash
xcell.exe
```

Nach Abschluss der Generierung sehen Sie die folgenden Dateien im Unity-Projekt:

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

## Datenlader erstellen

Erstellen Sie ein `DataTableLoader.cs`-Skript im Unity-Projekt:

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

## Konfigurationstabellen im Spiel verwenden

### Beispiel 1: Heldendaten abrufen

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

### Beispiel 2: Artikel-System-Integration

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

### Beispiel 3: Fähigkeiten-System

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

## Workflow-Empfehlungen

### Entwicklungsphase

1. Konfigurationstabellen in Excel bearbeiten
2. `xcell.exe` ausführen, um Code und Daten zu generieren
3. Unity-Projekt aktualisieren
4. In Unity testen

### Überwachungsmodus

Während der Entwicklung können Sie den Überwachungsmodus verwenden, um Dateiänderungen automatisch zu erkennen:

```bash
xcell.exe --watch
```

Auf diese Weise wird XCell automatisch Code und Datendateien neu generieren, wenn Sie Excel-Tabellen ändern.

## Best Practices

1. **Versionskontrolle**: Excel-Tabellen und `ProjectConfig.toml` in die Versionskontrolle einbeziehen, generierten Code und Binärdateien ausschließen
2. **Ordnerorganisation**: Excel-Tabellendateien nach Funktionsmodulen organisieren
3. **Namenskonventionen**: Konsistente Namenskonventionen verwenden, wie PascalCase oder snake_case
4. **Datenvalidierung**: Regelmäßig `xcell.exe check` verwenden, um die Korrektheit der Konfigurationstabellendaten zu validieren
5. **Dokumentationspflege**: Dokumentation für komplexe Konfigurationstabellen hinzufügen
