# React-Integration

XCell bietet tiefe Integration mit dem React-Framework und unterstützt TypeScript-Codegenerierung, JSON-Datendateien und andere Formate.

## Konfigurationsoptionen

In der Datei `XCell.toml` befindet sich die React-Integrationskonfiguration im Abschnitt `[react]`:

```toml
[react]
enable = true
project = "../"
output = "src/data-table/generated"
namespace = "DataTable"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"

[react.json]
enable = true
output = "public/tables"

[react.graphql]
enable = false
output = "src/data-table/graphql"
```

## Generierte Codestruktur

### Tabellenklassenstruktur

Jede Konfigurationstabelle generiert entsprechende TypeScript-Klassen, einschließlich:
- Tabellendatenklasse (Table)
- Elementdatenklasse (Element)
- Manager-Klasse (Manager)
- React Hooks

### Beispiel für generierte Codestruktur:

```typescript
// BuffTable.ts
export class BuffTable {
    private data: Map<number, BuffElement> = new Map();

    public get(id: number): BuffElement | undefined {
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

// BuffElement.ts
export class BuffElement {
    public id: number = 0;
    public name: string = "";
    public value: number = 0;
    // ... other fields
}

// DataTableManager.ts
export class DataTableManager {
    public buffTable: BuffTable = new BuffTable();

    public async loadAll(): Promise<void> {
        // Load all table data
    }
}

// useDataTable.ts
export function useDataTable() {
    const [manager, setManager] = useState<DataTableManager | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const newManager = new DataTableManager();
            await newManager.loadAll();
            setManager(newManager);
            setLoading(false);
        };

        loadData();
    }, []);

    return { manager, loading };
}
```

## Datenladen

### In React-Komponenten verwenden:

```typescript
import { useDataTable } from './data-table/generated/useDataTable';

function BuffList() {
    const { manager, loading } = useDataTable();

    if (loading) {
        return <div>Laden...</div>;
    }

    if (!manager) {
        return <div>Daten konnten nicht geladen werden</div>;
    }

    return (
        <div>
            <h1>Buff-Liste</h1>
            {Array.from(manager.buffTable.data.values()).map(buff => (
                <div key={buff.id}>
                    <h2>{buff.name}</h2>
                    <p>Wert: {buff.value}</p>
                </div>
            ))}
        </div>
    );
}
```

### Unterstützte Funktionen:
- Asynchrones Laden
- Inkrementelles Laden
- Speicherverwaltung
- Hot-Update-Unterstützung
- React Hooks-Integration

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

## Leistungsoptimierung

### Optimierung der Verarbeitung großer Tabellen

1. **Große Tabellen sinnvoll aufteilen**
   - Große Tabellen nach Funktion oder Modul aufteilen
   - Zeilen-Zusammenführungsregeln zur Zusammenführung zur Build-Zeit verwenden
   - Wartbarkeit während der Entwicklung und Leistung zur Laufzeit beibehalten

2. **Geeignetes Datenformat verwenden**
   - JSON-Format in Entwicklungsumgebung zum Debuggen verwenden
   - Komprimiertes Format in Produktionsumgebung für schnellere Ladegeschwindigkeit in Betracht ziehen

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

- Prüfen Sie, ob der React-Projektpfad korrekt ist
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
5. **React Hooks verwenden**: Generierte React Hooks nutzen, um Datenladen und Zustandsverwaltung zu vereinfachen

## Beispielprojekt

XCell bietet ein React-Beispielprojekt, das die Verwendung von XCell in tatsächlichen Projekten demonstriert:

- Grundlegende Konfigurationstabellenverwendung
- Komplexe Datenstrukturen
- Mehrsprachige Unterstützung
- Hot-Update-Integration
- React Hooks-Verwendung

Durch das Beispielprojekt können Sie schnell die Best Practices von XCell in React erlernen.
