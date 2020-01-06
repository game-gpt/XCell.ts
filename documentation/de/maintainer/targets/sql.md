# SQL-Integration

> ⚠️ **In Entwicklung**: Der SQL-Codegenerator ist aktuell in Entwicklung und die Funktionalität kann unvollständig sein.

XCell unterstützt den Export von Konfigurationstabellen in SQL-Format für Datenbankinitialisierung und Datenmigration.

## Aktueller Status

Der SQL-Codegenerator (`sql`) ist aktuell in Entwicklung und unterstützt grundlegende SQL-Generierungsfunktionalität.

## Typzuordnung

| XCell-Typ | SQL-Typ | Beschreibung |
|-----------|---------|------|
| `bool` | `BOOLEAN` | Boolescher Wert |
| `i8` | `TINYINT` | 8-Bit-Vorzeichen-Ganzzahl |
| `i16` | `SMALLINT` | 16-Bit-Vorzeichen-Ganzzahl |
| `i32` | `INT` | 32-Bit-Vorzeichen-Ganzzahl |
| `i64` | `BIGINT` | 64-Bit-Vorzeichen-Ganzzahl |
| `u8` | `TINYINT UNSIGNED` | 8-Bit-Vorzeichenlose-Ganzzahl |
| `u16` | `SMALLINT UNSIGNED` | 16-Bit-Vorzeichenlose-Ganzzahl |
| `u32` | `INT UNSIGNED` | 32-Bit-Vorzeichenlose-Ganzzahl |
| `u64` | `BIGINT UNSIGNED` | 64-Bit-Vorzeichenlose-Ganzzahl |
| `f32` | `FLOAT` | 32-Bit-Gleitkomma |
| `f64` | `DOUBLE` | 64-Bit-Gleitkomma |
| `string` | `VARCHAR(n)` | Variable-length-Zeichenkette |
| `text` | `TEXT` | Langtext |
| `array<T>` | `JSON` | JSON-Array |
| `map<K, V>` | `JSON` | JSON-Objekt |
| `enum` | `VARCHAR(64)` | Aufzählungsname |

## Unterstützte Datenbanken

| Datenbank | Status | Beschreibung |
|--------|------|------|
| MySQL | ✅ Unterstützt | Unterstützt MySQL 5.7+ |
| PostgreSQL | ⚠️ In Entwicklung | Geplante Unterstützung |
| SQLite | ⚠️ In Entwicklung | Geplante Unterstützung |
| SQL Server | Geplant | Zukünftige Unterstützung |

## Konfigurationsoptionen

In der Datei `ProjectSettings.toml` befindet sich die SQL-Integrationskonfiguration im Abschnitt `[sql]`:

```toml
[sql]
enable = true
output = "output/sql"             # SQL-Datei-Ausgabeverzeichnis
database = "mysql"                # Datenbanktyp
schema_name = "game_data"         # Datenbankname
create_table = true               # Ob CREATE TABLE-Anweisungen generiert werden sollen
insert_data = true                # Ob INSERT-Anweisungen generiert werden sollen
drop_table = false                # Ob DROP TABLE-Anweisungen generiert werden sollen
```

## Ausgabeformat

### Tabellenerstellungsanweisungen

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

### Insert-Anweisungen

```sql
-- Item data
INSERT INTO `item` (`id`, `name`, `damage`, `price`, `is_active`) VALUES
  (1, 'Sword', 100, 500, TRUE),
  (2, 'Shield', 0, 300, TRUE),
  (3, 'Potion', 0, 50, TRUE);
```

### Vollständiges Beispiel

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

## Anwendungsfälle

### Datenbankinitialisierung

Verwenden Sie generierte SQL-Dateien für die Datenbankinitialisierung:

```bash
mysql -u root -p game_data < output/sql/init.sql
```

### Datenmigration

Verwenden Sie SQL-Dateien für die Datenmigration:

```bash
# Daten exportieren
mysqldump -u root -p game_data > backup.sql

# Daten importieren
mysql -u root -p game_data < output/sql/init.sql
```

### Versionskontrolle

SQL-Dateien in die Versionskontrolle einbeziehen, um den Änderungsverlauf der Daten zu verfolgen.

## Hinweise

### Zeichenkettenlänge

Der `VARCHAR`-Typ in SQL erfordert die Angabe einer Länge. XCell wird automatisch eine geeignete Länge basierend auf den Daten ableiten, oder Sie können eine Standardlänge in der Konfiguration angeben.

### Primärschlüsselbeschränkungen

XCell identifiziert automatisch Primärschlüsselfelder und fügt `PRIMARY KEY`-Beschränkungen hinzu.

### Indizes

Die aktuelle Version generiert keine automatischen Indizes. Wenn Indizes benötigt werden, fügen Sie diese manuell hinzu oder verwenden Sie Datenbankverwaltungstools.

### Transaktionen

Für große Dateneinfügungen wird empfohlen, Transaktionen zu verwenden:

```sql
START TRANSACTION;
INSERT INTO `item` (`id`, `name`) VALUES (1, 'Sword');
INSERT INTO `item` (`id`, `name`) VALUES (2, 'Shield');
COMMIT;
```

## Best Practices

1. **Daten sichern**: Stellen Sie sicher, dass vorhandene Daten vor der Ausführung von SQL-Dateien gesichert sind
2. **Testumgebung**: Validieren Sie SQL-Dateien zuerst in einer Testumgebung
3. **Versionskontrolle**: SQL-Dateien in die Versionskontrolle einbeziehen
4. **Inkrementelle Aktualisierungen**: Für Produktionsumgebungen werden inkrementelle Aktualisierungen gegenüber vollständigen Überschreibungen empfohlen

## Zukunftspläne

- Unterstützung für PostgreSQL und SQLite
- Unterstützung für inkrementelle Aktualisierungsanweisungsgenerierung
- Unterstützung für automatische Indexgenerierung
- Unterstützung für Fremdschlüsselbeschränkungen
- Unterstützung für gespeicherte Prozedurgenerierung
