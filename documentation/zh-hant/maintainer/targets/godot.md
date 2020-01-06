# Godot 集成

XCell 提供了與 Godot 引擎的深度集成，支援生成 GDScript 程式碼、JSON 資料檔案等多种格式。

## 設定選項

在 `XCell.toml` 檔案中，Godot 集成設定位於 `[godot]` 部分：

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

## 生成的程式碼結構

### 資料表类結構

每個設定資料表會生成對應的 GDScript 类，包含：
- 資料表資料类（Table）
- 元素資料类（Element）
- 管理器类（Manager）

### 範例生成程式碼結構：

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
# ... 其他欄位

# DataTableManager.gd
class_name DataTableManager

var buff_table = BuffTable.new()

func load_all():
    # 載入所有資料表資料
    pass

func unload_all():
    # 卸載所有資料表資料
    pass
```

## 資料載入

### 載入 JSON 資料：

```gdscript
var manager = DataTableManager.new()
manager.load_all()

# 使用資料
var buff = manager.buff_table.get(1)
if buff:
    print(buff.name)
```

### 支援的功能：
- 非同步載入
- 增量載入
- 記憶體管理
- 熱更新支援

## 類型對應

XCell 類型到 GDScript 類型對應：

| XCell 類型 | GDScript 類型 |
|------------|-------------|
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
   ```gdscript
   # 只載入特定的資料表
   manager.buff_table.load()
   manager.item_table.load()
   ```

2. **及时卸載**
   ```gdscript
   # 卸載不需要的資料表
   manager.buff_table.unload()
   ```

## 常見問題

### 生成的程式碼編譯錯誤

- 檢查 Godot 專案路徑是否正确
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

## 範例專案

XCell 提供了 Godot 範例專案，展示了如何在實际專案中使用 XCell：

- 基本設定資料表使用
- 複雜資料結構
- 多語言支援
- 熱更新集成

通过範例專案，您可以快速了解 XCell 在 Godot 中的最佳做法。
