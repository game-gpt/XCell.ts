# Unreal Engine 集成

XCell 提供了与 Unreal Engine 的深度集成，支持生成 C++ 代码、二进制数据文件等多种格式。

## 配置选项

在 `XCell.toml` 文件中，Unreal Engine 集成配置位于 `[unreal]` 部分：

```toml
[unreal]
enable = true
project = "../"
output = "Source/DataTable/Generated"
namespace = "DataTable::Generated"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"

[unreal.binary]
enable = true
output = "Content/Tables/Generated"

[unreal.json]
enable = false
output = "Content/Tables/Readable"
```

## 生成的代码结构

### 表类结构

每个配置表会生成对应的 C++ 类，包含：
- 表数据类（Table）
- 元素数据类（Element）
- 管理器类（Manager）

### 示例生成代码结构：

```cpp
namespace DataTable::Generated {
    class BuffTable {
    public:
        const BuffElement* Get(int32 Id) const;
        bool TryGet(int32 Id, const BuffElement*& OutElement) const;
    
    private:
        TMap<int32, BuffElement> Data;
    };

    class BuffElement {
    public:
        int32 Id = 0;
        FString Name = "";
        int32 Value = 0;
        // ... 其他字段
    };

    class DataTableManager {
    public:
        BuffTable BuffTable;
        void LoadAll();
        void UnloadAll();
    };
}
```

## 数据加载

### 加载二进制数据：

```cpp
auto Manager = MakeShared<DataTableManager>();
Manager->LoadAll();
```

### 支持的功能：
- 异步加载
- 增量加载
- 内存管理
- 热更新支持

## 类型映射

XCell 类型到 C++ 类型映射：

| XCell 类型 | C++ 类型 |
|------------|---------|
| bool | bool |
| i8 | int8 |
| i16 | int16 |
| i32 | int32 |
| i64 | int64 |
| u8 | uint8 |
| u16 | uint16 |
| u32 | uint32 |
| u64 | uint64 |
| f32 | float |
| f64 | double |
| string | FString |
| color | FColor |
| vec2 | FVector2D |
| vec3 | FVector |
| vec4 | FVector4 |
| quaternion | FQuat |

## 性能优化

### 大表处理优化

1. **合理拆分大表**
   - 将大表按功能或模块拆分
   - 使用行合并规则在构建时合并
   - 保持开发时的可维护性和运行时的性能

2. **使用二进制格式**
   - 二进制格式加载速度最快
   - 生产环境推荐使用二进制格式
   - 开发环境可以使用 JSON 便于调试

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
   ```cpp
   // 只加载特定的表
   Manager->BuffTable.Load();
   Manager->ItemTable.Load();
   ```

2. **及时卸载**
   ```cpp
   // 卸载不需要的表
   Manager->BuffTable.Unload();
   ```

## 常见问题

### 生成的代码编译错误

- 检查 Unreal Engine 项目路径是否正确
- 检查命名空间是否与项目结构匹配
- 确保所有依赖项已正确安装

### 数据加载失败

- 检查二进制文件是否已生成
- 检查文件路径是否正确
- 确保表结构与数据类型匹配

## 最佳实践

1. **使用元表格式**：对于复杂的配置表，推荐使用元表格式，支持更丰富的元数据定义
2. **合理使用合表规则**：对于大型项目，使用合表规则管理复杂表格
3. **优化数据结构**：根据实际使用场景选择合适的数据类型和结构
4. **定期清理**：定期清理不需要的配置表和数据，保持项目整洁

## 示例项目

XCell 提供了 Unreal Engine 示例项目，展示了如何在实际项目中使用 XCell：

- 基本配置表使用
- 复杂数据结构
- 多语言支持
- 热更新集成

通过示例项目，您可以快速了解 XCell 在 Unreal Engine 中的最佳实践。
