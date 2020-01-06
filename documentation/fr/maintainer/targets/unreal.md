# Intégration Unreal Engine

XCell fournit une intégration profonde avec Unreal Engine, supportant la génération de code C++, les fichiers de données binaires et d'autres formats.

## Options de configuration

Dans le fichier `XCell.toml`, la configuration d'intégration Unreal Engine se trouve dans la section `[unreal]` :

```toml
[unreal]
enable = true
project = "../"
output = "Source/DataTable/Generated"
namespace = "DataTable::Generated"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"

[unreal.binary]
enable = true
output = "Content/Tables/Generated"

[unreal.json]
enable = false
output = "Content/Tables/Readable"
```

## Structure du code généré

### Structure de la classe de table

Chaque table de configuration génère des classes C++ correspondantes, incluant :
- Classe de données de table (Table)
- Classe de données d'élément (Element)
- Classe gestionnaire (Manager)

### Exemple de structure de code généré :

```cpp
namespace DataTable::Generated {
    class BuffTable {
    public:
        const BuffElement* Get(int32 Id) const;
        bool TryGet(int32 Id, const BuffElement*& OutElement) const;

    private:
        TMap<int32, BuffElement> Data;
    };

    class BuffElement {
    public:
        int32 Id = 0;
        FString Name = "";
        int32 Value = 0;
        // ... autres champs
    };

    class DataTableManager {
    public:
        BuffTable BuffTable;
        void LoadAll();
        void UnloadAll();
    };
}
```

## Chargement des données

### Chargement des données binaires :

```cpp
auto Manager = MakeShared<DataTableManager>();
Manager->LoadAll();
```

### Fonctionnalités supportées :
- Chargement asynchrone
- Chargement incrémentiel
- Gestion de la mémoire
- Support de mise à jour à chaud

## Mappage de types

Mappage des types XCell vers les types C++ :

| Type XCell | Type C++ |
| ---------- | -------- |
| bool | bool |
| i8 | int8 |
| i16 | int16 |
| i32 | int32 |
| i64 | int64 |
| u8 | uint8 |
| u16 | uint16 |
| u32 | uint32 |
| u64 | uint64 |
| f32 | float |
| f64 | double |
| string | FString |
| color | FColor |
| vec2 | FVector2D |
| vec3 | FVector |
| vec4 | FVector4 |
| quaternion | FQuat |

## Optimisation des performances

### Optimisation du traitement des grandes tables

1. **Scinder raisonnablement les grandes tables**
   - Scinder les grandes tables par fonction ou module
   - Utiliser les règles de fusion par lignes pour fusionner au moment de la construction
   - Maintenir la maintenabilité en développement et les performances à l'exécution

2. **Utiliser le format binaire**
   - Le format binaire a la vitesse de chargement la plus rapide
   - Le format binaire est recommandé pour les environnements de production
   - JSON peut être utilisé dans les environnements de développement pour le débogage

### Optimisation des mises à jour incrémentielles

1. **Mode surveillance**
   Utilisez le mode surveillance :
   ```bash
   xcell.exe --watch
   ```
   Caractéristiques du mode surveillance :
   - Régénère uniquement les fichiers modifiés
   - Améliore considérablement l'efficacité de développement
   - Supporte la prévisualisation en temps réel

2. **Configuration de surveillance raisonnable**
   Configurez des motifs include/exclude raisonnables pour réduire le nombre de fichiers surveillés.

### Optimisation de la mémoire

1. **Charger uniquement les tables nécessaires**
   ```cpp
   // Charger uniquement des tables spécifiques
   Manager->BuffTable.Load();
   Manager->ItemTable.Load();
   ```

2. **Décharger en temps opportun**
   ```cpp
   // Décharger les tables inutiles
   Manager->BuffTable.Unload();
   ```

## Problèmes courants

### Erreurs de compilation du code généré

- Vérifier si le chemin du projet Unreal Engine est correct
- Vérifier si l'espace de noms correspond à la structure du projet
- S'assurer que toutes les dépendances sont correctement installées

### Échec du chargement des données

- Vérifier si les fichiers binaires sont générés
- Vérifier si les chemins de fichiers sont corrects
- S'assurer que la structure de table correspond aux types de données

## Bonnes pratiques

1. **Utiliser le format de table méta** : Pour les tables de configuration complexes, le format de table méta est recommandé, supportant des définitions de métadonnées plus riches
2. **Utiliser raisonnablement les règles de fusion** : Pour les grands projets, utiliser les règles de fusion pour gérer les tables complexes
3. **Optimiser les structures de données** : Choisir les types et structures de données appropriés selon les cas d'utilisation réels
4. **Nettoyage régulier** : Nettoyer régulièrement les tables de configuration et les données inutiles pour garder le projet propre

## Projet exemple

XCell fournit un projet exemple Unreal Engine démontrant comment utiliser XCell dans des projets réels :

- Utilisation de base des tables de configuration
- Structures de données complexes
- Support multilingue
- Intégration de mise à jour à chaud

Grâce au projet exemple, vous pouvez apprendre rapidement les bonnes pratiques de XCell dans Unreal Engine.
