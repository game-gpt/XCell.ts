# Advanced Topics

This section is for developers who have a basic understanding of XCell and want to learn more about its internal mechanisms, extended functionality, or implement advanced configurations.

## Document Structure

### Type System
- [type-system.md](type-system.md) - Type system documentation
  - Basic types (integers, floating-point, boolean, string)
  - Composite types (arrays, vectors, dictionaries, tuples)
  - Special types (color, time)
  - Custom types (enums, structs)
  - Type conversion and validation

### Field Constraints
- [key-field.md](key-field.md) - Field constraint documentation
  - Unique constraints
  - Primary key constraints
  - Composite constraints

### Reference Types
- [ref-type.md](ref-type.md) - Reference type documentation
  - Basic format
  - How it works
  - Use cases
  - Reference validation

### Meta Attributes
- [meta-data.md](meta-data.md) - Meta attribute documentation
  - Basic meta attributes (var, type, default, field, client, server, meta)
  - Table type markers (class, enum, table, language)
  - Usage rules and examples

### Configuration
- [config.md](config.md) - Configuration file documentation
  - Project configuration
  - Table configuration
  - Row mapping

### Extensibility
- [extensibility.md](extensibility.md) - Extensibility documentation
  - Custom type system
  - Extending code generators (support for any programming language)
  - Creating exporters for other game engines
  - Plugin development guide

## Multi-Engine Support

XCell's design philosophy is to provide excellent configuration table management solutions for all game engines:

- **Unity (C#)**: Complete built-in support
- **Cocos Creator**: Via JSON/XML + TypeScript/Lua loaders
- **Godot**: Via JSON + GDScript loaders
- **Unreal Engine**: Via binary + C++ loaders
- **Custom Engines**: Create custom exporters via extensibility documentation

## Prerequisites

Before reading this section, it is recommended that you:

1. Be familiar with the basic usage of XCell
2. Understand the basic structure of the project configuration file `XCell.toml`
3. Have programming fundamentals in target languages (Rust, C#, C++, Python, Lua, TypeScript, etc.)
