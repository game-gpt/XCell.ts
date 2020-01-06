# Field Constraints

Field constraints are rules used to limit field values, ensuring data uniqueness and integrity.

## Unique Constraint (unique)

Unique constraint ensures that field values cannot be duplicated.

### Marking Method

| Shorthand | Meta Attribute Notation | Description |
| --------- | ----------------------- | ----------- |
| `@field_name` | `field_name @unique` | Unique field, values cannot be duplicated |

### Example

| @dict | Name | Email |
| ----- | ---- | ----- |
| user\_id | name | @email |
| string | string | string |
| user\_001 | John | <john@example.com> |
| user\_002 | Jane | <jane@example.com> |

- `@email` - Email field values cannot be duplicated

## Primary Key Constraint (primary)

Primary key is the field used to uniquely identify each row of data in a table.

### Default Rule

- **First column is automatically treated as primary key**, no additional marking required

### Marking Method

| Shorthand | Meta Attribute Notation | Description |
| --------- | ----------------------- | ----------- |
| `@@field_name` | `field_name @primary` | Primary key field, values are unique and serve as primary key |

### Example

| @dict | Name |
| ----- | ---- |
| @@item\_id | name |
| string | string |
| sword\_001 | Iron Sword |
| sword\_002 | Steel Sword |

- `@@item_id` - Primary key field, values are unique

## Composite Constraint

When multiple fields combined must be unique, you can use composite constraints. Add `@unique(field1, field2)` after the type marker:

| @dict @unique(class, level) | Class | Level |
| --------------------------- | ----- | ----- |
| id | class | level |
| string | string | i32 |
| warrior\_001 | warrior | 10 |
| warrior\_002 | warrior | 20 |
| mage\_001 | mage | 10 |

In the above example, the `Class + Level` combination must be unique, but individual class or level values can be duplicated.

> ⚠️ **Warning**: If composite unique constraint is used, then `&T` referencing this table must also fill in composite keys. Some game engines do not support composite keys, please use with caution.

## Constraint Requirements

- Primary key values must be unique
- Primary key values cannot be null
- Each table can only have one primary key
- Unique field values cannot be duplicated
