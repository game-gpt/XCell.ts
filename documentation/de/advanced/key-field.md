# Feldbeschränkungen

Feldbeschränkungen sind Regeln zur Begrenzung von Feldwerten, die die Eindeutigkeit und Integrität von Daten sicherstellen.

## Eindeutigkeitsbeschränkung (unique)

Die Eindeutigkeitsbeschränkung stellt sicher, dass Feldwerte nicht dupliziert werden können.

### Markierungsmethode

| Kurzschreibweise | Meta-Attribut-Notation | Beschreibung |
| --------- | ----------------------- | ----------- |
| `@field_name` | `field_name @unique` | Eindeutiges Feld, Werte können nicht dupliziert werden |

### Beispiel

| @dict | Name | Email |
| ----- | ---- | ----- |
| user\_id | name | @email |
| string | string | string |
| user\_001 | John | <john@example.com> |
| user\_002 | Jane | <jane@example.com> |

- `@email` - E-Mail-Feldwerte können nicht dupliziert werden

## Primärschlüsselbeschränkung (primary)

Der Primärschlüssel ist das Feld, das jede Datenzeile in einer Tabelle eindeutig identifiziert.

### Standardregel

- **Erste Spalte wird automatisch als Primärschlüssel behandelt**, keine zusätzliche Markierung erforderlich

### Markierungsmethode

| Kurzschreibweise | Meta-Attribut-Notation | Beschreibung |
| --------- | ----------------------- | ----------- |
| `@@field_name` | `field_name @primary` | Primärschlüsselfeld, Werte sind eindeutig und dienen als Primärschlüssel |

### Beispiel

| @dict | Name |
| ----- | ---- |
| @@item\_id | name |
| string | string |
| sword\_001 | Eisenschwert |
| sword\_002 | Stahlschwert |

- `@@item_id` - Primärschlüsselfeld, Werte sind eindeutig

## Zusammengesetzte Beschränkung

Wenn mehrere Felder kombiniert eindeutig sein müssen, können Sie zusammengesetzte Beschränkungen verwenden. Fügen Sie `@unique(field1, field2)` nach der Typmarkierung hinzu:

| @dict @unique(class, level) | Klasse | Stufe |
| --------------------------- | ----- | ----- |
| id | class | level |
| string | string | i32 |
| warrior\_001 | warrior | 10 |
| warrior\_002 | warrior | 20 |
| mage\_001 | mage | 10 |

Im obigen Beispiel muss die Kombination `Klasse + Stufe` eindeutig sein, aber einzelne Klassen- oder Stufenwerte können dupliziert werden.

> ⚠️ **Warnung**: Wenn eine zusammengesetzte Eindeutigkeitsbeschränkung verwendet wird, muss `&T`, das auf diese Tabelle verweist, ebenfalls zusammengesetzte Schlüssel ausfüllen. Einige Spielengines unterstützen keine zusammengesetzten Schlüssel, bitte mit Vorsicht verwenden.

## Beschränkungsanforderungen

- Primärschlüsselwerte müssen eindeutig sein
- Primärschlüsselwerte dürfen nicht null sein
- Jede Tabelle kann nur einen Primärschlüssel haben
- Eindeutige Feldwerte dürfen nicht dupliziert werden
