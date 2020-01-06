# Intégration TypeScript/JavaScript

> ✅ **Disponible** : Le générateur de code TypeScript est actuellement disponible, supportant la génération d'interfaces et de définitions de types TypeScript.

XCell supporte la génération de code TypeScript et JavaScript pour les applications frontend et backend.

## Mappage de types

| Type XCell | Type TypeScript | Description |
| ---------- | --------------- | ----------- |
| `bool` | `boolean` | Valeur booléenne |
| `i8` | `number` | Entier signé 8 bits |
| `i16` | `number` | Entier signé 16 bits |
| `i32` | `number` | Entier signé 32 bits |
| `i64` | `number` | Entier signé 64 bits |
| `u8` | `number` | Entier non signé 8 bits |
| `u16` | `number` | Entier non signé 16 bits |
| `u32` | `number` | Entier non signé 32 bits |
| `u64` | `number` | Entier non signé 64 bits |
| `f32` | `number` | Virgule flottante 32 bits |
| `f64` | `number` | Virgule flottante 64 bits |
| `string` | `string` | Chaîne de caractères |
| `array<T>` | `T[]` | Tableau |
| `list<T>` | `T[]` | Liste |
| `map<K, V>` | `Record<K, V>` | Mappage |
| `enum` | `string` | Énumération (forme chaîne) |
| `struct` | `interface` | Structure |
| `color` | `string` | Couleur (hexadécimal) |
| `vec2` | `{ x: number, y: number }` | Vecteur 2D |
| `vec3` | `{ x: number, y: number, z: number }` | Vecteur 3D |
| `vec4` | `{ x: number, y: number, z: number, w: number }` | Vecteur 4D |

## Formats supportés

- **TypeScript + JSON** : Générer des interfaces TypeScript et des fichiers de données JSON ✅
- **TypeScript + CSV** : Générer des interfaces TypeScript et des fichiers de données CSV
- **JavaScript + JSON** : Générer du code JavaScript et des fichiers de données JSON
- **JavaScript + CSV** : Générer du code JavaScript et des fichiers de données CSV

## Options de configuration

Dans le fichier `ProjectSettings.toml`, la configuration d'intégration TypeScript se trouve dans la section `[typescript]` :

```toml
[typescript]
enable = true
output = "src/generated"           # Répertoire de sortie du code TypeScript
namespace = "DataTable.Generated"   # Espace de noms
manager_name = "DataTableManager"  # Nom de la classe gestionnaire
suffix_table = "Table"             # Suffixe de la classe de table
suffix_element = "Element"         # Suffixe de la classe d'élément

# Configuration de sortie des données JSON
[typescript.json]
enable = true
output = "data/generated"          # Répertoire de sortie des données JSON
```

## Étapes d'intégration

1. **Configurer l'exportation TypeScript** : Activer l'exportation au format TypeScript dans la configuration XCell
2. **Générer le code** : Utiliser XCell pour générer le code TypeScript/JavaScript et les fichiers de données
3. **Importer le code** : Importer le code et les données générés dans le projet
4. **Utiliser les données** : Utiliser les données et les types générés dans l'application

## Exemple de code TypeScript

### Définitions de types générées

```typescript
// Player.ts
export interface Player {
  id: number;
  name: string;
  level: number;
  gold: number;
  is_active: boolean;
}

// Item.ts
export interface Item {
  id: number;
  name: string;
  damage: number;
  price: number;
}

// DataTableManager.ts
import { Player } from './Player';
import { Item } from './Item';

export class DataTableManager {
  private _player: Player[] | null = null;
  private _item: Item[] | null = null;

  public get player(): Player[] {
    if (!this._player) {
      throw new Error('Player data not loaded');
    }
    return this._player;
  }

  public get item(): Item[] {
    if (!this._item) {
      throw new Error('Item data not loaded');
    }
    return this._item;
  }

  public async loadAll(): Promise<void> {
    this._player = await this.loadJson<Player[]>('data/generated/Player.json');
    this._item = await this.loadJson<Item[]>('data/generated/Item.json');
  }

  private async loadJson<T>(path: string): Promise<T> {
    const response = await fetch(path);
    return response.json();
  }
}
```

### Utilisation du code généré

```typescript
import { DataTableManager } from './generated/DataTableManager';

async function main() {
  const manager = new DataTableManager();
  await manager.loadAll();

  // Utiliser les données
  const player = manager.player[0];
  console.log(`Nom du joueur : ${player.name}`);
  console.log(`Niveau du joueur : ${player.level}`);

  // Rechercher des données spécifiques
  const item = manager.item.find(i => i.id === 1);
  if (item) {
    console.log(`Objet : ${item.name}, Prix : ${item.price}`);
  }
}

main().catch(console.error);
```

## Méthodes de chargement des données

### Utilisation de fetch pour charger (environnement navigateur)

```typescript
async function loadJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.statusText}`);
  }
  return response.json();
}
```

### Utilisation de fs pour charger (environnement Node.js)

```typescript
import fs from 'fs';
import path from 'path';

function loadJson<T>(filePath: string): T {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}
```

### Utilisation de l'import dynamique (bundeurs)

```typescript
// Utilisation de l'import dynamique Vite/Webpack
const playerData = await import('./data/generated/Player.json');
```

## Remarques

- Les types number de TypeScript sont unifiés en `number`, ce qui peut entraîner une perte de précision
- Les interfaces générées peuvent être utilisées directement pour la vérification de types et les suggestions de code
- Il est possible de configurer la génération de différents styles de code (ES modules, CommonJS, etc.)
- Pour les grands projets, il est recommandé d'utiliser le fractionnement de code pour optimiser les performances de chargement

## Bonnes pratiques

1. **Sécurité de type** : Utiliser les interfaces générées pour la vérification de types afin d'éviter les erreurs à l'exécution
2. **Chargement différé** : Charger les données à la demande pour réduire le temps de chargement initial
3. **Mise en cache** : Mettre en cache les données chargées pour éviter les requêtes répétées
4. **Gestion des erreurs** : Ajouter une gestion des erreurs appropriée pour les cas d'échec de chargement

## Projet exemple

XCell fournit un projet exemple TypeScript démontrant comment utiliser XCell dans des projets réels :

- Utilisation de base des tables de configuration
- Structures de données complexes
- Support multilingue
- Intégration frontend et backend

Grâce au projet exemple, vous pouvez apprendre rapidement les bonnes pratiques de XCell dans TypeScript.
