# Advanced Features Documentation

This document details the advanced features of the XCell configuration table management tool, including advanced configuration options, detailed table merge rules, and performance optimization tips.

## Table of Contents

1. [Advanced Configuration Options](#advanced-configuration-options)
2. [Table Merge Rules Details](#table-merge-rules-details)
3. [Performance Optimization Tips](#performance-optimization-tips)
4. [Engine Integration](#engine-integration)

---

## Advanced Configuration Options

XCell's configuration file `XCell.toml` provides rich configuration options, allowing you to flexibly customize the tool's behavior.

### Basic Configuration Structure

A complete `XCell.toml` configuration file contains the following main parts:

```toml
version = "0.0.0"

exclude = ""
include = "*.xlsx"

line.field = 1
line.type = 2
line.comment = 3
line.data = 4

[type.bool]
accept = ["true", "√"]
reject = ["false", "x"]

[type.string]

[merge]
```

### Version Control Configuration

```toml
version = "0.0.0"
```

- **version**: Current project version number, used to identify the version of generated code and data files

### File Include/Exclude Configuration

```toml
exclude = ""
include = "*.xlsx"
```

- **include**: Specifies the Excel file pattern to include, supports wildcards
- **exclude**: Specifies the Excel file pattern to exclude, lower priority than include

Example:
```toml
include = "tables/**/*.xlsx"
exclude = "tables/temp/*.xlsx"
```

### Table Row Configuration

```toml
line.field = 1
line.type = 2
line.comment = 3
line.data = 4
```

- **line.field**: Row number where field names are located (starting from 1)
- **line.type**: Row number where type declarations are located
- **line.comment**: Row number where comments are located
- **line.data**: Row number where data starts

### Type Configuration

#### Boolean Type Configuration

```toml
[type.bool]
accept = ["true", "√"]
reject = ["false", "x"]
```

- **accept**: List of values recognized as true
- **reject**: List of values recognized as false

#### String Type Configuration

```toml
[type.string]
# Extensible configuration
```

---

## Table Merge Rules Details

Table merge rules allow you to merge multiple Excel tables into one, supporting row or column merging.

### Merge Rules Configuration

Merge rules are configured in the `[merge]` section, each rule uses a unique number as identifier.

```toml
[merge.10001]
mode = "row"
input = "Language_CN*"
target = "Language_CN"

[merge.10002]
mode = "row"
input = "Language_EN*"
target = "Language_EN"

[merge.20001]
mode = "column"
input = "Language*"
target = "Language"
```

### Merge Modes

#### Row Merge Mode (row)

```toml
mode = "row"
```

Row merge combines data rows from multiple tables into one table. Suitable for:
- Large tables that need to be split for management
- Multi-language data separation management

Example directory structure:
```
LanguageTable/
  - CN/
    - Language_CN_UI.xlsx
    - Language_CN_Item.xlsx
  - EN/
    - Language_EN_UI.xlsx
    - Language_EN_Item.xlsx
```

#### Column Merge Mode (column)

```toml
mode = "column"
```

Column merge combines columns from multiple tables into one table. Suitable for:
- Distributing column data across different files
- Different teams collaborating on different parts of the same table

### Merge Rule Parameters

- **mode**: Merge mode, `row` or `column`
- **input**: Input file pattern, supports wildcards
- **target**: Target table name

### Merge Execution Order

Rule numbers determine the execution order of merges, smaller numbers execute earlier. Recommendations:
- Row merge uses 10000-19999 range
- Column merge uses 20000-29999 range
- Other custom rules use higher numbers

---

## Performance Optimization Tips

### Large Table Processing Optimization

#### 1. Reasonably Split Large Tables

- Split large tables by function or module
- Use row merge rules to merge at build time
- Maintain development-time maintainability and runtime performance

#### 2. Use Binary Format

- Binary format has the fastest loading speed
- Binary format is recommended for production environments
- XML/JSON can be used in development environments for debugging

### Incremental Update Optimization

#### 1. Watch Mode

Use watch mode:

```bash
xcell.exe --watch
```

Watch mode features:
- Only regenerate changed files
- Significantly improves development efficiency
- Supports real-time preview

#### 2. Reasonable Watch Configuration

Configure reasonable include/exclude patterns to reduce the number of watched files.

### Memory Optimization

#### 1. Only Load Needed Tables

According to different engine APIs, only load tables needed for the current scene or function, avoid loading all tables at once.

#### 2. Unload Timely

When certain tables are no longer needed, unload them timely to release memory.

### Build Optimization

#### 1. Parallel Processing

XCell supports parallel processing of multiple files, significantly improving build speed.

#### 2. Caching Mechanism

Reasonably use caching to avoid repeated processing.

---

## Engine Integration

XCell supports integration with multiple game engines, see the following documentation for details:

- [Unity Integration](./unity.md) - Details on XCell integration with Unity engine
- [Cocos Integration](./cocos.md) - Details on XCell integration with Cocos engine

---

## Summary

XCell provides rich advanced features, through reasonable configuration and optimization, can meet the needs of various complex projects.

- Use advanced configuration options to customize XCell behavior
- Use merge rules to manage complex tables
- Improve runtime and build-time efficiency through performance optimization
- Improve development efficiency with engine integration

If you have questions or suggestions, feel free to submit an Issue or PR!
