# Targets

XCell supports multiple target platforms, including frontend and backend. This chapter details the integration methods and type mappings for each platform.

## Frontend Platforms

Frontend platforms are mainly oriented towards game engines and frontend frameworks, providing code generation and data loading functionality.

### Game Engines

- [Unity](unity.md) - Unity engine integration ⚠️ (currently disabled)
- [Cocos](cocos.md) - Cocos engine integration ✅
- [Unreal Engine](unreal.md) - Unreal Engine integration
- [Godot](godot.md) - Godot engine integration
- [XLua](xlua.md) - XLua script integration

### Frontend Frameworks

- [React](react.md) - React framework integration
- [Vue](vue.md) - Vue framework integration
- [TypeScript/JavaScript](typescript.md) - TypeScript/JavaScript integration ✅

## Backend Platforms

Backend platforms are mainly oriented towards server-side and data storage, providing data persistence and server-side integration.

### Data Formats

- [JSON](json.md) - JSON data format ✅
- [SQL](sql.md) - SQL database integration

## Code Generator Status Description

| Generator | Status | Description |
| --------- | ------ | ----------- |
| `json` | ✅ Available | JSON data generation |
| `binary` | ✅ Available | Binary data generation |
| `cocos` | ✅ Available | Cocos platform code generation |
| `typescript` | ✅ Available | TypeScript code generation |
| `dejavu` | ✅ Available | Template engine code generation |
| `unity` | ⚠️ Disabled | Unity platform code generation (under refactoring) |
| `xlua` | In Development | XLua script code generation |
| `sql` | In Development | SQL database code generation |
| `xml` | In Development | XML data generation |

## Cross-Platform Support

XCell is designed to be cross-platform, supporting sharing configuration data between different platforms, ensuring data consistency and development efficiency.

### Cross-Platform Data Sharing

- Unified data model
- Cross-platform type mapping
- Standardized configuration format

### Best Practices

- Choose appropriate data format based on target platform
- Use merge rules to manage cross-platform data
- Regularly synchronize data structures across platforms
