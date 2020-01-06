# Types de référence

## Pourquoi avons-nous besoin de types de référence ?

Lors de la configuration de données de jeu, vous rencontrez souvent ces problèmes :

**ID erroné**

Dans la table d'objets, vous avez rempli l'ID de qualité `comon`, mais la table de qualité réelle contient `common`, il manque un `m`. Ce type d'erreur orthographique est difficile à découvrir, et des problèmes surviendront lors de l'exécution du jeu.

**ID modifié, référence non synchronisée**

La table de qualité a changé `common` en `normal`, mais la table d'objets utilise toujours `common`. Le résultat est que les objets ne peuvent pas trouver la configuration de qualité correspondante.

---

Les types de référence sont conçus pour résoudre ces problèmes. XCell vérifie automatiquement si les références sont correctes, garantissant :
- Les IDs remplis doivent exister dans la table cible
- Si un ID n'existe pas, une erreur sera signalée immédiatement

## Format de base

- `&T` - Référence à la table T

## Qu'est-ce qu'une référence ?

En termes simples, une référence est un "lien pointant vers une ligne de données dans une autre table".

Par exemple : Dans une table d'objets, vous devez enregistrer "à quelle qualité appartient cet objet", à ce moment vous pouvez utiliser un type de référence pour pointer vers la table de qualité.

## Exemple

### Étape 1 : Créer la table de qualité

Créez d'abord une table de qualité :

| @dict | Couleur | Description |
| ----- | ----- | ----------- |
| quality_id | color | desc |
| string | string | string |
| common | #FFFFFF | Qualité normale |
| rare | #00FFFF | Qualité rare |
| epic | #FF00FF | Qualité épique |

### Étape 2 : Créer la table d'objets (référençant la table de qualité)

Le champ `quality_id` dans la table d'objets utilise le type `&Quality`, indiquant qu'il référence la table de qualité :

| @dict | Nom | Qualité | Attaque |
| ----- | ---- | ------- | ------ |
| item_id | name | quality_id | attack |
| string | string | &Quality | i32 |
| sword_001 | Iron Sword | common | 10 |
| sword_002 | Steel Sword | rare | 50 |
| sword_003 | Dragon Sword | epic | 200 |

## Cas d'utilisation courants

| Scénario | Description |
| -------- | ----------- |
| Objet → Qualité | À quel niveau de qualité appartient un objet |
| Équipement → Personnage | Quel personnage peut équiper l'équipement |
| Compétence → Classe | À quelle classe appartient une compétence |
| Monstre → Table de butin | Quelle table de butin un monstre dépose |

## Types de tables référençables

Les types de tables suivants peuvent être référencés :

| Type | Description |
| ---- | ----------- |
| Table dict | Clé primaire chaîne, tel que ID d'objet, ID de compétence |
| Table list | Clé primaire entière, tel que numéro de monstre, numéro d'objet |
| Table language | Clé de langue, le format est `group_name/language_key`, tel que `&Language` |

### Format spécial pour les références de table de langue

Lors de la référence à une table de langue, le format de valeur rempli est `group_name/language_key` :

| @dict | Nom | Texte d'astuce |
| ----- | ---- | -------- |
| item_id | name | tip |
| string | string | &Language |
| sword_001 | Iron Sword | ui/item_tip_001 |

Les types suivants **ne peuvent pas être référencés** :

| Type | Raison |
| ---- | ------ |
| Table enum | Les énumérations sont des options fixes, pas des tables de données |
| Table class | La configuration globale n'a qu'une seule instance |
| Types de base | i32, string, etc. sont des types valeur, pas des tables |

## Références dans les types imbriqués

Les types de référence peuvent être combinés avec d'autres types pour former des structures de données plus complexes.

### Tableau de références

Lorsque vous devez référencer plusieurs cibles, vous pouvez utiliser un tableau de références :

| Format | Description |
| ------ | ----------- |
| `[&T]` | Tableau de références, stocke plusieurs clés primaires de tables cibles |

**Exemple : Table de butin référençant plusieurs objets**

| @dict | Nom | Objets de butin |
| ----- | ---- | ---------- |
| drop_id | name | items |
| string | string | [&Item] |
| drop_001 | Starter Pack | sword_001, potion_001 |
| drop_002 | Elite Reward | sword_002, armor_001, gem_001 |

### Autres combinaisons imbriquées

| Format | Description |
| ------ | ----------- |
| `[&T]` | Tableau de références |
| `Vec<&T>` | Vecteur de références |
| `HashMap<string, &T>` | Mappage chaîne vers référence |

## Validation des références

XCell vérifie automatiquement si les références sont correctes :

- ✅ Les IDs référencés doivent exister dans la table cible
- ✅ Impossible de remplir des IDs inexistants
- ✅ Les références circulaires seront détectées et signalées

## Génération de code

### TypeScript (Cocos, Laya)

```typescript
export class Item {
    public itemId: string;
    public name: string;
    public qualityId: string;  // Stocke la valeur de la clé primaire
    public attack: number;
}

export class ItemTable {
    private _items: Map<string, Item>;
    private _qualityTable: QualityTable;

    public getQuality(itemId: string): Quality | undefined {
        const item = this._items.get(itemId);
        if (item) {
            return this._qualityTable.get(item.qualityId);
        }
        return undefined;
    }
}
```

### C# (Unity, Godot)

```csharp
public class Item
{
    public string ItemId;
    public string Name;
    public string QualityId;  // Stocke la valeur de la clé primaire
    public int Attack;
}

public class ItemTable
{
    private Dictionary<string, Item> _items;
    private QualityTable _qualityTable;

    public Quality GetQuality(string itemId)
    {
        if (_items.TryGetValue(itemId, out var item))
        {
            return _qualityTable.Get(item.QualityId);
        }
        return null;
    }
}
```

## Remarques

- La table cible référencée doit exister
- La table cible doit être de type dict, list ou language
- Les tables enum et class ne peuvent pas être référencées
- Les types de base (i32, string, etc.) ne peuvent pas être référencés
- Il est recommandé d'utiliser le nommage PascalCase pour les noms de tables, tel que `&QualityTable`
