# Cocos 集成

> ✅ **可用**：Cocos 程式碼產生器當前可用，支援生成 TypeScript 程式碼和 JSON 資料檔案。

XCell 提供了與 Cocos 引擎的深度集成，支援生成 TypeScript 程式碼、JSON 資料檔案等多种格式。

## 設定選項

在 `ProjectSettings.toml` 檔案中，Cocos 集成設定位於 `[cocos]` 部分：

```toml
[cocos]
enable = true
project = "../"                    # Cocos 專案目錄
output = "assets/scripts/DataTable/Generated"  # TypeScript 程式碼輸出目錄
manager_name = "DataTableManager"  # 管理器類別名
suffix_table = "Table"             # 資料表类後缀
instance_name = "dataTable"        # 實例名稱
table_data_path = "assets/tables"  # 資料表資料路徑前缀

# JSON 儲存設定
[cocos.storage.Json]
enable = true
output = "assets/tables/Generated" # JSON 資料輸出目錄

# 開發環境儲存設定（可选）
[cocos.storage_debug.Json]
enable = true
output = "assets/tables/Debug"
```

## 生成的程式碼結構

### 資料表类結構

每個設定資料表會生成對應的 TypeScript 类，包含：
- 資料表資料类（Table）
- 元素資料类（Element）
- 管理器类（Manager）

### 範例生成程式碼結構：

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
        // ... 其他欄位
    }
    
    export class DataTableManager {
        public buffTable: BuffTable = new BuffTable();
        
        public async loadAll(): Promise<void> {
            // 載入所有資料表資料
        }
        
        public unloadAll(): void {
            // 卸載所有資料表資料
        }
    }
}
```

## 資料載入

### 載入 JSON 資料：

```typescript
import { DataTableManager } from "../scripts/DataTable/Generated/Manager";

const manager = new DataTableManager();
await manager.loadAll();

// 使用資料
const buff = manager.buffTable.get(1);
console.log(buff?.name);
```

### 支援的功能：
- 非同步載入
- 增量載入
- 記憶體管理
- 熱更新支援

## 類型對應

XCell 類型到 TypeScript 類型對應：

| XCell 類型 | TypeScript 類型 |
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
| color | string (十六進位) |
| vec2 | { x: number, y: number } |
| vec3 | { x: number, y: number, z: number } |
| vec4 | { x: number, y: number, z: number, w: number } |

## 設定欄位說明

| 欄位 | 類型 | 預設值 | 描述 |
|------|------|--------|------|
| `enable` | `bool` | `false` | 是否啟用 Cocos 程式碼產生 |
| `project` | `string` | `"../"` | Cocos 專案目錄 |
| `output` | `string` | `""` | TypeScript 程式碼輸出目錄 |
| `manager_name` | `string` | `""` | 管理器類別名 |
| `suffix_table` | `string` | `""` | 資料表类後缀 |
| `instance_name` | `string` | `""` | 實例名稱 |
| `table_data_path` | `string` | `""` | 資料表資料路徑前缀 |
| `storage` | `CocosStorage` | `Json` | 儲存格式設定 |
| `storage_debug` | `Option<CocosStorage>` | `None` | 開發環境儲存設定 |

## 效能最佳化

### 大資料表處理最佳化

1. **合理拆分大資料表**
   - 將大資料表按功能或模組拆分
   - 使用行合併規則在建置时合併
   - 保持開發时的可维護性和執行階段的效能

2. **使用合适的資料格式**
   - 開發環境使用 JSON 格式便於偵錯
   - 生產環境可考虑使用二進位格式提升載入速度

### 增量更新最佳化

1. **監聽模式**
   使用監聽模式：
   ```bash
   xcell.exe --watch
   ```
   監聽模式特点：
   - 只重新生成變更的檔案
   - 大幅提升開發效率
   - 支援即時預覽

2. **合理設定監聽**
   設定合理的 include/exclude 模式，減少監聽檔案數量。

### 記憶體最佳化

1. **只載入需要的資料表**
   ```typescript
   // 只載入特定的資料表
   await manager.buffTable.load();
   await manager.itemTable.load();
   ```

2. **及时卸載**
   ```typescript
   // 卸載不需要的資料表
   manager.buffTable.unload();
   ```

## 常見問題

### 生成的程式碼編譯錯誤

- 檢查 Cocos 專案路徑是否正确
- 檢查命名空間是否與專案結構匹配
- 確保所有相依項目已正确安裝

### 資料載入失敗

- 檢查 JSON 檔案是否已生成
- 檢查檔案路徑是否正确
- 確保資料表結構與資料類型匹配

## 最佳做法

1. **使用元資料表格式**：對於複雜的設定資料表，推荐使用元資料表格式，支援更豐富的元資料定義
2. **合理使用合資料表規則**：對於大型專案，使用合資料表規則管理複雜資料表格
3. **最佳化資料結構**：根据實际使用場景選取合适的資料類型和結構
4. **定期清理**：定期清理不需要的設定資料表和資料，保持專案整洁
