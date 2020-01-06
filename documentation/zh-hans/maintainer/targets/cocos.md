# Cocos 集成

> ✅ **可用**：Cocos 代码生成器当前可用，支持生成 TypeScript 代码和 JSON 数据文件。

XCell 提供了与 Cocos 引擎的深度集成，支持生成 TypeScript 代码、JSON 数据文件等多种格式。

## 配置选项

在 `ProjectSettings.toml` 文件中，Cocos 集成配置位于 `[cocos]` 部分：

```toml
[cocos]
enable = true
project = "../"                    # Cocos 项目目录
output = "assets/scripts/DataTable/Generated"  # TypeScript 代码输出目录
manager_name = "DataTableManager"  # 管理器类名
suffix_table = "Table"             # 表类后缀
instance_name = "dataTable"        # 实例名称
table_data_path = "assets/tables"  # 表数据路径前缀

# JSON 存储配置
[cocos.storage.Json]
enable = true
output = "assets/tables/Generated" # JSON 数据输出目录

# 开发环境存储配置（可选）
[cocos.storage_debug.Json]
enable = true
output = "assets/tables/Debug"
```

## 生成的代码结构

### 表类结构

每个配置表会生成对应的 TypeScript 类，包含：
- 表数据类（Table）
- 元素数据类（Element）
- 管理器类（Manager）

### 示例生成代码结构：

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
        // ... 其他字段
    }
    
    export class DataTableManager {
        public buffTable: BuffTable = new BuffTable();
        
        public async loadAll(): Promise<void> {
            // 加载所有表数据
        }
        
        public unloadAll(): void {
            // 卸载所有表数据
        }
    }
}
```

## 数据加载

### 加载 JSON 数据：

```typescript
import { DataTableManager } from "../scripts/DataTable/Generated/Manager";

const manager = new DataTableManager();
await manager.loadAll();

// 使用数据
const buff = manager.buffTable.get(1);
console.log(buff?.name);
```

### 支持的功能：
- 异步加载
- 增量加载
- 内存管理
- 热更新支持

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

## 配置字段说明

| 字段 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `enable` | `bool` | `false` | 是否启用 Cocos 代码生成 |
| `project` | `string` | `"../"` | Cocos 项目目录 |
| `output` | `string` | `""` | TypeScript 代码输出目录 |
| `manager_name` | `string` | `""` | 管理器类名 |
| `suffix_table` | `string` | `""` | 表类后缀 |
| `instance_name` | `string` | `""` | 实例名称 |
| `table_data_path` | `string` | `""` | 表数据路径前缀 |
| `storage` | `CocosStorage` | `Json` | 存储格式配置 |
| `storage_debug` | `Option<CocosStorage>` | `None` | 开发环境存储配置 |

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

- 检查 Cocos 项目路径是否正确
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
