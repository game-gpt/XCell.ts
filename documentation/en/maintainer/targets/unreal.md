# Unreal Engine Integration

XCell provides deep integration with Unreal Engine, supporting C++ code generation, binary data files, and other formats.

## Configuration Options

In the `XCell.toml` file, Unreal Engine integration configuration is located in the `[unreal]` section:

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

## Generated Code Structure

### Table Class Structure

Each configuration table generates corresponding C++ classes, including:
- Table data class (Table)
- Element data class (Element)
- Manager class (Manager)

### Example Generated Code Structure:

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
        // ... other fields
    };

    class DataTableManager {
    public:
        BuffTable BuffTable;
        void LoadAll();
        void UnloadAll();
    };
}
```

## Data Loading

### Loading Binary Data:

```cpp
auto Manager = MakeShared<DataTableManager>();
Manager->LoadAll();
```

### Supported Features:
- Asynchronous loading
- Incremental loading
- Memory management
- Hot update support

## Type Mapping

XCell type to C++ type mapping:

| XCell Type | C++ Type |
| ---------- | -------- |
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

## Performance Optimization

### Large Table Processing Optimization

1. **Reasonably Split Large Tables**
   - Split large tables by function or module
   - Use row merge rules to merge at build time
   - Maintain development-time maintainability and runtime performance

2. **Use Binary Format**
   - Binary format has the fastest loading speed
   - Binary format is recommended for production environments
   - JSON can be used in development environments for debugging

### Incremental Update Optimization

1. **Watch Mode**
   Use watch mode:
   ```bash
   xcell.exe --watch
   ```
   Watch mode features:
   - Only regenerate changed files
   - Significantly improves development efficiency
   - Supports real-time preview

2. **Reasonable Watch Configuration**
   Configure reasonable include/exclude patterns to reduce the number of watched files.

### Memory Optimization

1. **Only Load Needed Tables**
   ```cpp
   // Only load specific tables
   Manager->BuffTable.Load();
   Manager->ItemTable.Load();
   ```

2. **Unload Timely**
   ```cpp
   // Unload unneeded tables
   Manager->BuffTable.Unload();
   ```

## Common Issues

### Generated Code Compilation Errors

- Check if Unreal Engine project path is correct
- Check if namespace matches project structure
- Ensure all dependencies are correctly installed

### Data Loading Failure

- Check if binary files are generated
- Check if file paths are correct
- Ensure table structure matches data types

## Best Practices

1. **Use Meta Table Format**: For complex configuration tables, meta table format is recommended, supporting richer metadata definitions
2. **Reasonably Use Merge Rules**: For large projects, use merge rules to manage complex tables
3. **Optimize Data Structures**: Choose appropriate data types and structures based on actual use cases
4. **Regular Cleanup**: Regularly clean up unneeded configuration tables and data to keep the project tidy

## Example Project

XCell provides an Unreal Engine example project demonstrating how to use XCell in actual projects:

- Basic configuration table usage
- Complex data structures
- Multi-language support
- Hot update integration

Through the example project, you can quickly learn the best practices of XCell in Unreal Engine.
