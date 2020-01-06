# 合表规则

XCell 支持将多个表格合并为一个表格的功能，通过合表规则可以灵活地管理复杂的数据结构。

## 命名约定

- **大驼峰命名**（如 `ItemWeapon`、`ItemArmor`）：独立表格，不参与合表
- **下划线命名**（如 `Item_Weapon`、`Item_Armor`）：自动合并为 `Item` 表格

## 示例

| 文件名 | 行为 |
|--------|------|
| `ItemWeapon.xlsx` | 独立表格，生成 `ItemWeapon` |
| `ItemArmor.xlsx` | 独立表格，生成 `ItemArmor` |
| `Item_Weapon.xlsx` | 合并到 `Item` |
| `Item_Armor.xlsx` | 合并到 `Item` |
| `Item_Consumable.xlsx` | 合并到 `Item` |

## 合并逻辑

- 具有相同结构的表格会被合并
- **如有相同 ID 会报错**（合并顺序与磁盘存储方式有关，不固定）
- 最终产物会按照 ID 排序

## 使用场景

### 场景：按类型分表管理

假设您有以下物品表格：
- `Item_Weapon.xlsx` - 武器配置
- `Item_Armor.xlsx` - 防具配置
- `Item_Consumable.xlsx` - 消耗品配置

它们会自动合并为 `Item` 表格。

## 注意事项

- 合并的表格必须具有相同的结构（相同的列名和类型）
- 如果主键冲突，后合并的文件数据会覆盖先合并的文件数据
- 建议备份原始文件后再进行合表操作
- **`Language` 是保留表名**，所有语言表都会合并到 Language，请勿使用此名称
