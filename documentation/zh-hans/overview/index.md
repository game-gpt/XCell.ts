# XCell 功能特性

## 表格类型

| 类型 | 说明 |
| ---- | ---- |
| dict 表 | 字符串主键，最常用的配置形式 |
| list 表 | 整数主键，按顺序访问 |
| enum 表 | 枚举类型，附加额外数据 |
| class 表 | 全局配置类，单例模式 |
| language 表 | 多语言支持 |

## 代码生成目标

| 目标 | 语言/格式 | 状态 |
| ---- | --------- | ---- |
| Unity | C# | ✅ 已实现 |
| Cocos | TypeScript + JSON | ✅ 已实现 |
| JSON | JSON 数据 | ✅ 已实现 |
| Binary | 二进制数据 | ✅ 已实现 |
| Dejavu | 模板引擎 | ✅ 已实现 |

## 类型系统

### 基本类型

| 类型 | 说明 |
| ---- | ---- |
| `bool` | 布尔值 |
| `i8`, `i16`, `i32`, `i64` | 有符号整数 |
| `u8`, `u16`, `u32`, `u64` | 无符号整数 |
| `f32`, `f64` | 浮点数 |
| `string` | 字符串 |

### 复合类型

| 类型 | 说明 |
| ---- | ---- |
| `[T]` | 动态数组 |
| `[T; N]` | 静态数组 |
| `Vec<T>` | 向量/列表 |
| `vec2`, `vec3`, `vec4` | 向量类型 |
| `HashMap<K, V>` | 字典类型 |

### 特殊类型

| 类型 | 说明 |
| ---- | ---- |
| `color` | 颜色类型 |
| `datetime`, `time`, `date` | 时间类型 |
| `&T` | 引用类型 |

## 合表功能

- **命名约定**：下划线命名自动合并，如 `Item_Weapon` + `Item_Armor` → `Item`
- **合并规则**：相同结构自动合并，相同 ID 报错
- **保留表名**：`Language` 为保留表名

## 配置系统

- **项目配置**：`XCell.toml` 项目根目录
- **表格配置**：同名 `.toml` 文件
- **行映射**：支持旧表迁移

## 架构

```
xcell-provider (表格读写)
    ↓
xcell-analyzer (表格分析)
    ↓
xcell-generator (代码生成)
    ↓
xcell (CLI 工具)
```

## 核心模块

| 模块 | 功能 |
| ---- | ---- |
| xcell-types | 类型系统定义 |
| xcell-provider | 表格读写接口 |
| xcell-parser | 语法解析器 |
| xcell-analyzer | 表格分析器 |
| xcell-config | 配置管理 |
| xcell-generator | 代码生成器 |
| xcell-plugin | 插件系统 |
| xcell | 命令行工具 |
