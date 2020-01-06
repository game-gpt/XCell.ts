# Documentation de l'extensibilité

Ce document présente comment étendre les fonctionnalités de l'outil de gestion de tables de configuration XCell, y compris le système de types personnalisé, l'extension des générateurs de code et le développement de plugins.

## Table des matières

1. [Système de types personnalisé](#système-de-types-personnalisé)
2. [Extension des générateurs de code](#extension-des-générateurs-de-code)
3. [Guide de développement de plugins](#guide-de-développement-de-plugins)

***

## Système de types personnalisé

XCell fournit un système de types flexible qui supporte plusieurs types de données intégrés et permet aux développeurs de personnaliser de nouveaux types de données.

### Aperçu des types intégrés

XCell supporte les types intégrés suivants :

| Catégorie de type | Types supportés                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Booléen       | `bool`, `boolean`                                                                                                          |
| Entier       | `byte`/`i8`, `short`/`i16`, `int`/`i32`, `long`/`i64`, `sbyte`/`u8`, `ushort`/`u16`, `uint`/`u32`, `ulong`/`u64`          |
| Décimal       | `float`/`f32`, `double`/`f64`, `decimal`/`d128`/`f128`                                                                     |
| Chaîne        | `string`                                                                                                                   |
| Types spéciaux | `color`/`colour`, `color32`, `time`/`date`/`datetime`                                                                      |
| Vecteur/Tableau  | `v2`/`vec2`, `v3`/`vec3`, `v4`/`vec4`, `q4`/`quaternion`                                                                   |
| Énumération          | Types d'énumération personnalisés                                                                                                          |

### Architecture du système de types

Le cœur du système de types de XCell se trouve dans le module `xcell-types`, contenant principalement les composants suivants :

- `XCellTyped` : Énumération des types, définissant tous les types de données supportés
- `TypeMetaInfo` : Métadonnées de type, contenant les informations de configuration de type
- `XCellValue` : Valeur de type, stockant les données analysées
- Divers descripteurs de type : tels que `IntegerDescription`, `DecimalDescription`, etc.

### Étapes d'implémentation d'un type personnalisé

Pour ajouter un type personnalisé, suivez ces étapes :

#### 1. Créer un module de description de type

Créez un nouveau module de type dans le répertoire `projects/xcell-types/src/`, par exemple `my_type/mod.rs` :

```rust
use serde::{Deserialize, Serialize};
use xcell_errors::XResult;
use crate::value::XCellValue;

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct MyTypeDescription {
    pub default: Option<String>,
}

impl MyTypeDescription {
    pub fn parse_cell(&self, cell: &str) -> XResult<XCellValue> {
        todo!("Implémenter la logique d'analyse de cellule")
    }
}
```

#### 2. Étendre l'énumération XCellTyped

Étendez l'énumération `XCellTyped` dans `projects/xcell-types/src/typing/mod.rs` :

```rust
pub enum XCellTyped {
    // ... types existants ...
    MyType(Box<MyTypeDescription>),
}
```

#### 3. Implémenter l'analyse de type

Ajoutez la logique d'analyse de type dans `projects/xcell-types/src/typing/parser.rs` :

```rust
impl XCellTyped {
    pub fn parse(input: &str, info: &TypeMetaInfo) -> Self {
        let normed = Self::norm_typing(input);
        match normed.as_str() {
            // ... types existants ...
            "mytype" | "my_type" => info.my_type.clone().into(),
            _ => XCellTyped::parse_complex(input, &normed, info),
        }
    }
}
```

#### 4. Mettre à jour TypeMetaInfo

Mettez à jour la structure `TypeMetaInfo` dans `projects/xcell-types/src/typing/mod.rs` :

```rust
#[derive(Debug, Clone, Default, Serialize)]
pub struct TypeMetaInfo {
    // ... champs existants ...
    pub my_type: MyTypeDescription,
}
```

#### 5. Ajouter le support de génération de code

Ajoutez la logique de génération de code pour le nouveau type dans `projects/xcell-types/src/codegen/`, en vous assurant que des définitions de type correctes peuvent être générées pour les langages cibles (tels que C#).

***

## Extension des générateurs de code

XCell supporte plusieurs cibles de génération de code, y compris Unity C#, fichiers binaires, XML, JSON, etc. Vous pouvez étendre ces générateurs ou en créer de nouveaux.

### Architecture de génération de code

La génération de code est principalement implémentée dans le module `xcell-core/src/codegen/` :

- `binary/` : Génération au format binaire
- `readable/` : Génération au format lisible (XML, JSON)
- `unity/` : Génération de code Unity C#

### Extension du générateur de code Unity

Le générateur de code Unity est l'un des générateurs les plus couramment utilisés. Voici les étapes pour l'étendre :

#### 1. Consulter les templates existants

La génération de code Unity utilise des fichiers de template situés dans le répertoire `projects/xcell-core/templates/` :

- `BuildClass.cs` : Template de table de classe
- `BuildDictionary.cs` : Template de table dictionnaire
- `BuildEnumerate.cs` : Template de table d'énumération
- `BuildLanguage.cs` : Template de table de langue
- `BuildManager.cs` : Template de gestionnaire

#### 2. Modifier ou créer des templates

Modifiez les templates existants ou créez de nouveaux fichiers de template selon vos besoins.

#### 3. Mettre à jour la configuration UnityCodegen

Mettez à jour la configuration dans `projects/xcell-core/src/config/unity/mod.rs` :

```rust
#[derive(Debug, Clone)]
pub struct UnityCodegen {
    // ... champs existants ...
    pub my_custom_option: bool,
}
```

#### 4. Implémenter la logique de génération

Implémentez la logique de génération spécifique dans `projects/xcell-core/src/codegen/unity/`.

### Création de nouveaux générateurs de code

Pour créer un tout nouveau générateur de code, suivez ces étapes :

#### 1. Créer un module de générateur

Créez un nouveau module dans le répertoire `projects/xcell-core/src/codegen/`, par exemple `cocos/mod.rs` :

```rust
use xcell_errors::XResult;
use crate::config::ProjectConfig;

pub struct CocosCodegen {
    // Champs de configuration
}

impl CocosCodegen {
    pub fn write(&self, config: &ProjectConfig) -> XResult<()> {
        todo!("Implémenter la logique de génération de code Cocos")
    }
}
```

#### 2. Intégrer dans le système de configuration

Ajoutez des options de configuration pour le nouveau générateur dans `ProjectConfig`.

#### 3. Connecter au flux de travail

Appelez le nouveau générateur dans `WorkspaceManager::write_unity()` ou des méthodes similaires.

***

## Guide de développement de plugins

XCell supporte l'extension des fonctionnalités via un système de plugins. Les plugins peuvent ajouter de nouveaux types de tables, une logique de validation personnalisée ou étendre les capacités de génération de code.

### Architecture des plugins

Le système de plugins est basé sur le système de traits de Rust, avec les interfaces principales incluant :

- Trait de processeur de table
- Trait de validateur
- Trait de générateur de code

### Étapes de développement de plugins

#### 1. Créer un projet de plugin

Créez un nouveau projet Rust et ajoutez des dépendances sur `xcell-core` et `xcell-types` :

```toml
[package]
name = "xcell-my-plugin"
version = "0.1.0"
edition = "2024"

[dependencies]
xcell-core = { path = "../xcell-core" }
xcell-types = { path = "../xcell-types" }
```

#### 2. Implémenter le trait de plugin

Implémentez les traits correspondants selon vos besoins. Par exemple, implémentez un processeur de table personnalisé :

```rust
use xcell_core::x_table::table::CalamideTable;
use xcell_errors::XResult;

pub struct MyCustomTable;

impl MyCustomTable {
    pub fn confirm(table: &CalamideTable) -> XResult<Self> {
        todo!("Vérifier si la table correspond au format personnalisé")
    }

    pub fn perform(&self, workspace: &mut WorkspaceManager) -> XResult<()> {
        todo!("Exécuter la logique de traitement de table")
    }
}
```

#### 3. Enregistrer le plugin

Enregistrez votre plugin dans la méthode `WorkspaceManager::try_perform_file()` afin qu'il puisse être reconnu et traité.

### Bonnes pratiques pour les plugins

1. **Maintenir l'indépendance des plugins** : Les plugins doivent être aussi indépendants que possible, réduisant les dépendances envers les implémentations internes de XCell
2. **Fournir des options de configuration** : Fournir la configuration du plugin via `XCell.toml`
3. **Gestion des erreurs** : Gérer correctement les erreurs, fournir des messages d'erreur clairs
4. **Documentation** : Fournir une documentation d'utilisation complète pour les plugins
5. **Tests** : Écrire des cas de test suffisants

***

## Résumé

XCell fournit une puissante extensibilité, permettant aux développeurs de personnaliser les fonctionnalités selon leurs besoins. Que ce soit pour ajouter de nouveaux types de données, étendre les générateurs de code ou développer des plugins indépendants, l'architecture modulaire de XCell peut bien supporter ces besoins.

Si vous rencontrez des problèmes lors de l'extension, veuillez consulter le code source du projet ou soumettre une Issue pour obtenir de l'aide.
