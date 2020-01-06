
# Démarrage rapide

Ce tutoriel vous guidera dans l'utilisation de l'outil de gestion de tables de configuration XCell depuis le début.

## Configuration de l'environnement

### Configuration système requise

- Système d'exploitation Windows
- Environnement de développement Rust (si compilation depuis les sources)

### Méthodes d'installation

#### Méthode 1 : Utiliser la version pré-compilée

1. Téléchargez le dernier `xcell.exe` depuis la page des releases du projet
2. Placez `xcell.exe` dans votre répertoire de projet

#### Méthode 2 : Compiler depuis les sources

1. Assurez-vous que l'environnement de développement Rust est installé
2. Clonez ou téléchargez le code source du projet
3. Exécutez la commande suivante dans le répertoire racine du projet :

```bash
cargo build --release
```

4. Après compilation, l'exécutable se trouve dans `target/release/xcell.exe`

## Initialisation du projet

### Créer la structure du projet

Créez la structure suivante dans votre répertoire de travail :

```
MyProject/
├── xcell.exe
├── ProjectConfig.toml
└── Tables/
    └── Hero.xlsx
```

### Créer le fichier de configuration

Créez un fichier `ProjectConfig.toml` dans le répertoire racine du projet :

```toml
version = "0.1.0"

exclude = ""
include = "*.xlsx"

line.field = 1
line.type = 2
line.comment = 3
line.data = 4

[type.bool]
accept = ["true", "√"]
reject = ["false", "x"]

[type.string]

[unity]
enable = true
project = "./"
output = "Assets/Scripts/DataTable/Generated"
namespace = "DataTable.Generated"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"
support_clone = true
legacy_using = false
legacy_null_null = false

[unity.binary]
enable = true
output = "Assets/Tables/Generated"

[unity.xlua]
enable = false

[unity.xml]
enable = false
output = "Assets/Tables/Readable"

[unity.json]
enable = false
output = "Assets/Tables/Readable"

[unity.protobuf]
enable = false
```

## Créer votre première table de configuration

### Structure de la table Excel

XCell utilise une structure de table Excel spécifique, avec les 3 premières lignes comme en-têtes, et les données à partir de la ligne 4 :

| Numéro de ligne | Utilisation | Description |
|------------|---------|-------------|
| 1 | Nom du champ | Noms des champs de la table de configuration |
| 2 | Type de données | Types de données des champs |
| 3 | Commentaire | Texte descriptif des champs |
| 4+ | Lignes de données | Données de configuration réelles |

### Exemple de table

Créez une table `Tables/Hero.xlsx` :

| id | name | hp | attack | is_boss |
|----|------|----|--------|---------|
| int | string | int | int | bool |
| ID du héros | Nom du héros | Points de vie | Puissance d'attaque | Est un boss |
| 1 | Knight | 1000 | 100 | false |
| 2 | Mage | 800 | 150 | false |
| 3 | Dragon | 5000 | 500 | true |

## Exécuter XCell

### Commande de base

Ouvrez une ligne de commande dans le répertoire racine du projet et exécutez :

```bash
xcell.exe
```

XCell effectuera automatiquement les opérations suivantes :
1. Scanner toutes les tables Excel du répertoire courant
2. Valider les données des tables
3. Générer le code C# correspondant et les fichiers de données binaires

### Options de ligne de commande

```bash
xcell.exe [OPTIONS] [COMMAND]
```

#### Commandes

- `check` : Vérifier les tables de configuration sans exporter de fichiers
- `clear` : Effacer la base de données et le cache

#### Options

- `--workspace <WORKSPACE>` : Définir manuellement le répertoire de travail, par défaut le répertoire courant si non spécifié
- `-w, --watch` : Activer le mode surveillance, ne mettre à jour que les fichiers correspondants lorsque des modifications sont détectées
- `--disable-xml` : Désactiver fortement la génération XML
- `--disable-json` : Désactiver fortement la génération JSON
- `-h, --help` : Afficher l'aide
- `-V, --version` : Afficher la version

### Exemples d'utilisation

#### Vérifier les tables de configuration

```bash
xcell.exe check
```

#### Activer le mode surveillance

```bash
xcell.exe --watch
```

#### Effacer le cache

```bash
xcell.exe clear
```

## Consulter les résultats générés

Après une exécution réussie, vous verrez les fichiers générés suivants :

```
MyProject/
├── Assets/
│   ├── Scripts/DataTable/Generated/
│   │   ├── HeroTable.cs
│   │   └── DataTableManager.cs
│   └── Tables/Generated/
│       └── HeroTable.bytes
```

### Exemple de code C# généré

`HeroTable.cs` contiendra un contenu similaire à :

```csharp
namespace DataTable.Generated
{
    public partial class HeroTable
    {
        public readonly Dictionary<int, HeroElement> dict = new();

        public HeroElement GetElement(int id)
        {
            return dict.TryGetValue(id, out var item) ? item : null;
        }
    }

    public partial class HeroElement
    {
        public int id;
        public string name;
        public int hp;
        public int attack;
        public bool is_boss;
    }
}
```

## Prochaines étapes

- Consultez l'[Index des cas d'utilisation](use-cases/index.md) pour plus d'applications spécifiques
- Les utilisateurs d'Unity peuvent se référer à la documentation [Intégration Unity](use-cases/unity-integration.md)
