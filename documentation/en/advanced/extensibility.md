# Extensibility Documentation

This document introduces how to extend the functionality of the XCell configuration table management tool, including custom type systems, extending code generators, and plugin development.

## Table of Contents

1. [Custom Type System](#custom-type-system)
2. [Extending Code Generators](#extending-code-generators)
3. [Plugin Development Guide](#plugin-development-guide)

***

## Custom Type System

XCell provides a flexible type system that supports multiple built-in data types and allows developers to customize new data types.

### Built-in Types Overview

XCell supports the following built-in types:

| Type Category | Supported Types                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Boolean       | `bool`, `boolean`                                                                                                          |
| Integer       | `byte`/`i8`, `short`/`i16`, `int`/`i32`, `long`/`i64`, `sbyte`/`u8`, `ushort`/`u16`, `uint`/`u32`, `ulong`/`u64`          |
| Decimal       | `float`/`f32`, `double`/`f64`, `decimal`/`d128`/`f128`                                                                     |
| String        | `string`                                                                                                                   |
| Special Types | `color`/`colour`, `color32`, `time`/`date`/`datetime`                                                                      |
| Vector/Array  | `v2`/`vec2`, `v3`/`vec3`, `v4`/`vec4`, `q4`/`quaternion`                                                                   |
| Enum          | Custom enum types                                                                                                          |

### Type System Architecture

XCell's type system core is located in the `xcell-types` module, mainly containing the following components:

- `XCellTyped`: Type enumeration, defining all supported data types
- `TypeMetaInfo`: Type metadata, containing type configuration information
- `XCellValue`: Type value, storing parsed data
- Various type descriptors: such as `IntegerDescription`, `DecimalDescription`, etc.

### Custom Type Implementation Steps

To add a custom type, follow these steps:

#### 1. Create Type Description Module

Create a new type module in the `projects/xcell-types/src/` directory, for example `my_type/mod.rs`:

```rust
use serde::{Deserialize, Serialize};
use xcell_errors::XResult;
use crate::value::XCellValue;

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct MyTypeDescription {
    pub default: Option<String>,
}

impl MyTypeDescription {
    pub fn parse_cell(&self, cell: &str) -> XResult<XCellValue> {
        todo!("Implement cell parsing logic")
    }
}
```

#### 2. Extend XCellTyped Enumeration

Extend the `XCellTyped` enumeration in `projects/xcell-types/src/typing/mod.rs`:

```rust
pub enum XCellTyped {
    // ... existing types ...
    MyType(Box<MyTypeDescription>),
}
```

#### 3. Implement Type Parsing

Add type parsing logic in `projects/xcell-types/src/typing/parser.rs`:

```rust
impl XCellTyped {
    pub fn parse(input: &str, info: &TypeMetaInfo) -> Self {
        let normed = Self::norm_typing(input);
        match normed.as_str() {
            // ... existing types ...
            "mytype" | "my_type" => info.my_type.clone().into(),
            _ => XCellTyped::parse_complex(input, &normed, info),
        }
    }
}
```

#### 4. Update TypeMetaInfo

Update the `TypeMetaInfo` struct in `projects/xcell-types/src/typing/mod.rs`:

```rust
#[derive(Debug, Clone, Default, Serialize)]
pub struct TypeMetaInfo {
    // ... existing fields ...
    pub my_type: MyTypeDescription,
}
```

#### 5. Add Code Generation Support

Add code generation logic for the new type in `projects/xcell-types/src/codegen/`, ensuring correct type definitions can be generated for target languages (such as C#).

***

## Extending Code Generators

XCell supports multiple code generation targets, including Unity C#, binary files, XML, JSON, etc. You can extend these generators or create new ones.

### Code Generation Architecture

Code generation is mainly implemented in the `xcell-core/src/codegen/` module:

- `binary/`: Binary format generation
- `readable/`: Readable format generation (XML, JSON)
- `unity/`: Unity C# code generation

### Extending Unity Code Generator

The Unity code generator is one of the most commonly used generators. Here are the steps to extend it:

#### 1. View Existing Templates

Unity code generation uses template files located in the `projects/xcell-core/templates/` directory:

- `BuildClass.cs`: Class table template
- `BuildDictionary.cs`: Dictionary table template
- `BuildEnumerate.cs`: Enum table template
- `BuildLanguage.cs`: Language table template
- `BuildManager.cs`: Manager template

#### 2. Modify or Create Templates

Modify existing templates or create new template files as needed.

#### 3. Update UnityCodegen Configuration

Update configuration in `projects/xcell-core/src/config/unity/mod.rs`:

```rust
#[derive(Debug, Clone)]
pub struct UnityCodegen {
    // ... existing fields ...
    pub my_custom_option: bool,
}
```

#### 4. Implement Generation Logic

Implement specific generation logic in `projects/xcell-core/src/codegen/unity/`.

### Creating New Code Generators

To create a completely new code generator, follow these steps:

#### 1. Create Generator Module

Create a new module in the `projects/xcell-core/src/codegen/` directory, for example `cocos/mod.rs`:

```rust
use xcell_errors::XResult;
use crate::config::ProjectConfig;

pub struct CocosCodegen {
    // Configuration fields
}

impl CocosCodegen {
    pub fn write(&self, config: &ProjectConfig) -> XResult<()> {
        todo!("Implement Cocos code generation logic")
    }
}
```

#### 2. Integrate into Configuration System

Add configuration options for the new generator in `ProjectConfig`.

#### 3. Connect to Workflow

Call the new generator in `WorkspaceManager::write_unity()` or similar methods.

***

## Plugin Development Guide

XCell supports extending functionality through a plugin system. Plugins can add new table types, custom validation logic, or extend code generation capabilities.

### Plugin Architecture

The plugin system is based on Rust's trait system, with main interfaces including:

- Table processor trait
- Validator trait
- Code generator trait

### Plugin Development Steps

#### 1. Create Plugin Project

Create a new Rust project and add dependencies on `xcell-core` and `xcell-types`:

```toml
[package]
name = "xcell-my-plugin"
version = "0.1.0"
edition = "2024"

[dependencies]
xcell-core = { path = "../xcell-core" }
xcell-types = { path = "../xcell-types" }
```

#### 2. Implement Plugin Trait

Implement corresponding traits as needed. For example, implement a custom table processor:

```rust
use xcell_core::x_table::table::CalamideTable;
use xcell_errors::XResult;

pub struct MyCustomTable;

impl MyCustomTable {
    pub fn confirm(table: &CalamideTable) -> XResult<Self> {
        todo!("Check if table matches custom format")
    }

    pub fn perform(&self, workspace: &mut WorkspaceManager) -> XResult<()> {
        todo!("Execute table processing logic")
    }
}
```

#### 3. Register Plugin

Register your plugin in the `WorkspaceManager::try_perform_file()` method so it can be recognized and processed.

### Plugin Best Practices

1. **Keep Plugins Independent**: Plugins should be as independent as possible, reducing dependencies on XCell internal implementations
2. **Provide Configuration Options**: Provide plugin configuration through `XCell.toml`
3. **Error Handling**: Handle errors properly, provide clear error messages
4. **Documentation**: Provide complete usage documentation for plugins
5. **Testing**: Write sufficient test cases

***

## Summary

XCell provides powerful extensibility, allowing developers to customize functionality according to their needs. Whether adding new data types, extending code generators, or developing independent plugins, XCell's modular architecture can well support these needs.

If you encounter problems during extension, please refer to the project source code or submit an Issue for help.
