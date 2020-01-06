# Configuration Files

XCell uses TOML format configuration files to manage project settings. The configuration file is named `XCell.toml` and located in the project root directory.

## Basic Configuration

| Configuration Item | Type | Description | Default Value |
|--------------------|------|-------------|---------------|
| version | string | Configuration file version number | "0.0.0" |
| include | string | Excel file path pattern to include (highest priority) | "*.xlsx" |
| exclude | string | Excel file path pattern to exclude (lower priority than include) | "" |

### Row Configuration (line)

Defines the row numbers where various information is located in the table (starting from 1).

| Configuration Item | Type | Description | Default Value |
|--------------------|------|-------------|---------------|
| line.field | int | Row where field names are located | 1 |
| line.type | int | Row where data types are located | 2 |
| line.comment | int | Row where comments are located | 3 |
| line.data | int | Row where data starts | 4 |

#### Legacy Table Migration

XCell's default table format is:

| Row Number | Content |
|------------|---------|
| Row 1 | Field comments |
| Row 2 | Field names |
| Row 3 | Field types |
| Row 4+ | Data rows |

If your legacy table format is different, you can adjust it through line mapping. For example, if the legacy table format is:

| Row Number | Content |
|------------|---------|
| Row 1 | Field names |
| Row 2 | Field types |
| Row 3+ | Data rows |

Configure as follows:

```toml
line.field = 1
line.type = 2
line.comment = 0  # No comment row
line.data = 3
```

> Note: `line.comment = 0` indicates no comment row.

### Type Parsing Configuration (type)

Configure parsing rules for various data types.

#### Boolean Type (bool)

| Configuration Item | Type | Description |
|--------------------|------|-------------|
| type.bool.accept | array[string] | List of values accepted as true |
| type.bool.reject | array[string] | List of values accepted as false |

Example:
```toml
[type.bool]
accept = ["true", "√", "是", "1"]
reject = ["false", "x", "否", "0"]
```

### Unity Code Generation Configuration (unity)

Configure C# code generation related settings.

| Configuration Item | Type | Description | Default Value |
|--------------------|------|-------------|---------------|
| unity.enable | bool | Whether to enable Unity code generation | true |
| unity.project | string | Unity project path | "../" |
| unity.output | string | Code output directory | "Assets/Scripts/DataTable/Generated" |
| unity.namespace | string | Namespace for generated code | "DataTable.Generated" |
| unity.manager | string | Manager class name | "DataTableManager" |
| unity.suffix_table | string | Table class suffix | "Table" |
| unity.suffix_element | string | Element class suffix | "Element" |
| unity.support_clone | bool | Whether to support cloning | true |
| unity.legacy_using | bool | Whether to use legacy using | false |
| unity.legacy_null_null | bool | Whether to use legacy null handling | false |

### Data Output Format Configuration

Configure data file output in different formats.

#### Binary Format

| Configuration Item | Type | Description | Default Value |
|--------------------|------|-------------|---------------|
| unity.binary.enable | bool | Whether to enable Binary output | true |
| unity.binary.output | string | Binary file output directory | "Assets/Tables/Generated" |

#### XML Format

| Configuration Item | Type | Description | Default Value |
|--------------------|------|-------------|---------------|
| unity.xml.enable | bool | Whether to enable XML output | false |
| unity.xml.output | string | XML file output directory | "Assets/Tables/Readable" |

#### JSON Format

| Configuration Item | Type | Description | Default Value |
|--------------------|------|-------------|---------------|
| unity.json.enable | bool | Whether to enable JSON output | false |
| unity.json.output | string | JSON file output directory | "Assets/Tables/Readable" |

#### Other Formats

- **xlua**: Lua code generation
- **protobuf**: Protobuf format output

## Usage Instructions

1. Create `XCell.toml` file in the project root directory
2. Modify configuration items as needed
3. XCell tool will automatically load the configuration when running
4. Table configuration can override global configuration (create same-name `.toml` file)
