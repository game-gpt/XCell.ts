# Intégration Unity

> ⚠️ **Remarque** : Le générateur de code Unity est actuellement désactivé et en cours de refonte. La documentation suivante est fournie à titre de référence uniquement, les fonctionnalités peuvent ne pas être disponibles.

XCell fournit une intégration profonde avec le moteur Unity, supportant la génération de code C#, les fichiers de données binaires et d'autres formats.

## Statut actuel

Le générateur de code Unity (`unity`) est actuellement désactivé pour les raisons suivantes :

1. Refonte de l'architecture en cours
2. Le système de mappage de types nécessite une mise à jour
3. Les templates de génération de code nécessitent une optimisation

### Solutions alternatives

Avant que le générateur de code Unity ne soit réactivé, vous pouvez envisager les alternatives suivantes :

1. **Utiliser le format de données JSON** : Exporter les données via le générateur [JSON](json.md), les analyser dans Unity en utilisant `JsonUtility` ou `Newtonsoft.Json`
2. **Utiliser le générateur TypeScript** : Générer des définitions de types via [TypeScript](typescript.md), écrire manuellement les classes C#
3. **Utiliser le template Dejavu** : Personnaliser la génération de code via le [moteur de templates Dejavu](../architecture/index.md#code-generation)

## Options de configuration (référence)

Dans le fichier `ProjectSettings.toml`, la configuration d'intégration Unity se trouve dans la section `[unity]` :

```toml
[unity]
enable = false  # Actuellement désactivé
project = "../"
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
```

## Structure attendue du code généré

### Structure de la classe de table

Chaque table de configuration génère des classes C# correspondantes, incluant :
- Classe de données de table (Table)
- Classe de données d'élément (Element)
- Classe gestionnaire (Manager)

### Exemple de structure de code généré :

```csharp
namespace DataTable.Generated
{
    public class BuffTable
    {
        public Dictionary<int, BuffElement> Data { get; }
        public BuffElement Get(int id);
        public bool TryGet(int id, out BuffElement element);
    }

    public class BuffElement
    {
        public int Id { get; }
        public string Name { get; }
        public int Value { get; }
        // ... autres champs
    }

    public class DataTableManager
    {
        public BuffTable BuffTable { get; }
        public void LoadAll();
        public void UnloadAll();
    }
}
```

## Mappage de types

Mappage des types XCell vers les types C# :

| Type XCell | Type C# |
| ---------- | ------- |
| bool | bool |
| i8 | sbyte |
| i16 | short |
| i32 | int |
| i64 | long |
| u8 | byte |
| u16 | ushort |
| u32 | uint |
| u64 | ulong |
| f32 | float |
| f64 | double |
| string | string |
| color | UnityEngine.Color |
| vec2 | UnityEngine.Vector2 |
| vec3 | UnityEngine.Vector3 |
| vec4 | UnityEngine.Vector4 |
| quaternion | UnityEngine.Quaternion |

## Problèmes courants

### Pourquoi le générateur Unity est-il désactivé ?

Le générateur de code Unity est en cours de refonte pour supporter un meilleur système de types et une architecture de génération de code. Il devrait être réactivé dans les futures versions.

### Comment obtenir le statut le plus récent ?

Veuillez suivre les journaux de mise à jour du projet ou vérifier les changements de code dans le répertoire `backends/xcell-generator/src/codegen/unity/`.

## Bonnes pratiques

1. **Utiliser le format de table méta** : Pour les tables de configuration complexes, le format de table méta est recommandé, supportant des définitions de métadonnées plus riches
2. **Utiliser raisonnablement les règles de fusion** : Pour les grands projets, utiliser les règles de fusion pour gérer les tables complexes
3. **Optimiser les structures de données** : Choisir les types et structures de données appropriés selon les cas d'utilisation réels
4. **Nettoyage régulier** : Nettoyer régulièrement les tables de configuration et les données inutiles pour garder le projet propre
