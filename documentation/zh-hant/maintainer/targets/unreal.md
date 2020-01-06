# Unreal Engine 集成

XCell 提供了與 Unreal Engine 的深度集成，支援生成 C++ 程式碼、二進位資料檔案等多种格式。

## 設定選項

在 `XCell.toml` 檔案中，Unreal Engine 集成設定位於 `[unreal]` 部分：

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

## 生成的程式碼結構

### 資料表类結構

每個設定資料表會生成對應的 C++ 类，包含：
- 資料表資料类（Table）
- 元素資料类（Element）
- 管理器类（Manager）

### 範例生成程式碼結構：

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
        // ... 其他欄位
    };

    class DataTableManager {
    public:
        BuffTable BuffTable;
        void LoadAll();
        void UnloadAll();
    };
}
```

## 資料載入

### 載入二進位資料：

```cpp
auto Manager = MakeShared<DataTableManager>();
Manager->LoadAll();
```

### 支援的功能：
- 非同步載入
- 增量載入
- 記憶體管理
- 熱更新支援

## 類型對應

XCell 類型到 C++ 類型對應：

| XCell 類型 | C++ 類型 |
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

## 效能最佳化

### 大資料表處理最佳化

1. **合理拆分大資料表**
   - 將大資料表按功能或模組拆分
   - 使用行合併規則在建置时合併
   - 保持開發时的可维護性和執行階段的效能

2. **使用二進位格式**
   - 二進位格式載入速度最快
   - 生產環境推荐使用二進位格式
   - 開發環境可以使用 JSON 便於偵錯

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
   ```cpp
   // 只載入特定的資料表
   Manager->BuffTable.Load();
   Manager->ItemTable.Load();
   ```

2. **及时卸載**
   ```cpp
   // 卸載不需要的資料表
   Manager->BuffTable.Unload();
   ```

## 常見問題

### 生成的程式碼編譯錯誤

- 檢查 Unreal Engine 專案路徑是否正确
- 檢查命名空間是否與專案結構匹配
- 確保所有相依項目已正确安裝

### 資料載入失敗

- 檢查二進位檔案是否已生成
- 檢查檔案路徑是否正确
- 確保資料表結構與資料類型匹配

## 最佳做法

1. **使用元資料表格式**：對於複雜的設定資料表，推荐使用元資料表格式，支援更豐富的元資料定義
2. **合理使用合資料表規則**：對於大型專案，使用合資料表規則管理複雜資料表格
3. **最佳化資料結構**：根据實际使用場景選取合适的資料類型和結構
4. **定期清理**：定期清理不需要的設定資料表和資料，保持專案整洁

## 範例專案

XCell 提供了 Unreal Engine 範例專案，展示了如何在實际專案中使用 XCell：

- 基本設定資料表使用
- 複雜資料結構
- 多語言支援
- 熱更新集成

通过範例專案，您可以快速了解 XCell 在 Unreal Engine 中的最佳做法。
