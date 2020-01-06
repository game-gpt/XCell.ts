# 元属性（Meta Data）

元属性用于为字段添加额外的配置信息，如验证规则、默认值等。

## 基本格式

元属性以 `@` 开头，可以写在三个位置：

| 位置 | 示例 |
| ---- | ---- |
| 字段名后 | `id @primary` |
| 类型后 | `i32 @min(1)` |
| Excel 注释 | `@default(100)` |

> **建议**：元属性可以有任意多个，建议统一写在 Excel 单元格注释中，便于管理和维护。

## 常用元属性

### 字段元属性

| 元属性 | 说明 | 示例 |
| ------ | ---- | ---- |
| `@primary` | 主键 | `id @primary` |
| `@default(value)` | 默认值 | `level @default(1)` |
| `@virtual` | 虚拟字段 | `user @virtual` |

### 类型元属性

| 元属性 | 说明 | 示例 |
| ------ | ---- | ---- |
| `@min(value)` | 最小值 | `i32 @min(0)` |
| `@max(value)` | 最大值 | `i32 @max(100)` |
| `@range(min, max)` | 范围 | `i32 @range(1, 100)` |

### 注释元属性

在 Excel 单元格注释中可以写元属性：

```
@default(100)
@min(1)
@max(9999)
```

## 虚拟字段

虚拟字段是一种特殊的字段，它不会存储实际数据，而是通过引用其他表的数据来获得值。

### 示例

| @dict | 名称 | 品质ID | 品质 |
| ----- | ---- | ------ | ---- |
| item_id | name | quality_id | quality @virtual |
| string | string | &Quality | Quality |
| sword_001 | 铁剑 | common | |
| sword_002 | 精钢剑 | rare | |

- `quality_id` 是实际存储的字段，类型为 `&Quality`
- `quality` 是虚拟字段，通过 `@virtual` 标记，类型为目标表名 `Quality`

## 计算属性

计算属性是通过表达式计算得出的字段，不需要存储实际数据。

### 示例

| @dict | 基础攻击 | 强化等级 | 总攻击 |
| ----- | -------- | -------- | ------ |
| item_id | base_atk | enhance | total_atk @computed |
| string | i32 | i32 | i32 |
| sword_001 | 100 | 5 | base_atk * (1 + enhance * 0.1) |

- `total_atk` 是计算属性，通过 `@computed` 标记
- 表达式可以引用同表中的其他字段

## 示例

### 带验证的字段

| @dict | 等级 | 金币 |
| ----- | ---- | ---- |
| user_id | level | gold |
| string | i32 @range(1, 100) | i32 @min(0) |
| user_001 | 10 | 1000 |
| user_002 | 50 | 5000 |

### 带默认值的字段

| @dict | 名称 | 等级 |
| ----- | ---- | ---- |
| item_id | name | quality |
| string | string | string @default(common) |
| sword_001 | 铁剑 | |
| sword_002 | 精钢剑 | rare |

## 元属性与代码生成

元属性会影响生成的代码：

### 验证属性

```
level i32 @range(1, 100)
```

生成 C# 代码：

```csharp
[Range(1, 100)]
public int Level { get; set; }
```

### 默认值

```
quality string @default(common)
```

生成 C# 代码：

```csharp
public string Quality { get; set; } = "common";
```

## 注意事项

- 元属性以 `@` 开头
- 可以写在字段名、类型或 Excel 注释中
- 多个元属性可以组合使用
- 部分元属性会影响代码生成和数据验证
