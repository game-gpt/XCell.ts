# Godot 集成

XCell 提供了与 Godot 引擎的深度集成，支持生成 GDScript 代码、JSON 数据文件等多种格式。

## 配置选项

在 `XCell.toml` 文件中，Godot 集成配置位于 `[godot]` 部分：

```toml
[godot]
enable = true
project = "../"
output = "scripts/DataTable/Generated"
namespace = "DataTable"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"

[godot.json]
enable = true
output = "res://tables/Generated"

[godot.binary]
enable = false
output = "res://tables/Binary"
```

## 生成的代码结构

### 表类结构

每个配置表会生成对应的 GDScript 类，包含：
- 表数据类（Table）
- 元素数据类（Element）
- 管理器类（Manager）

### 示例生成代码结构：

```gdscript
# BuffTable.gd
class_name BuffTable

var data = {}

func get(id):
    return data.get(id)

func try_get(id):
    return data.get(id, null)

func load(data_array):
    for item in data_array:
        var element = BuffElement.new()
        element.id = item.id
        element.name = item.name
        element.value = item.value
        data[item.id] = element

# BuffElement.gd
class_name BuffElement

var id = 0
var name = ""
var value = 0
# ... 其他字段

# DataTableManager.gd
class_name DataTableManager

var buff_table = BuffTable.new()

func load_all():
    # 加载所有表数据
    pass

func unload_all():
    # 卸载所有表数据
    pass
```

## 数据加载

### 加载 JSON 数据：

```gdscript
var manager = DataTableManager.new()
manager.load_all()

# 使用数据
var buff = manager.buff_table.get(1)
if buff:
    print(buff.name)
```

### 支持的功能：
- 异步加载
- 增量加载
- 内存管理
- 热更新支持

## 类型映射

XCell 类型到 GDScript 类型映射：

| XCell 类型 | GDScript 类型 |
|------------|-------------|
| bool | bool |
| i8 | int |
| i16 | int |
| i32 | int |
| i64 | int |
| u8 | int |
| u16 | int |
| u32 | int |
| u64 | int |
| f32 | float |
| f64 | float |
| string | String |
| color | Color |
| vec2 | Vector2 |
| vec3 | Vector3 |
| vec4 | Vector4 |

## 性能优化

### 大表处理优化

1. **合理拆分大表**
   - 将大表按功能或模块拆分
   - 使用行合并规则在构建时合并
   - 保持开发时的可维护性和运行时的性能

2. **使用合适的数据格式**
   - 开发环境使用 JSON 格式便于调试
   - 生产环境可考虑使用二进制格式提升加载速度

### 增量更新优化

1. **监听模式**
   使用监听模式：
   ```bash
   xcell.exe --watch
   ```
   监听模式特点：
   - 只重新生成变更的文件
   - 大幅提升开发效率
   - 支持实时预览

2. **合理配置监听**
   配置合理的 include/exclude 模式，减少监听文件数量。

### 内存优化

1. **只加载需要的表**
   ```gdscript
   # 只加载特定的表
   manager.buff_table.load()
   manager.item_table.load()
   ```

2. **及时卸载**
   ```gdscript
   # 卸载不需要的表
   manager.buff_table.unload()
   ```

## 常见问题

### 生成的代码编译错误

- 检查 Godot 项目路径是否正确
- 检查命名空间是否与项目结构匹配
- 确保所有依赖项已正确安装

### 数据加载失败

- 检查 JSON 文件是否已生成
- 检查文件路径是否正确
- 确保表结构与数据类型匹配

## 最佳实践

1. **使用元表格式**：对于复杂的配置表，推荐使用元表格式，支持更丰富的元数据定义
2. **合理使用合表规则**：对于大型项目，使用合表规则管理复杂表格
3. **优化数据结构**：根据实际使用场景选择合适的数据类型和结构
4. **定期清理**：定期清理不需要的配置表和数据，保持项目整洁

## 示例项目

XCell 提供了 Godot 示例项目，展示了如何在实际项目中使用 XCell：

- 基本配置表使用
- 复杂数据结构
- 多语言支持
- 热更新集成

通过示例项目，您可以快速了解 XCell 在 Godot 中的最佳实践。
