# React 集成

XCell 提供了与 React 框架的深度集成，支持生成 TypeScript 代码、JSON 数据文件等多种格式。

## 配置选项

在 `XCell.toml` 文件中，React 集成配置位于 `[react]` 部分：

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

## 生成的代码结构

### 表类结构

每个配置表会生成对应的 TypeScript 类，包含：
- 表数据类（Table）
- 元素数据类（Element）
- 管理器类（Manager）
- React 钩子（Hooks）

### 示例生成代码结构：

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
    // ... 其他字段
}

// DataTableManager.ts
export class DataTableManager {
    public buffTable: BuffTable = new BuffTable();
    
    public async loadAll(): Promise<void> {
        // 加载所有表数据
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

## 数据加载

### 在 React 组件中使用：

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

### 支持的功能：
- 异步加载
- 增量加载
- 内存管理
- 热更新支持
- React 钩子集成

## 类型映射

XCell 类型到 TypeScript 类型映射：

| XCell 类型 | TypeScript 类型 |
|------------|----------------|
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
| color | string (十六进制) |
| vec2 | { x: number, y: number } |
| vec3 | { x: number, y: number, z: number } |
| vec4 | { x: number, y: number, z: number, w: number } |

## 性能优化

### 大表处理优化

1. **合理拆分大表**
   - 将大表按功能或模块拆分
   - 使用行合并规则在构建时合并
   - 保持开发时的可维护性和运行时的性能

2. **使用合适的数据格式**
   - 开发环境使用 JSON 格式便于调试
   - 生产环境可考虑使用压缩格式提升加载速度

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
   ```typescript
   // 只加载特定的表
   await manager.buffTable.load();
   await manager.itemTable.load();
   ```

2. **及时卸载**
   ```typescript
   // 卸载不需要的表
   manager.buffTable.unload();
   ```

## 常见问题

### 生成的代码编译错误

- 检查 React 项目路径是否正确
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
5. **使用 React 钩子**：利用生成的 React 钩子简化数据加载和状态管理

## 示例项目

XCell 提供了 React 示例项目，展示了如何在实际项目中使用 XCell：

- 基本配置表使用
- 复杂数据结构
- 多语言支持
- 热更新集成
- React 钩子使用

通过示例项目，您可以快速了解 XCell 在 React 中的最佳实践。
