# 進階

本部分內容适用於對 XCell 有基本了解，希望深入了解其內部机制、擴充功能或實现高級設定的開發者。

## 檔案結構

### 類型系統
- [type-system.md](type-system.md) - 類型系統檔案
  - 基本類型（整數、浮點數、布爾、字串）
  - 復合類型（陣列、向量、字典、元組）
  - 特殊類型（顏色、时间）
  - 自訂類型（列舉、結構體）
  - 類型转换和驗證

### 欄位約束
- [key-field.md](key-field.md) - 欄位約束檔案
  - 唯一约束
  - 主鍵约束
  - 復合约束

### 參照類型
- [ref-type.md](ref-type.md) - 參照類型檔案
  - 基本格式
  - 工作原理
  - 使用場景
  - 參照驗證

### 元屬性
- [meta-data.md](meta-data.md) - 元屬性檔案
  - 基本元屬性（var, type, default, field, client, server, meta）
  - 資料表格類型標記（class, enum, table, language）
  - 使用規則和範例

### 設定
- [config.md](config.md) - 設定檔案檔案
  - 專案設定
  - 資料表格設定
  - 行對應

### 擴充性
- [extensibility.md](extensibility.md) - 擴充性檔案
  - 自訂類型系統
  - 擴充程式碼產生器（支援任何程式設計語言）
  - 為其他遊戲引擎建立匯出器
  - 外掛程式開發指南

## 多引擎支援

XCell 的设计理念是為所有遊戲引擎提供優秀的設定資料表管理解決方案：

- **Unity (C#)**: 完整內置支援
- **Cocos Creator**: 通过 JSON/XML + TypeScript/Lua 載入器
- **Godot**: 通过 JSON + GDScript 載入器
- **Unreal Engine**: 通过二進位 + C++ 載入器
- **自訂引擎**: 通过擴充性檔案建立自訂匯出器

## 前置要求

在阅读本部分檔案之前，建議您：

1. 熟悉 XCell 的基本使用方法
2. 了解專案設定檔案 `XCell.toml` 的基本結構
3. 具備目標語言程式設計基礎（Rust、C#、C++、Python、Lua、TypeScript 等）
