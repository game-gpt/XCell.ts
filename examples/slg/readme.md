# SLG 示例

策略游戏示例，展示科技树和单位系统。

## 表格结构

| 文件 | 类型 | 说明 |
|------|------|------|
| Units.csv | List | 单位表，包含训练建筑引用 |
| Buildings.csv | List | 建筑表，包含科技需求引用 |
| Technologies.csv | List | 科技表，包含前置科技引用列表 |
| UnitUpgrades.csv | List | 单位升级表 |
| Resources.csv | Enum | 资源枚举表 |
| GameSettings.csv | Class | 全局配置 |

## 特性展示

- `&TableName` 外键引用
- `[&TableName]` 引用列表
- Enum 枚举类型
- Class 类型全局配置
- 科技依赖树
- 单位升级系统

## 平台集成指南

### 生成代码和数据

在示例目录下运行以下命令：

```bash
xcell.exe
```

XCell 将根据 `ProjectSettings.toml` 中的配置，自动生成对应平台的代码和数据文件。

### Cocos Creator 集成

1. 将生成的 `cocos/` 目录下的文件复制到 Cocos Creator 项目的 `assets/scripts/` 目录中
2. 在代码中导入生成的 TypeScript 类：

```typescript
import { UnitManager } from './generated/UnitManager';
```

3. 加载并使用数据：

```typescript
// 加载 JSON 数据
const response = await fetch('path/to/data.json');
const data = await response.json();
UnitManager.getInstance().load(data);

// 查询数据
const item = UnitManager.getInstance().get(itemId);
console.log(item.name, item.value);
```

### Unity 集成

1. 将生成的 `unity/` 目录下的文件复制到 Unity 项目的 `Assets/Scripts/DataTable/` 目录中
2. 在代码中使用生成的 C# 类：

```csharp
using DataTable.Generated;

// 加载二进制数据
var manager = new UnitManager();
manager.Load(bytes);

// 查询数据
var item = manager.Get(itemId);
Debug.Log($"{item.Name}, {item.Value}");
```
