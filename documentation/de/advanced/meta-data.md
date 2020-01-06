# Meta-Attribute

Meta-Attribute werden verwendet, um Feldern zusätzliche Konfigurationsinformationen hinzuzufügen, wie z.B. Validierungsregeln, Standardwerte usw.

## Grundformat

Meta-Attribute beginnen mit `@` und können an drei Positionen geschrieben werden:

| Position | Beispiel |
| -------- | ------- |
| Nach dem Feldnamen | `id @primary` |
| Nach dem Typ | `i32 @min(1)` |
| Excel-Kommentar | `@default(100)` |

> **Empfehlung**: Meta-Attribute können in beliebiger Anzahl vorhanden sein, es wird empfohlen, sie einheitlich in Excel-Zellenkommentaren zu schreiben, um die Verwaltung und Wartung zu erleichtern.

## Häufige Meta-Attribute

### Feld-Meta-Attribute

| Meta-Attribut | Beschreibung | Beispiel |
| -------------- | ----------- | ------- |
| `@primary` | Primärschlüssel | `id @primary` |
| `@default(value)` | Standardwert | `level @default(1)` |
| `@virtual` | Virtuelles Feld | `user @virtual` |

### Typ-Meta-Attribute

| Meta-Attribut | Beschreibung | Beispiel |
| -------------- | ----------- | ------- |
| `@min(value)` | Mindestwert | `i32 @min(0)` |
| `@max(value)` | Höchstwert | `i32 @max(100)` |
| `@range(min, max)` | Bereich | `i32 @range(1, 100)` |

### Kommentar-Meta-Attribute

Meta-Attribute können in Excel-Zellenkommentaren geschrieben werden:

```
@default(100)
@min(1)
@max(9999)
```

## Virtuelle Felder

Virtuelle Felder sind spezielle Felder, die keine tatsächlichen Daten speichern, sondern Werte durch Referenzierung von Daten aus anderen Tabellen erhalten.

### Beispiel

| @dict | Name | Qualitäts-ID | Qualität |
| ----- | ---- | ---------- | ------- |
| item_id | name | quality_id | quality @virtual |
| string | string | &Quality | Quality |
| sword_001 | Eisenschwert | common | |
| sword_002 | Stahlschwert | rare | |

- `quality_id` ist das tatsächlich gespeicherte Feld, Typ ist `&Quality`
- `quality` ist ein virtuelles Feld, markiert mit `@virtual`, Typ ist der Zieltabellenname `Quality`

## Berechnete Eigenschaften

Berechnete Eigenschaften sind Felder, die durch Ausdrucksberechnung abgeleitet werden, ohne tatsächliche Daten zu speichern.

### Beispiel

| @dict | Basisangriff | Verstärkungsstufe | Gesamter Angriff |
| ----- | ----------- | ------------- | ------------ |
| item_id | base_atk | enhance | total_atk @computed |
| string | i32 | i32 | i32 |
| sword_001 | 100 | 5 | base_atk * (1 + enhance * 0.1) |

- `total_atk` ist eine berechnete Eigenschaft, markiert mit `@computed`
- Ausdrücke können auf andere Felder in derselben Tabelle verweisen

## Beispiele

### Feld mit Validierung

| @dict | Stufe | Gold |
| ----- | ----- | ---- |
| user_id | level | gold |
| string | i32 @range(1, 100) | i32 @min(0) |
| user_001 | 10 | 1000 |
| user_002 | 50 | 5000 |

### Feld mit Standardwert

| @dict | Name | Qualität |
| ----- | ---- | ------- |
| item_id | name | quality |
| string | string | string @default(common) |
| sword_001 | Eisenschwert | |
| sword_002 | Stahlschwert | rare |

## Meta-Attribute und Codegenerierung

Meta-Attribute beeinflussen den generierten Code:

### Validierungsattribute

```
level i32 @range(1, 100)
```

Generierter C#-Code:

```csharp
[Range(1, 100)]
public int Level { get; set; }
```

### Standardwert

```
quality string @default(common)
```

Generierter C#-Code:

```csharp
public string Quality { get; set; } = "common";
```

## Hinweise

- Meta-Attribute beginnen mit `@`
- Können in Feldname, Typ oder Excel-Kommentar geschrieben werden
- Mehrere Meta-Attribute können kombiniert werden
- Einige Meta-Attribute beeinflussen Codegenerierung und Datenvalidierung
