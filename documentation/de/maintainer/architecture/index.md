# XCell-Architekturdesign-Dokument

## 1. Projektgesamtarchitektur-Überblick

XCell ist ein in Rust geschriebenes Konfigurationstabellen-Verwaltungstool, das modulares Design mit klaren Modulverantwortlichkeiten und geringer Kopplung verwendet. Das Projekt ist in die folgenden Hauptteile unterteilt:

- **Backend-Module**: Im Verzeichnis `backends/` enthalten, mit Kerngeschäftslogik
  - `xcell` - Befehlszeilenwerkzeug und Haupteinstiegspunkt
  - `xcell-analyzer` - Arbeitsbereichverwaltung und Tabellenanalyse
  - `xcell-generator` - Codegenerator
  - `xcell-provider` - Tabellenlese-Abstraktion
  - `xcell-core` - Typsystem und Kernfunktionalität
  - `xcell-config` - Konfigurationsverwaltung
  - `xcell-macros` - Makrodefinitionen
  - `xcell-parser` - Typ-Parser
  - `xcell-plugin` - Plugin-System
  - `xcell-wasi` - WebAssembly-Unterstützung

- **Frontend-Module**: Im Verzeichnis `frontends/` enthalten, mit Benutzeroberflächen
  - `homepage` - Projekt-Website
  - `xcell` - Frontend-SDK
  - `xcell-desktop` - Desktop-Anwendung
  - `xcell-h5` - Web-Anwendung

- **Dokumentation**: Im Verzeichnis `documentation/` enthalten, mit Projektdokumentation

- **Beispiele**: Im Verzeichnis `examples/` enthalten, mit Verwendungsbeispielen

### Technologie-Stack

- **Backend**: Rust
- **Frontend**: Vue.js, TypeScript, Tauri
- **Tabellenlesen**: calamine (Excel), csv (CSV/TSV)
- **Template-Engine**: dejavu
- **Asynchrones Laufzeit**: tokio
- **Fehlerbehandlung**: anyhow
- **Protokollierung**: tracing

## 2. Modulaufteilung und Verantwortlichkeitsbeschreibung

### 2.1 xcell - Befehlszeilenwerkzeug

**Verantwortlichkeiten**:
- Befehlszeilenschnittstelle bereitstellen
- Befehlszeilenargumente parsen
- Den gesamten Workflow koordinieren
- Andere Backend-Module aufrufen, um Aufgaben auszuführen

**Kerndateien**:
- `backends/xcell/src/main.rs` - Programmeinstiegspunkt
- `backends/xcell/src/workspace.rs` - Arbeitsbereichverwaltung
- `backends/xcell/src/commands/toml.rs` - TOML-Konfigurationsverarbeitung

**Hauptfunktionen**:
- Code und Datendateien generieren
- Konfiguration überprüfen
- Ausgabe bereinigen
- Dateiüberwachungsmodus

### 2.2 xcell-analyzer - Arbeitsbereichverwaltung und Tabellenanalyse

**Verantwortlichkeiten**:
- Arbeitsbereich und Konfiguration verwalten
- Tabellendateien scannen und identifizieren
- Tabellendaten parsen
- Tabellentypen identifizieren
- Tabellendaten verarbeiten
- Aufzählungsdefinitionen verknüpfen

**Kerndateien**:
- `backends/xcell-analyzer/src/lib.rs` - Modul-Export
- `backends/xcell-analyzer/src/config/mod.rs` - Arbeitsbereich-Manager
- `backends/xcell-analyzer/src/x_table/mod.rs` - Tabellendatenstrukturen

**Kernkomponenten**:
- `WorkspaceManager` - Arbeitsbereich-Manager, verantwortlich für die Koordinierung des gesamten Workflows
- `XClassTable` - Class-Tabellentyp
- `XDictTable` - Wörterbuch-Tabellentyp
- `XEnumerateTable` - Enum-Tabellentyp
- `XLanguageTable` - Language-Tabellentyp
- `DefineManager` - Aufzählungsdefinitions-Manager
- `LanguageManager` - Language-Tabellen-Manager

### 2.3 xcell-generator - Codegenerator

**Verantwortlichkeiten**:
- Code und Datendateien in verschiedenen Formaten generieren
- Mehrere Zielplattformen unterstützen
- Steckbare Codegenerierungsarchitektur bereitstellen

**Kerndateien**:
- `backends/xcell-generator/src/lib.rs` - Modul-Export
- `backends/xcell-generator/src/codegen/mod.rs` - Codegenerator-Schnittstelle
- `backends/xcell-generator/src/config.rs` - Generatorkonfiguration

**Unterstützte Codegeneratoren**:
- `json` - JSON-Datengenerierung ✅
- `binary` - Binärdatengenerierung ✅
- `cocos` - Cocos-Plattform-Codegenerierung ✅
- `typescript` - TypeScript-Codegenerierung ✅
- `dejavu` - Template-Engine-Codegenerierung ✅
- `unity` - Unity-Plattform-Codegenerierung ⚠️ (aktuell deaktiviert)
- `xlua` - XLua-Skript-Codegenerierung
- `sql` - SQL-Datenbank-Codegenerierung
- `xml` - XML-Datengenerierung

### 2.4 xcell-provider - Tabellenlese-Abstraktion

**Verantwortlichkeiten**:
- Einheitliche Tabellenlese-Schnittstelle bereitstellen
- Mehrere Tabellenformate unterstützen (Excel, CSV, TSV)
- Unterschiede zwischen Tabellenformaten abstrahieren
- Tabellenkopf-Parsing bereitstellen

**Kerndateien**:
- `backends/xcell-provider/src/lib.rs` - Modul-Export
- `backends/xcell-provider/src/table/mod.rs` - Tabellenlese-Schnittstelle
- `backends/xcell-provider/src/standard/mod.rs` - Standard-Stream-Implementierung

**Kernkomponenten**:
- `TableReader` - Tabellenleser-Trait
- `ExcelTable` - Excel-Tabellenlese-Implementierung
- `CsvTable` - CSV-Tabellenlese-Implementierung
- `TsvTable` - TSV-Tabellenlese-Implementierung
- `FileFormatDetector` - Dateiformat-Detektor
- `load_table` - Einheitliche Tabellenlade-Funktion

### 2.5 xcell-core - Typsystem und Kernfunktionalität

**Verantwortlichkeiten**:
- Alle Datentypen definieren
- Typkonvertierung und Parsing bereitstellen
- Typzuordnung für verschiedene Plattformen unterstützen
- Wertverarbeitung und Konvertierung bereitstellen
- Byte-Reihenfolge-Lese-/Schreibschnittstellen bereitstellen

**Kerndateien**:
- `backends/xcell-core/src/lib.rs` - Modul-Export
- `backends/xcell-core/src/typing/mod.rs` - Typdefinitionen
- `backends/xcell-core/src/value/mod.rs` - Wertverarbeitung

**Unterstützte Typen**:
- Ganzzahltypen (Integer)
- Dezimaltypen (Decimal)
- Boolesche Typen (Boolean)
- Zeichenkettentypen (String)
- Array-Typen (Array)
- Vektortypen (Vector)
- Sprachtypen (Language)
- Aufzählungstypen (Enumerate)
- Farbtypen (Color)
- Zeittypen (Time)

### 2.6 xcell-config - Konfigurationsverwaltung

**Verantwortlichkeiten**:
- Projektkonfigurationsstruktur definieren
- Konfigurations-Parsing und Validierung bereitstellen
- Konfigurationsoptionen für verschiedene Plattformen unterstützen

**Kerndateien**:
- `backends/xcell-config/src/lib.rs` - Modul-Export
- `backends/xcell-config/src/project/mod.rs` - Projektkonfiguration
- `backends/xcell-config/src/cocos/mod.rs` - Cocos-Plattformkonfiguration
- `backends/xcell-config/src/unity/mod.rs` - Unity-Plattformkonfiguration

**Kernkomponenten**:
- `ProjectConfig` - Projektkonfiguration
- `CocosCodegen` - Cocos-Codegenerierungskonfiguration
- `UnityCodegen` - Unity-Codegenerierungskonfiguration
- `MergeRules` - Tabellen-Zusammenführungsregeln

### 2.7 xcell-parser - Typ-Parser

**Verantwortlichkeiten**:
- Typausdrücke parsen
- Felddefinitionen parsen
- Metadaten parsen

**Kerndateien**:
- `backends/xcell-parser/src/lib.rs` - Modul-Export
- `backends/xcell-parser/src/lexer.rs` - Lexer
- `backends/xcell-parser/src/parser.rs` - Parser
- `backends/xcell-parser/src/ast.rs` - Abstrakter Syntaxbaum

## 3. Datenflussbeschreibung

### 3.1 Gesamtprozess

Der vollständige Prozess vom Tabellendateilesen bis zum Codeexport:

```
Tabellendatei (Excel/CSV/TSV) → Lesen/Parser → Tabellenerkennung → Datenverarbeitung → Codegenerierung → Ausgabedateien
```

### 3.2 Detaillierte Schritte

#### Schritt 1: Arbeitsbereich initialisieren

1. Befehlszeilenargumente oder Konfigurationsdatei parsen
2. `WorkspaceManager`-Instanz erstellen
3. Projektkonfiguration laden (`ProjectConfig`)

#### Schritt 2: Dateien scannen

1. Arbeitsverzeichnis scannen
2. `WalkDir` verwenden, um Verzeichnis zu durchlaufen
3. Dateien basierend auf konfiguriertem `include`-Muster filtern

#### Schritt 3: Tabellendateien lesen

1. `load_table()`-Funktion verwenden, um Tabellendateien zu lesen (Format automatisch erkennen)
2. Tabellenkopf parsen (`XCellHeader`)
3. Alle Datenzeilen lesen

#### Schritt 4: Tabellentyp identifizieren

Versuchen Sie, die folgenden Tabellentypen in dieser Reihenfolge zu identifizieren:

1. `XListTable` - List-Tabelle
2. `XDictTable` - Wörterbuch-Tabelle
3. `XEnumerateTable` - Enum-Tabelle
4. `XClassTable` - Class-Tabelle
5. `XLanguageTable` - Language-Tabelle
6. `XLanguageID` - Language-ID-Tabelle

#### Schritt 5: Tabellendaten verarbeiten

Entsprechende Operationen basierend auf dem Tabellentyp ausführen:

- Für Enum-Tabellen: Zum `DefineManager` hinzufügen
- Für Language-Tabellen: Zum `LanguageManager` hinzufügen
- Für andere Tabellen: Datenvalidierung und Speicherung durchführen

#### Schritt 6: Aufzählungen verknüpfen

`link_enumerate()`-Methode aufrufen, um Aufzählungsdefinitionen mit entsprechenden Datenfeldern zu verknüpfen

#### Schritt 7: Codegenerierung

1. `Generator`-Instanz erstellen
2. Aktivierte Codegeneratoren konfigurieren
3. Alle aktivierten Ausgaben durchlaufen
4. Entsprechenden Codegenerator für jede Ausgabe aufrufen
5. Code und Datendateien im entsprechenden Format generieren

#### Schritt 8: Dateiüberwachung (Optional)

Wenn Dateiüberwachung aktiviert ist:
1. Dateiüberwachung starten
2. Auf Dateiänderungen hören
3. Geänderte Dateien automatisch neu verarbeiten

## 4. Kerncode-Referenz

### Arbeitsbereichverwaltung
- `WorkspaceManager` - `backends/xcell-analyzer/src/config/mod.rs`
- `WorkspaceManager::new()` - Arbeitsbereich-Manager erstellen
- `WorkspaceManager::classes()` - Class-Tabellendaten abrufen
- `WorkspaceManager::lists()` - List-Tabellendaten abrufen
- `WorkspaceManager::dicts()` - Dict-Tabellendaten abrufen
- `WorkspaceManager::enumerates()` - Enum-Tabellendaten abrufen

### Tabellenlesen
- `load_table()` - `backends/xcell-provider/src/table/mod.rs` - Einheitliche Tabellenlade-Funktion
- `TableReader` - `backends/xcell-provider/src/table/mod.rs` - Tabellenleser-Trait
- `XCellHeader` - `backends/xcell-provider/src/table/mod.rs` - Tabellenkopf

### Tabellentypen
- `XClassTable` - `backends/xcell-analyzer/src/x_table/class/mod.rs` - Class-Tabellentyp
- `XDictTable` - `backends/xcell-analyzer/src/x_table/dictionary/mod.rs` - Wörterbuch-Tabellentyp
- `XEnumerateTable` - `backends/xcell-analyzer/src/x_table/enumerate/mod.rs` - Enum-Tabellentyp
- `XLanguageTable` - `backends/xcell-analyzer/src/x_table/language/mod.rs` - Language-Tabellentyp

### Codegenerierung
- `Generator` - `backends/xcell-generator/src/lib.rs` - Generator-Haupteinstieg
- `Codegen` - `backends/xcell-generator/src/codegen/mod.rs` - Codegenerator-Trait
- `CocosCodegen` - `backends/xcell-generator/src/codegen/cocos/mod.rs` - Cocos-Codegenerierung
- `UnityCodegen` - `backends/xcell-generator/src/codegen/unity/mod.rs` - Unity-Codegenerierung (aktuell deaktiviert)
- `JsonCodegen` - `backends/xcell-generator/src/codegen/json/mod.rs` - JSON-Datengenerierung

### Typsystem
- `TypeDescription` - `backends/xcell-core/src/typing/mod.rs` - Typbeschreibung
- `XCellValue` - `backends/xcell-core/src/value/mod.rs` - Zellenwert
- `CSharpReader`/`CSharpWriter` - `backends/xcell-core/src/codegen/csharp_ffi/mod.rs` - C#-Typzuordnung

### Konfigurationsverwaltung
- `ProjectConfig` - `backends/xcell-config/src/project/mod.rs` - Projektkonfiguration
- `CocosCodegen` - `backends/xcell-config/src/cocos/mod.rs` - Cocos-Codegenerierungskonfiguration
- `UnityCodegen` - `backends/xcell-config/src/unity/mod.rs` - Unity-Codegenerierungskonfiguration

## 5. Abstraktionsisolations-Design

### 5.1 Kernabstraktionsschichten

XCell verwendet mehrschichtiges Abstraktionsdesign, das klare Modulverantwortlichkeiten und Vermeidung von Abstraktionslecks sicherstellt:

1. **Tabellenlese-Schicht** (`xcell-provider`):
   - Bietet einheitliches `TableReader`-Trait
   - Abstrahiert Unterschiede zwischen Tabellenformaten (Excel, CSV, TSV)
   - Obere Module müssen sich nicht um spezifische Tabellenformate kümmern

2. **Tabellenanalyse-Schicht** (`xcell-analyzer`):
   - Liest Tabellendaten basierend auf `TableReader`
   - Identifiziert Tabellentypen und führt entsprechende Verarbeitung durch
   - Bietet `WorkspaceManager` zur einheitlichen Verwaltung aller Tabellendaten

3. **Codegenerierungs-Schicht** (`xcell-generator`):
   - Holt Tabellendaten basierend auf `WorkspaceManager`
   - Interagiert nicht direkt mit Tabellendateien
   - Unterstützt mehrere Codegeneratoren durch `Codegen`-Trait

4. **Typsystem-Schicht** (`xcell-core`):
   - Definiert einheitliche Datentypen
   - Bietet Typkonvertierung und Parsing
   - Unterstützt Multi-Plattform-Typzuordnung

### 5.2 Abstraktionsisolations-Prinzipien

- **Einzelverantwortung**: Jedes Modul ist nur für eine spezifische Funktion verantwortlich
- **Umkehrung der Abhängigkeit**: Hochrangige Module hängen von Abstraktionen ab, nicht von konkreten Implementierungen
- **Schnittstellenisolierung**: Verwenden Sie Traits, um minimierte Schnittstellen zu definieren
- **Liskov-Substitution**: Implementierungen können durch ihre Subtypen ersetzt werden
- **Offen/Geschlossen-Prinzip**: Offen für Erweiterung, geschlossen für Modifikation

## 6. Erweiterungsentwicklungsleitfaden

### Neues Tabellenformat hinzufügen

1. Neue Tabellenlese-Implementierung unter `backends/xcell-provider/src/table/` erstellen
2. `TableReader`-Trait implementieren
3. Formaterkennungslogik in `FileFormatDetector` hinzufügen
4. Unterstützung für neues Format in `load_table`-Funktion hinzufügen

### Neuen Datentyp hinzufügen

1. Neues Modul unter `backends/xcell-core/src/` erstellen
2. Typ-Parsing- und Konvertierungslogik implementieren
3. In `backends/xcell-core/src/lib.rs` exportieren
4. Entsprechende Plattform-Typzuordnungsunterstützung hinzufügen

### Neuen Codegenerator hinzufügen

1. Neues Modul unter `backends/xcell-generator/src/codegen/` erstellen
2. `Codegen`-Trait implementieren
3. Neuen Generator in `Generator::new()` registrieren
4. Entsprechende Konfigurationsoptionen hinzufügen

### Neue Plattformunterstützung hinzufügen

1. Neues Plattformkonfigurationsmodul unter `backends/xcell-config/src/` erstellen
2. Neuen Plattform-Codegenerator unter `backends/xcell-generator/src/codegen/` erstellen
3. Plattformspezifische Codegenerierungslogik implementieren
4. Dokumentation und Beispiele aktualisieren
