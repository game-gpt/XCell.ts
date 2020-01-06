# 元屬性（Meta Data）

元屬性用於為欄位新增額外的設定資訊，如驗證規則、預設值等。

## 基本格式

元屬性以 `@` 開頭，可以寫在三個位置：

| 位置 | 範例 |
| ---- | ---- |
| 欄位名後 | `id @primary` |
| 類型後 | `i32 @min(1)` |
| Excel 註解 | `@default(100)` |

> **建議**：元屬性可以有任意多個，建議统一寫在 Excel 單元格註解中，便於管理和维護。

## 常用元屬性

### 欄位元屬性

| 元屬性 | 說明 | 範例 |
| ------ | ---- | ---- |
| `@primary` | 主鍵 | `id @primary` |
| `@default(value)` | 預設值 | `level @default(1)` |
| `@virtual` | 虚擬欄位 | `user @virtual` |

### 類型元屬性

| 元屬性 | 說明 | 範例 |
| ------ | ---- | ---- |
| `@min(value)` | 最小值 | `i32 @min(0)` |
| `@max(value)` | 最大值 | `i32 @max(100)` |
| `@range(min, max)` | 范圍 | `i32 @range(1, 100)` |

### 註解元屬性

在 Excel 單元格註解中可以寫元屬性：

```
@default(100)
@min(1)
@max(9999)
```

## 虚擬欄位

虚擬欄位是一种特殊的欄位，它不會儲存實际資料，而是通过參照其他資料表的資料来获得值。

### 範例

| @dict | 名稱 | 品質ID | 品質 |
| ----- | ---- | ------ | ---- |
| item_id | name | quality_id | quality @virtual |
| string | string | &Quality | Quality |
| sword_001 | 铁劍 | common | |
| sword_002 | 精钢劍 | rare | |

- `quality_id` 是實际儲存的欄位，類型為 `&Quality`
- `quality` 是虚擬欄位，通过 `@virtual` 標記，類型為目標資料表名 `Quality`

## 計算屬性

計算屬性是通过運算式計算得出的欄位，不需要儲存實际資料。

### 範例

| @dict | 基礎攻擊 | 強化等级 | 總攻擊 |
| ----- | -------- | -------- | ------ |
| item_id | base_atk | enhance | total_atk @computed |
| string | i32 | i32 | i32 |
| sword_001 | 100 | 5 | base_atk * (1 + enhance * 0.1) |

- `total_atk` 是計算屬性，通过 `@computed` 標記
- 運算式可以參照同資料表中的其他欄位

## 範例

### 帶驗證的欄位

| @dict | 等级 | 金幣 |
| ----- | ---- | ---- |
| user_id | level | gold |
| string | i32 @range(1, 100) | i32 @min(0) |
| user_001 | 10 | 1000 |
| user_002 | 50 | 5000 |

### 帶預設值的欄位

| @dict | 名稱 | 等级 |
| ----- | ---- | ---- |
| item_id | name | quality |
| string | string | string @default(common) |
| sword_001 | 铁劍 | |
| sword_002 | 精钢劍 | rare |

## 元屬性與程式碼產生

元屬性會影響生成的程式碼：

### 驗證屬性

```
level i32 @range(1, 100)
```

生成 C# 程式碼：

```csharp
[Range(1, 100)]
public int Level { get; set; }
```

### 預設值

```
quality string @default(common)
```

生成 C# 程式碼：

```csharp
public string Quality { get; set; } = "common";
```

## 注意事项

- 元屬性以 `@` 開頭
- 可以寫在欄位名、類型或 Excel 註解中
- 多個元屬性可以组合使用
- 部分元屬性會影響程式碼產生和資料驗證
