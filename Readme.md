# XCell 配置表管理工具

XCell 是一个功能强大的配置表管理工具，采用 Rust 编写，支持多种表格格式和目标平台，为游戏和应用开发提供高效、灵活的配置管理解决方案。

## 主要特性

- **多格式支持**：支持 Excel (xlsx), CSV, TSV 等多种表格格式
- **多平台输出**：支持 Unity, Cocos, JSON, TypeScript, 二进制等多种输出格式
- **强大的类型系统**：支持多种数据类型，包括整数、小数、布尔值、字符串、数组、向量、颜色、时间等
- **合表功能**：支持行合并和列合并，灵活管理大型配置表
- **插件系统**：支持自定义代码生成器和表格格式
- **文件监控**：支持实时监控文件变更，自动重新生成代码
- **多语言支持**：内置多语言表管理功能
- **类型安全**：生成类型安全的代码，减少运行时错误

## 项目结构

```
XCell/
├── backends/          # 后端模块
│   ├── xcell/         # 命令行工具和主入口
│   ├── xcell-analyzer/ # 工作空间管理和表格分析
│   ├── xcell-generator/ # 代码生成器
│   ├── xcell-provider/ # 表格读取抽象
│   ├── xcell-types/    # 类型系统
│   ├── xcell-config/   # 配置管理
│   ├── xcell-macros/   # 宏定义
│   ├── xcell-plugin/   # 插件系统
│   └── xcell-wasi/     # WebAssembly 支持
├── frontends/         # 前端模块
│   ├── homepage/       # 项目官网
│   ├── xcell/          # 前端 SDK
│   ├── xcell-desktop/  # 桌面应用
│   └── xcell-h5/       # 网页应用
├── documentation/      # 文档
├── examples/           # 示例项目
└── scripts/            # 辅助脚本
```

## 核心模块

### 1. xcell-provider
- 提供统一的表格读取接口
- 支持多种表格格式（Excel、CSV、TSV）
- 屏蔽不同表格格式的差异

### 2. xcell-analyzer
- 管理工作空间和配置
- 扫描和识别表格文件
- 解析表格数据和识别表格类型
- 处理表格数据和链接枚举定义

### 3. xcell-generator
- 生成各种格式的代码和数据文件
- 支持多种目标平台
- 提供插件化的代码生成架构

### 4. xcell-types
- 定义所有数据类型
- 提供类型转换和解析
- 支持各种平台的类型映射

### 5. xcell-config
- 定义项目配置结构
- 提供配置解析和验证
- 支持不同平台的配置选项

## 快速开始

### 安装

1. 从 GitHub 下载最新版本的 XCell
2. 将 XCell 可执行文件添加到系统 PATH 中

### 基本使用

1. 创建项目配置文件 `ProjectSettings.toml`：

```toml
[project]
name = "MyProject"
include = ["**/*.csv", "**/*.xlsx"]

[cocos]
enable = true
output = "cocos"

[cocos.json]
enable = true
output = "cocos/json"
```

2. 运行 XCell 生成代码：

```bash
xcell.exe
```

3. 在项目中使用生成的代码：

```typescript
import { DataTableManager } from "./cocos/DataTableManager";

const manager = new DataTableManager();
await manager.loadAll();

// 使用数据
const item = manager.itemsTable.get(1);
console.log(item?.name);
```

## 配置选项

### 项目配置

```toml
[project]
name = "MyProject"          # 项目名称
include = ["**/*.csv"]      # 包含的文件模式
exclude = ["**/temp/**"]    # 排除的文件模式
```

### Cocos 配置

```toml
[cocos]
enable = true               # 是否启用 Cocos 代码生成
output = "cocos"           # 输出目录
namespace = "DataTable"     # 命名空间
manager = "DataTableManager" # 管理器类名
suffix_table = "Table"      # 表类后缀
suffix_element = "Element"  # 元素类后缀

[cocos.json]
enable = true               # 是否启用 JSON 数据生成
output = "cocos/json"       # JSON 输出目录
```

### Unity 配置

```toml
[unity]
enable = true               # 是否启用 Unity 代码生成
output = "unity"           # 输出目录
namespace = "DataTable"     # 命名空间
manager = "DataTableManager" # 管理器类名
suffix_table = "Table"      # 表类后缀
suffix_element = "Element"  # 元素类后缀

[unity.binary]
enable = true               # 是否启用二进制数据生成
output = "unity/binary"     # 二进制输出目录
```

## 合表功能

### 合表规则

```toml
[merge.10001]
mode = "row"                # 行合并
input = "Language_CN*"     # 输入文件模式
target = "Language_CN"     # 目标文件名

[merge.10002]
mode = "row"                # 行合并
input = "Language_EN*"     # 输入文件模式
target = "Language_EN"     # 目标文件名

[merge.20001]
mode = "column"             # 列合并
input = "Language*"        # 输入文件模式
target = "Language"        # 目标文件名
```

### 合表目录结构

```
LanguageTable/
  - CN/
    - Language_CN_UI.csv
    - Language_CN_Item.csv
  - EN/
    - Language_EN_UI.csv
    - Language_EN_Item.csv
```

## 支持的平台

- **Unity**：生成 C# 代码和二进制数据
- **Cocos**：生成 TypeScript 代码和 JSON 数据
- **JSON**：生成标准 JSON 数据文件
- **TypeScript**：生成 TypeScript 接口和类型定义
- **Binary**：生成高效的二进制数据文件

## 类型映射

### XCell 类型到 TypeScript 类型映射

| XCell 类型 | TypeScript 类型 |
|------------|----------------|
| bool | boolean |
| i8, i16, i32, i64 | number |
| u8, u16, u32, u64 | number |
| f32, f64 | number |
| string | string |
| color | string (十六进制) |
| vec2 | { x: number, y: number } |
| vec3 | { x: number, y: number, z: number } |
| vec4 | { x: number, y: number, z: number, w: number } |
| array<T> | T[] |
| enumerate | number |

### XCell 类型到 C# 类型映射

| XCell 类型 | C# 类型 |
|------------|---------|
| bool | bool |
| i8 | sbyte |
| i16 | short |
| i32 | int |
| i64 | long |
| u8 | byte |
| u16 | ushort |
| u32 | uint |
| u64 | ulong |
| f32 | float |
| f64 | double |
| string | string |
| color | UnityEngine.Color |
| vec2 | UnityEngine.Vector2 |
| vec3 | UnityEngine.Vector3 |
| vec4 | UnityEngine.Vector4 |
| array<T> | List<T> |
| enumerate | enum |

## 最佳实践

1. **使用元表格式**：对于复杂的配置表，推荐使用元表格式，支持更丰富的元数据定义
2. **合理使用合表规则**：对于大型项目，使用合表规则管理复杂表格
3. **优化数据结构**：根据实际使用场景选择合适的数据类型和结构
4. **定期清理**：定期清理不需要的配置表和数据，保持项目整洁
5. **使用监听模式**：开发时使用 `--watch` 参数，实时监控文件变更

## 示例项目

XCell 提供了多个示例项目，展示了如何在实际项目中使用 XCell：

- **slg**：策略游戏示例
- **rpg**：角色扮演游戏示例
- **galgame**：文字冒险游戏示例

## 文档

详细文档请参考 `documentation` 目录：

- **用户指南**：基础使用方法和配置选项
- **维护者指南**：架构设计和扩展开发
- **API 参考**：详细的 API 文档

## 贡献

欢迎贡献代码、报告问题和提出建议！请查看 `CONTRIBUTING.md` 文件了解如何参与贡献。

## 许可证

XCell 使用 MIT 许可证，详见 `LICENSE.md` 文件。