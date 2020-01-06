
# Intégration Unity

Ce tutoriel détaillera comment intégrer de manière transparente l'outil de gestion de tables de configuration XCell avec des projets Unity.

## Structure du projet

La structure recommandée du répertoire de projet Unity et de l'espace de travail XCell est la suivante :

```
MyUnityGame/
├── UnityProject/          # Répertoire racine du projet Unity
│   ├── Assets/
│   │   ├── Scripts/
│   │   │   └── DataTable/
│   │   │       └── Generated/    # Code C# généré automatiquement
│   │   └── Tables/
│   │       └── Generated/         # Données binaires générées automatiquement
│   └── ProjectSettings/
└── XCellWork/             # Répertoire de travail XCell
    ├── xcell.exe
    ├── ProjectConfig.toml
    └── Tables/
        ├── Hero.xlsx
        ├── Item.xlsx
        └── Skill.xlsx
```

## Configurer ProjectConfig.toml

Créez `ProjectConfig.toml` dans le répertoire de travail XCell avec la configuration suivante :

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

### Description de la configuration

| Élément de configuration | Description |
|--------------------|-------------|
| `unity.project` | Chemin relatif vers le projet Unity |
| `unity.output` | Chemin de génération du code C# |
| `unity.namespace` | Espace de noms du code généré |
| `unity.manager` | Nom de la classe gestionnaire de données |
| `unity.suffix_table` | Suffixe du nom de classe de table |
| `unity.suffix_element` | Suffixe du nom de classe d'élément de données |
| `unity.binary.output` | Chemin de sortie des données binaires |

## Créer des exemples de tables de configuration

### 1. Table de configuration des héros (Hero.xlsx)

| id | name | name_key | hp | attack | defense | speed | rarity | skill_ids |
|----|------|----------|----|--------|---------|-------|--------|-----------|
| int | string | string | int | int | int | float | int | int[] |
| ID du héros | Nom du héros | Clé de localisation du nom | Points de vie | Puissance d'attaque | Défense | Vitesse | Rareté | Liste d'IDs de compétences |
| 1001 | Knight | hero_knight | 1500 | 120 | 80 | 1.2 | 2 | [101, 102] |
| 1002 | Mage | hero_mage | 900 | 180 | 40 | 1.5 | 2 | [201, 202] |
| 1003 | Archer | hero_archer | 1000 | 150 | 50 | 1.8 | 2 | [301, 302] |

### 2. Table de configuration des objets (Item.xlsx)

| id | name | type | price | stackable | max_stack | description |
|----|------|------|-------|-----------|-----------|-------------|
| int | string | int | int | bool | int | string |
| ID de l'objet | Nom de l'objet | Type d'objet | Prix | Empilable | Pile maximale | Description |
| 1 | Health Potion | 1 | 50 | true | 99 | Restaure 500 PV |
| 2 | Mana Potion | 1 | 60 | true | 99 | Restaure 300 PM |
| 3 | Iron Sword | 2 | 500 | false | 1 | Arme basique, Attaque +50 |

### 3. Table de configuration des compétences (Skill.xlsx)

| id | name | damage | cooldown | mp_cost | target_type |
|----|------|--------|----------|---------|-------------|
| int | string | int | float | int | int |
| ID de la compétence | Nom de la compétence | Dégâts | Temps de recharge | Coût en PM | Type de cible |
| 101 | Slash | 100 | 2.0 | 0 | 1 |
| 102 | Shield Bash | 80 | 3.0 | 10 | 1 |
| 201 | Fireball | 200 | 3.5 | 30 | 2 |

## Exécuter XCell pour générer le code

Ouvrez une ligne de commande dans le répertoire de travail XCell et exécutez :

```bash
xcell.exe
```

Après la fin de la génération, vous verrez les fichiers suivants dans le projet Unity :

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

## Créer le chargeur de données

Créez un script `DataTableLoader.cs` dans le projet Unity :

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

## Utiliser les tables de configuration dans le jeu

### Exemple 1 : Obtenir les données d'un héros

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

### Exemple 2 : Intégration du système d'objets

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

### Exemple 3 : Système de compétences

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

## Recommandations de flux de travail

### Phase de développement

1. Modifier les tables de configuration dans Excel
2. Exécuter `xcell.exe` pour générer le code et les données
3. Rafraîchir le projet Unity
4. Tester dans Unity

### Mode surveillance

Pendant le développement, vous pouvez utiliser le mode surveillance pour détecter automatiquement les changements de fichiers :

```bash
xcell.exe --watch
```

Ainsi, lorsque vous modifiez les tables Excel, XCell régénérera automatiquement les fichiers de code et de données.

## Bonnes pratiques

1. **Contrôle de version** : Inclure les tables Excel et `ProjectConfig.toml` dans le contrôle de version, exclure le code généré et les fichiers binaires
2. **Organisation des dossiers** : Organiser les fichiers de tables Excel par modules fonctionnels
3. **Conventions de nommage** : Utiliser des conventions de nommage cohérentes, telles que PascalCase ou snake_case
4. **Validation des données** : Utiliser régulièrement `xcell.exe check` pour valider l'exactitude des données des tables de configuration
5. **Maintenance de la documentation** : Ajouter de la documentation pour les tables de configuration complexes
