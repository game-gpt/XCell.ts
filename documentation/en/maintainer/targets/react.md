# React Integration

XCell provides deep integration with the React framework, supporting TypeScript code generation, JSON data files, and other formats.

## Configuration Options

In the `XCell.toml` file, React integration configuration is located in the `[react]` section:

```toml
[react]
enable = true
project = "../"
output = "src/data-table/generated"
namespace = "DataTable"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"

[react.json]
enable = true
output = "public/tables"

[react.graphql]
enable = false
output = "src/data-table/graphql"
```

## Generated Code Structure

### Table Class Structure

Each configuration table generates corresponding TypeScript classes, including:
- Table data class (Table)
- Element data class (Element)
- Manager class (Manager)
- React Hooks

### Example Generated Code Structure:

```typescript
// BuffTable.ts
export class BuffTable {
    private data: Map<number, BuffElement> = new Map();
    
    public get(id: number): BuffElement | undefined {
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

// BuffElement.ts
export class BuffElement {
    public id: number = 0;
    public name: string = "";
    public value: number = 0;
    // ... other fields
}

// DataTableManager.ts
export class DataTableManager {
    public buffTable: BuffTable = new BuffTable();
    
    public async loadAll(): Promise<void> {
        // Load all table data
    }
}

// useDataTable.ts
export function useDataTable() {
    const [manager, setManager] = useState<DataTableManager | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadData = async () => {
            const newManager = new DataTableManager();
            await newManager.loadAll();
            setManager(newManager);
            setLoading(false);
        };
        
        loadData();
    }, []);
    
    return { manager, loading };
}
```

## Data Loading

### Using in React Components:

```typescript
import { useDataTable } from './data-table/generated/useDataTable';

function BuffList() {
    const { manager, loading } = useDataTable();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!manager) {
        return <div>Failed to load data</div>;
    }
    
    return (
        <div>
            <h1>Buff List</h1>
            {Array.from(manager.buffTable.data.values()).map(buff => (
                <div key={buff.id}>
                    <h2>{buff.name}</h2>
                    <p>Value: {buff.value}</p>
                </div>
            ))}
        </div>
    );
}
```

### Supported Features:
- Asynchronous loading
- Incremental loading
- Memory management
- Hot update support
- React Hooks integration

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

## Performance Optimization

### Large Table Processing Optimization

1. **Reasonably Split Large Tables**
   - Split large tables by function or module
   - Use row merge rules to merge at build time
   - Maintain development-time maintainability and runtime performance

2. **Use Appropriate Data Format**
   - Use JSON format in development environment for debugging
   - Consider using compressed format in production environment to improve loading speed

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

- Check if React project path is correct
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
5. **Use React Hooks**: Utilize generated React Hooks to simplify data loading and state management

## Example Project

XCell provides a React example project demonstrating how to use XCell in actual projects:

- Basic configuration table usage
- Complex data structures
- Multi-language support
- Hot update integration
- React Hooks usage

Through the example project, you can quickly learn the best practices of XCell in React.
