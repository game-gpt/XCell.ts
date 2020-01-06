# Fichiers de configuration

XCell utilise des fichiers de configuration au format TOML pour gérer les paramètres du projet. Le fichier de configuration est nommé `XCell.toml` et situé dans le répertoire racine du projet.

## Configuration de base

| Élément de configuration | Type | Description | Valeur par défaut |
|--------------------|------|-------------|---------------|
| version | string | Numéro de version du fichier de configuration | "0.0.0" |
| include | string | Motif de chemin de fichiers Excel à inclure (priorité la plus élevée) | "*.xlsx" |
| exclude | string | Motif de chemin de fichiers Excel à exclure (priorité inférieure à include) | "" |

### Configuration des lignes (line)

Définit les numéros de ligne où se trouvent les différentes informations dans la table (à partir de 1).

| Élément de configuration | Type | Description | Valeur par défaut |
|--------------------|------|-------------|---------------|
| line.field | int | Ligne où se trouvent les noms de champs | 1 |
| line.type | int | Ligne où se trouvent les types de données | 2 |
| line.comment | int | Ligne où se trouvent les commentaires | 3 |
| line.data | int | Ligne où commencent les données | 4 |

#### Migration de tables existantes

Le format de table par défaut de XCell est :

| Numéro de ligne | Contenu |
|------------|---------|
| Ligne 1 | Commentaires des champs |
| Ligne 2 | Noms des champs |
| Ligne 3 | Types des champs |
| Ligne 4+ | Lignes de données |

Si votre format de table existant est différent, vous pouvez l'ajuster via le mappage de lignes. Par exemple, si le format de table existant est :

| Numéro de ligne | Contenu |
|------------|---------|
| Ligne 1 | Noms des champs |
| Ligne 2 | Types des champs |
| Ligne 3+ | Lignes de données |

Configurez comme suit :

```toml
line.field = 1
line.type = 2
line.comment = 0  # Pas de ligne de commentaire
line.data = 3
```

> Remarque : `line.comment = 0` indique qu'il n'y a pas de ligne de commentaire.

### Configuration de l'analyse des types (type)

Configurez les règles d'analyse pour les différents types de données.

#### Type booléen (bool)

| Élément de configuration | Type | Description |
|--------------------|------|-------------|
| type.bool.accept | array[string] | Liste des valeurs acceptées comme vrai |
| type.bool.reject | array[string] | Liste des valeurs acceptées comme faux |

Exemple :
```toml
[type.bool]
accept = ["true", "√", "是", "1"]
reject = ["false", "x", "否", "0"]
```

### Configuration de génération de code Unity (unity)

Configurez les paramètres relatifs à la génération de code C#.

| Élément de configuration | Type | Description | Valeur par défaut |
|--------------------|------|-------------|---------------|
| unity.enable | bool | Activer ou non la génération de code Unity | true |
| unity.project | string | Chemin du projet Unity | "../" |
| unity.output | string | Répertoire de sortie du code | "Assets/Scripts/DataTable/Generated" |
| unity.namespace | string | Espace de noms du code généré | "DataTable.Generated" |
| unity.manager | string | Nom de la classe gestionnaire | "DataTableManager" |
| unity.suffix_table | string | Suffixe de la classe de table | "Table" |
| unity.suffix_element | string | Suffixe de la classe d'élément | "Element" |
| unity.support_clone | bool | Supporter ou non le clonage | true |
| unity.legacy_using | bool | Utiliser ou non le using hérité | false |
| unity.legacy_null_null | bool | Utiliser ou non la gestion null héritée | false |

### Configuration du format de sortie des données

Configurez la sortie des fichiers de données dans différents formats.

#### Format binaire

| Élément de configuration | Type | Description | Valeur par défaut |
|--------------------|------|-------------|---------------|
| unity.binary.enable | bool | Activer ou non la sortie binaire | true |
| unity.binary.output | string | Répertoire de sortie des fichiers binaires | "Assets/Tables/Generated" |

#### Format XML

| Élément de configuration | Type | Description | Valeur par défaut |
|--------------------|------|-------------|---------------|
| unity.xml.enable | bool | Activer ou non la sortie XML | false |
| unity.xml.output | string | Répertoire de sortie des fichiers XML | "Assets/Tables/Readable" |

#### Format JSON

| Élément de configuration | Type | Description | Valeur par défaut |
|--------------------|------|-------------|---------------|
| unity.json.enable | bool | Activer ou non la sortie JSON | false |
| unity.json.output | string | Répertoire de sortie des fichiers JSON | "Assets/Tables/Readable" |

#### Autres formats

- **xlua** : Génération de code Lua
- **protobuf** : Sortie au format Protobuf

## Instructions d'utilisation

1. Créez le fichier `XCell.toml` dans le répertoire racine du projet
2. Modifiez les éléments de configuration selon vos besoins
3. L'outil XCell chargera automatiquement la configuration lors de l'exécution
4. La configuration de table peut remplacer la configuration globale (créez un fichier `.toml` du même nom)
