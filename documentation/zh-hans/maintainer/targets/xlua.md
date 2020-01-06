# XLua 集成

XLua 是 Unity 中常用的 Lua 脚本解决方案，XCell 提供了与 XLua 的集成支持。

## 类型映射

| XCell 类型 | XLua 类型 | 说明 |
|-----------|-----------|------|
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
| `bool` | `boolean` | 布尔值 |
| `string` | `string` | 字符串 |
| `array<T>` | `table` | 数组 |
| `map<K, V>` | `table` | 映射 |
| `enum` | `number` | 枚举 |
| `struct` | `table` | 结构体 |

## 集成步骤

1. **安装 XLua**：在 Unity 项目中安装 XLua 插件
2. **配置 XCell**：在项目配置中启用 XLua 代码生成
3. **生成代码**：使用 XCell 生成 XLua 兼容的代码
4. **加载数据**：在 Lua 脚本中加载生成的数据

## 示例代码

```lua
-- 加载配置数据
local config = require("ConfigManager")

-- 访问配置
local playerConfig = config.Player[1]
print("Player name: " .. playerConfig.name)
print("Player level: " .. playerConfig.level)
```

## 注意事项

- XLua 中的数字类型统一为 `number`，可能会导致精度损失
- 复杂数据结构会被转换为 Lua table
- 建议使用 LuaJIT 以获得更好的性能