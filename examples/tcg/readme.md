# TCG 示例

集换式卡牌游戏示例，展示卡牌效果和卡组系统。

## 表格结构

| 文件 | 类型 | 说明 |
|------|------|------|
| Cards.csv | List | 卡牌表，包含颜色类型和效果引用 |
| Classes.csv | List | 职业表 |
| Effects.csv | List | 效果表 |
| Heroes.csv | List | 英雄表 |
| Decks.csv | List | 卡组表，包含卡牌数量元组 |
| CardSets.csv | List | 卡包表 |
| Rarity.csv | Enum | 稀有度枚举表 |
| Keywords.csv | Enum | 关键词枚举表 |
| GameSettings.csv | Class | 全局配置 |

## 特性展示

- `color` 颜色类型
- `[(&Cards, i32)]` 元组列表（卡牌+数量）
- `[&TableName]` 引用列表
- Enum 枚举类型
- Class 类型全局配置
- 卡组配置系统

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
import { CardManager } from './generated/CardManager';
```

3. 加载并使用数据：

```typescript
// 加载 JSON 数据
const response = await fetch('path/to/data.json');
const data = await response.json();
CardManager.getInstance().load(data);

// 查询数据
const item = CardManager.getInstance().get(itemId);
console.log(item.name, item.value);
```

### Unity 集成

1. 将生成的 `unity/` 目录下的文件复制到 Unity 项目的 `Assets/Scripts/DataTable/` 目录中
2. 在代码中使用生成的 C# 类：

```csharp
using DataTable.Generated;

// 加载二进制数据
var manager = new CardManager();
manager.Load(bytes);

// 查询数据
var item = manager.Get(itemId);
Debug.Log($"{item.Name}, {item.Value}");
```
