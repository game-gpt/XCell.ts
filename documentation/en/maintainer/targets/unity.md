# Unity Integration

> ⚠️ **Note**: Unity code generator is currently disabled and under refactoring. The following documentation is for reference only, functionality may not be available.

XCell provides deep integration with the Unity engine, supporting C# code generation, binary data files, and other formats.

## Current Status

Unity code generator (`unity`) is currently disabled for the following reasons:

1. Architecture refactoring in progress
2. Type mapping system needs updating
3. Code generation templates need optimization

### Alternative Solutions

Before the Unity code generator is re-enabled, you can consider the following alternatives:

1. **Use JSON Data Format**: Export data via [JSON](json.md) generator, parse in Unity using `JsonUtility` or `Newtonsoft.Json`
2. **Use TypeScript Generator**: Generate type definitions via [TypeScript](typescript.md), manually write C# classes
3. **Use Dejavu Template**: Customize code generation via [Dejavu template engine](../architecture/index.md#code-generation)

## Configuration Options (Reference)

In the `ProjectSettings.toml` file, Unity integration configuration is located in the `[unity]` section:

```toml
[unity]
enable = false  # Currently disabled
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

## Expected Generated Code Structure

### Table Class Structure

Each configuration table generates corresponding C# classes, including:
- Table data class (Table)
- Element data class (Element)
- Manager class (Manager)

### Example Generated Code Structure:

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
        // ... other fields
    }

    public class DataTableManager
    {
        public BuffTable BuffTable { get; }
        public void LoadAll();
        public void UnloadAll();
    }
}
```

## Type Mapping

XCell type to C# type mapping:

| XCell Type | C# Type |
| ---------- | ------- |
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

## Common Issues

### Why is Unity Generator Disabled?

Unity code generator is being refactored to support better type system and code generation architecture. It is expected to be re-enabled in future versions.

### How to Get Latest Status?

Please follow project update logs or check code changes in the `backends/xcell-generator/src/codegen/unity/` directory.

## Best Practices

1. **Use Meta Table Format**: For complex configuration tables, meta table format is recommended, supporting richer metadata definitions
2. **Reasonably Use Merge Rules**: For large projects, use merge rules to manage complex tables
3. **Optimize Data Structures**: Choose appropriate data types and structures based on actual use cases
4. **Regular Cleanup**: Regularly clean up unneeded configuration tables and data to keep the project tidy
