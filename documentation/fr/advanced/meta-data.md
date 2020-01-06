# Attributs méta

Les attributs méta sont utilisés pour ajouter des informations de configuration supplémentaires aux champs, telles que des règles de validation, des valeurs par défaut, etc.

## Format de base

Les attributs méta commencent par `@` et peuvent être écrits à trois positions :

| Position | Exemple |
| -------- | ------- |
| Après le nom du champ | `id @primary` |
| Après le type | `i32 @min(1)` |
| Commentaire Excel | `@default(100)` |

> **Recommandation** : Les attributs méta peuvent être en nombre quelconque, il est recommandé de les écrire uniformément dans les commentaires de cellules Excel pour faciliter la gestion et la maintenance.

## Attributs méta courants

### Attributs méta de champ

| Attribut méta | Description | Exemple |
| -------------- | ----------- | ------- |
| `@primary` | Clé primaire | `id @primary` |
| `@default(value)` | Valeur par défaut | `level @default(1)` |
| `@virtual` | Champ virtuel | `user @virtual` |

### Attributs méta de type

| Attribut méta | Description | Exemple |
| -------------- | ----------- | ------- |
| `@min(value)` | Valeur minimale | `i32 @min(0)` |
| `@max(value)` | Valeur maximale | `i32 @max(100)` |
| `@range(min, max)` | Plage | `i32 @range(1, 100)` |

### Attributs méta de commentaire

Les attributs méta peuvent être écrits dans les commentaires de cellules Excel :

```
@default(100)
@min(1)
@max(9999)
```

## Champs virtuels

Les champs virtuels sont des champs spéciaux qui ne stockent pas de données réelles, mais obtiennent des valeurs en référençant des données d'autres tables.

### Exemple

| @dict | Nom | ID de qualité | Qualité |
| ----- | ---- | ---------- | ------- |
| item_id | name | quality_id | quality @virtual |
| string | string | &Quality | Quality |
| sword_001 | Iron Sword | common | |
| sword_002 | Steel Sword | rare | |

- `quality_id` est le champ réellement stocké, le type est `&Quality`
- `quality` est un champ virtuel, marqué avec `@virtual`, le type est le nom de la table cible `Quality`

## Propriétés calculées

Les propriétés calculées sont des champs dérivés par calcul d'expression, sans nécessiter de stockage de données réelles.

### Exemple

| @dict | Attaque de base | Niveau d'amélioration | Attaque totale |
| ----- | ----------- | ------------- | ------------ |
| item_id | base_atk | enhance | total_atk @computed |
| string | i32 | i32 | i32 |
| sword_001 | 100 | 5 | base_atk * (1 + enhance * 0.1) |

- `total_atk` est une propriété calculée, marquée avec `@computed`
- Les expressions peuvent référencer d'autres champs de la même table

## Exemples

### Champ avec validation

| @dict | Niveau | Or |
| ----- | ----- | ---- |
| user_id | level | gold |
| string | i32 @range(1, 100) | i32 @min(0) |
| user_001 | 10 | 1000 |
| user_002 | 50 | 5000 |

### Champ avec valeur par défaut

| @dict | Nom | Qualité |
| ----- | ---- | ------- |
| item_id | name | quality |
| string | string | string @default(common) |
| sword_001 | Iron Sword | |
| sword_002 | Steel Sword | rare |

## Attributs méta et génération de code

Les attributs méta affectent le code généré :

### Attributs de validation

```
level i32 @range(1, 100)
```

Code C# généré :

```csharp
[Range(1, 100)]
public int Level { get; set; }
```

### Valeur par défaut

```
quality string @default(common)
```

Code C# généré :

```csharp
public string Quality { get; set; } = "common";
```

## Remarques

- Les attributs méta commencent par `@`
- Peuvent être écrits dans le nom de champ, le type ou le commentaire Excel
- Plusieurs attributs méta peuvent être combinés
- Certains attributs méta affectent la génération de code et la validation des données
