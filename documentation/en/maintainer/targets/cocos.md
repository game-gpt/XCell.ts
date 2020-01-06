# Cocos Integration

> ✅ **Available**: Cocos code generator is currently available, supporting TypeScript code and JSON data file generation.

XCell provides deep integration with the Cocos engine, supporting TypeScript code generation, JSON data files, and other formats.

## Configuration Options

In the `ProjectSettings.toml` file, Cocos integration configuration is located in the `[cocos]` section:

```toml
[cocos]
enable = true
project = "../"                    # Cocos project directory
output = "assets/scripts/DataTable/Generated"  # TypeScript code output directory
manager_name = "DataTableManager"  # Manager class name
suffix_table = "Table"             # Table class suffix
instance_name = "dataTable"        # Instance name
table_data_path = "assets/tables"  # Table data path prefix

# JSON storage configuration
[cocos.storage.Json]
enable = true
output = "assets/tables/Generated" # JSON data output directory

# Development environment storage configuration (optional)
[cocos.storage_debug.Json]
enable = true
output = "assets/tables/Debug"
```

## Generated Code Structure

### Table Class Structure

Each configuration table generates corresponding TypeScript classes, including:
- Table data class (Table)
- Element data class (Element)
- Manager class (Manager)

### Example Generated Code Structure:

```typescript
namespace DataTable.Generated {
    export class BuffTable {
        private data: Map<number, BuffElement> = new Map();
        
        public get(id: number): BuffElement {
            return this.data.get(id);
        }
        
        public tryGet(id: number): BuffElement | undefined {
            return this.data.get(id);
        }
        
        public load(data: any[]): void {
            for (const item of data) {
                const element = new BuffElement();
                element.id = item.id;
                element.name = item.name;
                element.value = item.value;
                this.data.set(item.id, element);
            }
        }
    }
    
    export class BuffElement {
        public id: number = 0;
        public name: string = "";
        public value: number = 0;
        // ... other fields
    }
    
    export class DataTableManager {
        public buffTable: BuffTable = new BuffTable();
        
        public async loadAll(): Promise<void> {
            // Load all table data
        }
        
        public unloadAll(): void {
            // Unload all table data
        }
    }
}
```

## Data Loading

### Loading JSON Data:

```typescript
import { DataTableManager } from "../scripts/DataTable/Generated/Manager";

const manager = new DataTableManager();
await manager.loadAll();

// Use data
const buff = manager.buffTable.get(1);
console.log(buff?.name);
```

### Supported Features:
- Asynchronous loading
- Incremental loading
- Memory management
- Hot update support

## Type Mapping

XCell type to TypeScript type mapping:

| XCell Type | TypeScript Type |
| ---------- | --------------- |
| bool | boolean |
| i8 | number |
| i16 | number |
| i32 | number |
| i64 | number |
| u8 | number |
| u16 | number |
| u32 | number |
| u64 | number |
| f32 | number |
| f64 | number |
| string | string |
| color | string (hexadecimal) |
| vec2 | { x: number, y: number } |
| vec3 | { x: number, y: number, z: number } |
| vec4 | { x: number, y: number, z: number, w: number } |

## Configuration Field Description

| Field | Type | Default Value | Description |
| ----- | ---- | ------------- | ----------- |
| `enable` | `bool` | `false` | Whether to enable Cocos code generation |
| `project` | `string` | `"../"` | Cocos project directory |
| `output` | `string` | `""` | TypeScript code output directory |
| `manager_name` | `string` | `""` | Manager class name |
| `suffix_table` | `string` | `""` | Table class suffix |
| `instance_name` | `string` | `""` | Instance name |
| `table_data_path` | `string` | `""` | Table data path prefix |
| `storage` | `CocosStorage` | `Json` | Storage format configuration |
| `storage_debug` | `Option<CocosStorage>` | `None` | Development environment storage configuration |

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
   ```typescript
   // Only load specific tables
   await manager.buffTable.load();
   await manager.itemTable.load();
   ```

2. **Unload Timely**
   ```typescript
   // Unload unneeded tables
   manager.buffTable.unload();
   ```

## Common Issues

### Generated Code Compilation Errors

- Check if Cocos project path is correct
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
