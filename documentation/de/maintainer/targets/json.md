# JSON-Integration

> ✅ **Verfügbar**: Der JSON-Datengenerator ist aktuell verfügbar und unterstützt die Generierung von Standard-JSON-Format-Datendateien.

XCell unterstützt den Export von Konfigurationstabellen in JSON-Format, ein universelles Datenaustauschformat, das von mehreren Sprachen und Plattformen leicht geparst werden kann.

## Typzuordnung

| XCell-Typ | JSON-Typ | Beschreibung |
|-----------|----------|------|
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
| `map<K, V>` | `object` | Map-Objekt |
| `enum` | `string` | Aufzählungsname |
| `struct` | `object` | Struktur-Objekt |
| `color` | `string` | Farbe (hexadezimal, z.B. "#FF0000") |
| `vec2` | `object` | `{ "x": 0, "y": 0 }` |
| `vec3` | `object` | `{ "x": 0, "y": 0, "z": 0 }` |
| `vec4` | `object` | `{ "x": 0, "y": 0, "z": 0, "w": 0 }` |

## Konfigurationsoptionen

In der Datei `ProjectSettings.toml` befindet sich die JSON-Integrationskonfiguration im Abschnitt `[json]`:

```toml
[json]
enable = true
output = "output/json"             # JSON-Daten-Ausgabeverzeichnis
indent = 2                         # Einzugsleerzeichen (0 für Kompaktformat)
```

## Ausgabeformat

### List-Tabellenformat

List-Tabellen werden als JSON-Arrays exportiert:

```json
[
  {
    "id": 1,
    "name": "Sword",
    "damage": 100,
    "price": 500,
    "is_active": true
  },
  {
    "id": 2,
    "name": "Shield",
    "damage": 0,
    "price": 300,
    "is_active": true
  }
]
```

### Wörterbuch-Tabellenformat

Wörterbuch-Tabellen werden als JSON-Objekte mit Primärschlüsseln als Schlüsseln exportiert:

```json
{
  "1": {
    "id": 1,
    "name": "Sword",
    "damage": 100,
    "price": 500
  },
  "2": {
    "id": 2,
    "name": "Shield",
    "damage": 0,
    "price": 300
  }
}
```

### Enum-Tabellenformat

Enum-Tabellen werden als JSON-Objekte exportiert:

```json
{
  "enum_name": "ItemType",
  "values": {
    "WEAPON": 1,
    "ARMOR": 2,
    "CONSUMABLE": 3
  }
}
```

### Komplexe Typbeispiele

#### Array-Typ

```json
{
  "id": 1,
  "name": "Skill Pack",
  "skills": [101, 102, 103]
}
```

#### Struktur-Typ

```json
{
  "id": 1,
  "name": "Player",
  "position": {
    "x": 100.0,
    "y": 200.0,
    "z": 50.0
  }
}
```

#### Map-Typ

```json
{
  "id": 1,
  "name": "Localization",
  "translations": {
    "en": "Hello",
    "zh": "你好",
    "ja": "こんにちは"
  }
}
```

## Anwendungsfälle

### Frontend-Anwendungen

JSON-Format eignet sich gut für Frontend-Anwendungen:

```typescript
// JSON-Daten laden
async function loadItemData(): Promise<Item[]> {
  const response = await fetch('/data/items.json');
  return response.json();
}
```

### Backend-Dienste

In Node.js oder anderen Backend-Umgebungen:

```javascript
const fs = require('fs');
const items = JSON.parse(fs.readFileSync('./output/json/items.json', 'utf-8'));
```

### Spielengines

Die meisten Spielengines unterstützen JSON-Parsing:

- **Unity**: `JsonUtility.FromJson<T>()`
- **Cocos**: `JSON.parse()`
- **Unreal**: JSON-Plugin verwenden

## Hinweise

### Zahlenpräzision

JSON-Zahlentypen unterscheiden nicht zwischen Ganzzahlen und Gleitkommazahlen. Bei 64-Bit-Ganzzahlen kann es zu Präzisionsverlust kommen. Wenn Sie große Ganzzahlen präzise darstellen müssen, wird empfohlen, Zeichenkettentypen zu verwenden.

### Kodierungsformat

JSON-Dateien verwenden standardmäßig UTF-8-Kodierung. Stellen Sie sicher, dass Unicode-Zeichen ordnungsgemäß behandelt werden.

### Dateigröße

Bei großen Konfigurationstabellen können JSON-Dateien ziemlich groß werden. Erwägen Sie:

1. Kompaktformat verwenden (`indent = 0` setzen)
2. GZIP-Kompression für die Übertragung aktivieren
3. Binärformate (wie MessagePack) als Alternative verwenden

## Best Practices

1. **Versionskontrolle**: Generierte JSON-Dateien in die Versionskontrolle einbeziehen, um Änderungen zu verfolgen
2. **Datenvalidierung**: JSON Schema zur Validierung des Datenformats verwenden
3. **Lazy Loading**: Daten bei Bedarf laden, um die anfängliche Ladezeit zu reduzieren
4. **Caching**: Geladene Daten cachen, um wiederholtes Parsen zu vermeiden
