# Unity 集成

> ⚠️ **注意**：Unity 代码生成器当前处于禁用状态，正在重构中。以下文档仅供参考，功能可能不可用。

XCell 提供了与 Unity 引擎的深度集成，支持生成 C# 代码、二进制数据文件等多种格式。

## 当前状态

Unity 代码生成器 (`unity`) 当前处于禁用状态，原因如下：

1. 正在进行架构重构
2. 类型映射系统需要更新
3. 代码生成模板需要优化

### 替代方案

在 Unity 代码生成器重新启用之前，您可以考虑以下替代方案：

1. **使用 JSON 数据格式**：通过 [JSON](json.md) 生成器导出数据，在 Unity 中使用 `JsonUtility` 或 `Newtonsoft.Json` 解析
2. **使用 TypeScript 生成器**：通过 [TypeScript](typescript.md) 生成类型定义，手动编写 C# 类
3. **使用 Dejavu 模板**：通过 [Dejavu 模板引擎](../architecture/index.md#代码生成) 自定义代码生成

## 配置选项（参考）

在 `ProjectSettings.toml` 文件中，Unity 集成配置位于 `[unity]` 部分：

```toml
[unity]
enable = false  # 当前禁用
project = "../"
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
```

## 预期生成的代码结构

### 表类结构

每个配置表会生成对应的 C# 类，包含：
- 表数据类（Table）
- 元素数据类（Element）
- 管理器类（Manager）

### 示例生成代码结构：

```csharp
namespace DataTable.Generated
{
    public class BuffTable
    {
        public Dictionary<int, BuffElement> Data { get; }
        public BuffElement Get(int id);
        public bool TryGet(int id, out BuffElement element);
    }

    public class BuffElement
    {
        public int Id { get; }
        public string Name { get; }
        public int Value { get; }
        // ... 其他字段
    }

    public class DataTableManager
    {
        public BuffTable BuffTable { get; }
        public void LoadAll();
        public void UnloadAll();
    }
}
```

## 类型映射

XCell 类型到 C# 类型映射：

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
| quaternion | UnityEngine.Quaternion |

## 常见问题

### 为什么 Unity 生成器被禁用？

Unity 代码生成器正在进行重构，以支持更好的类型系统和代码生成架构。预计将在未来版本中重新启用。

### 如何获取最新状态？

请关注项目更新日志或查看 `backends/xcell-generator/src/codegen/unity/` 目录下的代码变更。

## 最佳实践

1. **使用元表格式**：对于复杂的配置表，推荐使用元表格式，支持更丰富的元数据定义
2. **合理使用合表规则**：对于大型项目，使用合表规则管理复杂表格
3. **优化数据结构**：根据实际使用场景选择合适的数据类型和结构
4. **定期清理**：定期清理不需要的配置表和数据，保持项目整洁
