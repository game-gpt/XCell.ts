# Unity 集成

> ⚠️ **注意**：Unity 程式碼產生器當前處於停用狀態，正在重构中。以下檔案僅供參考，功能可能不可用。

XCell 提供了與 Unity 引擎的深度集成，支援生成 C# 程式碼、二進位資料檔案等多种格式。

## 當前狀態

Unity 程式碼產生器 (`unity`) 當前處於停用狀態，原因如下：

1. 正在進行架構重构
2. 類型對應系統需要更新
3. 程式碼產生範本需要最佳化

### 替代方案

在 Unity 程式碼產生器重新啟用之前，您可以考虑以下替代方案：

1. **使用 JSON 資料格式**：通过 [JSON](json.md) 生成器匯出資料，在 Unity 中使用 `JsonUtility` 或 `Newtonsoft.Json` 剖析
2. **使用 TypeScript 生成器**：通过 [TypeScript](typescript.md) 生成類型定義，手動編寫 C# 类
3. **使用 Dejavu 範本**：通过 [Dejavu 範本引擎](../architecture/index.md#程式碼產生) 自訂程式碼產生

## 設定選項（參考）

在 `ProjectSettings.toml` 檔案中，Unity 集成設定位於 `[unity]` 部分：

```toml
[unity]
enable = false  # 當前停用
project = "../"
output = "Assets/Scripts/DataTable/Generated"
namespace = "DataTable.Generated"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"
support_clone = true
legacy_using = false
legacy_null_null = false

[unity.binary]
enable = true
output = "Assets/Tables/Generated"

[unity.xlua]
enable = false

[unity.xml]
enable = false
output = "Assets/Tables/Readable"

[unity.json]
enable = false
output = "Assets/Tables/Readable"
```

## 預期生成的程式碼結構

### 資料表类結構

每個設定資料表會生成對應的 C# 类，包含：
- 資料表資料类（Table）
- 元素資料类（Element）
- 管理器类（Manager）

### 範例生成程式碼結構：

```csharp
namespace DataTable.Generated
{
    public class BuffTable
    {
        public Dictionary<int, BuffElement> Data { get; }
        public BuffElement Get(int id);
        public bool TryGet(int id, out BuffElement element);
    }

    public class BuffElement
    {
        public int Id { get; }
        public string Name { get; }
        public int Value { get; }
        // ... 其他欄位
    }

    public class DataTableManager
    {
        public BuffTable BuffTable { get; }
        public void LoadAll();
        public void UnloadAll();
    }
}
```

## 類型對應

XCell 類型到 C# 類型對應：

| XCell 類型 | C# 類型 |
|------------|---------|
| bool | bool |
| i8 | sbyte |
| i16 | short |
| i32 | int |
| i64 | long |
| u8 | byte |
| u16 | ushort |
| u32 | uint |
| u64 | ulong |
| f32 | float |
| f64 | double |
| string | string |
| color | UnityEngine.Color |
| vec2 | UnityEngine.Vector2 |
| vec3 | UnityEngine.Vector3 |
| vec4 | UnityEngine.Vector4 |
| quaternion | UnityEngine.Quaternion |

## 常見問題

### 為什麼 Unity 生成器被停用？

Unity 程式碼產生器正在進行重构，以支援更好的類型系統和程式碼產生架構。預计將在未来版本中重新啟用。

### 如何获取最新狀態？

请關注專案更新日誌或查看 `backends/xcell-generator/src/codegen/unity/` 目錄下的程式碼變更。

## 最佳做法

1. **使用元資料表格式**：對於複雜的設定資料表，推荐使用元資料表格式，支援更豐富的元資料定義
2. **合理使用合資料表規則**：對於大型專案，使用合資料表規則管理複雜資料表格
3. **最佳化資料結構**：根据實际使用場景選取合适的資料類型和結構
4. **定期清理**：定期清理不需要的設定資料表和資料，保持專案整洁
