# JSON Integration

> ✅ **Available**: The JSON data generator is currently available and supports generating standard JSON format data files.

XCell supports exporting configuration tables to JSON format, a universal data interchange format that can be easily parsed by multiple languages and platforms.

## Type Mapping

| XCell Type | JSON Type | Description |
|-----------|----------|------|
| `bool` | `boolean` | Boolean value |
| `i8` | `number` | 8-bit signed integer |
| `i16` | `number` | 16-bit signed integer |
| `i32` | `number` | 32-bit signed integer |
| `i64` | `number` | 64-bit signed integer |
| `u8` | `number` | 8-bit unsigned integer |
| `u16` | `number` | 16-bit unsigned integer |
| `u32` | `number` | 32-bit unsigned integer |
| `u64` | `number` | 64-bit unsigned integer |
| `f32` | `number` | 32-bit floating-point |
| `f64` | `number` | 64-bit floating-point |
| `string` | `string` | String |
| `array<T>` | `T[]` | Array |
| `list<T>` | `T[]` | List |
| `map<K, V>` | `object` | Map object |
| `enum` | `string` | Enum name |
| `struct` | `object` | Struct object |
| `color` | `string` | Color (hexadecimal, e.g. "#FF0000") |
| `vec2` | `object` | `{ "x": 0, "y": 0 }` |
| `vec3` | `object` | `{ "x": 0, "y": 0, "z": 0 }` |
| `vec4` | `object` | `{ "x": 0, "y": 0, "z": 0, "w": 0 }` |

## Configuration Options

In the `ProjectSettings.toml` file, JSON integration configuration is located in the `[json]` section:

```toml
[json]
enable = true
output = "output/json"             # JSON data output directory
indent = 2                         # Indentation spaces (0 for compact format)
```

## Output Format

### List Table Format

List tables are exported as JSON arrays:

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

### Dictionary Table Format

Dictionary tables are exported as JSON objects with primary keys as keys:

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

### Enum Table Format

Enum tables are exported as JSON objects:

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

### Complex Type Examples

#### Array Type

```json
{
  "id": 1,
  "name": "Skill Pack",
  "skills": [101, 102, 103]
}
```

#### Struct Type

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

#### Map Type

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

## Use Cases

### Frontend Applications

JSON format is well-suited for frontend applications:

```typescript
// Load JSON data
async function loadItemData(): Promise<Item[]> {
  const response = await fetch('/data/items.json');
  return response.json();
}
```

### Backend Services

In Node.js or other backend environments:

```javascript
const fs = require('fs');
const items = JSON.parse(fs.readFileSync('./output/json/items.json', 'utf-8'));
```

### Game Engines

Most game engines support JSON parsing:

- **Unity**: `JsonUtility.FromJson<T>()`
- **Cocos**: `JSON.parse()`
- **Unreal**: Use JSON plugin

## Notes

### Number Precision

JSON number types do not distinguish between integers and floating-point numbers. There may be precision loss for 64-bit integers. If you need to represent large integers precisely, it is recommended to use string types.

### Encoding Format

JSON files use UTF-8 encoding by default. Ensure proper handling of Unicode characters.

### File Size

For large configuration tables, JSON files can be quite large. Consider:

1. Using compact format (set `indent = 0`)
2. Enabling GZIP compression for transmission
3. Using binary formats (such as MessagePack) as alternatives

## Best Practices

1. **Version Control**: Include generated JSON files in version control to track changes
2. **Data Validation**: Use JSON Schema to validate data format
3. **Lazy Loading**: Load data on demand to reduce initial load time
4. **Caching**: Cache loaded data to avoid repeated parsing
