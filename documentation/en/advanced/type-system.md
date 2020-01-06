# Type System

XCell supports multiple data types. Standard types follow Rust conventions, while also being compatible with C conventions and C++ conventions. Types are case-insensitive.

## Basic Types

### Integer Types

| Standard Notation | Unity Convention | Unreal Convention | Description | Range |
| ----------------- | ---------------- | ----------------- | ----------- | ----- |
| `i8` | `char` | `int8_t` | 8-bit signed integer | -128 to 127 |
| `u8` | `unsigned char` | `uint8_t` | 8-bit unsigned integer | 0 to 255 |
| `i16` | `short` | `int16_t` | 16-bit signed integer | -32768 to 32767 |
| `u16` | `unsigned short` | `uint16_t` | 16-bit unsigned integer | 0 to 65535 |
| `i32` | `int` | `int32_t` | 32-bit signed integer | -2147483648 to 2147483647 |
| `u32` | `unsigned int` | `uint32_t` | 32-bit unsigned integer | 0 to 4294967295 |
| `i64` | `long long` | `int64_t` | 64-bit signed integer | -9223372036854775808 to 9223372036854775807 |
| `u64` | `unsigned long long` | `uint64_t` | 64-bit unsigned integer | 0 to 18446744073709551615 |

<br />

### Floating-Point Types

| Standard Notation | C Convention | C++ Convention | Description | Precision |
| ----------------- | ------------ | -------------- | ----------- | --------- |
| `f32` | `float` | `float` | 32-bit floating-point | Single |
| `f64` | `double` | `double` | 64-bit floating-point | Double |

### Boolean Type

| Standard Notation | C Convention | C++ Convention | Description | Values |
| ----------------- | ------------ | -------------- | ----------- | ------ |
| `bool` | `bool` | `bool` | Boolean value | `true` or `false` |

### Character Types

| Standard Notation | Description |
| ----------------- | ----------- |
| `utf8` | UTF-8 character type |
| `utf16` | UTF-16 character type |

### String Types

| Standard Notation | Description |
| ----------------- | ----------- |
| `string` | String type |
| `str` | String type (equivalent to string) |

## Composite Types

### Array and Vector Types

**Different type conventions**:

| Standard Notation | C# Convention | Description |
| ----------------- | ------------- | ----------- |
| `[T]` | `T[]` | Dynamic array |
| `[T; N]` | `T[N]` | Static array (fixed size) |
| `Vec<T>` | `List<T>` | Vector/List type |
| `vec2<f32>` | `Vector2<float>` | 2D vector |
| `vec3<f32>` | `Vector3<float>` | 3D vector |
| `vec4<f32>` | `Vector4<float>` | 4D vector |

**Description**:

- Dynamic array `[T]` and vector `Vec<T>` are used to store variable number of elements
- Static array `[T; N]` is used to store fixed number of elements, length is determined at definition time
- Special vector types (vec2/vec3/vec4) are commonly used in graphics programming, Unity and other engines have specific performance optimizations

**Examples**:

- `[i32; 5]` - Static array containing 5 i32 elements
- `[string]` - Dynamic-sized string array
- `Vec<i32>` - Integer vector
- `vec3<f32>` - 3D floating-point vector

### Dictionary Type

**Format**: `HashMap<K, V>` or `dict<K, V>`

**Examples**:

- `HashMap<string, i32>` - String to integer mapping
- `dict<i32, string>` - Integer to string mapping

### Tuple Type

**Format**: `(T1, T2, ...)`

**Examples**:

- `(i32, string)` - Tuple containing integer and string
- `(f32, f32, bool)` - Tuple containing two floating-point numbers and one boolean

## Special Types

### Color Type

| Type | Description | Format |
| ---- | ----------- | ------ |
| `color` | Color type | Hexadecimal color value, such as `#FF0000` |
| `Color` | Color type (equivalent to color) | Hexadecimal color value, such as `#FF0000` |

### Time Types

| Type | Description | Format |
| ---- | ----------- | ------ |
| `datetime` | Date-time type | ISO 8601 format, such as `2023-12-25T10:30:00` |
| `time` | Time type | Such as `10:30:00` |
| `date` | Date type | Such as `2023-12-25` |

<br />

## Unique Type and Primary Key

**Unique Type Format**:

- `@T` - Indicates that the field value must be unique in the table, i.e., no two rows in the table can have the same value for this field
- `@@T` - Indicates that the field value must be unique in the table and serves as the primary key

**Primary Key Description**:

- Primary key is the field used to uniquely identify each row of data in a table
- If no `@@T` is used to explicitly mark the primary key in the table, the first column of the table will automatically be treated as the primary key
- Primary key values must be unique and non-null, used to establish associations between tables

**Examples**:

- `@@i32` - Integer type primary key field
- `@string` - String type unique field (non-primary key)

## Custom Types

### Enum Types

Enum types defined through Enumerate tables can be used in other tables.

**Example**:

- `QualityType` - References quality type defined in enum table

### Struct Types

Struct types defined through Class tables can be used in other tables.

**Example**:

- `Position` - References position struct defined in Class table

## Type Conversion

XCell supports automatic type conversion, for example:

- Integers can be automatically converted to floating-point numbers
- Floating-point numbers can be converted to integers when needed (will truncate decimal part)
- Numbers can be converted to strings
- Strings can be converted to numbers in appropriate cases

## Type Validation

XCell performs type validation when parsing tables, ensuring data conforms to specified type requirements. If types don't match, errors will be generated at compile time.
