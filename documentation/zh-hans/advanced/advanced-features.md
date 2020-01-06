# 高级功能文档

本文档详细介绍 XCell 配置表管理工具的高级功能，包括高级配置选项、合表规则详解以及性能优化技巧。

## 目录

1. [高级配置选项](#高级配置选项)
2. [合表规则详解](#合表规则详解)
3. [性能优化技巧](#性能优化技巧)
4. [引擎集成](#引擎集成)

---

## 高级配置选项

XCell 的配置文件 `XCell.toml` 提供了丰富的配置选项，让您可以灵活地定制工具的行为。

### 基本配置结构

一个完整的 `XCell.toml` 配置文件包含以下主要部分：

```toml
version = "0.0.0"

exclude = ""
include = "*.xlsx"

line.field = 1
line.type = 2
line.comment = 3
line.data = 4

[type.bool]
accept = ["true", "√"]
reject = ["false", "x"]

[type.string]

[merge]
```

### 版本控制配置

```toml
version = "0.0.0"
```

- **version**: 当前项目的版本号，用于标识生成的代码和数据文件版本

### 文件包含/排除配置

```toml
exclude = ""
include = "*.xlsx"
```

- **include**: 指定要包含的 Excel 文件模式，支持通配符
- **exclude**: 指定要排除的 Excel 文件模式，优先级低于 include

示例：
```toml
include = "tables/**/*.xlsx"
exclude = "tables/temp/*.xlsx"
```

### 表格行配置

```toml
line.field = 1
line.type = 2
line.comment = 3
line.data = 4
```

- **line.field**: 字段名所在的行号（从 1 开始）
- **line.type**: 类型声明所在的行号
- **line.comment**: 注释所在的行号
- **line.data**: 数据开始的行号

### 类型配置

#### 布尔类型配置

```toml
[type.bool]
accept = ["true", "√"]
reject = ["false", "x"]
```

- **accept**: 被识别为 true 的值列表
- **reject**: 被识别为 false 的值列表

#### 字符串类型配置

```toml
[type.string]
# 可扩展配置
```

---

## 合表规则详解

合表规则允许您将多个 Excel 表格合并为一个，支持按行或按列合并。

### 合表规则配置

合表规则在 `[merge]` 部分配置，每个规则使用一个唯一的编号标识。

```toml
[merge.10001]
mode = "row"
input = "Language_CN*"
target = "Language_CN"

[merge.10002]
mode = "row"
input = "Language_EN*"
target = "Language_EN"

[merge.20001]
mode = "column"
input = "Language*"
target = "Language"
```

### 合表模式

#### 行合并模式 (row)

```toml
mode = "row"
```

行合并将多个表格的数据行合并到一个表格中。适用于：
- 同一表格数据量大需要拆分管理
- 多语言数据分离管理

示例目录结构：
```
LanguageTable/
  - CN/
    - Language_CN_UI.xlsx
    - Language_CN_Item.xlsx
  - EN/
    - Language_EN_UI.xlsx
    - Language_EN_Item.xlsx
```

#### 列合并模式 (column)

```toml
mode = "column"
```

列合并将多个表格的列合并到一个表格中。适用于：
- 将多列数据分散在不同文件中
- 不同团队协作编辑同一表格的不同部分

### 合表规则参数

- **mode**: 合并模式，`row` 或 `column`
- **input**: 输入文件模式，支持通配符
- **target**: 目标表格名称

### 合表执行顺序

规则编号决定了合表的执行顺序，编号越小越早执行。建议：
- 行合并使用 10000-19999 范围
- 列合并使用 20000-29999 范围
- 其他自定义规则使用更高编号

---

## 性能优化技巧

### 大表处理优化

#### 1. 合理拆分大表

- 将大表按功能或模块拆分
- 使用行合并规则在构建时合并
- 保持开发时的可维护性和运行时的性能

#### 2. 使用二进制格式

- 二进制格式加载速度最快
- 生产环境推荐使用二进制格式
- 开发环境可以使用 XML/JSON 便于调试

### 增量更新优化

#### 1. 监听模式

使用监听模式：

```bash
xcell.exe --watch
```

监听模式特点：
- 只重新生成变更的文件
- 大幅提升开发效率
- 支持实时预览

#### 2. 合理配置监听

配置合理的 include/exclude 模式，减少监听文件数量。

### 内存优化

#### 1. 只加载需要的表

根据不同引擎的 API，只加载当前场景或功能需要的表，避免一次性加载所有表。

#### 2. 及时卸载

当不再需要某些表时，及时卸载以释放内存。

### 构建优化

#### 1. 并行处理

XCell 支持并行处理多个文件，大幅提升构建速度。

#### 2. 缓存机制

合理使用缓存，避免重复处理。

---

## 引擎集成

XCell 支持与多种游戏引擎集成，详情请参考以下文档：

- [Unity 集成](./unity.md) - 详细介绍 XCell 与 Unity 引擎的集成
- [Cocos 集成](./cocos.md) - 详细介绍 XCell 与 Cocos 引擎的集成

---

## 总结

XCell 提供了丰富的高级功能，通过合理配置和优化，可以满足各种复杂项目的需求。

- 使用高级配置选项定制 XCell 行为
- 使用合表规则管理复杂表格
- 通过性能优化提升运行时和构建时效率
- 利用引擎集成提高开发效率

如有问题或建议，欢迎提交 Issue 或 PR！
