# Godot Integration

XCell provides deep integration with the Godot engine, supporting GDScript code generation, JSON data files, and other formats.

## Configuration Options

In the `XCell.toml` file, Godot integration configuration is located in the `[godot]` section:

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

## Generated Code Structure

### Table Class Structure

Each configuration table generates corresponding GDScript classes, including:
- Table data class (Table)
- Element data class (Element)
- Manager class (Manager)

### Example Generated Code Structure:

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
# ... other fields

# DataTableManager.gd
class_name DataTableManager

var buff_table = BuffTable.new()

func load_all():
    # Load all table data
    pass

func unload_all():
    # Unload all table data
    pass
```

## Data Loading

### Loading JSON Data:

```gdscript
var manager = DataTableManager.new()
manager.load_all()

# Use data
var buff = manager.buff_table.get(1)
if buff:
    print(buff.name)
```

### Supported Features:
- Asynchronous loading
- Incremental loading
- Memory management
- Hot update support

## Type Mapping

XCell type to GDScript type mapping:

| XCell Type | GDScript Type |
| ---------- | ------------- |
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

## Performance Optimization

### Large Table Processing Optimization

1. **Reasonably Split Large Tables**
   - Split large tables by function or module
   - Use row merge rules to merge at build time
   - Maintain development-time maintainability and runtime performance

2. **Use Appropriate Data Format**
   - Use JSON format in development environment for debugging
   - Consider using binary format in production environment to improve loading speed

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
   ```gdscript
   # Only load specific tables
   manager.buff_table.load()
   manager.item_table.load()
   ```

2. **Unload Timely**
   ```gdscript
   # Unload unneeded tables
   manager.buff_table.unload()
   ```

## Common Issues

### Generated Code Compilation Errors

- Check if Godot project path is correct
- Check if namespace matches project structure
- Ensure all dependencies are correctly installed

### Data Loading Failure

- Check if JSON files are generated
- Check if file paths are correct
- Ensure table structure matches data types

## Best Practices

1. **Use Meta Table Format**: For complex configuration tables, meta table format is recommended, supporting richer metadata definitions
2. **Reasonably Use Merge Rules**: For large projects, use merge rules to manage complex tables
3. **Optimize Data Structures**: Choose appropriate data types and structures based on actual use cases
4. **Regular Cleanup**: Regularly clean up unneeded configuration tables and data to keep the project tidy

## Example Project

XCell provides a Godot example project demonstrating how to use XCell in actual projects:

- Basic configuration table usage
- Complex data structures
- Multi-language support
- Hot update integration

Through the example project, you can quickly learn the best practices of XCell in Godot.
