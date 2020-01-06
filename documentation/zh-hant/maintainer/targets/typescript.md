# TypeScript/JavaScript 集成

> ✅ **可用**：TypeScript 程式碼產生器當前可用，支援生成 TypeScript 介面和類型定義。

XCell 支援生成 TypeScript 和 JavaScript 程式碼，用於前端和後端套用。

## 類型對應

| XCell 類型 | TypeScript 類型 | 說明 |
|-----------|----------------|------|
| `bool` | `boolean` | 布爾值 |
| `i8` | `number` | 8位有符號整數 |
| `i16` | `number` | 16位有符號整數 |
| `i32` | `number` | 32位有符號整數 |
| `i64` | `number` | 64位有符號整數 |
| `u8` | `number` | 8位无符號整數 |
| `u16` | `number` | 16位无符號整數 |
| `u32` | `number` | 32位无符號整數 |
| `u64` | `number` | 64位无符號整數 |
| `f32` | `number` | 32位浮點數 |
| `f64` | `number` | 64位浮點數 |
| `string` | `string` | 字串 |
| `array<T>` | `T[]` | 陣列 |
| `list<T>` | `T[]` | 串列 |
| `map<K, V>` | `Record<K, V>` | 對應 |
| `enum` | `string` | 列舉（字串形式） |
| `struct` | `interface` | 結構體 |
| `color` | `string` | 顏色（十六進位） |
| `vec2` | `{ x: number, y: number }` | 二维向量 |
| `vec3` | `{ x: number, y: number, z: number }` | 三维向量 |
| `vec4` | `{ x: number, y: number, z: number, w: number }` | 四维向量 |

## 支援的格式

- **TypeScript + JSON**：生成 TypeScript 介面和 JSON 資料檔案 ✅
- **TypeScript + CSV**：生成 TypeScript 介面和 CSV 資料檔案
- **JavaScript + JSON**：生成 JavaScript 程式碼和 JSON 資料檔案
- **JavaScript + CSV**：生成 JavaScript 程式碼和 CSV 資料檔案

## 設定選項

在 `ProjectSettings.toml` 檔案中，TypeScript 集成設定位於 `[typescript]` 部分：

```toml
[typescript]
enable = true
output = "src/generated"           # TypeScript 程式碼輸出目錄
namespace = "DataTable.Generated"   # 命名空間
manager_name = "DataTableManager"  # 管理器類別名
suffix_table = "Table"             # 資料表类後缀
suffix_element = "Element"         # 元素类後缀

# JSON 資料輸出設定
[typescript.json]
enable = true
output = "data/generated"          # JSON 資料輸出目錄
```

## 集成步骤

1. **設定 TypeScript 匯出**：在 XCell 設定中啟用 TypeScript 格式匯出
2. **生成程式碼**：使用 XCell 生成 TypeScript/JavaScript 程式碼和資料檔案
3. **引入程式碼**：在專案中引入生成的程式碼和資料
4. **使用資料**：在應用程式中使用生成的資料和類型

## 範例 TypeScript 程式碼

### 生成的類型定義

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

### 使用生成的程式碼

```typescript
import { DataTableManager } from './generated/DataTableManager';

async function main() {
  const manager = new DataTableManager();
  await manager.loadAll();

  // 使用資料
  const player = manager.player[0];
  console.log(`Player name: ${player.name}`);
  console.log(`Player level: ${player.level}`);

  // 尋找特定資料
  const item = manager.item.find(i => i.id === 1);
  if (item) {
    console.log(`Item: ${item.name}, Price: ${item.price}`);
  }
}

main().catch(console.error);
```

## 資料載入方式

### 使用 fetch 載入（瀏覽器環境）

```typescript
async function loadJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.statusText}`);
  }
  return response.json();
}
```

### 使用 fs 載入（Node.js 環境）

```typescript
import fs from 'fs';
import path from 'path';

function loadJson<T>(filePath: string): T {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}
```

### 使用動態匯入（打包工具）

```typescript
// 使用 Vite/Webpack 的動態匯入
const playerData = await import('./data/generated/Player.json');
```

## 注意事项

- TypeScript 中的数字類型统一為 `number`，可能會導致精度损失
- 生成的介面可以直接用於類型檢查和程式碼提示
- 可以設定生成不同风格的程式碼（ES modules、CommonJS 等）
- 對於大型專案，建議使用程式碼分割来最佳化載入效能

## 最佳做法

1. **類型安全**：使用生成的介面進行類型檢查，避免執行階段錯誤
2. **延遲載入**：依需求載入資料，減少初始載入时间
3. **快取**：快取已載入的資料，避免重復要求
4. **錯誤處理**：新增适當的錯誤處理，處理載入失敗的情況

## 範例專案

XCell 提供了 TypeScript 範例專案，展示了如何在實际專案中使用 XCell：

- 基本設定資料表使用
- 複雜資料結構
- 多語言支援
- 前後端集成

通过範例專案，您可以快速了解 XCell 在 TypeScript 中的最佳做法。
