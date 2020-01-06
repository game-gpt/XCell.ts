# TypeScript/JavaScript 統合

> ✅ **利用可能**：TypeScript コードジェネレーターは現在利用可能で、TypeScript インターフェースと型定義の生成をサポートしています。

XCell は TypeScript と JavaScript コードの生成をサポートし、フロントエンドとバックエンドアプリケーションに使用されます。

## 型マッピング

| XCell 型 | TypeScript 型 | 説明 |
|-----------|----------------|------|
| `bool` | `boolean` | ブール値 |
| `i8` | `number` | 8ビット符号付き整数 |
| `i16` | `number` | 16ビット符号付き整数 |
| `i32` | `number` | 32ビット符号付き整数 |
| `i64` | `number` | 64ビット符号付き整数 |
| `u8` | `number` | 8ビット符号なし整数 |
| `u16` | `number` | 16ビット符号なし整数 |
| `u32` | `number` | 32ビット符号なし整数 |
| `u64` | `number` | 64ビット符号なし整数 |
| `f32` | `number` | 32ビット浮動小数点数 |
| `f64` | `number` | 64ビット浮動小数点数 |
| `string` | `string` | 文字列 |
| `array<T>` | `T[]` | 配列 |
| `list<T>` | `T[]` | リスト |
| `map<K, V>` | `Record<K, V>` | マッピング |
| `enum` | `string` | 列挙（文字列形式） |
| `struct` | `interface` | 構造体 |
| `color` | `string` | カラー（16進数） |
| `vec2` | `{ x: number, y: number }` | 2次元ベクトル |
| `vec3` | `{ x: number, y: number, z: number }` | 3次元ベクトル |
| `vec4` | `{ x: number, y: number, z: number, w: number }` | 4次元ベクトル |

## サポートされるフォーマット

- **TypeScript + JSON**：TypeScript インターフェースと JSON データファイルの生成 ✅
- **TypeScript + CSV**：TypeScript インターフェースと CSV データファイルの生成
- **JavaScript + JSON**：JavaScript コードと JSON データファイルの生成
- **JavaScript + CSV**：JavaScript コードと CSV データファイルの生成

## 設定オプション

`ProjectSettings.toml` ファイルで、TypeScript 統合設定は `[typescript]` セクションにあります：

```toml
[typescript]
enable = true
output = "src/generated"           # TypeScript コード出力ディレクトリ
namespace = "DataTable.Generated"   # 名前空間
manager_name = "DataTableManager"  # マネージャークラス名
suffix_table = "Table"             # テーブルクラスのサフィックス
suffix_element = "Element"         # 要素クラスのサフィックス

# JSON データ出力設定
[typescript.json]
enable = true
output = "data/generated"          # JSON データ出力ディレクトリ
```

## 統合手順

1. **TypeScript エクスポートの設定**：XCell 設定で TypeScript フォーマットエクスポートを有効化
2. **コードの生成**：XCell を使用して TypeScript/JavaScript コードとデータファイルを生成
3. **コードのインポート**：プロジェクトで生成されたコードとデータをインポート
4. **データの使用**：アプリケーションで生成されたデータと型を使用

## サンプル TypeScript コード

### 生成される型定義

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

### 生成されたコードの使用

```typescript
import { DataTableManager } from './generated/DataTableManager';

async function main() {
  const manager = new DataTableManager();
  await manager.loadAll();

  // データを使用
  const player = manager.player[0];
  console.log(`Player name: ${player.name}`);
  console.log(`Player level: ${player.level}`);

  // 特定のデータを検索
  const item = manager.item.find(i => i.id === 1);
  if (item) {
    console.log(`Item: ${item.name}, Price: ${item.price}`);
  }
}

main().catch(console.error);
```

## データ読み込み方法

### fetch を使用した読み込み（ブラウザ環境）

```typescript
async function loadJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.statusText}`);
  }
  return response.json();
}
```

### fs を使用した読み込み（Node.js 環境）

```typescript
import fs from 'fs';
import path from 'path';

function loadJson<T>(filePath: string): T {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}
```

### 動的インポートを使用（バンドラー）

```typescript
// Vite/Webpack の動的インポートを使用
const playerData = await import('./data/generated/Player.json');
```

## 注意事項

- TypeScript の数値型は `number` に統一されるため、精度損失が発生する可能性があります
- 生成されたインターフェースは型チェックとコードヒントに直接使用できます
- 異なるスタイルのコード（ES modules、CommonJS など）を生成するように設定可能
- 大規模プロジェクトでは、コード分割で読み込みパフォーマンスを最適化することを推奨

## ベストプラクティス

1. **型安全性**：生成されたインターフェースで型チェックを行い、ランタイムエラーを回避
2. **遅延読み込み**：必要に応じてデータを読み込み、初期読み込み時間を短縮
3. **キャッシュ**：読み込んだデータをキャッシュし、重複リクエストを回避
4. **エラー処理**：適切なエラー処理を追加し、読み込み失敗の場合を処理

## サンプルプロジェクト

XCell は TypeScript サンプルプロジェクトを提供し、実際のプロジェクトで XCell を使用する方法を示しています：

- 基本的な設定表の使用
- 複雑なデータ構造
- 多言語サポート
- フロントエンド・バックエンド統合

サンプルプロジェクトを通じて、TypeScript での XCell のベストプラクティスを素早く理解できます。
