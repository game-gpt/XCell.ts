# JSON 集成

> ✅ **可用**：JSON 数据生成器当前可用，支持生成标准 JSON 格式的数据文件。

XCell 支持将配置表导出为 JSON 格式，这是一种通用的数据交换格式，可以被多种语言和平台轻松解析。

## 类型映射

| XCell 类型 | JSON 类型 | 说明 |
|-----------|----------|------|
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
| `map<K, V>` | `object` | 映射对象 |
| `enum` | `string` | 枚举名称 |
| `struct` | `object` | 结构体对象 |
| `color` | `string` | 颜色（十六进制，如 "#FF0000"） |
| `vec2` | `object` | `{ "x": 0, "y": 0 }` |
| `vec3` | `object` | `{ "x": 0, "y": 0, "z": 0 }` |
| `vec4` | `object` | `{ "x": 0, "y": 0, "z": 0, "w": 0 }` |

## 配置选项

在 `ProjectSettings.toml` 文件中，JSON 集成配置位于 `[json]` 部分：

```toml
[json]
enable = true
output = "output/json"             # JSON 数据输出目录
indent = 2                         # 缩进空格数（0 表示压缩格式）
```

## 输出格式

### 列表表格式

列表表导出为 JSON 数组：

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

### 字典表格式

字典表导出为 JSON 对象，以主键为键：

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

### 枚举表格式

枚举表导出为 JSON 对象：

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

### 复杂类型示例

#### 数组类型

```json
{
  "id": 1,
  "name": "Skill Pack",
  "skills": [101, 102, 103]
}
```

#### 结构体类型

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

#### 映射类型

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

## 使用场景

### 前端应用

JSON 格式非常适合前端应用：

```typescript
// 加载 JSON 数据
async function loadItemData(): Promise<Item[]> {
  const response = await fetch('/data/items.json');
  return response.json();
}
```

### 后端服务

在 Node.js 或其他后端环境中：

```javascript
const fs = require('fs');
const items = JSON.parse(fs.readFileSync('./output/json/items.json', 'utf-8'));
```

### 游戏引擎

大多数游戏引擎都支持 JSON 解析：

- **Unity**: `JsonUtility.FromJson<T>()`
- **Cocos**: `JSON.parse()`
- **Unreal**: 使用 JSON 插件

## 注意事项

### 数字精度

JSON 中的数字类型没有区分整数和浮点数，对于 64 位整数可能会有精度损失。如果需要精确表示大整数，建议使用字符串类型。

### 编码格式

JSON 文件默认使用 UTF-8 编码，确保正确处理 Unicode 字符。

### 文件大小

对于大型配置表，JSON 文件可能会很大。可以考虑：

1. 使用压缩格式（设置 `indent = 0`）
2. 启用 GZIP 压缩传输
3. 使用二进制格式（如 MessagePack）替代

## 最佳实践

1. **版本控制**：将生成的 JSON 文件纳入版本控制，便于追踪变更
2. **数据验证**：使用 JSON Schema 验证数据格式
3. **懒加载**：按需加载数据，减少初始加载时间
4. **缓存**：缓存已加载的数据，避免重复解析
