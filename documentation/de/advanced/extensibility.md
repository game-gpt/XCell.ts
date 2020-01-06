# Erweiterbarkeitsdokumentation

Dieses Dokument führt in die Erweiterung der Funktionen des XCell-Konfigurationstabellen-Verwaltungstools ein, einschließlich benutzerdefinierter Typsysteme, Erweiterung von Codegeneratoren und Plugin-Entwicklung.

## Inhaltsverzeichnis

1. [Benutzerdefiniertes Typsystem](#benutzerdefiniertes-typsystem)
2. [Erweiterung von Codegeneratoren](#erweiterung-von-codegeneratoren)
3. [Plugin-Entwicklungsleitfaden](#plugin-entwicklungsleitfaden)

***

## Benutzerdefiniertes Typsystem

XCell bietet ein flexibles Typsystem, das mehrere integrierte Datentypen unterstützt und Entwicklern erlaubt, neue Datentypen anzupassen.

### Übersicht der integrierten Typen

XCell unterstützt die folgenden integrierten Typen:

| Typkategorie | Unterstützte Typen                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Boolesch       | `bool`, `boolean`                                                                                                          |
| Ganzzahl       | `byte`/`i8`, `short`/`i16`, `int`/`i32`, `long`/`i64`, `sbyte`/`u8`, `ushort`/`u16`, `uint`/`u32`, `ulong`/`u64`          |
| Dezimal       | `float`/`f32`, `double`/`f64`, `decimal`/`d128`/`f128`                                                                     |
| Zeichenkette        | `string`                                                                                                                   |
| Spezielle Typen | `color`/`colour`, `color32`, `time`/`date`/`datetime`                                                                      |
| Vektor/Array  | `v2`/`vec2`, `v3`/`vec3`, `v4`/`vec4`, `q4`/`quaternion`                                                                   |
| Aufzählung          | Benutzerdefinierte Aufzählungstypen                                                                                                          |

### Typsystem-Architektur

Der Kern von XCells Typsystem befindet sich im `xcell-types`-Modul und enthält hauptsächlich die folgenden Komponenten:

- `XCellTyped`: Typ-Enumeration, definiert alle unterstützten Datentypen
- `TypeMetaInfo`: Typ-Metadaten, enthält Typkonfigurationsinformationen
- `XCellValue`: Typ-Wert, speichert geparste Daten
- Verschiedene Typdeskriptoren: wie `IntegerDescription`, `DecimalDescription` usw.

### Schritte zur Implementierung benutzerdefinierter Typen

Um einen benutzerdefinierten Typ hinzuzufügen, folgen Sie diesen Schritten:

#### 1. Typbeschreibungsmodul erstellen

Erstellen Sie ein neues Typmodul im Verzeichnis `projects/xcell-types/src/`, beispielsweise `my_type/mod.rs`:

```rust
use serde::{Deserialize, Serialize};
use xcell_errors::XResult;
use crate::value::XCellValue;

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct MyTypeDescription {
    pub default: Option<String>,
}

impl MyTypeDescription {
    pub fn parse_cell(&self, cell: &str) -> XResult<XCellValue> {
        todo!("Implement cell parsing logic")
    }
}
```

#### 2. XCellTyped-Enumeration erweitern

Erweitern Sie die `XCellTyped`-Enumeration in `projects/xcell-types/src/typing/mod.rs`:

```rust
pub enum XCellTyped {
    // ... existing types ...
    MyType(Box<MyTypeDescription>),
}
```

#### 3. Typ-Parsing implementieren

Fügen Sie Typ-Parsing-Logik in `projects/xcell-types/src/typing/parser.rs` hinzu:

```rust
impl XCellTyped {
    pub fn parse(input: &str, info: &TypeMetaInfo) -> Self {
        let normed = Self::norm_typing(input);
        match normed.as_str() {
            // ... existing types ...
            "mytype" | "my_type" => info.my_type.clone().into(),
            _ => XCellTyped::parse_complex(input, &normed, info),
        }
    }
}
```

#### 4. TypeMetaInfo aktualisieren

Aktualisieren Sie die `TypeMetaInfo`-Struktur in `projects/xcell-types/src/typing/mod.rs`:

```rust
#[derive(Debug, Clone, Default, Serialize)]
pub struct TypeMetaInfo {
    // ... existing fields ...
    pub my_type: MyTypeDescription,
}
```

#### 5. Codegenerierungsunterstützung hinzufügen

Fügen Sie Codegenerierungslogik für den neuen Typ in `projects/xcell-types/src/codegen/` hinzu, um sicherzustellen, dass korrekte Typdefinitionen für Zielsprachen (wie C#) generiert werden können.

***

## Erweiterung von Codegeneratoren

XCell unterstützt mehrere Codegenerierungsziele, einschließlich Unity C#, Binärdateien, XML, JSON usw. Sie können diese Generatoren erweitern oder neue erstellen.

### Codegenerierungs-Architektur

Die Codegenerierung wird hauptsächlich im Modul `xcell-core/src/codegen/` implementiert:

- `binary/`: Binärformat-Generierung
- `readable/`: Lesbares Format-Generierung (XML, JSON)
- `unity/`: Unity C#-Codegenerierung

### Erweiterung des Unity-Codegenerators

Der Unity-Codegenerator ist einer der am häufigsten verwendeten Generatoren. Hier sind die Schritte zur Erweiterung:

#### 1. Vorhandene Vorlagen anzeigen

Die Unity-Codegenerierung verwendet Vorlagendateien im Verzeichnis `projects/xcell-core/templates/`:

- `BuildClass.cs`: Klassentabellenvorlage
- `BuildDictionary.cs`: Wörterbuchtabellenvorlage
- `BuildEnumerate.cs`: Aufzählungstabellenvorlage
- `BuildLanguage.cs`: Sprachtabellenvorlage
- `BuildManager.cs`: Managervorlage

#### 2. Vorlagen ändern oder erstellen

Ändern Sie vorhandene Vorlagen oder erstellen Sie neue Vorlagendateien nach Bedarf.

#### 3. UnityCodegen-Konfiguration aktualisieren

Aktualisieren Sie die Konfiguration in `projects/xcell-core/src/config/unity/mod.rs`:

```rust
#[derive(Debug, Clone)]
pub struct UnityCodegen {
    // ... existing fields ...
    pub my_custom_option: bool,
}
```

#### 4. Generierungslogik implementieren

Implementieren Sie spezifische Generierungslogik in `projects/xcell-core/src/codegen/unity/`.

### Erstellung neuer Codegeneratoren

Um einen völlig neuen Codegenerator zu erstellen, folgen Sie diesen Schritten:

#### 1. Generatormodul erstellen

Erstellen Sie ein neues Modul im Verzeichnis `projects/xcell-core/src/codegen/`, beispielsweise `cocos/mod.rs`:

```rust
use xcell_errors::XResult;
use crate::config::ProjectConfig;

pub struct CocosCodegen {
    // Konfigurationsfelder
}

impl CocosCodegen {
    pub fn write(&self, config: &ProjectConfig) -> XResult<()> {
        todo!("Implement Cocos code generation logic")
    }
}
```

#### 2. In Konfigurationssystem integrieren

Fügen Sie Konfigurationsoptionen für den neuen Generator in `ProjectConfig` hinzu.

#### 3. In Workflow einbinden

Rufen Sie den neuen Generator in `WorkspaceManager::write_unity()` oder ähnlichen Methoden auf.

***

## Plugin-Entwicklungsleitfaden

XCell unterstützt die Erweiterung von Funktionen durch ein Plugin-System. Plugins können neue Tabellentypen, benutzerdefinierte Validierungslogik oder erweiterte Codegenerierungsfähigkeiten hinzufügen.

### Plugin-Architektur

Das Plugin-System basiert auf Rusts Trait-System, mit Hauptschnittstellen einschließlich:

- Tabellenprozessor-Trait
- Validator-Trait
- Codegenerator-Trait

### Plugin-Entwicklungsschritte

#### 1. Plugin-Projekt erstellen

Erstellen Sie ein neues Rust-Projekt und fügen Sie Abhängigkeiten zu `xcell-core` und `xcell-types` hinzu:

```toml
[package]
name = "xcell-my-plugin"
version = "0.1.0"
edition = "2024"

[dependencies]
xcell-core = { path = "../xcell-core" }
xcell-types = { path = "../xcell-types" }
```

#### 2. Plugin-Trait implementieren

Implementieren Sie entsprechende Traits nach Bedarf. Beispiel: Implementieren Sie einen benutzerdefinierten Tabellenprozessor:

```rust
use xcell_core::x_table::table::CalamideTable;
use xcell_errors::XResult;

pub struct MyCustomTable;

impl MyCustomTable {
    pub fn confirm(table: &CalamideTable) -> XResult<Self> {
        todo!("Check if table matches custom format")
    }

    pub fn perform(&self, workspace: &mut WorkspaceManager) -> XResult<()> {
        todo!("Execute table processing logic")
    }
}
```

#### 3. Plugin registrieren

Registrieren Sie Ihr Plugin in der `WorkspaceManager::try_perform_file()`-Methode, damit es erkannt und verarbeitet werden kann.

### Best Practices für Plugins

1. **Plugins unabhängig halten**: Plugins sollten so unabhängig wie möglich sein, Abhängigkeiten von XCell-internen Implementierungen reduzieren
2. **Konfigurationsoptionen bereitstellen**: Plugin-Konfiguration über `XCell.toml` bereitstellen
3. **Fehlerbehandlung**: Fehler ordnungsgemäß behandeln, klare Fehlermeldungen bereitstellen
4. **Dokumentation**: Vollständige Verwendungsdokumentation für Plugins bereitstellen
5. **Tests**: Ausreichende Testfälle schreiben

***

## Zusammenfassung

XCell bietet leistungsstarke Erweiterbarkeit, die es Entwicklern ermöglicht, Funktionen nach ihren Bedürfnissen anzupassen. Ob das Hinzufügen neuer Datentypen, die Erweiterung von Codegeneratoren oder die Entwicklung unabhängiger Plugins – XCells modulare Architektur kann diese Anforderungen gut unterstützen.

Wenn Sie bei der Erweiterung auf Probleme stoßen, konsultieren Sie bitte den Projektquellcode oder reichen Sie ein Issue ein, um Hilfe zu erhalten.
