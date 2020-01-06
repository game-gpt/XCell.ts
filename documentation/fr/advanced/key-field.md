# Contraintes de champ

Les contraintes de champ sont des règles utilisées pour limiter les valeurs des champs, assurant l'unicité et l'intégrité des données.

## Contrainte d'unicité (unique)

La contrainte d'unicité garantit que les valeurs de champ ne peuvent pas être dupliquées.

### Méthode de marquage

| Raccourci | Notation par attribut méta | Description |
| --------- | ----------------------- | ----------- |
| `@field_name` | `field_name @unique` | Champ unique, les valeurs ne peuvent pas être dupliquées |

### Exemple

| @dict | Nom | Email |
| ----- | ---- | ----- |
| user\_id | name | @email |
| string | string | string |
| user\_001 | John | <john@example.com> |
| user\_002 | Jane | <jane@example.com> |

- `@email` - Les valeurs du champ Email ne peuvent pas être dupliquées

## Contrainte de clé primaire (primary)

La clé primaire est le champ utilisé pour identifier de manière unique chaque ligne de données dans une table.

### Règle par défaut

- **La première colonne est automatiquement traitée comme clé primaire**, aucun marquage supplémentaire requis

### Méthode de marquage

| Raccourci | Notation par attribut méta | Description |
| --------- | ----------------------- | ----------- |
| `@@field_name` | `field_name @primary` | Champ clé primaire, les valeurs sont uniques et servent de clé primaire |

### Exemple

| @dict | Nom |
| ----- | ---- |
| @@item\_id | name |
| string | string |
| sword\_001 | Iron Sword |
| sword\_002 | Steel Sword |

- `@@item_id` - Champ clé primaire, les valeurs sont uniques

## Contrainte composite

Lorsque plusieurs champs combinés doivent être uniques, vous pouvez utiliser des contraintes composites. Ajoutez `@unique(field1, field2)` après le marqueur de type :

| @dict @unique(class, level) | Classe | Niveau |
| --------------------------- | ----- | ----- |
| id | class | level |
| string | string | i32 |
| warrior\_001 | warrior | 10 |
| warrior\_002 | warrior | 20 |
| mage\_001 | mage | 10 |

Dans l'exemple ci-dessus, la combinaison `Classe + Niveau` doit être unique, mais les valeurs individuelles de classe ou de niveau peuvent être dupliquées.

> ⚠️ **Avertissement** : Si une contrainte d'unicité composite est utilisée, alors les références `&T` vers cette table doivent également remplir les clés composites. Certains moteurs de jeu ne supportent pas les clés composites, veuillez utiliser avec précaution.

## Exigences des contraintes

- Les valeurs de clé primaire doivent être uniques
- Les valeurs de clé primaire ne peuvent pas être nulles
- Chaque table ne peut avoir qu'une seule clé primaire
- Les valeurs de champ uniques ne peuvent pas être dupliquées
