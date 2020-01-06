# Intégration Cocos

> ✅ **Disponible** : Le générateur de code Cocos est actuellement disponible, supportant la génération de code TypeScript et de fichiers de données JSON.

XCell fournit une intégration profonde avec le moteur Cocos, supportant la génération de code TypeScript, les fichiers de données JSON et d'autres formats.

## Options de configuration

Dans le fichier `ProjectSettings.toml`, la configuration d'intégration Cocos se trouve dans la section `[cocos]` :

```toml
[cocos]
enable = true
project = "../"                    # Répertoire du projet Cocos
output = "assets/scripts/DataTable/Generated"  # Répertoire de sortie du code TypeScript
manager_name = "DataTableManager"  # Nom de la classe gestionnaire
suffix_table = "Table"             # Suffixe de la classe de table
instance_name = "dataTable"        # Nom de l'instance
table_data_path = "assets/tables"  # Préfixe du chemin des données de table

# Configuration du stockage JSON
[cocos.storage.Json]
enable = true
output = "assets/tables/Generated" # Répertoire de sortie des données JSON

# Configuration du stockage en environnement de développement (optionnel)
[cocos.storage_debug.Json]
enable = true
output = "assets/tables/Debug"
```

## Structure du code généré

### Structure de la classe de table

Chaque table de configuration génère des classes TypeScript correspondantes, incluant :
- Classe de données de table (Table)
- Classe de données d'élément (Element)
- Classe gestionnaire (Manager)

### Exemple de structure de code généré :

```typescript
namespace DataTable.Generated {
    export class BuffTable {
        private data: Map<number, BuffElement> = new Map();

        public get(id: number): BuffElement {
            return this.data.get(id);
        }

        public tryGet(id: number): BuffElement | undefined {
            return this.data.get(id);
        }

        public load(data: any[]): void {
            for (const item of data) {
                const element = new BuffElement();
                element.id = item.id;
                element.name = item.name;
                element.value = item.value;
                this.data.set(item.id, element);
            }
        }
    }

    export class BuffElement {
        public id: number = 0;
        public name: string = "";
        public value: number = 0;
        // ... autres champs
    }

    export class DataTableManager {
        public buffTable: BuffTable = new BuffTable();

        public async loadAll(): Promise<void> {
            // Charger toutes les données de table
        }

        public unloadAll(): void {
            // Décharger toutes les données de table
        }
    }
}
```

## Chargement des données

### Chargement des données JSON :

```typescript
import { DataTableManager } from "../scripts/DataTable/Generated/Manager";

const manager = new DataTableManager();
await manager.loadAll();

// Utiliser les données
const buff = manager.buffTable.get(1);
console.log(buff?.name);
```

### Fonctionnalités supportées :
- Chargement asynchrone
- Chargement incrémentiel
- Gestion de la mémoire
- Support de mise à jour à chaud

## Mappage de types

Mappage des types XCell vers les types TypeScript :

| Type XCell | Type TypeScript |
| ---------- | --------------- |
| bool | boolean |
| i8 | number |
| i16 | number |
| i32 | number |
| i64 | number |
| u8 | number |
| u16 | number |
| u32 | number |
| u64 | number |
| f32 | number |
| f64 | number |
| string | string |
| color | string (hexadécimal) |
| vec2 | { x: number, y: number } |
| vec3 | { x: number, y: number, z: number } |
| vec4 | { x: number, y: number, z: number, w: number } |

## Description des champs de configuration

| Champ | Type | Valeur par défaut | Description |
| ----- | ---- | ------------- | ----------- |
| `enable` | `bool` | `false` | Activer ou non la génération de code Cocos |
| `project` | `string` | `"../"` | Répertoire du projet Cocos |
| `output` | `string` | `""` | Répertoire de sortie du code TypeScript |
| `manager_name` | `string` | `""` | Nom de la classe gestionnaire |
| `suffix_table` | `string` | `""` | Suffixe de la classe de table |
| `instance_name` | `string` | `""` | Nom de l'instance |
| `table_data_path` | `string` | `""` | Préfixe du chemin des données de table |
| `storage` | `CocosStorage` | `Json` | Configuration du format de stockage |
| `storage_debug` | `Option<CocosStorage>` | `None` | Configuration du stockage en environnement de développement |

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
   ```typescript
   // Charger uniquement des tables spécifiques
   await manager.buffTable.load();
   await manager.itemTable.load();
   ```

2. **Décharger en temps opportun**
   ```typescript
   // Décharger les tables inutiles
   manager.buffTable.unload();
   ```

## Problèmes courants

### Erreurs de compilation du code généré

- Vérifier si le chemin du projet Cocos est correct
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
