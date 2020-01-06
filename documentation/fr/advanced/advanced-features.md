# Documentation des fonctionnalités avancées

Ce document détaille les fonctionnalités avancées de l'outil de gestion de tables de configuration XCell, y compris les options de configuration avancées, les règles détaillées de fusion de tables et les conseils d'optimisation des performances.

## Table des matières

1. [Options de configuration avancées](#options-de-configuration-avancées)
2. [Règles détaillées de fusion de tables](#règles-détaillées-de-fusion-de-tables)
3. [Conseils d'optimisation des performances](#conseils-doptimisation-des-performances)
4. [Intégration de moteurs](#intégration-de-moteurs)

---

## Options de configuration avancées

Le fichier de configuration de XCell `XCell.toml` offre de riches options de configuration, vous permettant de personnaliser flexiblement le comportement de l'outil.

### Structure de configuration de base

Un fichier de configuration `XCell.toml` complet contient les parties principales suivantes :

```toml
version = "0.0.0"

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

[merge]
```

### Configuration du contrôle de version

```toml
version = "0.0.0"
```

- **version** : Numéro de version du projet actuel, utilisé pour identifier la version du code généré et des fichiers de données

### Configuration d'inclusion/exclusion de fichiers

```toml
exclude = ""
include = "*.xlsx"
```

- **include** : Spécifie le motif de fichiers Excel à inclure, supporte les caractères génériques
- **exclude** : Spécifie le motif de fichiers Excel à exclure, priorité inférieure à include

Exemple :
```toml
include = "tables/**/*.xlsx"
exclude = "tables/temp/*.xlsx"
```

### Configuration des lignes de table

```toml
line.field = 1
line.type = 2
line.comment = 3
line.data = 4
```

- **line.field** : Numéro de ligne où se trouvent les noms de champs (à partir de 1)
- **line.type** : Numéro de ligne où se trouvent les déclarations de type
- **line.comment** : Numéro de ligne où se trouvent les commentaires
- **line.data** : Numéro de ligne où commencent les données

### Configuration des types

#### Configuration du type booléen

```toml
[type.bool]
accept = ["true", "√"]
reject = ["false", "x"]
```

- **accept** : Liste des valeurs reconnues comme vrai
- **reject** : Liste des valeurs reconnues comme faux

#### Configuration du type chaîne

```toml
[type.string]
# Configuration extensible
```

---

## Règles détaillées de fusion de tables

Les règles de fusion de tables permettent de fusionner plusieurs tables Excel en une seule, supportant la fusion par lignes ou par colonnes.

### Configuration des règles de fusion

Les règles de fusion sont configurées dans la section `[merge]`, chaque règle utilise un numéro unique comme identifiant.

```toml
[merge.10001]
mode = "row"
input = "Language_CN*"
target = "Language_CN"

[merge.10002]
mode = "row"
input = "Language_EN*"
target = "Language_EN"

[merge.20001]
mode = "column"
input = "Language*"
target = "Language"
```

### Modes de fusion

#### Mode de fusion par lignes (row)

```toml
mode = "row"
```

La fusion par lignes combine les lignes de données de plusieurs tables en une seule. Adaptée pour :
- Les grandes tables nécessitant d'être scindées pour la gestion
- La gestion séparée des données multilingues

Exemple de structure de répertoire :
```
LanguageTable/
  - CN/
    - Language_CN_UI.xlsx
    - Language_CN_Item.xlsx
  - EN/
    - Language_EN_UI.xlsx
    - Language_EN_Item.xlsx
```

#### Mode de fusion par colonnes (column)

```toml
mode = "column"
```

La fusion par colonnes combine les colonnes de plusieurs tables en une seule. Adaptée pour :
- La répartition des données de colonnes dans différents fichiers
- La collaboration de différentes équipes sur différentes parties d'une même table

### Paramètres des règles de fusion

- **mode** : Mode de fusion, `row` ou `column`
- **input** : Motif de fichiers d'entrée, supporte les caractères génériques
- **target** : Nom de la table cible

### Ordre d'exécution de la fusion

Les numéros de règles déterminent l'ordre d'exécution des fusions, les numéros plus petits s'exécutent en premier. Recommandations :
- La fusion par lignes utilise la plage 10000-19999
- La fusion par colonnes utilise la plage 20000-29999
- D'autres règles personnalisées utilisent des numéros plus élevés

---

## Conseils d'optimisation des performances

### Optimisation du traitement des grandes tables

#### 1. Scinder raisonnablement les grandes tables

- Scinder les grandes tables par fonction ou module
- Utiliser les règles de fusion par lignes pour fusionner au moment de la construction
- Maintenir la maintenabilité en développement et les performances à l'exécution

#### 2. Utiliser le format binaire

- Le format binaire a la vitesse de chargement la plus rapide
- Le format binaire est recommandé pour les environnements de production
- XML/JSON peuvent être utilisés dans les environnements de développement pour le débogage

### Optimisation des mises à jour incrémentielles

#### 1. Mode surveillance

Utilisez le mode surveillance :

```bash
xcell.exe --watch
```

Caractéristiques du mode surveillance :
- Régénère uniquement les fichiers modifiés
- Améliore considérablement l'efficacité de développement
- Supporte la prévisualisation en temps réel

#### 2. Configuration de surveillance raisonnable

Configurez des motifs include/exclude raisonnables pour réduire le nombre de fichiers surveillés.

### Optimisation de la mémoire

#### 1. Charger uniquement les tables nécessaires

Selon les différentes API de moteur, chargez uniquement les tables nécessaires pour la scène ou la fonction actuelle, évitez de charger toutes les tables en même temps.

#### 2. Décharger en temps opportun

Lorsque certaines tables ne sont plus nécessaires, déchargez-les en temps opportun pour libérer la mémoire.

### Optimisation de la construction

#### 1. Traitement parallèle

XCell supporte le traitement parallèle de plusieurs fichiers, améliorant considérablement la vitesse de construction.

#### 2. Mécanisme de cache

Utilisez raisonnablement le cache pour éviter les traitements répétés.

---

## Intégration de moteurs

XCell supporte l'intégration avec plusieurs moteurs de jeu, consultez les documentations suivantes pour plus de détails :

- [Intégration Unity](./unity.md) - Détails sur l'intégration de XCell avec le moteur Unity
- [Intégration Cocos](./cocos.md) - Détails sur l'intégration de XCell avec le moteur Cocos

---

## Résumé

XCell fournit de riches fonctionnalités avancées, grâce à une configuration et une optimisation raisonnables, pouvant répondre aux besoins de divers projets complexes.

- Utilisez les options de configuration avancées pour personnaliser le comportement de XCell
- Utilisez les règles de fusion pour gérer les tables complexes
- Améliorez l'efficacité à l'exécution et lors de la construction grâce à l'optimisation des performances
- Améliorez l'efficacité de développement avec l'intégration de moteurs

Si vous avez des questions ou des suggestions, n'hésitez pas à soumettre une Issue ou une PR !
