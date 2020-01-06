# Konfigurationsdateien

XCell verwendet Konfigurationsdateien im TOML-Format zur Verwaltung von Projekteinstellungen. Die Konfigurationsdatei heißt `XCell.toml` und befindet sich im Projektstammverzeichnis.

## Grundkonfiguration

| Konfigurationselement | Typ | Beschreibung | Standardwert |
|--------------------|------|-------------|---------------|
| version | string | Versionsnummer der Konfigurationsdatei | "0.0.0" |
| include | string | Excel-Dateipfadmuster zum Einschließen (höchste Priorität) | "*.xlsx" |
| exclude | string | Excel-Dateipfadmuster zum Ausschließen (niedrigere Priorität als include) | "" |

### Zeilenkonfiguration (line)

Definiert die Zeilennummern, in denen sich verschiedene Informationen in der Tabelle befinden (beginnend bei 1).

| Konfigurationselement | Typ | Beschreibung | Standardwert |
|--------------------|------|-------------|---------------|
| line.field | int | Zeile, in der Feldnamen stehen | 1 |
| line.type | int | Zeile, in der Datentypen stehen | 2 |
| line.comment | int | Zeile, in der Kommentare stehen | 3 |
| line.data | int | Zeile, ab der Daten beginnen | 4 |

#### Migration von Legacy-Tabellen

XCells Standard-Tabellenformat ist:

| Zeilennummer | Inhalt |
|------------|---------|
| Zeile 1 | Feldkommentare |
| Zeile 2 | Feldnamen |
| Zeile 3 | Feldtypen |
| Zeile 4+ | Datenzeilen |

Wenn Ihr Legacy-Tabellenformat anders ist, können Sie es durch Zeilenabbildung anpassen. Wenn das Legacy-Tabellenformat beispielsweise ist:

| Zeilennummer | Inhalt |
|------------|---------|
| Zeile 1 | Feldnamen |
| Zeile 2 | Feldtypen |
| Zeile 3+ | Datenzeilen |

Konfigurieren Sie wie folgt:

```toml
line.field = 1
line.type = 2
line.comment = 0  # Keine Kommentarzeile
line.data = 3
```

> Hinweis: `line.comment = 0` gibt an, dass es keine Kommentarzeile gibt.

### Typ-Parsing-Konfiguration (type)

Konfigurieren Sie Parsing-Regeln für verschiedene Datentypen.

#### Boolescher Typ (bool)

| Konfigurationselement | Typ | Beschreibung |
|--------------------|------|-------------|
| type.bool.accept | array[string] | Liste der Werte, die als true akzeptiert werden |
| type.bool.reject | array[string] | Liste der Werte, die als false akzeptiert werden |

Beispiel:
```toml
[type.bool]
accept = ["true", "√", "是", "1"]
reject = ["false", "x", "否", "0"]
```

### Unity-Codegenerierungskonfiguration (unity)

Konfigurieren Sie Einstellungen für die C#-Codegenerierung.

| Konfigurationselement | Typ | Beschreibung | Standardwert |
|--------------------|------|-------------|---------------|
| unity.enable | bool | Ob Unity-Codegenerierung aktiviert werden soll | true |
| unity.project | string | Unity-Projektpfad | "../" |
| unity.output | string | Code-Ausgabeverzeichnis | "Assets/Scripts/DataTable/Generated" |
| unity.namespace | string | Namespace für generierten Code | "DataTable.Generated" |
| unity.manager | string | Manager-Klassenname | "DataTableManager" |
| unity.suffix_table | string | Tabellenklassen-Suffix | "Table" |
| unity.suffix_element | string | Elementklassen-Suffix | "Element" |
| unity.support_clone | bool | Ob Klonen unterstützt werden soll | true |
| unity.legacy_using | bool | Ob Legacy-using verwendet werden soll | false |
| unity.legacy_null_null | bool | Ob Legacy-Null-Behandlung verwendet werden soll | false |

### Datenausgabeformatkonfiguration

Konfigurieren Sie Datendateiausgabe in verschiedenen Formaten.

#### Binärformat

| Konfigurationselement | Typ | Beschreibung | Standardwert |
|--------------------|------|-------------|---------------|
| unity.binary.enable | bool | Ob Binärausgabe aktiviert werden soll | true |
| unity.binary.output | string | Binärdatei-Ausgabeverzeichnis | "Assets/Tables/Generated" |

#### XML-Format

| Konfigurationselement | Typ | Beschreibung | Standardwert |
|--------------------|------|-------------|---------------|
| unity.xml.enable | bool | Ob XML-Ausgabe aktiviert werden soll | false |
| unity.xml.output | string | XML-Datei-Ausgabeverzeichnis | "Assets/Tables/Readable" |

#### JSON-Format

| Konfigurationselement | Typ | Beschreibung | Standardwert |
|--------------------|------|-------------|---------------|
| unity.json.enable | bool | Ob JSON-Ausgabe aktiviert werden soll | false |
| unity.json.output | string | JSON-Datei-Ausgabeverzeichnis | "Assets/Tables/Readable" |

#### Andere Formate

- **xlua**: Lua-Codegenerierung
- **protobuf**: Protobuf-Formatausgabe

## Verwendungsanweisungen

1. Erstellen Sie eine `XCell.toml`-Datei im Projektstammverzeichnis
2. Ändern Sie Konfigurationselemente nach Bedarf
3. Das XCell-Tool lädt die Konfiguration automatisch beim Ausführen
4. Tabellenkonfiguration kann die globale Konfiguration überschreiben (gleichnamige `.toml`-Datei erstellen)
