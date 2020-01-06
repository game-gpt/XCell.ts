# Intégration Vue

XCell fournit une intégration profonde avec le framework Vue, supportant la génération de code TypeScript, les fichiers de données JSON et d'autres formats.

## Options de configuration

Dans le fichier `XCell.toml`, la configuration d'intégration Vue se trouve dans la section `[vue]` :

```toml
[vue]
enable = true
project = "../"
output = "src/data-table/generated"
namespace = "DataTable"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"

[vue.json]
enable = true
output = "public/tables"

[vue.graphql]
enable = false
output = "src/data-table/graphql"
```

## Structure du code généré

### Structure de la classe de table

Chaque table de configuration génère des classes TypeScript correspondantes, incluant :
- Classe de données de table (Table)
- Classe de données d'élément (Element)
- Classe gestionnaire (Manager)
- Fonctions Vue Composition API

### Exemple de structure de code généré :

```typescript
// BuffTable.ts
export class BuffTable {
    private data: Map<number, BuffElement> = new Map();

    public get(id: number): BuffElement | undefined {
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

// BuffElement.ts
export class BuffElement {
    public id: number = 0;
    public name: string = "";
    public value: number = 0;
    // ... autres champs
}

// DataTableManager.ts
export class DataTableManager {
    public buffTable: BuffTable = new BuffTable();

    public async loadAll(): Promise<void> {
        // Charger toutes les données de table
    }
}

// useDataTable.ts
export function useDataTable() {
    const manager = ref<DataTableManager | null>(null);
    const loading = ref(true);

    onMounted(async () => {
        const newManager = new DataTableManager();
        await newManager.loadAll();
        manager.value = newManager;
        loading.value = false;
    });

    return { manager, loading };
}
```

## Chargement des données

### Utilisation dans les composants Vue :

```vue
<template>
  <div>
    <h1>Liste des buffs</h1>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="!manager">Échec du chargement des données</div>
    <div v-else>
      <div v-for="buff in buffs" :key="buff.id">
        <h2>{{ buff.name }}</h2>
        <p>Valeur : {{ buff.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataTable } from './data-table/generated/useDataTable';

const { manager, loading } = useDataTable();

const buffs = computed(() => {
  if (!manager.value) return [];
  return Array.from(manager.value.buffTable.data.values());
});
</script>
```

### Fonctionnalités supportées :
- Chargement asynchrone
- Chargement incrémentiel
- Gestion de la mémoire
- Support de mise à jour à chaud
- Intégration Vue Composition API

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

## Optimisation des performances

### Optimisation du traitement des grandes tables

1. **Scinder raisonnablement les grandes tables**
   - Scinder les grandes tables par fonction ou module
   - Utiliser les règles de fusion par lignes pour fusionner au moment de la construction
   - Maintenir la maintenabilité en développement et les performances à l'exécution

2. **Utiliser le format de données approprié**
   - Utiliser le format JSON dans l'environnement de développement pour le débogage
   - Envisager d'utiliser le format compressé dans l'environnement de production pour améliorer la vitesse de chargement

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

- Vérifier si le chemin du projet Vue est correct
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
5. **Utiliser Vue Composition API** : Utiliser les fonctions Composition API générées pour simplifier le chargement des données et la gestion de l'état

## Projet exemple

XCell fournit un projet exemple Vue démontrant comment utiliser XCell dans des projets réels :

- Utilisation de base des tables de configuration
- Structures de données complexes
- Support multilingue
- Intégration de mise à jour à chaud
- Utilisation de Vue Composition API

Grâce au projet exemple, vous pouvez apprendre rapidement les bonnes pratiques de XCell dans Vue.
