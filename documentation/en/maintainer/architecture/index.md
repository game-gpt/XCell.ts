# XCell Architecture Design Document

## 1. Project Overall Architecture Overview

XCell is a configuration table management tool written in Rust, adopting modular design with clear module responsibilities and low coupling. The project is divided into the following main parts:

- **Backend Modules**: Located in the `backends/` directory, containing core business logic
  - `xcell` - Command-line tool and main entry point
  - `xcell-analyzer` - Workspace management and table analysis
  - `xcell-generator` - Code generator
  - `xcell-provider` - Table reading abstraction
  - `xcell-core` - Type system and core functionality
  - `xcell-config` - Configuration management
  - `xcell-macros` - Macro definitions
  - `xcell-parser` - Type parser
  - `xcell-plugin` - Plugin system
  - `xcell-wasi` - WebAssembly support

- **Frontend Modules**: Located in the `frontends/` directory, containing user interfaces
  - `homepage` - Project official website
  - `xcell` - Frontend SDK
  - `xcell-desktop` - Desktop application
  - `xcell-h5` - Web application

- **Documentation**: Located in the `documentation/` directory, containing project documentation

- **Examples**: Located in the `examples/` directory, containing usage examples

### Technology Stack

- **Backend**: Rust
- **Frontend**: Vue.js, TypeScript, Tauri
- **Table Reading**: calamine (Excel), csv (CSV/TSV)
- **Template Engine**: dejavu
- **Async Runtime**: tokio
- **Error Handling**: anyhow
- **Logging**: tracing

## 2. Module Division and Responsibility Description

### 2.1 xcell - Command-line Tool

**Responsibilities**:
- Provide command-line interface
- Parse command-line arguments
- Coordinate the entire workflow
- Call other backend modules to execute tasks

**Core Files**:
- `backends/xcell/src/main.rs` - Program entry point
- `backends/xcell/src/workspace.rs` - Workspace management
- `backends/xcell/src/commands/toml.rs` - TOML configuration processing

**Main Functions**:
- Generate code and data files
- Check configuration
- Clean output
- File monitoring mode

### 2.2 xcell-analyzer - Workspace Management and Table Analysis

**Responsibilities**:
- Manage workspace and configuration
- Scan and identify table files
- Parse table data
- Identify table types
- Process table data
- Link enum definitions

**Core Files**:
- `backends/xcell-analyzer/src/lib.rs` - Module export
- `backends/xcell-analyzer/src/config/mod.rs` - Workspace manager
- `backends/xcell-analyzer/src/x_table/mod.rs` - Table data structures

**Core Components**:
- `WorkspaceManager` - Workspace manager, responsible for coordinating the entire workflow
- `XClassTable` - Class table type
- `XDictTable` - Dictionary table type
- `XEnumerateTable` - Enum table type
- `XLanguageTable` - Language table type
- `DefineManager` - Enum definition manager
- `LanguageManager` - Language table manager

### 2.3 xcell-generator - Code Generator

**Responsibilities**:
- Generate code and data files in various formats
- Support multiple target platforms
- Provide pluggable code generation architecture

**Core Files**:
- `backends/xcell-generator/src/lib.rs` - Module export
- `backends/xcell-generator/src/codegen/mod.rs` - Code generator interface
- `backends/xcell-generator/src/config.rs` - Generator configuration

**Supported Code Generators**:
- `json` - JSON data generation ✅
- `binary` - Binary data generation ✅
- `cocos` - Cocos platform code generation ✅
- `typescript` - TypeScript code generation ✅
- `dejavu` - Template engine code generation ✅
- `unity` - Unity platform code generation ⚠️ (currently disabled)
- `xlua` - XLua script code generation
- `sql` - SQL database code generation
- `xml` - XML data generation

### 2.4 xcell-provider - Table Reading Abstraction

**Responsibilities**:
- Provide unified table reading interface
- Support multiple table formats (Excel, CSV, TSV)
- Abstract away differences between table formats
- Provide table header parsing

**Core Files**:
- `backends/xcell-provider/src/lib.rs` - Module export
- `backends/xcell-provider/src/table/mod.rs` - Table reading interface
- `backends/xcell-provider/src/standard/mod.rs` - Standard stream implementation

**Core Components**:
- `TableReader` - Table reader trait
- `ExcelTable` - Excel table reading implementation
- `CsvTable` - CSV table reading implementation
- `TsvTable` - TSV table reading implementation
- `FileFormatDetector` - File format detector
- `load_table` - Unified table loading function

### 2.5 xcell-core - Type System and Core Functionality

**Responsibilities**:
- Define all data types
- Provide type conversion and parsing
- Support type mapping for various platforms
- Provide value processing and conversion
- Provide byte order read/write interfaces

**Core Files**:
- `backends/xcell-core/src/lib.rs` - Module export
- `backends/xcell-core/src/typing/mod.rs` - Type definitions
- `backends/xcell-core/src/value/mod.rs` - Value processing

**Supported Types**:
- Integer types (Integer)
- Decimal types (Decimal)
- Boolean types (Boolean)
- String types (String)
- Array types (Array)
- Vector types (Vector)
- Language types (Language)
- Enum types (Enumerate)
- Color types (Color)
- Time types (Time)

### 2.6 xcell-config - Configuration Management

**Responsibilities**:
- Define project configuration structure
- Provide configuration parsing and validation
- Support configuration options for different platforms

**Core Files**:
- `backends/xcell-config/src/lib.rs` - Module export
- `backends/xcell-config/src/project/mod.rs` - Project configuration
- `backends/xcell-config/src/cocos/mod.rs` - Cocos platform configuration
- `backends/xcell-config/src/unity/mod.rs` - Unity platform configuration

**Core Components**:
- `ProjectConfig` - Project configuration
- `CocosCodegen` - Cocos code generation configuration
- `UnityCodegen` - Unity code generation configuration
- `MergeRules` - Table merge rules

### 2.7 xcell-parser - Type Parser

**Responsibilities**:
- Parse type expressions
- Parse field definitions
- Parse metadata

**Core Files**:
- `backends/xcell-parser/src/lib.rs` - Module export
- `backends/xcell-parser/src/lexer.rs` - Lexer
- `backends/xcell-parser/src/parser.rs` - Parser
- `backends/xcell-parser/src/ast.rs` - Abstract syntax tree

## 3. Data Flow Description

### 3.1 Overall Process

The complete process from table file reading to code export:

```
Table File (Excel/CSV/TSV) → Read/Parse → Table Recognition → Data Processing → Code Generation → Output Files
```

### 3.2 Detailed Steps

#### Step 1: Initialize Workspace

1. Parse command-line arguments or configuration file
2. Create `WorkspaceManager` instance
3. Load project configuration (`ProjectConfig`)

#### Step 2: Scan Files

1. Scan working directory
2. Use `WalkDir` to traverse directory
3. Filter files based on configured `include` pattern

#### Step 3: Read Table Files

1. Use `load_table()` function to read table files (auto-detect format)
2. Parse table header (`XCellHeader`)
3. Read all data rows

#### Step 4: Identify Table Type

Try to identify the following table types in order:

1. `XListTable` - List table
2. `XDictTable` - Dictionary table
3. `XEnumerateTable` - Enum table
4. `XClassTable` - Class table
5. `XLanguageTable` - Language table
6. `XLanguageID` - Language ID table

#### Step 5: Process Table Data

Execute corresponding operations based on table type:

- For enum tables: Add to `DefineManager`
- For language tables: Add to `LanguageManager`
- For other tables: Perform data validation and storage

#### Step 6: Link Enums

Call `link_enumerate()` method to link enum definitions to corresponding data fields

#### Step 7: Code Generation

1. Create `Generator` instance
2. Configure enabled code generators
3. Iterate through all enabled outputs
4. Call corresponding code generator for each output
5. Generate code and data files in corresponding formats

#### Step 8: File Monitoring (Optional)

If file monitoring is enabled:
1. Start file monitor
2. Listen for file changes
3. Automatically reprocess changed files

## 4. Core Code Location Reference

### Workspace Management
- `WorkspaceManager` - `backends/xcell-analyzer/src/config/mod.rs`
- `WorkspaceManager::new()` - Create workspace manager
- `WorkspaceManager::classes()` - Get class table data
- `WorkspaceManager::lists()` - Get list table data
- `WorkspaceManager::dicts()` - Get dictionary table data
- `WorkspaceManager::enumerates()` - Get enum table data

### Table Reading
- `load_table()` - `backends/xcell-provider/src/table/mod.rs` - Unified table loading function
- `TableReader` - `backends/xcell-provider/src/table/mod.rs` - Table reader trait
- `XCellHeader` - `backends/xcell-provider/src/table/mod.rs` - Table header

### Table Types
- `XClassTable` - `backends/xcell-analyzer/src/x_table/class/mod.rs` - Class table type
- `XDictTable` - `backends/xcell-analyzer/src/x_table/dictionary/mod.rs` - Dictionary table type
- `XEnumerateTable` - `backends/xcell-analyzer/src/x_table/enumerate/mod.rs` - Enum table type
- `XLanguageTable` - `backends/xcell-analyzer/src/x_table/language/mod.rs` - Language table type

### Code Generation
- `Generator` - `backends/xcell-generator/src/lib.rs` - Generator main entry
- `Codegen` - `backends/xcell-generator/src/codegen/mod.rs` - Code generator trait
- `CocosCodegen` - `backends/xcell-generator/src/codegen/cocos/mod.rs` - Cocos code generation
- `UnityCodegen` - `backends/xcell-generator/src/codegen/unity/mod.rs` - Unity code generation (currently disabled)
- `JsonCodegen` - `backends/xcell-generator/src/codegen/json/mod.rs` - JSON data generation

### Type System
- `TypeDescription` - `backends/xcell-core/src/typing/mod.rs` - Type description
- `XCellValue` - `backends/xcell-core/src/value/mod.rs` - Cell value
- `CSharpReader`/`CSharpWriter` - `backends/xcell-core/src/codegen/csharp_ffi/mod.rs` - C# type mapping

### Configuration Management
- `ProjectConfig` - `backends/xcell-config/src/project/mod.rs` - Project configuration
- `CocosCodegen` - `backends/xcell-config/src/cocos/mod.rs` - Cocos code generation configuration
- `UnityCodegen` - `backends/xcell-config/src/unity/mod.rs` - Unity code generation configuration

## 5. Abstraction Isolation Design

### 5.1 Core Abstraction Layers

XCell adopts multi-layer abstraction design, ensuring clear module responsibilities and avoiding abstraction leakage:

1. **Table Reading Layer** (`xcell-provider`):
   - Provides unified `TableReader` trait
   - Abstracts away differences between table formats (Excel, CSV, TSV)
   - Upper modules don't need to care about specific table formats

2. **Table Analysis Layer** (`xcell-analyzer`):
   - Reads table data based on `TableReader`
   - Identifies table types and performs corresponding processing
   - Provides `WorkspaceManager` to uniformly manage all table data

3. **Code Generation Layer** (`xcell-generator`):
   - Gets table data based on `WorkspaceManager`
   - Doesn't directly interact with table files
   - Supports multiple code generators through `Codegen` trait

4. **Type System Layer** (`xcell-core`):
   - Defines unified data types
   - Provides type conversion and parsing
   - Supports multi-platform type mapping

### 5.2 Abstraction Isolation Principles

- **Single Responsibility**: Each module is responsible for only one specific function
- **Dependency Inversion**: High-level modules depend on abstractions, not concrete implementations
- **Interface Segregation**: Use traits to define minimized interfaces
- **Liskov Substitution**: Implementations can be replaced by their subtypes
- **Open/Closed Principle**: Open for extension, closed for modification

## 6. Extension Development Guide

### Adding New Table Format

1. Create new table reading implementation under `backends/xcell-provider/src/table/`
2. Implement `TableReader` trait
3. Add format detection logic in `FileFormatDetector`
4. Add support for new format in `load_table` function

### Adding New Data Type

1. Create new module under `backends/xcell-core/src/`
2. Implement type parsing and conversion logic
3. Export in `backends/xcell-core/src/lib.rs`
4. Add corresponding platform type mapping support

### Adding New Code Generator

1. Create new module under `backends/xcell-generator/src/codegen/`
2. Implement `Codegen` trait
3. Register new generator in `Generator::new()`
4. Add corresponding configuration options

### Adding New Platform Support

1. Create new platform configuration module under `backends/xcell-config/src/`
2. Create new platform code generator under `backends/xcell-generator/src/codegen/`
3. Implement platform-specific code generation logic
4. Update documentation and examples
