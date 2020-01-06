# Typsystem

XCell unterstützt mehrere Datentypen. Standardtypen folgen Rust-Konventionen und sind gleichzeitig kompatibel mit C-Konventionen und C++-Konventionen. Typen sind case-insensitive.

## Grundtypen

### Ganzzahltypen

| Standardnotation | Unity-Konvention | Unreal-Konvention | Beschreibung | Bereich |
| ----------------- | ---------------- | ----------------- | ----------- | ----- |
| `i8` | `char` | `int8_t` | 8-Bit-Vorzeichen-Ganzzahl | -128 bis 127 |
| `u8` | `unsigned char` | `uint8_t` | 8-Bit-Vorzeichenlose-Ganzzahl | 0 bis 255 |
| `i16` | `short` | `int16_t` | 16-Bit-Vorzeichen-Ganzzahl | -32768 bis 32767 |
| `u16` | `unsigned short` | `uint16_t` | 16-Bit-Vorzeichenlose-Ganzzahl | 0 bis 65535 |
| `i32` | `int` | `int32_t` | 32-Bit-Vorzeichen-Ganzzahl | -2147483648 bis 2147483647 |
| `u32` | `unsigned int` | `uint32_t` | 32-Bit-Vorzeichenlose-Ganzzahl | 0 bis 4294967295 |
| `i64` | `long long` | `int64_t` | 64-Bit-Vorzeichen-Ganzzahl | -9223372036854775808 bis 9223372036854775807 |
| `u64` | `unsigned long long` | `uint64_t` | 64-Bit-Vorzeichenlose-Ganzzahl | 0 bis 18446744073709551615 |

<br />

### Gleitkommatypen

| Standardnotation | C-Konvention | C++-Konvention | Beschreibung | Präzision |
| ----------------- | ------------ | -------------- | ----------- | --------- |
| `f32` | `float` | `float` | 32-Bit-Gleitkomma | Einfach |
| `f64` | `double` | `double` | 64-Bit-Gleitkomma | Doppelt |

### Boolescher Typ

| Standardnotation | C-Konvention | C++-Konvention | Beschreibung | Werte |
| ----------------- | ------------ | -------------- | ----------- | ------ |
| `bool` | `bool` | `bool` | Boolescher Wert | `true` oder `false` |

### Zeichentypen

| Standardnotation | Beschreibung |
| ----------------- | ----------- |
| `utf8` | UTF-8-Zeichentyp |
| `utf16` | UTF-16-Zeichentyp |

### Zeichenkettentypen

| Standardnotation | Beschreibung |
| ----------------- | ----------- |
| `string` | Zeichenkettentyp |
| `str` | Zeichenkettentyp (äquivalent zu string) |

## Zusammengesetzte Typen

### Array- und Vektortypen

**Verschiedene Typkonventionen**:

| Standardnotation | C#-Konvention | Beschreibung |
| ----------------- | ------------- | ----------- |
| `[T]` | `T[]` | Dynamisches Array |
| `[T; N]` | `T[N]` | Statisches Array (feste Größe) |
| `Vec<T>` | `List<T>` | Vektor/Listen-Typ |
| `vec2<f32>` | `Vector2<float>` | 2D-Vektor |
| `vec3<f32>` | `Vector3<float>` | 3D-Vektor |
| `vec4<f32>` | `Vector4<float>` | 4D-Vektor |

**Beschreibung**:

- Dynamisches Array `[T]` und Vektor `Vec<T>` werden verwendet, um eine variable Anzahl von Elementen zu speichern
- Statisches Array `[T; N]` wird verwendet, um eine feste Anzahl von Elementen zu speichern, die Länge wird zur Definitionszeit bestimmt
- Spezielle Vektortypen (vec2/vec3/vec4) werden häufig in der Grafikprogrammierung verwendet, Unity und andere Engines haben spezifische Leistungsoptimierungen

**Beispiele**:

- `[i32; 5]` - Statisches Array mit 5 i32-Elementen
- `[string]` - Dynamisches Zeichenketten-Array
- `Vec<i32>` - Ganzzahl-Vektor
- `vec3<f32>` - 3D-Gleitkomma-Vektor

### Wörterbuchtyp

**Format**: `HashMap<K, V>` oder `dict<K, V>`

**Beispiele**:

- `HashMap<string, i32>` - Zeichenkette-zu-Ganzzahl-Abbildung
- `dict<i32, string>` - Ganzzahl-zu-Zeichenkette-Abbildung

### Tupeltyp

**Format**: `(T1, T2, ...)`

**Beispiele**:

- `(i32, string)` - Tupel mit Ganzzahl und Zeichenkette
- `(f32, f32, bool)` - Tupel mit zwei Gleitkommazahlen und einem Booleschen Wert

## Spezielle Typen

### Farbtyp

| Typ | Beschreibung | Format |
| ---- | ----------- | ------ |
| `color` | Farbtyp | Hexadezimaler Farbwert, wie `#FF0000` |
| `Color` | Farbtyp (äquivalent zu color) | Hexadezimaler Farbwert, wie `#FF0000` |

### Zeittypen

| Typ | Beschreibung | Format |
| ---- | ----------- | ------ |
| `datetime` | Datum-Zeit-Typ | ISO 8601-Format, wie `2023-12-25T10:30:00` |
| `time` | Zeittyp | Wie `10:30:00` |
| `date` | Datumstyp | Wie `2023-12-25` |

<br />

## Eindeutiger Typ und Primärschlüssel

**Eindeutiger Typ-Format**:

- `@T` - Gibt an, dass der Feldwert in der Tabelle eindeutig sein muss, d.h. keine zwei Zeilen in der Tabelle dürfen den gleichen Wert für dieses Feld haben
- `@@T` - Gibt an, dass der Feldwert in der Tabelle eindeutig sein muss und als Primärschlüssel dient

**Primärschlüsselbeschreibung**:

- Der Primärschlüssel ist das Feld, das jede Datenzeile in einer Tabelle eindeutig identifiziert
- Wenn in der Tabelle kein `@@T` verwendet wird, um den Primärschlüssel explizit zu markieren, wird die erste Spalte der Tabelle automatisch als Primärschlüssel behandelt
- Primärschlüsselwerte müssen eindeutig und nicht null sein, verwendet zur Herstellung von Zuordnungen zwischen Tabellen

**Beispiele**:

- `@@i32` - Ganzzahliger Primärschlüsselfeldtyp
- `@string` - Zeichenketten-Eindeutigkeitsfeld (kein Primärschlüssel)

## Benutzerdefinierte Typen

### Aufzählungstypen

Aufzählungstypen, die durch Enumerate-Tabellen definiert wurden, können in anderen Tabellen verwendet werden.

**Beispiel**:

- `QualityType` - Verweist auf den in der Enum-Tabelle definierten Qualitätstyp

### Strukturtypen

Strukturtypen, die durch Class-Tabellen definiert wurden, können in anderen Tabellen verwendet werden.

**Beispiel**:

- `Position` - Verweist auf die in der Class-Tabelle definierte Positionsstruktur

## Typkonvertierung

XCell unterstützt automatische Typkonvertierung, zum Beispiel:

- Ganzzahlen können automatisch in Gleitkommazahlen konvertiert werden
- Gleitkommazahlen können bei Bedarf in Ganzzahlen konvertiert werden (Dezimalteil wird abgeschnitten)
- Zahlen können in Zeichenketten konvertiert werden
- Zeichenketten können in geeigneten Fällen in Zahlen konvertiert werden

## Typvalidierung

XCell führt Typvalidierung beim Parsen von Tabellen durch und stellt sicher, dass Daten den angegebenen Typanforderungen entsprechen. Wenn Typen nicht übereinstimmen, werden zur Kompilierzeit Fehler generiert.
