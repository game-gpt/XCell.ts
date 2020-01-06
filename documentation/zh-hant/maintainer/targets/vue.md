# Vue 集成

XCell 提供了與 Vue 框架的深度集成，支援生成 TypeScript 程式碼、JSON 資料檔案等多种格式。

## 設定選項

在 `XCell.toml` 檔案中，Vue 集成設定位於 `[vue]` 部分：

```toml
[vue]
enable = true
project = "../"
output = "src/data-table/generated"
namespace = "DataTable"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"

[vue.json]
enable = true
output = "public/tables"

[vue.graphql]
enable = false
output = "src/data-table/graphql"
```

## 生成的程式碼結構

### 資料表类結構

每個設定資料表會生成對應的 TypeScript 类，包含：
- 資料表資料类（Table）
- 元素資料类（Element）
- 管理器类（Manager）
- Vue 组合式 API 函式

### 範例生成程式碼結構：

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
    // ... 其他欄位
}

// DataTableManager.ts
export class DataTableManager {
    public buffTable: BuffTable = new BuffTable();
    
    public async loadAll(): Promise<void> {
        // 載入所有資料表資料
    }
}

// useDataTable.ts
export function useDataTable() {
    const manager = ref<DataTableManager | null>(null);
    const loading = ref(true);
    
    onMounted(async () => {
        const newManager = new DataTableManager();
        await newManager.loadAll();
        manager.value = newManager;
        loading.value = false;
    });
    
    return { manager, loading };
}
```

## 資料載入

### 在 Vue 元件中使用：

```vue
<template>
  <div>
    <h1>Buff List</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="!manager">Failed to load data</div>
    <div v-else>
      <div v-for="buff in buffs" :key="buff.id">
        <h2>{{ buff.name }}</h2>
        <p>Value: {{ buff.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataTable } from './data-table/generated/useDataTable';

const { manager, loading } = useDataTable();

const buffs = computed(() => {
  if (!manager.value) return [];
  return Array.from(manager.value.buffTable.data.values());
});
</script>
```

### 支援的功能：
- 非同步載入
- 增量載入
- 記憶體管理
- 熱更新支援
- Vue 组合式 API 集成

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

## 效能最佳化

### 大資料表處理最佳化

1. **合理拆分大資料表**
   - 將大資料表按功能或模組拆分
   - 使用行合併規則在建置时合併
   - 保持開發时的可维護性和執行階段的效能

2. **使用合适的資料格式**
   - 開發環境使用 JSON 格式便於偵錯
   - 生產環境可考虑使用壓縮格式提升載入速度

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

- 檢查 Vue 專案路徑是否正确
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
5. **使用 Vue 组合式 API**：利用生成的组合式 API 函式简化資料載入和狀態管理

## 範例專案

XCell 提供了 Vue 範例專案，展示了如何在實际專案中使用 XCell：

- 基本設定資料表使用
- 複雜資料結構
- 多語言支援
- 熱更新集成
- Vue 组合式 API 使用

通过範例專案，您可以快速了解 XCell 在 Vue 中的最佳做法。
