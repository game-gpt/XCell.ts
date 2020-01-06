# Targets 目标平台

XCell 支持多种目标平台，包括前端和后端。本章节详细介绍各个平台的集成方式和类型映射。

## 前端平台

前端平台主要面向游戏引擎和前端框架，提供代码生成和数据加载功能。

### 游戏引擎

- [Unity](unity.md) - Unity 引擎集成 ⚠️ (当前禁用)
- [Cocos](cocos.md) - Cocos 引擎集成 ✅
- [Unreal Engine](unreal.md) - Unreal Engine 集成
- [Godot](godot.md) - Godot 引擎集成
- [XLua](xlua.md) - XLua 脚本集成

### 前端框架

- [React](react.md) - React 框架集成
- [Vue](vue.md) - Vue 框架集成
- [TypeScript/JavaScript](typescript.md) - TypeScript/JavaScript 集成 ✅

## 后端平台

后端平台主要面向服务器端和数据存储，提供数据持久化和服务端集成。

### 数据格式

- [JSON](json.md) - JSON 数据格式 ✅
- [SQL](sql.md) - SQL 数据库集成

## 代码生成器状态说明

| 生成器 | 状态 | 说明 |
|--------|------|------|
| `json` | ✅ 可用 | JSON 数据生成 |
| `binary` | ✅ 可用 | 二进制数据生成 |
| `cocos` | ✅ 可用 | Cocos 平台代码生成 |
| `typescript` | ✅ 可用 | TypeScript 代码生成 |
| `dejavu` | ✅ 可用 | 模板引擎代码生成 |
| `unity` | ⚠️ 禁用 | Unity 平台代码生成（正在重构中） |
| `xlua` | 开发中 | XLua 脚本代码生成 |
| `sql` | 开发中 | SQL 数据库代码生成 |
| `xml` | 开发中 | XML 数据生成 |

## 跨平台支持

XCell 设计为跨平台的，支持在不同平台间共享配置数据，确保数据一致性和开发效率。

### 平台间数据共享

- 统一的数据模型
- 跨平台类型映射
- 标准化的配置格式

### 最佳实践

- 根据目标平台选择合适的数据格式
- 利用合表规则管理跨平台数据
- 定期同步各平台的数据结构
