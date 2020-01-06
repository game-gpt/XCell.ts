# SQL Integration

> ⚠️ **In Development**: The SQL code generator is currently in development and functionality may be incomplete.

XCell supports exporting configuration tables to SQL format for database initialization and data migration.

## Current Status

The SQL code generator (`sql`) is currently in development, supporting basic SQL generation functionality.

## Type Mapping

| XCell Type | SQL Type | Description |
|-----------|---------|------|
| `bool` | `BOOLEAN` | Boolean value |
| `i8` | `TINYINT` | 8-bit signed integer |
| `i16` | `SMALLINT` | 16-bit signed integer |
| `i32` | `INT` | 32-bit signed integer |
| `i64` | `BIGINT` | 64-bit signed integer |
| `u8` | `TINYINT UNSIGNED` | 8-bit unsigned integer |
| `u16` | `SMALLINT UNSIGNED` | 16-bit unsigned integer |
| `u32` | `INT UNSIGNED` | 32-bit unsigned integer |
| `u64` | `BIGINT UNSIGNED` | 64-bit unsigned integer |
| `f32` | `FLOAT` | 32-bit floating-point |
| `f64` | `DOUBLE` | 64-bit floating-point |
| `string` | `VARCHAR(n)` | Variable-length string |
| `text` | `TEXT` | Long text |
| `array<T>` | `JSON` | JSON array |
| `map<K, V>` | `JSON` | JSON object |
| `enum` | `VARCHAR(64)` | Enum name |

## Supported Databases

| Database | Status | Description |
|--------|------|------|
| MySQL | ✅ Supported | Supports MySQL 5.7+ |
| PostgreSQL | ⚠️ In Development | Planned support |
| SQLite | ⚠️ In Development | Planned support |
| SQL Server | Planned | Future support |

## Configuration Options

In the `ProjectSettings.toml` file, SQL integration configuration is located in the `[sql]` section:

```toml
[sql]
enable = true
output = "output/sql"             # SQL file output directory
database = "mysql"                # Database type
schema_name = "game_data"         # Database name
create_table = true               # Whether to generate CREATE TABLE statements
insert_data = true                # Whether to generate INSERT statements
drop_table = false                # Whether to generate DROP TABLE statements
```

## Output Format

### Table Creation Statements

```sql
-- Item table
CREATE TABLE IF NOT EXISTS `item` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `damage` INT DEFAULT 0,
  `price` INT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### Insert Statements

```sql
-- Item data
INSERT INTO `item` (`id`, `name`, `damage`, `price`, `is_active`) VALUES
  (1, 'Sword', 100, 500, TRUE),
  (2, 'Shield', 0, 300, TRUE),
  (3, 'Potion', 0, 50, TRUE);
```

### Complete Example

```sql
-- ============================================
-- XCell Generated SQL
-- Database: game_data
-- Generated at: 2024-01-01 00:00:00
-- ============================================

-- Player table
CREATE TABLE IF NOT EXISTS `player` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `level` INT DEFAULT 1,
  `gold` BIGINT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Player data
INSERT INTO `player` (`id`, `name`, `level`, `gold`, `is_active`) VALUES
  (1, 'Alice', 10, 1000, TRUE),
  (2, 'Bob', 5, 500, TRUE);

-- Item table
CREATE TABLE IF NOT EXISTS `item` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `damage` INT DEFAULT 0,
  `price` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Item data
INSERT INTO `item` (`id`, `name`, `damage`, `price`) VALUES
  (1, 'Sword', 100, 500),
  (2, 'Shield', 0, 300);
```

## Use Cases

### Database Initialization

Use generated SQL files for database initialization:

```bash
mysql -u root -p game_data < output/sql/init.sql
```

### Data Migration

Use SQL files for data migration:

```bash
# Export data
mysqldump -u root -p game_data > backup.sql

# Import data
mysql -u root -p game_data < output/sql/init.sql
```

### Version Control

Include SQL files in version control to track data change history.

## Notes

### String Length

The `VARCHAR` type in SQL requires specifying a length. XCell will automatically infer an appropriate length based on data, or you can specify a default length in configuration.

### Primary Key Constraints

XCell automatically identifies primary key fields and adds `PRIMARY KEY` constraints.

### Indexes

The current version does not automatically generate indexes. If indexes are needed, please add them manually or use database management tools.

### Transactions

For large data insertions, it is recommended to wrap with transactions:

```sql
START TRANSACTION;
INSERT INTO `item` (`id`, `name`) VALUES (1, 'Sword');
INSERT INTO `item` (`id`, `name`) VALUES (2, 'Shield');
COMMIT;
```

## Best Practices

1. **Backup Data**: Ensure existing data is backed up before executing SQL files
2. **Test Environment**: Validate SQL files in a test environment first
3. **Version Control**: Include SQL files in version control
4. **Incremental Updates**: For production environments, incremental updates are recommended over full overwrites

## Future Plans

- Support for PostgreSQL and SQLite
- Support for incremental update statement generation
- Support for automatic index generation
- Support for foreign key constraints
- Support for stored procedure generation
