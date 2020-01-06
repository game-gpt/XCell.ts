# Intégration JSON

> ✅ **Disponible** : Le générateur de données JSON est actuellement disponible et supporte la génération de fichiers de données au format JSON standard.

XCell supporte l'exportation de tables de configuration au format JSON, un format d'échange de données universel qui peut être facilement analysé par plusieurs langages et plateformes.

## Mappage de types

| Type XCell | Type JSON | Description |
|-----------|----------|------|
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
| `map<K, V>` | `object` | Objet de mappage |
| `enum` | `string` | Nom d'énumération |
| `struct` | `object` | Objet de structure |
| `color` | `string` | Couleur (hexadécimal, par ex. "#FF0000") |
| `vec2` | `object` | `{ "x": 0, "y": 0 }` |
| `vec3` | `object` | `{ "x": 0, "y": 0, "z": 0 }` |
| `vec4` | `object` | `{ "x": 0, "y": 0, "z": 0, "w": 0 }` |

## Options de configuration

Dans le fichier `ProjectSettings.toml`, la configuration d'intégration JSON se trouve dans la section `[json]` :

```toml
[json]
enable = true
output = "output/json"             # Répertoire de sortie des données JSON
indent = 2                         # Espaces d'indentation (0 pour le format compact)
```

## Format de sortie

### Format de table de liste

Les tables de liste sont exportées sous forme de tableaux JSON :

```json
[
  {
    "id": 1,
    "name": "Sword",
    "damage": 100,
    "price": 500,
    "is_active": true
  },
  {
    "id": 2,
    "name": "Shield",
    "damage": 0,
    "price": 300,
    "is_active": true
  }
]
```

### Format de table dictionnaire

Les tables dictionnaire sont exportées sous forme d'objets JSON avec les clés primaires comme clés :

```json
{
  "1": {
    "id": 1,
    "name": "Sword",
    "damage": 100,
    "price": 500
  },
  "2": {
    "id": 2,
    "name": "Shield",
    "damage": 0,
    "price": 300
  }
}
```

### Format de table d'énumération

Les tables d'énumération sont exportées sous forme d'objets JSON :

```json
{
  "enum_name": "ItemType",
  "values": {
    "WEAPON": 1,
    "ARMOR": 2,
    "CONSUMABLE": 3
  }
}
```

### Exemples de types complexes

#### Type tableau

```json
{
  "id": 1,
  "name": "Skill Pack",
  "skills": [101, 102, 103]
}
```

#### Type structure

```json
{
  "id": 1,
  "name": "Player",
  "position": {
    "x": 100.0,
    "y": 200.0,
    "z": 50.0
  }
}
```

#### Type mappage

```json
{
  "id": 1,
  "name": "Localization",
  "translations": {
    "en": "Hello",
    "zh": "你好",
    "ja": "こんにちは"
  }
}
```

## Cas d'utilisation

### Applications frontend

Le format JSON est bien adapté aux applications frontend :

```typescript
// Charger des données JSON
async function loadItemData(): Promise<Item[]> {
  const response = await fetch('/data/items.json');
  return response.json();
}
```

### Services backend

Dans Node.js ou d'autres environnements backend :

```javascript
const fs = require('fs');
const items = JSON.parse(fs.readFileSync('./output/json/items.json', 'utf-8'));
```

### Moteurs de jeu

La plupart des moteurs de jeu supportent l'analyse JSON :

- **Unity** : `JsonUtility.FromJson<T>()`
- **Cocos** : `JSON.parse()`
- **Unreal** : Utiliser le plugin JSON

## Remarques

### Précision des nombres

Les types numériques JSON ne distinguent pas entre les entiers et les nombres à virgule flottante. Il peut y avoir une perte de précision pour les entiers 64 bits. Si vous devez représenter de grands entiers avec précision, il est recommandé d'utiliser des types chaîne.

### Format d'encodage

Les fichiers JSON utilisent l'encodage UTF-8 par défaut. Assurez-vous de gérer correctement les caractères Unicode.

### Taille des fichiers

Pour les grandes tables de configuration, les fichiers JSON peuvent être assez volumineux. Envisagez de :

1. Utiliser le format compact (définir `indent = 0`)
2. Activer la compression GZIP pour la transmission
3. Utiliser des formats binaires (tels que MessagePack) comme alternatives

## Bonnes pratiques

1. **Contrôle de version** : Inclure les fichiers JSON générés dans le contrôle de version pour suivre les changements
2. **Validation des données** : Utiliser JSON Schema pour valider le format des données
3. **Chargement différé** : Charger les données à la demande pour réduire le temps de chargement initial
4. **Mise en cache** : Mettre en cache les données chargées pour éviter les analyses répétées
