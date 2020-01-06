# 合資料表規則

XCell 支援將多個資料表格合併為一個資料表格的功能，通过合資料表規則可以灵活地管理複雜的資料結構。

## 命名約定

- **大驼峰命名**（如 `ItemWeapon`、`ItemArmor`）：独立資料表格，不参與合資料表
- **下劃线命名**（如 `Item_Weapon`、`Item_Armor`）：自動合併為 `Item` 資料表格

## 範例

| 檔案名 | 行為 |
|--------|------|
| `ItemWeapon.xlsx` | 独立資料表格，生成 `ItemWeapon` |
| `ItemArmor.xlsx` | 独立資料表格，生成 `ItemArmor` |
| `Item_Weapon.xlsx` | 合併到 `Item` |
| `Item_Armor.xlsx` | 合併到 `Item` |
| `Item_Consumable.xlsx` | 合併到 `Item` |

## 合併逻辑

- 具有相同結構的資料表格會被合併
- **如有相同 ID 會報错**（合併顺序與磁盘儲存方式有關，不固定）
- 最终產物會按照 ID 排序

## 使用場景

### 場景：按類型分資料表管理

假设您有以下物品資料表格：
- `Item_Weapon.xlsx` - 武器設定
- `Item_Armor.xlsx` - 防具設定
- `Item_Consumable.xlsx` - 消耗品設定

它們會自動合併為 `Item` 資料表格。

## 注意事项

- 合併的資料表格必须具有相同的結構（相同的列名和類型）
- 如果主鍵衝突，後合併的檔案資料會覆盖先合併的檔案資料
- 建議備份原始檔案後再進行合資料表操作
- **`Language` 是保留資料表名**，所有語言資料表都會合併到 Language，请勿使用此名稱
