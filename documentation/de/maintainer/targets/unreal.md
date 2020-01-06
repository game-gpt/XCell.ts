# Unreal-Engine-Integration

XCell bietet tiefe Integration mit der Unreal Engine und unterstützt C++-Codegenerierung, Binärdatendateien und andere Formate.

## Konfigurationsoptionen

In der Datei `XCell.toml` befindet sich die Unreal-Engine-Integrationskonfiguration im Abschnitt `[unreal]`:

```toml
[unreal]
enable = true
project = "../"
output = "Source/DataTable/Generated"
namespace = "DataTable::Generated"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"

[unreal.binary]
enable = true
output = "Content/Tables/Generated"

[unreal.json]
enable = false
output = "Content/Tables/Readable"
```

## Generierte Codestruktur

### Tabellenklassenstruktur

Jede Konfigurationstabelle generiert entsprechende C++-Klassen, einschließlich:
- Tabellendatenklasse (Table)
- Elementdatenklasse (Element)
- Manager-Klasse (Manager)

### Beispiel für generierte Codestruktur:

```cpp
namespace DataTable::Generated {
    class BuffTable {
    public:
        const BuffElement* Get(int32 Id) const;
        bool TryGet(int32 Id, const BuffElement*& OutElement) const;

    private:
        TMap<int32, BuffElement> Data;
    };

    class BuffElement {
    public:
        int32 Id = 0;
        FString Name = "";
        int32 Value = 0;
        // ... other fields
    };

    class DataTableManager {
    public:
        BuffTable BuffTable;
        void LoadAll();
        void UnloadAll();
    };
}
```

## Datenladen

### Binärdaten laden:

```cpp
auto Manager = MakeShared<DataTableManager>();
Manager->LoadAll();
```

### Unterstützte Funktionen:
- Asynchrones Laden
- Inkrementelles Laden
- Speicherverwaltung
- Hot-Update-Unterstützung

## Typzuordnung

XCell-Typ zu C++-Typ-Zuordnung:

| XCell-Typ | C++-Typ |
| ---------- | -------- |
| bool | bool |
| i8 | int8 |
| i16 | int16 |
| i32 | int32 |
| i64 | int64 |
| u8 | uint8 |
| u16 | uint16 |
| u32 | uint32 |
| u64 | uint64 |
| f32 | float |
| f64 | double |
| string | FString |
| color | FColor |
| vec2 | FVector2D |
| vec3 | FVector |
| vec4 | FVector4 |
| quaternion | FQuat |

## Leistungsoptimierung

### Optimierung der Verarbeitung großer Tabellen

1. **Große Tabellen sinnvoll aufteilen**
   - Große Tabellen nach Funktion oder Modul aufteilen
   - Zeilen-Zusammenführungsregeln zur Zusammenführung zur Build-Zeit verwenden
   - Wartbarkeit während der Entwicklung und Leistung zur Laufzeit beibehalten

2. **Binärformat verwenden**
   - Binärformat hat die schnellste Ladegeschwindigkeit
   - Binärformat wird für Produktionsumgebungen empfohlen
   - JSON kann in Entwicklungsumgebungen zum Debuggen verwendet werden

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
   ```cpp
   // Nur spezifische Tabellen laden
   Manager->BuffTable.Load();
   Manager->ItemTable.Load();
   ```

2. **Rechtzeitig entladen**
   ```cpp
   // Nicht benötigte Tabellen entladen
   Manager->BuffTable.Unload();
   ```

## Häufige Probleme

### Kompilierungsfehler im generierten Code

- Prüfen Sie, ob der Unreal-Engine-Projektpfad korrekt ist
- Prüfen Sie, ob der Namespace zur Projektstruktur passt
- Stellen Sie sicher, dass alle Abhängigkeiten korrekt installiert sind

### Datenlade-Fehler

- Prüfen Sie, ob Binärdateien generiert wurden
- Prüfen Sie, ob Dateipfade korrekt sind
- Stellen Sie sicher, dass die Tabellenstruktur mit den Datentypen übereinstimmt

## Best Practices

1. **Meta-Tabellenformat verwenden**: Für komplexe Konfigurationstabellen wird das Meta-Tabellenformat empfohlen, das reichhaltigere Metadatendefinitionen unterstützt
2. **Zusammenführungsregeln sinnvoll verwenden**: Für große Projekte Zusammenführungsregeln zur Verwaltung komplexer Tabellen verwenden
3. **Datenstrukturen optimieren**: Geeignete Datentypen und Strukturen basierend auf tatsächlichen Anwendungsfällen wählen
4. **Regelmäßige Bereinigung**: Regelmäßig nicht benötigte Konfigurationstabellen und Daten bereinigen, um das Projekt ordentlich zu halten

## Beispielprojekt

XCell bietet ein Unreal-Engine-Beispielprojekt, das die Verwendung von XCell in tatsächlichen Projekten demonstriert:

- Grundlegende Konfigurationstabellenverwendung
- Komplexe Datenstrukturen
- Mehrsprachige Unterstützung
- Hot-Update-Integration

Durch das Beispielprojekt können Sie schnell die Best Practices von XCell in der Unreal Engine erlernen.
