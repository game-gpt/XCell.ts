
# Schnellstart

Dieses Tutorial führt Sie durch die Verwendung des XCell-Konfigurationstabellen-Verwaltungstools von Grund auf.

## Umgebungseinrichtung

### Systemanforderungen

- Windows-Betriebssystem
- Rust-Entwicklungsumgebung (bei Kompilierung aus dem Quellcode)

### Installationsmethoden

#### Methode 1: Vorkompilierte Version verwenden

1. Laden Sie die neueste `xcell.exe` von der Projekt-Release-Seite herunter
2. Platzieren Sie `xcell.exe` in Ihrem Projektverzeichnis

#### Methode 2: Aus dem Quellcode kompilieren

1. Stellen Sie sicher, dass die Rust-Entwicklungsumgebung installiert ist
2. Klonen oder laden Sie den Projektquellcode herunter
3. Führen Sie den folgenden Befehl im Projektstammverzeichnis aus:

```bash
cargo build --release
```

4. Nach der Kompilierung befindet sich die ausführbare Datei unter `target/release/xcell.exe`

## Projektinitialisierung

### Projektstruktur erstellen

Erstellen Sie die folgende Struktur in Ihrem Arbeitsverzeichnis:

```
MyProject/
├── xcell.exe
├── ProjectConfig.toml
└── Tables/
    └── Hero.xlsx
```

### Konfigurationsdatei erstellen

Erstellen Sie eine `ProjectConfig.toml`-Datei im Projektstammverzeichnis:

```toml
version = "0.1.0"

exclude = ""
include = "*.xlsx"

line.field = 1
line.type = 2
line.comment = 3
line.data = 4

[type.bool]
accept = ["true", "√"]
reject = ["false", "x"]

[type.string]

[unity]
enable = true
project = "./"
output = "Assets/Scripts/DataTable/Generated"
namespace = "DataTable.Generated"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"
support_clone = true
legacy_using = false
legacy_null_null = false

[unity.binary]
enable = true
output = "Assets/Tables/Generated"

[unity.xlua]
enable = false

[unity.xml]
enable = false
output = "Assets/Tables/Readable"

[unity.json]
enable = false
output = "Assets/Tables/Readable"

[unity.protobuf]
enable = false
```

## Ihre erste Konfigurationstabelle erstellen

### Excel-Tabellenstruktur

XCell verwendet eine bestimmte Excel-Tabellenstruktur, wobei die ersten 3 Zeilen als Kopfzeilen dienen und die Daten ab Zeile 4 beginnen:

| Zeilennummer | Zweck | Beschreibung |
|------------|---------|-------------|
| 1 | Feldname | Feldnamen für die Konfigurationstabelle |
| 2 | Datentyp | Datentypen für die Felder |
| 3 | Kommentar | Beschreibungstext für die Felder |
| 4+ | Datenzeilen | Tatsächliche Konfigurationsdaten |

### Beispieltabelle

Erstellen Sie eine `Tables/Hero.xlsx`-Tabelle:

| id | name | hp | attack | is_boss |
|----|------|----|--------|---------|
| int | string | int | int | bool |
| Helden-ID | Heldenname | Gesundheitspunkte | Angriffskraft | Ist Boss |
| 1 | Knight | 1000 | 100 | false |
| 2 | Mage | 800 | 150 | false |
| 3 | Dragon | 5000 | 500 | true |

## XCell ausführen

### Grundbefehl

Öffnen Sie eine Befehlszeile im Projektstammverzeichnis und führen Sie aus:

```bash
xcell.exe
```

XCell wird automatisch:
1. Alle Excel-Tabellen im aktuellen Verzeichnis scannen
2. Tabellendaten validieren
3. Entsprechenden C#-Code und binäre Datendateien generieren

### Befehlszeilenoptionen

```bash
xcell.exe [OPTIONS] [COMMAND]
```

#### Befehle

- `check`: Konfigurationstabellen überprüfen, ohne Dateien zu exportieren
- `clear`: Datenbank und Cache leeren

#### Optionen

- `--workspace <WORKSPACE>`: Arbeitsverzeichnis manuell festlegen, standardmäßig das aktuelle Verzeichnis
- `-w, --watch`: Überwachungsmodus aktivieren, nur entsprechende Dateien bei Änderungen aktualisieren
- `--disable-xml`: XML-Generierung erzwingt deaktivieren
- `--disable-json`: JSON-Generierung erzwingt deaktivieren
- `-h, --help`: Hilfe anzeigen
- `-V, --version`: Version anzeigen

### Verwendungsbeispiele

#### Konfigurationstabellen überprüfen

```bash
xcell.exe check
```

#### Überwachungsmodus aktivieren

```bash
xcell.exe --watch
```

#### Cache leeren

```bash
xcell.exe clear
```

## Generierte Ergebnisse anzeigen

Nach erfolgreicher Ausführung sehen Sie die folgenden generierten Dateien:

```
MyProject/
├── Assets/
│   ├── Scripts/DataTable/Generated/
│   │   ├── HeroTable.cs
│   │   └── DataTableManager.cs
│   └── Tables/Generated/
│       └── HeroTable.bytes
```

### Beispiel für generierten C#-Code

`HeroTable.cs` enthält Inhalte wie:

```csharp
namespace DataTable.Generated
{
    public partial class HeroTable
    {
        public readonly Dictionary<int, HeroElement> dict = new();

        public HeroElement GetElement(int id)
        {
            return dict.TryGetValue(id, out var item) ? item : null;
        }
    }

    public partial class HeroElement
    {
        public int id;
        public string name;
        public int hp;
        public int attack;
        public bool is_boss;
    }
}
```

## Nächste Schritte

- Sehen Sie sich den [Anwendungsfälle-Index](use-cases/index.md) für spezifischere Anwendungen an
- Unity-Benutzer können die [Unity-Integration](use-cases/unity-integration.md)-Dokumentation konsultieren
