# Fonctionnalités de XCell

## Types de tables

| Type | Description |
| ---- | ----------- |
| Table dict | Clé primaire chaîne, forme de configuration la plus courante |
| Table list | Clé primaire entière, accès séquentiel |
| Table enum | Type énumération avec données supplémentaires attachées |
| Table class | Classe de configuration globale, pattern singleton |
| Table language | Support multilingue |

## Cibles de génération de code

| Cible | Langage/Format | Statut |
| ------ | --------------- | ------ |
| Unity | C# | ✅ Implémenté |
| Cocos | TypeScript + JSON | ✅ Implémenté |
| JSON | Données JSON | ✅ Implémenté |
| Binary | Données binaires | ✅ Implémenté |
| Dejavu | Moteur de templates | ✅ Implémenté |

## Système de types

### Types de base

| Type | Description |
| ---- | ----------- |
| `bool` | Valeur booléenne |
| `i8`, `i16`, `i32`, `i64` | Entiers signés |
| `u8`, `u16`, `u32`, `u64` | Entiers non signés |
| `f32`, `f64` | Nombres à virgule flottante |
| `string` | Chaîne de caractères |

### Types composites

| Type | Description |
| ---- | ----------- |
| `[T]` | Tableau dynamique |
| `[T; N]` | Tableau statique |
| `Vec<T>` | Vecteur/Liste |
| `vec2`, `vec3`, `vec4` | Types vectoriels |
| `HashMap<K, V>` | Type dictionnaire |

### Types spéciaux

| Type | Description |
| ---- | ----------- |
| `color` | Type couleur |
| `datetime`, `time`, `date` | Types temporels |
| `&T` | Type référence |

## Fonctionnalité de fusion de tables

- **Convention de nommage** : Le nommage avec tiret bas fusionne automatiquement, par exemple `Item_Weapon` + `Item_Armor` → `Item`
- **Règles de fusion** : Les structures identiques fusionnent automatiquement, les IDs en double provoquent des erreurs
- **Nom de table réservé** : `Language` est un nom de table réservé

## Système de configuration

- **Configuration du projet** : `XCell.toml` à la racine du projet
- **Configuration de table** : Fichier `.toml` du même nom
- **Mappage de lignes** : Supporte la migration de tables existantes

## Architecture

```
xcell-provider (Lecture/Écriture de tables)
    ↓
xcell-analyzer (Analyse de tables)
    ↓
xcell-generator (Génération de code)
    ↓
xcell (Outil CLI)
```

## Modules principaux

| Module | Fonction |
| ------ | -------- |
| xcell-types | Définitions du système de types |
| xcell-provider | Interfaces de lecture/écriture de tables |
| xcell-parser | Analyseur syntaxique |
| xcell-analyzer | Analyseur de tables |
| xcell-config | Gestion de la configuration |
| xcell-generator | Générateur de code |
| xcell-plugin | Système de plugins |
| xcell | Outil en ligne de commande |
