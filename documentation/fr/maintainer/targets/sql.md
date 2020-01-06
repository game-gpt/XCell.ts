# Intégration SQL

> ⚠️ **En développement** : Le générateur de code SQL est actuellement en développement et les fonctionnalités peuvent être incomplètes.

XCell supporte l'exportation de tables de configuration au format SQL pour l'initialisation de base de données et la migration de données.

## Statut actuel

Le générateur de code SQL (`sql`) est actuellement en développement, supportant les fonctionnalités de génération SQL de base.

## Mappage de types

| Type XCell | Type SQL | Description |
|-----------|---------|------|
| `bool` | `BOOLEAN` | Valeur booléenne |
| `i8` | `TINYINT` | Entier signé 8 bits |
| `i16` | `SMALLINT` | Entier signé 16 bits |
| `i32` | `INT` | Entier signé 32 bits |
| `i64` | `BIGINT` | Entier signé 64 bits |
| `u8` | `TINYINT UNSIGNED` | Entier non signé 8 bits |
| `u16` | `SMALLINT UNSIGNED` | Entier non signé 16 bits |
| `u32` | `INT UNSIGNED` | Entier non signé 32 bits |
| `u64` | `BIGINT UNSIGNED` | Entier non signé 64 bits |
| `f32` | `FLOAT` | Virgule flottante 32 bits |
| `f64` | `DOUBLE` | Virgule flottante 64 bits |
| `string` | `VARCHAR(n)` | Chaîne de longueur variable |
| `text` | `TEXT` | Texte long |
| `array<T>` | `JSON` | Tableau JSON |
| `map<K, V>` | `JSON` | Objet JSON |
| `enum` | `VARCHAR(64)` | Nom d'énumération |

## Bases de données supportées

| Base de données | Statut | Description |
|--------|------|------|
| MySQL | ✅ Supporté | Supporte MySQL 5.7+ |
| PostgreSQL | ⚠️ En développement | Support prévu |
| SQLite | ⚠️ En développement | Support prévu |
| SQL Server | Prévu | Support futur |

## Options de configuration

Dans le fichier `ProjectSettings.toml`, la configuration d'intégration SQL se trouve dans la section `[sql]` :

```toml
[sql]
enable = true
output = "output/sql"             # Répertoire de sortie des fichiers SQL
database = "mysql"                # Type de base de données
schema_name = "game_data"         # Nom de la base de données
create_table = true               # Générer ou non les instructions CREATE TABLE
insert_data = true                # Générer ou non les instructions INSERT
drop_table = false                # Générer ou non les instructions DROP TABLE
```

## Format de sortie

### Instructions de création de table

```sql
-- Table des objets
CREATE TABLE IF NOT EXISTS `item` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `damage` INT DEFAULT 0,
  `price` INT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### Instructions d'insertion

```sql
-- Données des objets
INSERT INTO `item` (`id`, `name`, `damage`, `price`, `is_active`) VALUES
  (1, 'Sword', 100, 500, TRUE),
  (2, 'Shield', 0, 300, TRUE),
  (3, 'Potion', 0, 50, TRUE);
```

### Exemple complet

```sql
-- ============================================
-- SQL généré par XCell
-- Base de données : game_data
-- Généré le : 2024-01-01 00:00:00
-- ============================================

-- Table des joueurs
CREATE TABLE IF NOT EXISTS `player` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `level` INT DEFAULT 1,
  `gold` BIGINT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Données des joueurs
INSERT INTO `player` (`id`, `name`, `level`, `gold`, `is_active`) VALUES
  (1, 'Alice', 10, 1000, TRUE),
  (2, 'Bob', 5, 500, TRUE);

-- Table des objets
CREATE TABLE IF NOT EXISTS `item` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `damage` INT DEFAULT 0,
  `price` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Données des objets
INSERT INTO `item` (`id`, `name`, `damage`, `price`) VALUES
  (1, 'Sword', 100, 500),
  (2, 'Shield', 0, 300);
```

## Cas d'utilisation

### Initialisation de base de données

Utilisez les fichiers SQL générés pour l'initialisation de la base de données :

```bash
mysql -u root -p game_data < output/sql/init.sql
```

### Migration de données

Utilisez les fichiers SQL pour la migration de données :

```bash
# Exporter les données
mysqldump -u root -p game_data > backup.sql

# Importer les données
mysql -u root -p game_data < output/sql/init.sql
```

### Contrôle de version

Inclure les fichiers SQL dans le contrôle de version pour suivre l'historique des changements de données.

## Remarques

### Longueur des chaînes

Le type `VARCHAR` en SQL nécessite de spécifier une longueur. XCell déduira automatiquement une longueur appropriée en fonction des données, ou vous pouvez spécifier une longueur par défaut dans la configuration.

### Contraintes de clé primaire

XCell identifie automatiquement les champs de clé primaire et ajoute les contraintes `PRIMARY KEY`.

### Index

La version actuelle ne génère pas automatiquement d'index. Si des index sont nécessaires, veuillez les ajouter manuellement ou utiliser des outils de gestion de base de données.

### Transactions

Pour les insertions de données volumineuses, il est recommandé d'utiliser des transactions :

```sql
START TRANSACTION;
INSERT INTO `item` (`id`, `name`) VALUES (1, 'Sword');
INSERT INTO `item` (`id`, `name`) VALUES (2, 'Shield');
COMMIT;
```

## Bonnes pratiques

1. **Sauvegarder les données** : S'assurer que les données existantes sont sauvegardées avant d'exécuter les fichiers SQL
2. **Environnement de test** : Valider les fichiers SQL dans un environnement de test d'abord
3. **Contrôle de version** : Inclure les fichiers SQL dans le contrôle de version
4. **Mises à jour incrémentielles** : Pour les environnements de production, les mises à jour incrémentielles sont recommandées plutôt que les remplacements complets

## Plans futurs

- Support de PostgreSQL et SQLite
- Support de la génération d'instructions de mise à jour incrémentielle
- Support de la génération automatique d'index
- Support des contraintes de clé étrangère
- Support de la génération de procédures stockées
