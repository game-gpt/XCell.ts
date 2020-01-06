# TypeScript/JavaScript Integration

> ✅ **Available**: TypeScript code generator is currently available, supporting TypeScript interface and type definition generation.

XCell supports generating TypeScript and JavaScript code for frontend and backend applications.

## Type Mapping

| XCell Type | TypeScript Type | Description |
| ---------- | --------------- | ----------- |
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
| `map<K, V>` | `Record<K, V>` | Map |
| `enum` | `string` | Enum (string form) |
| `struct` | `interface` | Struct |
| `color` | `string` | Color (hexadecimal) |
| `vec2` | `{ x: number, y: number }` | 2D vector |
| `vec3` | `{ x: number, y: number, z: number }` | 3D vector |
| `vec4` | `{ x: number, y: number, z: number, w: number }` | 4D vector |

## Supported Formats

- **TypeScript + JSON**: Generate TypeScript interfaces and JSON data files ✅
- **TypeScript + CSV**: Generate TypeScript interfaces and CSV data files
- **JavaScript + JSON**: Generate JavaScript code and JSON data files
- **JavaScript + CSV**: Generate JavaScript code and CSV data files

## Configuration Options

In the `ProjectSettings.toml` file, TypeScript integration configuration is located in the `[typescript]` section:

```toml
[typescript]
enable = true
output = "src/generated"           # TypeScript code output directory
namespace = "DataTable.Generated"   # Namespace
manager_name = "DataTableManager"  # Manager class name
suffix_table = "Table"             # Table class suffix
suffix_element = "Element"         # Element class suffix

# JSON data output configuration
[typescript.json]
enable = true
output = "data/generated"          # JSON data output directory
```

## Integration Steps

1. **Configure TypeScript Export**: Enable TypeScript format export in XCell configuration
2. **Generate Code**: Use XCell to generate TypeScript/JavaScript code and data files
3. **Import Code**: Import generated code and data in project
4. **Use Data**: Use generated data and types in application

## Example TypeScript Code

### Generated Type Definitions

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

### Using Generated Code

```typescript
import { DataTableManager } from './generated/DataTableManager';

async function main() {
  const manager = new DataTableManager();
  await manager.loadAll();

  // Use data
  const player = manager.player[0];
  console.log(`Player name: ${player.name}`);
  console.log(`Player level: ${player.level}`);

  // Find specific data
  const item = manager.item.find(i => i.id === 1);
  if (item) {
    console.log(`Item: ${item.name}, Price: ${item.price}`);
  }
}

main().catch(console.error);
```

## Data Loading Methods

### Using fetch to Load (Browser Environment)

```typescript
async function loadJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.statusText}`);
  }
  return response.json();
}
```

### Using fs to Load (Node.js Environment)

```typescript
import fs from 'fs';
import path from 'path';

function loadJson<T>(filePath: string): T {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}
```

### Using Dynamic Import (Bundlers)

```typescript
// Using Vite/Webpack dynamic import
const playerData = await import('./data/generated/Player.json');
```

## Notes

- TypeScript number types are unified as `number`, which may cause precision loss
- Generated interfaces can be used directly for type checking and code hints
- Can configure generation of different code styles (ES modules, CommonJS, etc.)
- For large projects, it is recommended to use code splitting to optimize loading performance

## Best Practices

1. **Type Safety**: Use generated interfaces for type checking to avoid runtime errors
2. **Lazy Loading**: Load data on demand to reduce initial loading time
3. **Caching**: Cache loaded data to avoid repeated requests
4. **Error Handling**: Add appropriate error handling for loading failure cases

## Example Project

XCell provides a TypeScript example project demonstrating how to use XCell in actual projects:

- Basic configuration table usage
- Complex data structures
- Multi-language support
- Frontend and backend integration

Through the example project, you can quickly learn the best practices of XCell in TypeScript.
