# Godot-Integration

XCell bietet tiefe Integration mit der Godot-Engine und unterstützt GDScript-Codegenerierung, JSON-Datendateien und andere Formate.

## Konfigurationsoptionen

In der Datei `XCell.toml` befindet sich die Godot-Integrationskonfiguration im Abschnitt `[godot]`:

```toml
[godot]
enable = true
project = "../"
output = "scripts/DataTable/Generated"
namespace = "DataTable"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"

[godot.json]
enable = true
output = "res://tables/Generated"

[godot.binary]
enable = false
output = "res://tables/Binary"
```

## Generierte Codestruktur

### Tabellenklassenstruktur

Jede Konfigurationstabelle generiert entsprechende GDScript-Klassen, einschließlich:
- Tabellendatenklasse (Table)
- Elementdatenklasse (Element)
- Manager-Klasse (Manager)

### Beispiel für generierte Codestruktur:

```gdscript
# BuffTable.gd
class_name BuffTable

var data = {}

func get(id):
    return data.get(id)

func try_get(id):
    return data.get(id, null)

func load(data_array):
    for item in data_array:
        var element = BuffElement.new()
        element.id = item.id
        element.name = item.name
        element.value = item.value
        data[item.id] = element

# BuffElement.gd
class_name BuffElement

var id = 0
var name = ""
var value = 0
# ... other fields

# DataTableManager.gd
class_name DataTableManager

var buff_table = BuffTable.new()

func load_all():
    # Load all table data
    pass

func unload_all():
    # Unload all table data
    pass
```

## Datenladen

### JSON-Daten laden:

```gdscript
var manager = DataTableManager.new()
manager.load_all()

# Daten verwenden
var buff = manager.buff_table.get(1)
if buff:
    print(buff.name)
```

### Unterstützte Funktionen:
- Asynchrones Laden
- Inkrementelles Laden
- Speicherverwaltung
- Hot-Update-Unterstützung

## Typzuordnung

XCell-Typ zu GDScript-Typ-Zuordnung:

| XCell-Typ | GDScript-Typ |
| ---------- | ------------- |
| bool | bool |
| i8 | int |
| i16 | int |
| i32 | int |
| i64 | int |
| u8 | int |
| u16 | int |
| u32 | int |
| u64 | int |
| f32 | float |
| f64 | float |
| string | String |
| color | Color |
| vec2 | Vector2 |
| vec3 | Vector3 |
| vec4 | Vector4 |

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
   ```gdscript
   # Nur spezifische Tabellen laden
   manager.buff_table.load()
   manager.item_table.load()
   ```

2. **Rechtzeitig entladen**
   ```gdscript
   # Nicht benötigte Tabellen entladen
   manager.buff_table.unload()
   ```

## Häufige Probleme

### Kompilierungsfehler im generierten Code

- Prüfen Sie, ob der Godot-Projektpfad korrekt ist
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

## Beispielprojekt

XCell bietet ein Godot-Beispielprojekt, das die Verwendung von XCell in tatsächlichen Projekten demonstriert:

- Grundlegende Konfigurationstabellenverwendung
- Komplexe Datenstrukturen
- Mehrsprachige Unterstützung
- Hot-Update-Integration

Durch das Beispielprojekt können Sie schnell die Best Practices von XCell in Godot erlernen.
