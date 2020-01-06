# TypeScript/JavaScript-Integration

> ✅ **Verfügbar**: Der TypeScript-Codegenerator ist aktuell verfügbar und unterstützt TypeScript-Schnittstellen- und Typdefinitionsgenerierung.

XCell unterstützt die Generierung von TypeScript- und JavaScript-Code für Frontend- und Backend-Anwendungen.

## Typzuordnung

| XCell-Typ | TypeScript-Typ | Beschreibung |
| ---------- | --------------- | ----------- |
| `bool` | `boolean` | Boolescher Wert |
| `i8` | `number` | 8-Bit-Vorzeichen-Ganzzahl |
| `i16` | `number` | 16-Bit-Vorzeichen-Ganzzahl |
| `i32` | `number` | 32-Bit-Vorzeichen-Ganzzahl |
| `i64` | `number` | 64-Bit-Vorzeichen-Ganzzahl |
| `u8` | `number` | 8-Bit-Vorzeichenlose-Ganzzahl |
| `u16` | `number` | 16-Bit-Vorzeichenlose-Ganzzahl |
| `u32` | `number` | 32-Bit-Vorzeichenlose-Ganzzahl |
| `u64` | `number` | 64-Bit-Vorzeichenlose-Ganzzahl |
| `f32` | `number` | 32-Bit-Gleitkomma |
| `f64` | `number` | 64-Bit-Gleitkomma |
| `string` | `string` | Zeichenkette |
| `array<T>` | `T[]` | Array |
| `list<T>` | `T[]` | Liste |
| `map<K, V>` | `Record<K, V>` | Map |
| `enum` | `string` | Aufzählung (Zeichenkettenform) |
| `struct` | `interface` | Struktur |
| `color` | `string` | Farbe (hexadezimal) |
| `vec2` | `{ x: number, y: number }` | 2D-Vektor |
| `vec3` | `{ x: number, y: number, z: number }` | 3D-Vektor |
| `vec4` | `{ x: number, y: number, z: number, w: number }` | 4D-Vektor |

## Unterstützte Formate

- **TypeScript + JSON**: TypeScript-Schnittstellen und JSON-Datendateien generieren ✅
- **TypeScript + CSV**: TypeScript-Schnittstellen und CSV-Datendateien generieren
- **JavaScript + JSON**: JavaScript-Code und JSON-Datendateien generieren
- **JavaScript + CSV**: JavaScript-Code und CSV-Datendateien generieren

## Konfigurationsoptionen

In der Datei `ProjectSettings.toml` befindet sich die TypeScript-Integrationskonfiguration im Abschnitt `[typescript]`:

```toml
[typescript]
enable = true
output = "src/generated"           # TypeScript-Code-Ausgabeverzeichnis
namespace = "DataTable.Generated"   # Namespace
manager_name = "DataTableManager"  # Manager-Klassenname
suffix_table = "Table"             # Tabellenklassen-Suffix
suffix_element = "Element"         # Elementklassen-Suffix

# JSON-Daten-Ausgabekonfiguration
[typescript.json]
enable = true
output = "data/generated"          # JSON-Daten-Ausgabeverzeichnis
```

## Integrationsschritte

1. **TypeScript-Export konfigurieren**: TypeScript-Format-Export in XCell-Konfiguration aktivieren
2. **Code generieren**: XCell verwenden, um TypeScript/JavaScript-Code und Datendateien zu generieren
3. **Code importieren**: Generierten Code und Daten im Projekt importieren
4. **Daten verwenden**: Generierte Daten und Typen in der Anwendung verwenden

## Beispiel für TypeScript-Code

### Generierte Typdefinitionen

```typescript
// Player.ts
export interface Player {
  id: number;
  name: string;
  level: number;
  gold: number;
  is_active: boolean;
}

// Item.ts
export interface Item {
  id: number;
  name: string;
  damage: number;
  price: number;
}

// DataTableManager.ts
import { Player } from './Player';
import { Item } from './Item';

export class DataTableManager {
  private _player: Player[] | null = null;
  private _item: Item[] | null = null;

  public get player(): Player[] {
    if (!this._player) {
      throw new Error('Player data not loaded');
    }
    return this._player;
  }

  public get item(): Item[] {
    if (!this._item) {
      throw new Error('Item data not loaded');
    }
    return this._item;
  }

  public async loadAll(): Promise<void> {
    this._player = await this.loadJson<Player[]>('data/generated/Player.json');
    this._item = await this.loadJson<Item[]>('data/generated/Item.json');
  }

  private async loadJson<T>(path: string): Promise<T> {
    const response = await fetch(path);
    return response.json();
  }
}
```

### Generierten Code verwenden

```typescript
import { DataTableManager } from './generated/DataTableManager';

async function main() {
  const manager = new DataTableManager();
  await manager.loadAll();

  // Daten verwenden
  const player = manager.player[0];
  console.log(`Spielername: ${player.name}`);
  console.log(`Spielerstufe: ${player.level}`);

  // Spezifische Daten finden
  const item = manager.item.find(i => i.id === 1);
  if (item) {
    console.log(`Artikel: ${item.name}, Preis: ${item.price}`);
  }
}

main().catch(console.error);
```

## Datenlademethoden

### Mit fetch laden (Browser-Umgebung)

```typescript
async function loadJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.statusText}`);
  }
  return response.json();
}
```

### Mit fs laden (Node.js-Umgebung)

```typescript
import fs from 'fs';
import path from 'path';

function loadJson<T>(filePath: string): T {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}
```

### Mit dynamischem Import (Bundler)

```typescript
// Vite/Webpack dynamischen Import verwenden
const playerData = await import('./data/generated/Player.json');
```

## Hinweise

- TypeScript-Zahlentypen sind als `number` vereinheitlicht, was zu Präzisionsverlust führen kann
- Generierte Schnittstellen können direkt für Typüberprüfung und Code-Hinweise verwendet werden
- Generierung verschiedener Code-Stile kann konfiguriert werden (ES-Module, CommonJS usw.)
- Für große Projekte wird Code-Splitting zur Optimierung der Ladeleistung empfohlen

## Best Practices

1. **Typsicherheit**: Generierte Schnittstellen für Typüberprüfung verwenden, um Laufzeitfehler zu vermeiden
2. **Lazy Loading**: Daten bei Bedarf laden, um die anfängliche Ladezeit zu reduzieren
3. **Caching**: Geladene Daten cachen, um wiederholte Anforderungen zu vermeiden
4. **Fehlerbehandlung**: Angemessene Fehlerbehandlung für Lade-Fehlschläge hinzufügen

## Beispielprojekt

XCell bietet ein TypeScript-Beispielprojekt, das die Verwendung von XCell in tatsächlichen Projekten demonstriert:

- Grundlegende Konfigurationstabellenverwendung
- Komplexe Datenstrukturen
- Mehrsprachige Unterstützung
- Frontend- und Backend-Integration

Durch das Beispielprojekt können Sie schnell die Best Practices von XCell in TypeScript erlernen.
