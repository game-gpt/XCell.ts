# Règles de fusion de tables

XCell supporte la fusion de plusieurs tables en une seule. Grâce aux règles de fusion, vous pouvez gérer flexiblement des structures de données complexes.

## Convention de nommage

- **Nommage PascalCase** (par exemple, `ItemWeapon`, `ItemArmor`) : Tables indépendantes, ne participant pas à la fusion
- **Nommage avec tiret bas** (par exemple, `Item_Weapon`, `Item_Armor`) : Fusionnées automatiquement dans la table `Item`

## Exemple

| Nom de fichier | Comportement |
|----------|----------|
| `ItemWeapon.xlsx` | Table indépendante, génère `ItemWeapon` |
| `ItemArmor.xlsx` | Table indépendante, génère `ItemArmor` |
| `Item_Weapon.xlsx` | Fusionnée dans `Item` |
| `Item_Armor.xlsx` | Fusionnée dans `Item` |
| `Item_Consumable.xlsx` | Fusionnée dans `Item` |

## Logique de fusion

- Les tables de même structure seront fusionnées
- **Les IDs en double provoqueront des erreurs** (l'ordre de fusion dépend du stockage sur disque, non fixe)
- La sortie finale sera triée par ID

## Cas d'utilisation

### Scénario : Gérer les tables par type

Supposons que vous ayez les tables d'objets suivantes :
- `Item_Weapon.xlsx` - Configuration d'armes
- `Item_Armor.xlsx` - Configuration d'armures
- `Item_Consumable.xlsx` - Configuration de consommables

Elles fusionneront automatiquement dans la table `Item`.

## Remarques

- Les tables fusionnées doivent avoir la même structure (mêmes noms de colonnes et types)
- En cas de conflit de clé primaire, les données du fichier fusionné ultérieurement écraseront les données du fichier fusionné antérieurement
- Il est recommandé de sauvegarder les fichiers originaux avant d'effectuer des opérations de fusion
- **`Language` est un nom de table réservé**, toutes les tables de langue fusionneront dans Language, n'utilisez pas ce nom
