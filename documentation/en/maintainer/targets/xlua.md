# XLua Integration

XLua is a commonly used Lua script solution in Unity. XCell provides integration support with XLua.

## Type Mapping

| XCell Type | XLua Type | Description |
| ---------- | --------- | ----------- |
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
| `bool` | `boolean` | Boolean value |
| `string` | `string` | String |
| `array<T>` | `table` | Array |
| `map<K, V>` | `table` | Map |
| `enum` | `number` | Enum |
| `struct` | `table` | Struct |

## Integration Steps

1. **Install XLua**: Install XLua plugin in Unity project
2. **Configure XCell**: Enable XLua code generation in project configuration
3. **Generate Code**: Use XCell to generate XLua-compatible code
4. **Load Data**: Load generated data in Lua scripts

## Example Code

```lua
-- Load configuration data
local config = require("ConfigManager")

-- Access configuration
local playerConfig = config.Player[1]
print("Player name: " .. playerConfig.name)
print("Player level: " .. playerConfig.level)
```

## Notes

- XLua number types are unified as `number`, which may cause precision loss
- Complex data structures will be converted to Lua tables
- It is recommended to use LuaJIT for better performance
