# Vue-Integration

XCell bietet tiefe Integration mit dem Vue-Framework und unterstützt TypeScript-Codegenerierung, JSON-Datendateien und andere Formate.

## Konfigurationsoptionen

In der Datei `XCell.toml` befindet sich die Vue-Integrationskonfiguration im Abschnitt `[vue]`:

```toml
[vue]
enable = true
project = "../"
output = "src/data-table/generated"
namespace = "DataTable"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"

[vue.json]
enable = true
output = "public/tables"

[vue.graphql]
enable = false
output = "src/data-table/graphql"
```

## Generierte Codestruktur

### Tabellenklassenstruktur

Jede Konfigurationstabelle generiert entsprechende TypeScript-Klassen, einschließlich:
- Tabellendatenklasse (Table)
- Elementdatenklasse (Element)
- Manager-Klasse (Manager)
- Vue Composition API-Funktionen

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
    const manager = ref<DataTableManager | null>(null);
    const loading = ref(true);

    onMounted(async () => {
        const newManager = new DataTableManager();
        await newManager.loadAll();
        manager.value = newManager;
        loading.value = false;
    });

    return { manager, loading };
}
```

## Datenladen

### In Vue-Komponenten verwenden:

```vue
<template>
  <div>
    <h1>Buff-Liste</h1>
    <div v-if="loading">Laden...</div>
    <div v-else-if="!manager">Daten konnten nicht geladen werden</div>
    <div v-else>
      <div v-for="buff in buffs" :key="buff.id">
        <h2>{{ buff.name }}</h2>
        <p>Wert: {{ buff.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataTable } from './data-table/generated/useDataTable';

const { manager, loading } = useDataTable();

const buffs = computed(() => {
  if (!manager.value) return [];
  return Array.from(manager.value.buffTable.data.values());
});
</script>
```

### Unterstützte Funktionen:
- Asynchrones Laden
- Inkrementelles Laden
- Speicherverwaltung
- Hot-Update-Unterstützung
- Vue Composition API-Integration

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

- Prüfen Sie, ob der Vue-Projektpfad korrekt ist
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
5. **Vue Composition API verwenden**: Generierte Composition API-Funktionen nutzen, um Datenladen und Zustandsverwaltung zu vereinfachen

## Beispielprojekt

XCell bietet ein Vue-Beispielprojekt, das die Verwendung von XCell in tatsächlichen Projekten demonstriert:

- Grundlegende Konfigurationstabellenverwendung
- Komplexe Datenstrukturen
- Mehrsprachige Unterstützung
- Hot-Update-Integration
- Vue Composition API-Verwendung

Durch das Beispielprojekt können Sie schnell die Best Practices von XCell in Vue erlernen.
