# Unity-Integration

> ⚠️ **Hinweis**: Der Unity-Codegenerator ist aktuell deaktiviert und unter Refaktorierung. Die folgende Dokumentation dient nur als Referenz, die Funktionalität ist möglicherweise nicht verfügbar.

XCell bietet tiefe Integration mit der Unity-Engine und unterstützt C#-Codegenerierung, Binärdatendateien und andere Formate.

## Aktueller Status

Der Unity-Codegenerator (`unity`) ist aus folgenden Gründen aktuell deaktiviert:

1. Architektur-Refaktorierung in Arbeit
2. Typzuordnungssystem muss aktualisiert werden
3. Codegenerierungsvorlagen müssen optimiert werden

### Alternative Lösungen

Bevor der Unity-Codegenerator wieder aktiviert wird, können Sie die folgenden Alternativen in Betracht ziehen:

1. **JSON-Datenformat verwenden**: Daten über den [JSON](json.md)-Generator exportieren, in Unity mit `JsonUtility` oder `Newtonsoft.Json` parsen
2. **TypeScript-Generator verwenden**: Typdefinitionen über [TypeScript](typescript.md) generieren, C#-Klassen manuell schreiben
3. **Dejavu-Template verwenden**: Codegenerierung über [Dejavu-Template-Engine](../architecture/index.md#code-generation) anpassen

## Konfigurationsoptionen (Referenz)

In der Datei `ProjectSettings.toml` befindet sich die Unity-Integrationskonfiguration im Abschnitt `[unity]`:

```toml
[unity]
enable = false  # Aktuell deaktiviert
project = "../"
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
```

## Erwartete generierte Codestruktur

### Tabellenklassenstruktur

Jede Konfigurationstabelle generiert entsprechende C#-Klassen, einschließlich:
- Tabellendatenklasse (Table)
- Elementdatenklasse (Element)
- Manager-Klasse (Manager)

### Beispiel für generierte Codestruktur:

```csharp
namespace DataTable.Generated
{
    public class BuffTable
    {
        public Dictionary<int, BuffElement> Data { get; }
        public BuffElement Get(int id);
        public bool TryGet(int id, out BuffElement element);
    }

    public class BuffElement
    {
        public int Id { get; }
        public string Name { get; }
        public int Value { get; }
        // ... other fields
    }

    public class DataTableManager
    {
        public BuffTable BuffTable { get; }
        public void LoadAll();
        public void UnloadAll();
    }
}
```

## Typzuordnung

XCell-Typ zu C#-Typ-Zuordnung:

| XCell-Typ | C#-Typ |
| ---------- | ------- |
| bool | bool |
| i8 | sbyte |
| i16 | short |
| i32 | int |
| i64 | long |
| u8 | byte |
| u16 | ushort |
| u32 | uint |
| u64 | ulong |
| f32 | float |
| f64 | double |
| string | string |
| color | UnityEngine.Color |
| vec2 | UnityEngine.Vector2 |
| vec3 | UnityEngine.Vector3 |
| vec4 | UnityEngine.Vector4 |
| quaternion | UnityEngine.Quaternion |

## Häufige Probleme

### Warum ist der Unity-Generator deaktiviert?

Der Unity-Codegenerator wird refaktoriert, um ein besseres Typsystem und eine bessere Codegenerierungsarchitektur zu unterstützen. Er wird voraussichtlich in zukünftigen Versionen wieder aktiviert.

### Wie erhalte ich den aktuellen Status?

Bitte folgen Sie den Projekt-Update-Logs oder prüfen Sie Codeänderungen im Verzeichnis `backends/xcell-generator/src/codegen/unity/`.

## Best Practices

1. **Meta-Tabellenformat verwenden**: Für komplexe Konfigurationstabellen wird das Meta-Tabellenformat empfohlen, das reichhaltigere Metadatendefinitionsunterstützung bietet
2. **Zusammenführungsregeln sinnvoll verwenden**: Für große Projekte Zusammenführungsregeln zur Verwaltung komplexer Tabellen verwenden
3. **Datenstrukturen optimieren**: Geeignete Datentypen und Strukturen basierend auf tatsächlichen Anwendungsfällen wählen
4. **Regelmäßige Bereinigung**: Regelmäßig nicht benötigte Konfigurationstabellen und Daten bereinigen, um das Projekt ordentlich zu halten
