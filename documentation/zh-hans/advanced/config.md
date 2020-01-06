# 配置文件

XCell 使用 TOML 格式的配置文件来管理项目设置，配置文件命名为 `XCell.toml`，位于项目根目录。

## 基本配置

| 配置项 | 类型 | 说明 | 默认值 |
|--------|------|------|--------|
| version | string | 配置文件版本号 | "0.0.0" |
| include | string | 包含的 Excel 文件路径模式（优先级最高） | "*.xlsx" |
| exclude | string | 排除的 Excel 文件路径模式（优先级低于 include） | "" |

### 行列配置 (line)

定义表格中各信息所在的行号（从 1 开始）。

| 配置项 | 类型 | 说明 | 默认值 |
|--------|------|------|--------|
| line.field | int | 字段名所在行 | 1 |
| line.type | int | 数据类型所在行 | 2 |
| line.comment | int | 注释所在行 | 3 |
| line.data | int | 数据起始行 | 4 |

#### 旧表迁移

XCell 默认的表格格式为：

| 行号 | 内容 |
|------|------|
| 第 1 行 | 字段注释 |
| 第 2 行 | 字段名 |
| 第 3 行 | 字段类型 |
| 第 4 行+ | 数据行 |

如果您的旧表格式不同，可通过 line 映射调整。例如旧表格式为：

| 行号 | 内容 |
|------|------|
| 第 1 行 | 字段名 |
| 第 2 行 | 字段类型 |
| 第 3 行+ | 数据行 |

配置如下：

```toml
line.field = 1
line.type = 2
line.comment = 0  # 无注释行
line.data = 3
```

> 注：`line.comment = 0` 表示无注释行。

### 类型解析配置 (type)

配置各种数据类型的解析规则。

#### 布尔类型 (bool)

| 配置项 | 类型 | 说明 |
|--------|------|------|
| type.bool.accept | array[string] | 接受为 true 的值列表 |
| type.bool.reject | array[string] | 接受为 false 的值列表 |

示例：
```toml
[type.bool]
accept = ["true", "√", "是", "1"]
reject = ["false", "x", "否", "0"]
```

### Unity 代码生成配置 (unity)

配置 C# 代码生成相关设置。

| 配置项 | 类型 | 说明 | 默认值 |
|--------|------|------|--------|
| unity.enable | bool | 是否启用 Unity 代码生成 | true |
| unity.project | string | Unity 项目路径 | "../" |
| unity.output | string | 代码输出目录 | "Assets/Scripts/DataTable/Generated" |
| unity.namespace | string | 生成代码的命名空间 | "DataTable.Generated" |
| unity.manager | string | 管理器类名 | "DataTableManager" |
| unity.suffix_table | string | 表格类后缀 | "Table" |
| unity.suffix_element | string | 元素类后缀 | "Element" |
| unity.support_clone | bool | 是否支持克隆 | true |
| unity.legacy_using | bool | 是否使用旧版 using | false |
| unity.legacy_null_null | bool | 是否使用旧版 null 处理 | false |

### 数据输出格式配置

配置不同格式的数据文件输出。

#### Binary 格式

| 配置项 | 类型 | 说明 | 默认值 |
|--------|------|------|--------|
| unity.binary.enable | bool | 是否启用 Binary 输出 | true |
| unity.binary.output | string | Binary 文件输出目录 | "Assets/Tables/Generated" |

#### XML 格式

| 配置项 | 类型 | 说明 | 默认值 |
|--------|------|------|--------|
| unity.xml.enable | bool | 是否启用 XML 输出 | false |
| unity.xml.output | string | XML 文件输出目录 | "Assets/Tables/Readable" |

#### JSON 格式

| 配置项 | 类型 | 说明 | 默认值 |
|--------|------|------|--------|
| unity.json.enable | bool | 是否启用 JSON 输出 | false |
| unity.json.output | string | JSON 文件输出目录 | "Assets/Tables/Readable" |

#### 其他格式

- **xlua**: Lua 代码生成
- **protobuf**: Protobuf 格式输出

## 使用说明

1. 在项目根目录创建 `XCell.toml` 文件
2. 根据需要修改配置项
3. 运行 XCell 工具时会自动加载配置
4. 表格配置可覆盖全局配置（创建同名 `.toml` 文件）
