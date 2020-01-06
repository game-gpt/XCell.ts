# Intégration XLua

XLua est une solution de scripts Lua couramment utilisée dans Unity. XCell fournit un support d'intégration avec XLua.

## Mappage de types

| Type XCell | Type XLua | Description |
| ---------- | --------- | ----------- |
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
| `bool` | `boolean` | Valeur booléenne |
| `string` | `string` | Chaîne de caractères |
| `array<T>` | `table` | Tableau |
| `map<K, V>` | `table` | Mappage |
| `enum` | `number` | Énumération |
| `struct` | `table` | Structure |

## Étapes d'intégration

1. **Installer XLua** : Installer le plugin XLua dans le projet Unity
2. **Configurer XCell** : Activer la génération de code XLua dans la configuration du projet
3. **Générer le code** : Utiliser XCell pour générer du code compatible XLua
4. **Charger les données** : Charger les données générées dans les scripts Lua

## Exemple de code

```lua
-- Charger les données de configuration
local config = require("ConfigManager")

-- Accéder à la configuration
local playerConfig = config.Player[1]
print("Nom du joueur : " .. playerConfig.name)
print("Niveau du joueur : " .. playerConfig.level)
```

## Remarques

- Les types number de XLua sont unifiés en `number`, ce qui peut entraîner une perte de précision
- Les structures de données complexes seront converties en tables Lua
- Il est recommandé d'utiliser LuaJIT pour de meilleures performances
