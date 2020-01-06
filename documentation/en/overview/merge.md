# Table Merge Rules

XCell supports merging multiple tables into one table. Through merge rules, you can flexibly manage complex data structures.

## Naming Convention

- **PascalCase naming** (e.g., `ItemWeapon`, `ItemArmor`): Independent tables, not participating in merge
- **Underscore naming** (e.g., `Item_Weapon`, `Item_Armor`): Automatically merged into `Item` table

## Example

| Filename | Behavior |
|----------|----------|
| `ItemWeapon.xlsx` | Independent table, generates `ItemWeapon` |
| `ItemArmor.xlsx` | Independent table, generates `ItemArmor` |
| `Item_Weapon.xlsx` | Merged into `Item` |
| `Item_Armor.xlsx` | Merged into `Item` |
| `Item_Consumable.xlsx` | Merged into `Item` |

## Merge Logic

- Tables with the same structure will be merged
- **Duplicate IDs will cause errors** (merge order depends on disk storage, not fixed)
- Final output will be sorted by ID

## Use Cases

### Scenario: Manage Tables by Type

Suppose you have the following item tables:
- `Item_Weapon.xlsx` - Weapon configuration
- `Item_Armor.xlsx` - Armor configuration
- `Item_Consumable.xlsx` - Consumable configuration

They will automatically merge into the `Item` table.

## Notes

- Merged tables must have the same structure (same column names and types)
- If primary key conflicts, later merged file data will overwrite earlier merged file data
- It is recommended to backup original files before performing merge operations
- **`Language` is a reserved table name**, all language tables will merge into Language, do not use this name
