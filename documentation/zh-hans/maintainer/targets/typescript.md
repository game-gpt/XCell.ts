# TypeScript/JavaScript 集成

> ✅ **可用**：TypeScript 代码生成器当前可用，支持生成 TypeScript 接口和类型定义。

XCell 支持生成 TypeScript 和 JavaScript 代码，用于前端和后端应用。

## 类型映射

| XCell 类型 | TypeScript 类型 | 说明 |
|-----------|----------------|------|
| `bool` | `boolean` | 布尔值 |
| `i8` | `number` | 8位有符号整数 |
| `i16` | `number` | 16位有符号整数 |
| `i32` | `number` | 32位有符号整数 |
| `i64` | `number` | 64位有符号整数 |
| `u8` | `number` | 8位无符号整数 |
| `u16` | `number` | 16位无符号整数 |
| `u32` | `number` | 32位无符号整数 |
| `u64` | `number` | 64位无符号整数 |
| `f32` | `number` | 32位浮点数 |
| `f64` | `number` | 64位浮点数 |
| `string` | `string` | 字符串 |
| `array<T>` | `T[]` | 数组 |
| `list<T>` | `T[]` | 列表 |
| `map<K, V>` | `Record<K, V>` | 映射 |
| `enum` | `string` | 枚举（字符串形式） |
| `struct` | `interface` | 结构体 |
| `color` | `string` | 颜色（十六进制） |
| `vec2` | `{ x: number, y: number }` | 二维向量 |
| `vec3` | `{ x: number, y: number, z: number }` | 三维向量 |
| `vec4` | `{ x: number, y: number, z: number, w: number }` | 四维向量 |

## 支持的格式

- **TypeScript + JSON**：生成 TypeScript 接口和 JSON 数据文件 ✅
- **TypeScript + CSV**：生成 TypeScript 接口和 CSV 数据文件
- **JavaScript + JSON**：生成 JavaScript 代码和 JSON 数据文件
- **JavaScript + CSV**：生成 JavaScript 代码和 CSV 数据文件

## 配置选项

在 `ProjectSettings.toml` 文件中，TypeScript 集成配置位于 `[typescript]` 部分：

```toml
[typescript]
enable = true
output = "src/generated"           # TypeScript 代码输出目录
namespace = "DataTable.Generated"   # 命名空间
manager_name = "DataTableManager"  # 管理器类名
suffix_table = "Table"             # 表类后缀
suffix_element = "Element"         # 元素类后缀

# JSON 数据输出配置
[typescript.json]
enable = true
output = "data/generated"          # JSON 数据输出目录
```

## 集成步骤

1. **配置 TypeScript 导出**：在 XCell 配置中启用 TypeScript 格式导出
2. **生成代码**：使用 XCell 生成 TypeScript/JavaScript 代码和数据文件
3. **引入代码**：在项目中引入生成的代码和数据
4. **使用数据**：在应用程序中使用生成的数据和类型

## 示例 TypeScript 代码

### 生成的类型定义

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

### 使用生成的代码

```typescript
import { DataTableManager } from './generated/DataTableManager';

async function main() {
  const manager = new DataTableManager();
  await manager.loadAll();

  // 使用数据
  const player = manager.player[0];
  console.log(`Player name: ${player.name}`);
  console.log(`Player level: ${player.level}`);

  // 查找特定数据
  const item = manager.item.find(i => i.id === 1);
  if (item) {
    console.log(`Item: ${item.name}, Price: ${item.price}`);
  }
}

main().catch(console.error);
```

## 数据加载方式

### 使用 fetch 加载（浏览器环境）

```typescript
async function loadJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.statusText}`);
  }
  return response.json();
}
```

### 使用 fs 加载（Node.js 环境）

```typescript
import fs from 'fs';
import path from 'path';

function loadJson<T>(filePath: string): T {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}
```

### 使用动态导入（打包工具）

```typescript
// 使用 Vite/Webpack 的动态导入
const playerData = await import('./data/generated/Player.json');
```

## 注意事项

- TypeScript 中的数字类型统一为 `number`，可能会导致精度损失
- 生成的接口可以直接用于类型检查和代码提示
- 可以配置生成不同风格的代码（ES modules、CommonJS 等）
- 对于大型项目，建议使用代码分割来优化加载性能

## 最佳实践

1. **类型安全**：使用生成的接口进行类型检查，避免运行时错误
2. **懒加载**：按需加载数据，减少初始加载时间
3. **缓存**：缓存已加载的数据，避免重复请求
4. **错误处理**：添加适当的错误处理，处理加载失败的情况

## 示例项目

XCell 提供了 TypeScript 示例项目，展示了如何在实际项目中使用 XCell：

- 基本配置表使用
- 复杂数据结构
- 多语言支持
- 前后端集成

通过示例项目，您可以快速了解 XCell 在 TypeScript 中的最佳实践。
