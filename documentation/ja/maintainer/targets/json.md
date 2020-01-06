# JSON 統合

> ✅ **利用可能**：JSON データジェネレーターは現在利用可能で、標準 JSON フォーマットのデータファイル生成をサポートしています。

XCell は設定テーブルを JSON フォーマットでエクスポートすることをサポートしています。これは汎用的なデータ交換フォーマットであり、複数の言語やプラットフォームで簡単に解析できます。

## 型マッピング

| XCell 型 | JSON 型 | 説明 |
|-----------|----------|------|
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
| `map<K, V>` | `object` | マップオブジェクト |
| `enum` | `string` | 列挙名 |
| `struct` | `object` | 構造体オブジェクト |
| `color` | `string` | 色（16進数、例："#FF0000"） |
| `vec2` | `object` | `{ "x": 0, "y": 0 }` |
| `vec3` | `object` | `{ "x": 0, "y": 0, "z": 0 }` |
| `vec4` | `object` | `{ "x": 0, "y": 0, "z": 0, "w": 0 }` |

## 設定オプション

`ProjectSettings.toml` ファイルで、JSON 統合設定は `[json]` セクションにあります：

```toml
[json]
enable = true
output = "output/json"             # JSON データ出力ディレクトリ
indent = 2                         # インデントスペース数（0 は圧縮フォーマット）
```

## 出力フォーマット

### リストテーブルフォーマット

リストテーブルは JSON 配列としてエクスポートされます：

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

### 辞書テーブルフォーマット

辞書テーブルは主キーをキーとする JSON オブジェクトとしてエクスポートされます：

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

### 列挙テーブルフォーマット

列挙テーブルは JSON オブジェクトとしてエクスポートされます：

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

### 複合型の例

#### 配列型

```json
{
  "id": 1,
  "name": "Skill Pack",
  "skills": [101, 102, 103]
}
```

#### 構造体型

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

#### マップ型

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

## 使用シーン

### フロントエンドアプリケーション

JSON フォーマットはフロントエンドアプリケーションに非常に適しています：

```typescript
// JSON データの読み込み
async function loadItemData(): Promise<Item[]> {
  const response = await fetch('/data/items.json');
  return response.json();
}
```

### バックエンドサービス

Node.js やその他のバックエンド環境で：

```javascript
const fs = require('fs');
const items = JSON.parse(fs.readFileSync('./output/json/items.json', 'utf-8'));
```

### ゲームエンジン

ほとんどのゲームエンジンは JSON 解析をサポートしています：

- **Unity**: `JsonUtility.FromJson<T>()`
- **Cocos**: `JSON.parse()`
- **Unreal**: JSON プラグインを使用

## 注意事項

### 数値精度

JSON の数値型は整数と浮動小数点数を区別しません。64ビット整数では精度が失われる可能性があります。大きな整数を正確に表現する必要がある場合は、文字列型の使用を推奨します。

### エンコーディングフォーマット

JSON ファイルはデフォルトで UTF-8 エンコーディングを使用します。Unicode 文字を正しく処理してください。

### ファイルサイズ

大きな設定テーブルの場合、JSON ファイルが大きくなる可能性があります。以下を検討してください：

1. 圧縮フォーマットの使用（`indent = 0` を設定）
2. GZIP 圧縮転送の有効化
3. バイナリフォーマット（MessagePack など）の代替使用

## ベストプラクティス

1. **バージョン管理**：生成された JSON ファイルをバージョン管理に含め、変更を追跡
2. **データ検証**：JSON Schema を使用してデータフォーマットを検証
3. **遅延読み込み**：必要に応じてデータを読み込み、初期読み込み時間を短縮
4. **キャッシュ**：読み込んだデータをキャッシュし、重複解析を回避
