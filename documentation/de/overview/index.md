# XCell-Funktionen

## Tabellentypen

| Typ | Beschreibung |
| ---- | ----------- |
| Dict-Tabelle | Zeichenkette als Primärschlüssel, häufigstes Konfigurationsformat |
| List-Tabelle | Ganzzahl als Primärschlüssel, sequenzieller Zugriff |
| Enum-Tabelle | Aufzählungstyp mit zusätzlichen Daten |
| Class-Tabelle | Globale Konfigurationsklasse, Singleton-Muster |
| Language-Tabelle | Mehrsprachige Unterstützung |

## Codegenerierungsziele

| Ziel | Sprache/Format | Status |
| ------ | --------------- | ------ |
| Unity | C# | ✅ Implementiert |
| Cocos | TypeScript + JSON | ✅ Implementiert |
| JSON | JSON-Daten | ✅ Implementiert |
| Binary | Binärdaten | ✅ Implementiert |
| Dejavu | Template-Engine | ✅ Implementiert |

## Typsystem

### Grundtypen

| Typ | Beschreibung |
| ---- | ----------- |
| `bool` | Boolescher Wert |
| `i8`, `i16`, `i32`, `i64` | Vorzeichenbehaftete Ganzzahlen |
| `u8`, `u16`, `u32`, `u64` | Vorzeichenlose Ganzzahlen |
| `f32`, `f64` | Gleitkommazahlen |
| `string` | Zeichenkette |

### Zusammengesetzte Typen

| Typ | Beschreibung |
| ---- | ----------- |
| `[T]` | Dynamisches Array |
| `[T; N]` | Statisches Array |
| `Vec<T>` | Vektor/Liste |
| `vec2`, `vec3`, `vec4` | Vektortypen |
| `HashMap<K, V>` | Wörterbuchtyp |

### Spezielle Typen

| Typ | Beschreibung |
| ---- | ----------- |
| `color` | Farbtyp |
| `datetime`, `time`, `date` | Zeittypen |
| `&T` | Referenztyp |

## Tabellen-Zusammenführungsfunktion

- **Namenskonvention**: Unterstrich-Benennung wird automatisch zusammengeführt, z.B. `Item_Weapon` + `Item_Armor` → `Item`
- **Zusammenführungsregeln**: Gleiche Struktur wird automatisch zusammengeführt, doppelte IDs verursachen Fehler
- **Reservierter Tabellenname**: `Language` ist ein reservierter Tabellenname

## Konfigurationssystem

- **Projektkonfiguration**: `XCell.toml` im Projektstammverzeichnis
- **Tabellenkonfiguration**: Gleichnamige `.toml`-Datei
- **Zeilenabbildung**: Unterstützt Migration von Legacy-Tabellen

## Architektur

```
xcell-provider (Tabellen Lesen/Schreiben)
    ↓
xcell-analyzer (Tabellenanalyse)
    ↓
xcell-generator (Codegenerierung)
    ↓
xcell (CLI-Werkzeug)
```

## Kernmodule

| Modul | Funktion |
| ------ | -------- |
| xcell-types | Typsystemdefinitionen |
| xcell-provider | Tabellen-Lese-/Schreibschnittstellen |
| xcell-parser | Syntaxparser |
| xcell-analyzer | Tabellenanalysator |
| xcell-config | Konfigurationsverwaltung |
| xcell-generator | Codegenerator |
| xcell-plugin | Plugin-System |
| xcell | Befehlszeilenwerkzeug |
