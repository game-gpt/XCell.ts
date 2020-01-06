# Targets 目標平台

XCell 支援多种目標平台，包含前端和後端。本章节詳細介绍各個平台的集成方式和類型對應。

## 前端平台

前端平台主要面向遊戲引擎和前端框架，提供程式碼產生和資料載入功能。

### 遊戲引擎

- [Unity](unity.md) - Unity 引擎集成 ⚠️ (當前停用)
- [Cocos](cocos.md) - Cocos 引擎集成 ✅
- [Unreal Engine](unreal.md) - Unreal Engine 集成
- [Godot](godot.md) - Godot 引擎集成
- [XLua](xlua.md) - XLua 指令碼集成

### 前端框架

- [React](react.md) - React 框架集成
- [Vue](vue.md) - Vue 框架集成
- [TypeScript/JavaScript](typescript.md) - TypeScript/JavaScript 集成 ✅

## 後端平台

後端平台主要面向伺服器端和資料儲存，提供資料持久化和服務端集成。

### 資料格式

- [JSON](json.md) - JSON 資料格式 ✅
- [SQL](sql.md) - SQL 資料庫集成

## 程式碼產生器狀態說明

| 生成器 | 狀態 | 說明 |
|--------|------|------|
| `json` | ✅ 可用 | JSON 資料生成 |
| `binary` | ✅ 可用 | 二進位資料生成 |
| `cocos` | ✅ 可用 | Cocos 平台程式碼產生 |
| `typescript` | ✅ 可用 | TypeScript 程式碼產生 |
| `dejavu` | ✅ 可用 | 範本引擎程式碼產生 |
| `unity` | ⚠️ 停用 | Unity 平台程式碼產生（正在重构中） |
| `xlua` | 開發中 | XLua 指令碼程式碼產生 |
| `sql` | 開發中 | SQL 資料庫程式碼產生 |
| `xml` | 開發中 | XML 資料生成 |

## 跨平台支援

XCell 设计為跨平台的，支援在不同平台间共享設定資料，確保資料一致性和開發效率。

### 平台间資料共享

- 统一的資料模型
- 跨平台類型對應
- 标准化的設定格式

### 最佳做法

- 根据目標平台選取合适的資料格式
- 利用合資料表規則管理跨平台資料
- 定期同步各平台的資料結構
