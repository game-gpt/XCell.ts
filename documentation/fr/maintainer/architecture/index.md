# Document de conception de l'architecture XCell

## 1. Aperçu général de l'architecture du projet

XCell est un outil de gestion de tables de configuration écrit en Rust, adoptant une conception modulaire avec des responsabilités de module claires et un couplage faible. Le projet est divisé en les parties principales suivantes :

- **Modules backend** : Situés dans le répertoire `backends/`, contenant la logique métier principale
  - `xcell` - Outil en ligne de commande et point d'entrée principal
  - `xcell-analyzer` - Gestion de l'espace de travail et analyse de tables
  - `xcell-generator` - Générateur de code
  - `xcell-provider` - Abstraction de lecture de tables
  - `xcell-core` - Système de types et fonctionnalités principales
  - `xcell-config` - Gestion de la configuration
  - `xcell-macros` - Définitions de macros
  - `xcell-parser` - Analyseur de types
  - `xcell-plugin` - Système de plugins
  - `xcell-wasi` - Support WebAssembly

- **Modules frontend** : Situés dans le répertoire `frontends/`, contenant les interfaces utilisateur
  - `homepage` - Site officiel du projet
  - `xcell` - SDK frontend
  - `xcell-desktop` - Application de bureau
  - `xcell-h5` - Application web

- **Documentation** : Située dans le répertoire `documentation/`, contenant la documentation du projet

- **Exemples** : Situés dans le répertoire `examples/`, contenant des exemples d'utilisation

### Stack technologique

- **Backend** : Rust
- **Frontend** : Vue.js, TypeScript, Tauri
- **Lecture de tables** : calamine (Excel), csv (CSV/TSV)
- **Moteur de templates** : dejavu
- **Runtime asynchrone** : tokio
- **Gestion des erreurs** : anyhow
- **Journalisation** : tracing

## 2. Division des modules et description des responsabilités

### 2.1 xcell - Outil en ligne de commande

**Responsabilités** :
- Fournir l'interface en ligne de commande
- Analyser les arguments de ligne de commande
- Coordonner l'ensemble du flux de travail
- Appeler d'autres modules backend pour exécuter les tâches

**Fichiers principaux** :
- `backends/xcell/src/main.rs` - Point d'entrée du programme
- `backends/xcell/src/workspace.rs` - Gestion de l'espace de travail
- `backends/xcell/src/commands/toml.rs` - Traitement de la configuration TOML

**Fonctions principales** :
- Générer du code et des fichiers de données
- Vérifier la configuration
- Nettoyer les sorties
- Mode de surveillance de fichiers

### 2.2 xcell-analyzer - Gestion de l'espace de travail et analyse de tables

**Responsabilités** :
- Gérer l'espace de travail et la configuration
- Scanner et identifier les fichiers de tables
- Analyser les données de tables
- Identifier les types de tables
- Traiter les données de tables
- Lier les définitions d'énumération

**Fichiers principaux** :
- `backends/xcell-analyzer/src/lib.rs` - Export du module
- `backends/xcell-analyzer/src/config/mod.rs` - Gestionnaire d'espace de travail
- `backends/xcell-analyzer/src/x_table/mod.rs` - Structures de données de tables

**Composants principaux** :
- `WorkspaceManager` - Gestionnaire d'espace de travail, responsable de la coordination de l'ensemble du flux de travail
- `XClassTable` - Type de table de classe
- `XDictTable` - Type de table dictionnaire
- `XEnumerateTable` - Type de table d'énumération
- `XLanguageTable` - Type de table de langue
- `DefineManager` - Gestionnaire de définitions d'énumération
- `LanguageManager` - Gestionnaire de tables de langue

### 2.3 xcell-generator - Générateur de code

**Responsabilités** :
- Générer du code et des fichiers de données dans divers formats
- Supporter plusieurs plateformes cibles
- Fournir une architecture de génération de code enfichable

**Fichiers principaux** :
- `backends/xcell-generator/src/lib.rs` - Export du module
- `backends/xcell-generator/src/codegen/mod.rs` - Interface du générateur de code
- `backends/xcell-generator/src/config.rs` - Configuration du générateur

**Générateurs de code supportés** :
- `json` - Génération de données JSON ✅
- `binary` - Génération de données binaires ✅
- `cocos` - Génération de code plateforme Cocos ✅
- `typescript` - Génération de code TypeScript ✅
- `dejavu` - Génération de code par moteur de templates ✅
- `unity` - Génération de code plateforme Unity ⚠️ (actuellement désactivé)
- `xlua` - Génération de code script XLua
- `sql` - Génération de code base de données SQL
- `xml` - Génération de données XML

### 2.4 xcell-provider - Abstraction de lecture de tables

**Responsabilités** :
- Fournir une interface de lecture de table unifiée
- Supporter plusieurs formats de tables (Excel, CSV, TSV)
- Abstraire les différences entre les formats de tables
- Fournir l'analyse des en-têtes de table

**Fichiers principaux** :
- `backends/xcell-provider/src/lib.rs` - Export du module
- `backends/xcell-provider/src/table/mod.rs` - Interface de lecture de tables
- `backends/xcell-provider/src/standard/mod.rs` - Implémentation de flux standard

**Composants principaux** :
- `TableReader` - Trait de lecteur de table
- `ExcelTable` - Implémentation de lecture de table Excel
- `CsvTable` - Implémentation de lecture de table CSV
- `TsvTable` - Implémentation de lecture de table TSV
- `FileFormatDetector` - Détecteur de format de fichier
- `load_table` - Fonction unifiée de chargement de table

### 2.5 xcell-core - Système de types et fonctionnalités principales

**Responsabilités** :
- Définir tous les types de données
- Fournir la conversion et l'analyse de types
- Supporter le mappage de types pour diverses plateformes
- Fournir le traitement et la conversion de valeurs
- Fournir les interfaces de lecture/écriture d'ordre d'octets

**Fichiers principaux** :
- `backends/xcell-core/src/lib.rs` - Export du module
- `backends/xcell-core/src/typing/mod.rs` - Définitions de types
- `backends/xcell-core/src/value/mod.rs` - Traitement des valeurs

**Types supportés** :
- Types entiers (Integer)
- Types décimaux (Decimal)
- Types booléens (Boolean)
- Types chaîne (String)
- Types tableau (Array)
- Types vecteur (Vector)
- Types langue (Language)
- Types énumération (Enumerate)
- Types couleur (Color)
- Types temporels (Time)

### 2.6 xcell-config - Gestion de la configuration

**Responsabilités** :
- Définir la structure de configuration du projet
- Fournir l'analyse et la validation de la configuration
- Supporter les options de configuration pour différentes plateformes

**Fichiers principaux** :
- `backends/xcell-config/src/lib.rs` - Export du module
- `backends/xcell-config/src/project/mod.rs` - Configuration du projet
- `backends/xcell-config/src/cocos/mod.rs` - Configuration plateforme Cocos
- `backends/xcell-config/src/unity/mod.rs` - Configuration plateforme Unity

**Composants principaux** :
- `ProjectConfig` - Configuration du projet
- `CocosCodegen` - Configuration de génération de code Cocos
- `UnityCodegen` - Configuration de génération de code Unity
- `MergeRules` - Règles de fusion de tables

### 2.7 xcell-parser - Analyseur de types

**Responsabilités** :
- Analyser les expressions de type
- Analyser les définitions de champs
- Analyser les métadonnées

**Fichiers principaux** :
- `backends/xcell-parser/src/lib.rs` - Export du module
- `backends/xcell-parser/src/lexer.rs` - Analyseur lexical
- `backends/xcell-parser/src/parser.rs` - Analyseur syntaxique
- `backends/xcell-parser/src/ast.rs` - Arbre syntaxique abstrait

## 3. Description du flux de données

### 3.1 Processus global

Le processus complet de la lecture du fichier de table à l'exportation de code :

```
Fichier de table (Excel/CSV/TSV) → Lecture/Analyse → Identification de table → Traitement des données → Génération de code → Fichiers de sortie
```

### 3.2 Étapes détaillées

#### Étape 1 : Initialiser l'espace de travail

1. Analyser les arguments de ligne de commande ou le fichier de configuration
2. Créer une instance `WorkspaceManager`
3. Charger la configuration du projet (`ProjectConfig`)

#### Étape 2 : Scanner les fichiers

1. Scanner le répertoire de travail
2. Utiliser `WalkDir` pour parcourir le répertoire
3. Filtrer les fichiers selon le motif `include` configuré

#### Étape 3 : Lire les fichiers de table

1. Utiliser la fonction `load_table()` pour lire les fichiers de table (détection automatique du format)
2. Analyser l'en-tête de table (`XCellHeader`)
3. Lire toutes les lignes de données

#### Étape 4 : Identifier le type de table

Essayer d'identifier les types de tables suivants dans l'ordre :

1. `XListTable` - Table de liste
2. `XDictTable` - Table dictionnaire
3. `XEnumerateTable` - Table d'énumération
4. `XClassTable` - Table de classe
5. `XLanguageTable` - Table de langue
6. `XLanguageID` - Table d'ID de langue

#### Étape 5 : Traiter les données de table

Exécuter les opérations correspondantes selon le type de table :

- Pour les tables d'énumération : Ajouter au `DefineManager`
- Pour les tables de langue : Ajouter au `LanguageManager`
- Pour les autres tables : Effectuer la validation et le stockage des données

#### Étape 6 : Lier les énumérations

Appeler la méthode `link_enumerate()` pour lier les définitions d'énumération aux champs de données correspondants

#### Étape 7 : Génération de code

1. Créer une instance `Generator`
2. Configurer les générateurs de code activés
3. Parcourir toutes les sorties activées
4. Appeler le générateur de code correspondant pour chaque sortie
5. Générer le code et les fichiers de données dans les formats correspondants

#### Étape 8 : Surveillance de fichiers (optionnel)

Si la surveillance de fichiers est activée :
1. Démarrer le moniteur de fichiers
2. Écouter les changements de fichiers
3. Retraiter automatiquement les fichiers modifiés

## 4. Référence de localisation du code principal

### Gestion de l'espace de travail
- `WorkspaceManager` - `backends/xcell-analyzer/src/config/mod.rs`
- `WorkspaceManager::new()` - Créer le gestionnaire d'espace de travail
- `WorkspaceManager::classes()` - Obtenir les données de tables de classe
- `WorkspaceManager::lists()` - Obtenir les données de tables de liste
- `WorkspaceManager::dicts()` - Obtenir les données de tables dictionnaire
- `WorkspaceManager::enumerates()` - Obtenir les données de tables d'énumération

### Lecture de tables
- `load_table()` - `backends/xcell-provider/src/table/mod.rs` - Fonction unifiée de chargement de table
- `TableReader` - `backends/xcell-provider/src/table/mod.rs` - Trait de lecteur de table
- `XCellHeader` - `backends/xcell-provider/src/table/mod.rs` - En-tête de table

### Types de tables
- `XClassTable` - `backends/xcell-analyzer/src/x_table/class/mod.rs` - Type de table de classe
- `XDictTable` - `backends/xcell-analyzer/src/x_table/dictionary/mod.rs` - Type de table dictionnaire
- `XEnumerateTable` - `backends/xcell-analyzer/src/x_table/enumerate/mod.rs` - Type de table d'énumération
- `XLanguageTable` - `backends/xcell-analyzer/src/x_table/language/mod.rs` - Type de table de langue

### Génération de code
- `Generator` - `backends/xcell-generator/src/lib.rs` - Point d'entrée principal du générateur
- `Codegen` - `backends/xcell-generator/src/codegen/mod.rs` - Trait du générateur de code
- `CocosCodegen` - `backends/xcell-generator/src/codegen/cocos/mod.rs` - Génération de code Cocos
- `UnityCodegen` - `backends/xcell-generator/src/codegen/unity/mod.rs` - Génération de code Unity (actuellement désactivé)
- `JsonCodegen` - `backends/xcell-generator/src/codegen/json/mod.rs` - Génération de données JSON

### Système de types
- `TypeDescription` - `backends/xcell-core/src/typing/mod.rs` - Description de type
- `XCellValue` - `backends/xcell-core/src/value/mod.rs` - Valeur de cellule
- `CSharpReader`/`CSharpWriter` - `backends/xcell-core/src/codegen/csharp_ffi/mod.rs` - Mappage de types C#

### Gestion de la configuration
- `ProjectConfig` - `backends/xcell-config/src/project/mod.rs` - Configuration du projet
- `CocosCodegen` - `backends/xcell-config/src/cocos/mod.rs` - Configuration de génération de code Cocos
- `UnityCodegen` - `backends/xcell-config/src/unity/mod.rs` - Configuration de génération de code Unity

## 5. Conception d'isolation par abstraction

### 5.1 Couches d'abstraction principales

XCell adopte une conception d'abstraction multi-couches, garantissant des responsabilités de module claires et évitant les fuites d'abstraction :

1. **Couche de lecture de tables** (`xcell-provider`) :
   - Fournit le trait `TableReader` unifié
   - Abstrait les différences entre les formats de tables (Excel, CSV, TSV)
   - Les modules supérieurs n'ont pas besoin de se soucier des formats de table spécifiques

2. **Couche d'analyse de tables** (`xcell-analyzer`) :
   - Lit les données de table basées sur `TableReader`
   - Identifie les types de tables et effectue le traitement correspondant
   - Fournit `WorkspaceManager` pour gérer uniformément toutes les données de table

3. **Couche de génération de code** (`xcell-generator`) :
   - Obtient les données de table basées sur `WorkspaceManager`
   - N'interagit pas directement avec les fichiers de table
   - Supporte plusieurs générateurs de code via le trait `Codegen`

4. **Couche du système de types** (`xcell-core`) :
   - Définit les types de données unifiés
   - Fournit la conversion et l'analyse de types
   - Supporte le mappage de types multi-plateformes

### 5.2 Principes d'isolation par abstraction

- **Responsabilité unique** : Chaque module n'est responsable que d'une fonction spécifique
- **Inversion des dépendances** : Les modules de haut niveau dépendent des abstractions, pas des implémentations concrètes
- **Ségrégation des interfaces** : Utiliser des traits pour définir des interfaces minimisées
- **Substitution de Liskov** : Les implémentations peuvent être remplacées par leurs sous-types
- **Principe ouvert/fermé** : Ouvert à l'extension, fermé à la modification

## 6. Guide de développement d'extensions

### Ajouter un nouveau format de table

1. Créer une nouvelle implémentation de lecture de table sous `backends/xcell-provider/src/table/`
2. Implémenter le trait `TableReader`
3. Ajouter la logique de détection de format dans `FileFormatDetector`
4. Ajouter le support du nouveau format dans la fonction `load_table`

### Ajouter un nouveau type de données

1. Créer un nouveau module sous `backends/xcell-core/src/`
2. Implémenter la logique d'analyse et de conversion de type
3. Exporter dans `backends/xcell-core/src/lib.rs`
4. Ajouter le support de mappage de type de plateforme correspondant

### Ajouter un nouveau générateur de code

1. Créer un nouveau module sous `backends/xcell-generator/src/codegen/`
2. Implémenter le trait `Codegen`
3. Enregistrer le nouveau générateur dans `Generator::new()`
4. Ajouter les options de configuration correspondantes

### Ajouter le support d'une nouvelle plateforme

1. Créer un nouveau module de configuration de plateforme sous `backends/xcell-config/src/`
2. Créer un nouveau générateur de code de plateforme sous `backends/xcell-generator/src/codegen/`
3. Implémenter la logique de génération de code spécifique à la plateforme
4. Mettre à jour la documentation et les exemples
