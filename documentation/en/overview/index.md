# XCell Features

## Table Types

| Type | Description |
| ---- | ----------- |
| dict table | String primary key, most common configuration form |
| list table | Integer primary key, sequential access |
| enum table | Enum type with additional data attached |
| class table | Global configuration class, singleton pattern |
| language table | Multi-language support |

## Code Generation Targets

| Target | Language/Format | Status |
| ------ | --------------- | ------ |
| Unity | C# | ✅ Implemented |
| Cocos | TypeScript + JSON | ✅ Implemented |
| JSON | JSON Data | ✅ Implemented |
| Binary | Binary Data | ✅ Implemented |
| Dejavu | Template Engine | ✅ Implemented |

## Type System

### Basic Types

| Type | Description |
| ---- | ----------- |
| `bool` | Boolean value |
| `i8`, `i16`, `i32`, `i64` | Signed integers |
| `u8`, `u16`, `u32`, `u64` | Unsigned integers |
| `f32`, `f64` | Floating-point numbers |
| `string` | String |

### Composite Types

| Type | Description |
| ---- | ----------- |
| `[T]` | Dynamic array |
| `[T; N]` | Static array |
| `Vec<T>` | Vector/List |
| `vec2`, `vec3`, `vec4` | Vector types |
| `HashMap<K, V>` | Dictionary type |

### Special Types

| Type | Description |
| ---- | ----------- |
| `color` | Color type |
| `datetime`, `time`, `date` | Time types |
| `&T` | Reference type |

## Table Merge Feature

- **Naming Convention**: Underscore naming auto-merges, e.g., `Item_Weapon` + `Item_Armor` → `Item`
- **Merge Rules**: Same structure auto-merges, duplicate IDs cause errors
- **Reserved Table Name**: `Language` is a reserved table name

## Configuration System

- **Project Configuration**: `XCell.toml` in project root
- **Table Configuration**: Same-name `.toml` file
- **Row Mapping**: Supports legacy table migration

## Architecture

```
xcell-provider (Table Read/Write)
    ↓
xcell-analyzer (Table Analysis)
    ↓
xcell-generator (Code Generation)
    ↓
xcell (CLI Tool)
```

## Core Modules

| Module | Function |
| ------ | -------- |
| xcell-types | Type system definitions |
| xcell-provider | Table read/write interfaces |
| xcell-parser | Syntax parser |
| xcell-analyzer | Table analyzer |
| xcell-config | Configuration management |
| xcell-generator | Code generator |
| xcell-plugin | Plugin system |
| xcell | Command-line tool |
