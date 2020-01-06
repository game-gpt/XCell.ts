# Meta Attributes

Meta attributes are used to add extra configuration information to fields, such as validation rules, default values, etc.

## Basic Format

Meta attributes start with `@` and can be written in three positions:

| Position | Example |
| -------- | ------- |
| After field name | `id @primary` |
| After type | `i32 @min(1)` |
| Excel comment | `@default(100)` |

> **Recommendation**: Meta attributes can have any number, it is recommended to write them uniformly in Excel cell comments for easier management and maintenance.

## Common Meta Attributes

### Field Meta Attributes

| Meta Attribute | Description | Example |
| -------------- | ----------- | ------- |
| `@primary` | Primary key | `id @primary` |
| `@default(value)` | Default value | `level @default(1)` |
| `@virtual` | Virtual field | `user @virtual` |

### Type Meta Attributes

| Meta Attribute | Description | Example |
| -------------- | ----------- | ------- |
| `@min(value)` | Minimum value | `i32 @min(0)` |
| `@max(value)` | Maximum value | `i32 @max(100)` |
| `@range(min, max)` | Range | `i32 @range(1, 100)` |

### Comment Meta Attributes

Meta attributes can be written in Excel cell comments:

```
@default(100)
@min(1)
@max(9999)
```

## Virtual Fields

Virtual fields are special fields that do not store actual data, but obtain values by referencing data from other tables.

### Example

| @dict | Name | Quality ID | Quality |
| ----- | ---- | ---------- | ------- |
| item_id | name | quality_id | quality @virtual |
| string | string | &Quality | Quality |
| sword_001 | Iron Sword | common | |
| sword_002 | Steel Sword | rare | |

- `quality_id` is the actually stored field, type is `&Quality`
- `quality` is a virtual field, marked with `@virtual`, type is the target table name `Quality`

## Computed Properties

Computed properties are fields derived through expression calculation, no need to store actual data.

### Example

| @dict | Base Attack | Enhance Level | Total Attack |
| ----- | ----------- | ------------- | ------------ |
| item_id | base_atk | enhance | total_atk @computed |
| string | i32 | i32 | i32 |
| sword_001 | 100 | 5 | base_atk * (1 + enhance * 0.1) |

- `total_atk` is a computed property, marked with `@computed`
- Expressions can reference other fields in the same table

## Examples

### Field with Validation

| @dict | Level | Gold |
| ----- | ----- | ---- |
| user_id | level | gold |
| string | i32 @range(1, 100) | i32 @min(0) |
| user_001 | 10 | 1000 |
| user_002 | 50 | 5000 |

### Field with Default Value

| @dict | Name | Quality |
| ----- | ---- | ------- |
| item_id | name | quality |
| string | string | string @default(common) |
| sword_001 | Iron Sword | |
| sword_002 | Steel Sword | rare |

## Meta Attributes and Code Generation

Meta attributes affect generated code:

### Validation Attributes

```
level i32 @range(1, 100)
```

Generated C# code:

```csharp
[Range(1, 100)]
public int Level { get; set; }
```

### Default Value

```
quality string @default(common)
```

Generated C# code:

```csharp
public string Quality { get; set; } = "common";
```

## Notes

- Meta attributes start with `@`
- Can be written in field name, type, or Excel comment
- Multiple meta attributes can be combined
- Some meta attributes affect code generation and data validation
