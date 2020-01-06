# 进阶

本部分内容适用于对 XCell 有基本了解，希望深入了解其内部机制、扩展功能或实现高级配置的开发者。

## 文档结构

### 类型系统
- [type-system.md](type-system.md) - 类型系统文档
  - 基本类型（整数、浮点数、布尔、字符串）
  - 复合类型（数组、向量、字典、元组）
  - 特殊类型（颜色、时间）
  - 自定义类型（枚举、结构体）
  - 类型转换和验证

### 字段约束
- [key-field.md](key-field.md) - 字段约束文档
  - 唯一约束
  - 主键约束
  - 复合约束

### 引用类型
- [ref-type.md](ref-type.md) - 引用类型文档
  - 基本格式
  - 工作原理
  - 使用场景
  - 引用验证

### 元属性
- [meta-data.md](meta-data.md) - 元属性文档
  - 基本元属性（var, type, default, field, client, server, meta）
  - 表格类型标记（class, enum, table, language）
  - 使用规则和示例

### 配置
- [config.md](config.md) - 配置文件文档
  - 项目配置
  - 表格配置
  - 行映射

### 扩展性
- [extensibility.md](extensibility.md) - 扩展性文档
  - 自定义类型系统
  - 扩展代码生成器（支持任何编程语言）
  - 为其他游戏引擎创建导出器
  - 插件开发指南

## 多引擎支持

XCell 的设计理念是为所有游戏引擎提供优秀的配置表管理解决方案：

- **Unity (C#)**: 完整内置支持
- **Cocos Creator**: 通过 JSON/XML + TypeScript/Lua 加载器
- **Godot**: 通过 JSON + GDScript 加载器
- **Unreal Engine**: 通过二进制 + C++ 加载器
- **自定义引擎**: 通过扩展性文档创建自定义导出器

## 前置要求

在阅读本部分文档之前，建议您：

1. 熟悉 XCell 的基本使用方法
2. 了解项目配置文件 `XCell.toml` 的基本结构
3. 具备目标语言编程基础（Rust、C#、C++、Python、Lua、TypeScript 等）
