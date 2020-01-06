# Cocos-Integration

> ✅ **Verfügbar**: Der Cocos-Codegenerator ist aktuell verfügbar und unterstützt TypeScript-Code- und JSON-Datendateigenerierung.

XCell bietet tiefe Integration mit der Cocos-Engine und unterstützt TypeScript-Codegenerierung, JSON-Datendateien und andere Formate.

## Konfigurationsoptionen

In der Datei `ProjectSettings.toml` befindet sich die Cocos-Integrationskonfiguration im Abschnitt `[cocos]`:

```toml
[cocos]
enable = true
project = "../"                    # Cocos-Projektverzeichnis
output = "assets/scripts/DataTable/Generated"  # TypeScript-Code-Ausgabeverzeichnis
manager_name = "DataTableManager"  # Manager-Klassenname
suffix_table = "Table"             # Tabellenklassen-Suffix
instance_name = "dataTable"        # Instanzname
table_data_path = "assets/tables"  # Tabellendaten-Pfadpräfix

# JSON-Speicherkonfiguration
[cocos.storage.Json]
enable = true
output = "assets/tables/Generated" # JSON-Daten-Ausgabeverzeichnis

# Entwicklungsumgebung-Speicherkonfiguration (optional)
[cocos.storage_debug.Json]
enable = true
output = "assets/tables/Debug"
```

## Generierte Codestruktur

### Tabellenklassenstruktur

Jede Konfigurationstabelle generiert entsprechende TypeScript-Klassen, einschließlich:
- Tabellendatenklasse (Table)
- Elementdatenklasse (Element)
- Manager-Klasse (Manager)

### Beispiel für generierte Codestruktur:

```typescript
namespace DataTable.Generated {
    export class BuffTable {
        private data: Map<number, BuffElement> = new Map();

        public get(id: number): BuffElement {
            return this.data.get(id);
        }

        public tryGet(id: number): BuffElement | undefined {
            return this.data.get(id);
        }

        public load(data: any[]): void {
            for (const item of data) {
                const element = new BuffElement();
                element.id = item.id;
                element.name = item.name;
                element.value = item.value;
                this.data.set(item.id, element);
            }
        }
    }

    export class BuffElement {
        public id: number = 0;
        public name: string = "";
        public value: number = 0;
        // ... other fields
    }

    export class DataTableManager {
        public buffTable: BuffTable = new BuffTable();

        public async loadAll(): Promise<void> {
            // Load all table data
        }

        public unloadAll(): void {
            // Unload all table data
        }
    }
}
```

## Datenladen

### JSON-Daten laden:

```typescript
import { DataTableManager } from "../scripts/DataTable/Generated/Manager";

const manager = new DataTableManager();
await manager.loadAll();

// Daten verwenden
const buff = manager.buffTable.get(1);
console.log(buff?.name);
```

### Unterstützte Funktionen:
- Asynchrones Laden
- Inkrementelles Laden
- Speicherverwaltung
- Hot-Update-Unterstützung

## Typzuordnung

XCell-Typ zu TypeScript-Typ-Zuordnung:

| XCell-Typ | TypeScript-Typ |
| ---------- | --------------- |
| bool | boolean |
| i8 | number |
| i16 | number |
| i32 | number |
| i64 | number |
| u8 | number |
| u16 | number |
| u32 | number |
| u64 | number |
| f32 | number |
| f64 | number |
| string | string |
| color | string (hexadezimal) |
| vec2 | { x: number, y: number } |
| vec3 | { x: number, y: number, z: number } |
| vec4 | { x: number, y: number, z: number, w: number } |

## Konfigurationsfeldbeschreibung

| Feld | Typ | Standardwert | Beschreibung |
| ----- | ---- | ------------- | ----------- |
| `enable` | `bool` | `false` | Ob Cocos-Codegenerierung aktiviert werden soll |
| `project` | `string` | `"../"` | Cocos-Projektverzeichnis |
| `output` | `string` | `""` | TypeScript-Code-Ausgabeverzeichnis |
| `manager_name` | `string` | `""` | Manager-Klassenname |
| `suffix_table` | `string` | `""` | Tabellenklassen-Suffix |
| `instance_name` | `string` | `""` | Instanzname |
| `table_data_path` | `string` | `""` | Tabellendaten-Pfadpräfix |
| `storage` | `CocosStorage` | `Json` | Speicherformatkonfiguration |
| `storage_debug` | `Option<CocosStorage>` | `None` | Entwicklungsumgebung-Speicherkonfiguration |

## Leistungsoptimierung

### Optimierung der Verarbeitung großer Tabellen

1. **Große Tabellen sinnvoll aufteilen**
   - Große Tabellen nach Funktion oder Modul aufteilen
   - Zeilen-Zusammenführungsregeln zur Zusammenführung zur Build-Zeit verwenden
   - Wartbarkeit während der Entwicklung und Leistung zur Laufzeit beibehalten

2. **Geeignetes Datenformat verwenden**
   - JSON-Format in Entwicklungsumgebung zum Debuggen verwenden
   - Binärformat in Produktionsumgebung für schnellere Ladegeschwindigkeit in Betracht ziehen

### Optimierung der inkrementellen Aktualisierung

1. **Überwachungsmodus**
   Verwenden Sie den Überwachungsmodus:
   ```bash
   xcell.exe --watch
   ```
   Funktionen des Überwachungsmodus:
   - Nur geänderte Dateien neu generieren
   - Entwicklereffizenz erheblich steigern
   - Echtzeitvorschau unterstützen

2. **Sinnvolle Überwachungskonfiguration**
   Konfigurieren Sie sinnvolle include/exclude-Muster, um die Anzahl der überwachten Dateien zu reduzieren.

### Speicheroptimierung

1. **Nur benötigte Tabellen laden**
   ```typescript
   // Nur spezifische Tabellen laden
   await manager.buffTable.load();
   await manager.itemTable.load();
   ```

2. **Rechtzeitig entladen**
   ```typescript
   // Nicht benötigte Tabellen entladen
   manager.buffTable.unload();
   ```

## Häufige Probleme

### Kompilierungsfehler im generierten Code

- Prüfen Sie, ob der Cocos-Projektpfad korrekt ist
- Prüfen Sie, ob der Namespace zur Projektstruktur passt
- Stellen Sie sicher, dass alle Abhängigkeiten korrekt installiert sind

### Datenlade-Fehler

- Prüfen Sie, ob JSON-Dateien generiert wurden
- Prüfen Sie, ob Dateipfade korrekt sind
- Stellen Sie sicher, dass die Tabellenstruktur mit den Datentypen übereinstimmt

## Best Practices

1. **Meta-Tabellenformat verwenden**: Für komplexe Konfigurationstabellen wird das Meta-Tabellenformat empfohlen, das reichhaltigere Metadatendefinitionen unterstützt
2. **Zusammenführungsregeln sinnvoll verwenden**: Für große Projekte Zusammenführungsregeln zur Verwaltung komplexer Tabellen verwenden
3. **Datenstrukturen optimieren**: Geeignete Datentypen und Strukturen basierend auf tatsächlichen Anwendungsfällen wählen
4. **Regelmäßige Bereinigung**: Regelmäßig nicht benötigte Konfigurationstabellen und Daten bereinigen, um das Projekt ordentlich zu halten
