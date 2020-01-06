
# 快速开始

本教程将指导您从零开始使用 XCell 配置表管理工具。

## 环境准备

### 系统要求

- Windows 操作系统
- Rust 开发环境（如需从源码编译）

### 安装方式

#### 方式一：使用预编译版本

1. 从项目发布页面下载最新的 `xcell.exe`
2. 将 `xcell.exe` 放置到您的项目目录中

#### 方式二：从源码编译

1. 确保已安装 Rust 开发环境
2. 克隆或下载项目源码
3. 在项目根目录运行：

```bash
cargo build --release
```

4. 编译完成后，可执行文件位于 `target/release/xcell.exe`

## 项目初始化

### 创建项目结构

在您的工作目录中创建以下结构：

```
MyProject/
├── xcell.exe
├── ProjectConfig.toml
└── Tables/
    └── Hero.xlsx
```

### 创建配置文件

在项目根目录创建 `ProjectConfig.toml` 文件：

```toml
version = "0.1.0"

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

[unity]
enable = true
project = "./"
output = "Assets/Scripts/DataTable/Generated"
namespace = "DataTable.Generated"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"
support_clone = true
legacy_using = false
legacy_null_null = false

[unity.binary]
enable = true
output = "Assets/Tables/Generated"

[unity.xlua]
enable = false

[unity.xml]
enable = false
output = "Assets/Tables/Readable"

[unity.json]
enable = false
output = "Assets/Tables/Readable"

[unity.protobuf]
enable = false
```

## 创建第一个配置表

### Excel 表格结构

XCell 使用特定的 Excel 表格结构，前 3 行为表头，从第 4 行开始是数据：

| 行号 | 用途 | 说明 |
|------|------|------|
| 1 | 字段名 | 配置表的字段名称 |
| 2 | 数据类型 | 字段的数据类型 |
| 3 | 注释 | 字段的说明文字 |
| 4+ | 数据行 | 实际的配置数据 |

### 示例表格

创建 `Tables/Hero.xlsx` 表格：

| id | name | hp | attack | is_boss |
|----|------|----|--------|---------|
| int | string | int | int | bool |
| 英雄ID | 英雄名称 | 生命值 | 攻击力 | 是否Boss |
| 1 | 骑士 | 1000 | 100 | false |
| 2 | 法师 | 800 | 150 | false |
| 3 | 巨龙 | 5000 | 500 | true |

## 运行 XCell

### 基本命令

在项目根目录打开命令行，运行：

```bash
xcell.exe
```

XCell 会自动：
1. 扫描当前目录下的所有 Excel 表格
2. 验证表格数据
3. 生成对应的 C# 代码和二进制数据文件

### 命令行选项

```bash
xcell.exe [OPTIONS] [COMMAND]
```

#### 命令

- `check`: 检查配置表，但不导出任何文件
- `clear`: 清除数据库与缓存

#### 选项

- `--workspace <WORKSPACE>`: 手动设置工作目录，不输入表示当前目录
- `-w, --watch`: 启用监听模式，当有文件修改时只更新对应文件
- `--disable-xml`: 强制关闭 xml 生成
- `--disable-json`: 强制关闭 json 生成
- `-h, --help`: 显示帮助
- `-V, --version`: 显示版本

### 使用示例

#### 检查配置表

```bash
xcell.exe check
```

#### 启用监听模式

```bash
xcell.exe --watch
```

#### 清除缓存

```bash
xcell.exe clear
```

## 查看生成结果

运行成功后，您将看到以下生成的文件：

```
MyProject/
├── Assets/
│   ├── Scripts/DataTable/Generated/
│   │   ├── HeroTable.cs
│   │   └── DataTableManager.cs
│   └── Tables/Generated/
│       └── HeroTable.bytes
```

### 生成的 C# 代码示例

`HeroTable.cs` 将包含类似以下内容：

```csharp
namespace DataTable.Generated
{
    public partial class HeroTable
    {
        public readonly Dictionary<int, HeroElement> dict = new();

        public HeroElement GetElement(int id)
        {
            return dict.TryGetValue(id, out var item) ? item : null;
        }
    }

    public partial class HeroElement
    {
        public int id;
        public string name;
        public int hp;
        public int attack;
        public bool is_boss;
    }
}
```

## 下一步

- 查看 [使用场景索引](use-cases/index.md) 了解更多具体应用
- Unity 用户可以参考 [Unity 集成](use-cases/unity-integration.md) 文档
