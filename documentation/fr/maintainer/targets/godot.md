# Intégration Godot

XCell fournit une intégration profonde avec le moteur Godot, supportant la génération de code GDScript, les fichiers de données JSON et d'autres formats.

## Options de configuration

Dans le fichier `XCell.toml`, la configuration d'intégration Godot se trouve dans la section `[godot]` :

```toml
[godot]
enable = true
project = "../"
output = "scripts/DataTable/Generated"
namespace = "DataTable"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"

[godot.json]
enable = true
output = "res://tables/Generated"

[godot.binary]
enable = false
output = "res://tables/Binary"
```

## Structure du code généré

### Structure de la classe de table

Chaque table de configuration génère des classes GDScript correspondantes, incluant :
- Classe de données de table (Table)
- Classe de données d'élément (Element)
- Classe gestionnaire (Manager)

### Exemple de structure de code généré :

```gdscript
# BuffTable.gd
class_name BuffTable

var data = {}

func get(id):
    return data.get(id)

func try_get(id):
    return data.get(id, null)

func load(data_array):
    for item in data_array:
        var element = BuffElement.new()
        element.id = item.id
        element.name = item.name
        element.value = item.value
        data[item.id] = element

# BuffElement.gd
class_name BuffElement

var id = 0
var name = ""
var value = 0
# ... autres champs

# DataTableManager.gd
class_name DataTableManager

var buff_table = BuffTable.new()

func load_all():
    # Charger toutes les données de table
    pass

func unload_all():
    # Décharger toutes les données de table
    pass
```

## Chargement des données

### Chargement des données JSON :

```gdscript
var manager = DataTableManager.new()
manager.load_all()

# Utiliser les données
var buff = manager.buff_table.get(1)
if buff:
    print(buff.name)
```

### Fonctionnalités supportées :
- Chargement asynchrone
- Chargement incrémentiel
- Gestion de la mémoire
- Support de mise à jour à chaud

## Mappage de types

Mappage des types XCell vers les types GDScript :

| Type XCell | Type GDScript |
| ---------- | ------------- |
| bool | bool |
| i8 | int |
| i16 | int |
| i32 | int |
| i64 | int |
| u8 | int |
| u16 | int |
| u32 | int |
| u64 | int |
| f32 | float |
| f64 | float |
| string | String |
| color | Color |
| vec2 | Vector2 |
| vec3 | Vector3 |
| vec4 | Vector4 |

## Optimisation des performances

### Optimisation du traitement des grandes tables

1. **Scinder raisonnablement les grandes tables**
   - Scinder les grandes tables par fonction ou module
   - Utiliser les règles de fusion par lignes pour fusionner au moment de la construction
   - Maintenir la maintenabilité en développement et les performances à l'exécution

2. **Utiliser le format de données approprié**
   - Utiliser le format JSON dans l'environnement de développement pour le débogage
   - Envisager d'utiliser le format binaire dans l'environnement de production pour améliorer la vitesse de chargement

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
   ```gdscript
   # Charger uniquement des tables spécifiques
   manager.buff_table.load()
   manager.item_table.load()
   ```

2. **Décharger en temps opportun**
   ```gdscript
   # Décharger les tables inutiles
   manager.buff_table.unload()
   ```

## Problèmes courants

### Erreurs de compilation du code généré

- Vérifier si le chemin du projet Godot est correct
- Vérifier si l'espace de noms correspond à la structure du projet
- S'assurer que toutes les dépendances sont correctement installées

### Échec du chargement des données

- Vérifier si les fichiers JSON sont générés
- Vérifier si les chemins de fichiers sont corrects
- S'assurer que la structure de table correspond aux types de données

## Bonnes pratiques

1. **Utiliser le format de table méta** : Pour les tables de configuration complexes, le format de table méta est recommandé, supportant des définitions de métadonnées plus riches
2. **Utiliser raisonnablement les règles de fusion** : Pour les grands projets, utiliser les règles de fusion pour gérer les tables complexes
3. **Optimiser les structures de données** : Choisir les types et structures de données appropriés selon les cas d'utilisation réels
4. **Nettoyage régulier** : Nettoyer régulièrement les tables de configuration et les données inutiles pour garder le projet propre

## Projet exemple

XCell fournit un projet exemple Godot démontrant comment utiliser XCell dans des projets réels :

- Utilisation de base des tables de configuration
- Structures de données complexes
- Support multilingue
- Intégration de mise à jour à chaud

Grâce au projet exemple, vous pouvez apprendre rapidement les bonnes pratiques de XCell dans Godot.
