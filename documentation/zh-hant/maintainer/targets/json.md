# JSON 集成

> ✅ **可用**：JSON 資料生成器當前可用，支援生成标准 JSON 格式的資料檔案。

XCell 支援將設定資料表匯出為 JSON 格式，这是一种通用的資料交换格式，可以被多种語言和平台轻松剖析。

## 類型對應

| XCell 類型 | JSON 類型 | 說明 |
|-----------|----------|------|
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
| `map<K, V>` | `object` | 對應物件 |
| `enum` | `string` | 列舉名稱 |
| `struct` | `object` | 結構體物件 |
| `color` | `string` | 顏色（十六進位，如 "#FF0000"） |
| `vec2` | `object` | `{ "x": 0, "y": 0 }` |
| `vec3` | `object` | `{ "x": 0, "y": 0, "z": 0 }` |
| `vec4` | `object` | `{ "x": 0, "y": 0, "z": 0, "w": 0 }` |

## 設定選項

在 `ProjectSettings.toml` 檔案中，JSON 集成設定位於 `[json]` 部分：

```toml
[json]
enable = true
output = "output/json"             # JSON 資料輸出目錄
indent = 2                         # 縮排空格数（0 資料表示壓縮格式）
```

## 輸出格式

### 串串列格式

串串列匯出為 JSON 陣列：

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

### 字典資料表格式

字典資料表匯出為 JSON 物件，以主鍵為键：

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

### 列舉資料表格式

列舉資料表匯出為 JSON 物件：

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

### 複雜類型範例

#### 陣列類型

```json
{
  "id": 1,
  "name": "Skill Pack",
  "skills": [101, 102, 103]
}
```

#### 結構體類型

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

#### 對應類型

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

## 使用場景

### 前端套用

JSON 格式非常适合前端套用：

```typescript
// 載入 JSON 資料
async function loadItemData(): Promise<Item[]> {
  const response = await fetch('/data/items.json');
  return response.json();
}
```

### 後端服務

在 Node.js 或其他後端環境中：

```javascript
const fs = require('fs');
const items = JSON.parse(fs.readFileSync('./output/json/items.json', 'utf-8'));
```

### 遊戲引擎

大多数遊戲引擎都支援 JSON 剖析：

- **Unity**: `JsonUtility.FromJson<T>()`
- **Cocos**: `JSON.parse()`
- **Unreal**: 使用 JSON 外掛程式

## 注意事项

### 数字精度

JSON 中的数字類型没有區分整數和浮點數，對於 64 位整數可能會有精度损失。如果需要精确資料表示大整數，建議使用字串類型。

### 編碼格式

JSON 檔案預設使用 UTF-8 編碼，確保正确處理 Unicode 字元。

### 檔案大小

對於大型設定資料表，JSON 檔案可能會很大。可以考虑：

1. 使用壓縮格式（設定 `indent = 0`）
2. 啟用 GZIP 壓縮傳输
3. 使用二進位格式（如 MessagePack）替代

## 最佳做法

1. **版本控制**：將生成的 JSON 檔案纳入版本控制，便於追踪變更
2. **資料驗證**：使用 JSON Schema 驗證資料格式
3. **延遲載入**：依需求載入資料，減少初始載入时间
4. **快取**：快取已載入的資料，避免重復剖析
