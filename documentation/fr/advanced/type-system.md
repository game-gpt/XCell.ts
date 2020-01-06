# Système de types

XCell supporte plusieurs types de données. Les types standards suivent les conventions Rust, tout en étant compatibles avec les conventions C et C++. Les types sont insensibles à la casse.

## Types de base

### Types entiers

| Notation standard | Convention Unity | Convention Unreal | Description | Plage |
| ----------------- | ---------------- | ----------------- | ----------- | ----- |
| `i8` | `char` | `int8_t` | Entier signé 8 bits | -128 à 127 |
| `u8` | `unsigned char` | `uint8_t` | Entier non signé 8 bits | 0 à 255 |
| `i16` | `short` | `int16_t` | Entier signé 16 bits | -32768 à 32767 |
| `u16` | `unsigned short` | `uint16_t` | Entier non signé 16 bits | 0 à 65535 |
| `i32` | `int` | `int32_t` | Entier signé 32 bits | -2147483648 à 2147483647 |
| `u32` | `unsigned int` | `uint32_t` | Entier non signé 32 bits | 0 à 4294967295 |
| `i64` | `long long` | `int64_t` | Entier signé 64 bits | -9223372036854775808 à 9223372036854775807 |
| `u64` | `unsigned long long` | `uint64_t` | Entier non signé 64 bits | 0 à 18446744073709551615 |

<br />

### Types à virgule flottante

| Notation standard | Convention C | Convention C++ | Description | Précision |
| ----------------- | ------------ | -------------- | ----------- | --------- |
| `f32` | `float` | `float` | Virgule flottante 32 bits | Simple |
| `f64` | `double` | `double` | Virgule flottante 64 bits | Double |

### Type booléen

| Notation standard | Convention C | Convention C++ | Description | Valeurs |
| ----------------- | ------------ | -------------- | ----------- | ------ |
| `bool` | `bool` | `bool` | Valeur booléenne | `true` ou `false` |

### Types caractères

| Notation standard | Description |
| ----------------- | ----------- |
| `utf8` | Type de caractère UTF-8 |
| `utf16` | Type de caractère UTF-16 |

### Types chaîne

| Notation standard | Description |
| ----------------- | ----------- |
| `string` | Type chaîne de caractères |
| `str` | Type chaîne de caractères (équivalent à string) |

## Types composites

### Types tableau et vecteur

**Différentes conventions de type** :

| Notation standard | Convention C# | Description |
| ----------------- | ------------- | ----------- |
| `[T]` | `T[]` | Tableau dynamique |
| `[T; N]` | `T[N]` | Tableau statique (taille fixe) |
| `Vec<T>` | `List<T>` | Type vecteur/liste |
| `vec2<f32>` | `Vector2<float>` | Vecteur 2D |
| `vec3<f32>` | `Vector3<float>` | Vecteur 3D |
| `vec4<f32>` | `Vector4<float>` | Vecteur 4D |

**Description** :

- Le tableau dynamique `[T]` et le vecteur `Vec<T>` sont utilisés pour stocker un nombre variable d'éléments
- Le tableau statique `[T; N]` est utilisé pour stocker un nombre fixe d'éléments, la longueur est déterminée au moment de la définition
- Les types vectoriels spéciaux (vec2/vec3/vec4) sont couramment utilisés en programmation graphique, Unity et d'autres moteurs ont des optimisations de performances spécifiques

**Exemples** :

- `[i32; 5]` - Tableau statique contenant 5 éléments i32
- `[string]` - Tableau de chaînes de taille dynamique
- `Vec<i32>` - Vecteur d'entiers
- `vec3<f32>` - Vecteur 3D à virgule flottante

### Type dictionnaire

**Format** : `HashMap<K, V>` ou `dict<K, V>`

**Exemples** :

- `HashMap<string, i32>` - Mappage chaîne vers entier
- `dict<i32, string>` - Mappage entier vers chaîne

### Type tuple

**Format** : `(T1, T2, ...)`

**Exemples** :

- `(i32, string)` - Tuple contenant un entier et une chaîne
- `(f32, f32, bool)` - Tuple contenant deux nombres à virgule flottante et un booléen

## Types spéciaux

### Type couleur

| Type | Description | Format |
| ---- | ----------- | ------ |
| `color` | Type couleur | Valeur de couleur hexadécimale, telle que `#FF0000` |
| `Color` | Type couleur (équivalent à color) | Valeur de couleur hexadécimale, telle que `#FF0000` |

### Types temporels

| Type | Description | Format |
| ---- | ----------- | ------ |
| `datetime` | Type date-heure | Format ISO 8601, tel que `2023-12-25T10:30:00` |
| `time` | Type heure | Tel que `10:30:00` |
| `date` | Type date | Tel que `2023-12-25` |

<br />

## Type unique et clé primaire

**Format de type unique** :

- `@T` - Indique que la valeur du champ doit être unique dans la table, c'est-à-dire que deux lignes de la table ne peuvent pas avoir la même valeur pour ce champ
- `@@T` - Indique que la valeur du champ doit être unique dans la table et servir de clé primaire

**Description de la clé primaire** :

- La clé primaire est le champ utilisé pour identifier de manière unique chaque ligne de données dans une table
- Si aucun `@@T` n'est utilisé pour marquer explicitement la clé primaire dans la table, la première colonne de la table sera automatiquement traitée comme clé primaire
- Les valeurs de clé primaire doivent être uniques et non nulles, utilisées pour établir des associations entre les tables

**Exemples** :

- `@@i32` - Champ clé primaire de type entier
- `@string` - Champ unique de type chaîne (non clé primaire)

## Types personnalisés

### Types énumération

Les types énumération définis via des tables d'énumération peuvent être utilisés dans d'autres tables.

**Exemple** :

- `QualityType` - Référence le type de qualité défini dans la table d'énumération

### Types structure

Les types structure définis via des tables Class peuvent être utilisés dans d'autres tables.

**Exemple** :

- `Position` - Référence la structure de position définie dans la table Class

## Conversion de types

XCell supporte la conversion automatique de types, par exemple :

- Les entiers peuvent être automatiquement convertis en nombres à virgule flottante
- Les nombres à virgule flottante peuvent être convertis en entiers si nécessaire (la partie décimale sera tronquée)
- Les nombres peuvent être convertis en chaînes
- Les chaînes peuvent être converties en nombres dans les cas appropriés

## Validation de types

XCell effectue une validation de types lors de l'analyse des tables, garantissant que les données sont conformes aux exigences de type spécifiées. Si les types ne correspondent pas, des erreurs seront générées au moment de la compilation.
