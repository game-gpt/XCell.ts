# Roguelike 示例

Roguelike 游戏示例，展示随机事件和遗物系统。

## 表格结构

| 文件 | 类型 | 说明 |
|------|------|------|
| Characters.csv | List | 角色表，包含初始遗物引用 |
| Cards.csv | List | 卡牌表，卡牌战斗系统 |
| Effects.csv | List | 效果表，各种游戏效果 |
| Enemies.csv | List | 敌人表，包含精英和 BOSS |
| Events.csv | List | 随机事件表 |
| EventOptions.csv | List | 事件选项表，包含事件链引用 |
| Relics.csv | List | 遗物表，包含稀有度枚举引用 |
| Rooms.csv | List | 房间表，包含 vec2 位置类型 |
| Rarity.csv | Enum | 稀有度枚举表 |
| GameSettings.csv | Class | 全局配置 |

## 特性展示

- `vec2<i32>` 2D 向量类型
- `&TableName` 外键引用
- `[&TableName]` 引用列表
- Enum 枚举引用
- Class 类型全局配置
- 事件链系统
- 遗物系统

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
import { RelicManager } from './generated/RelicManager';
```

3. 加载并使用数据：

```typescript
// 加载 JSON 数据
const response = await fetch('path/to/data.json');
const data = await response.json();
RelicManager.getInstance().load(data);

// 查询数据
const item = RelicManager.getInstance().get(itemId);
console.log(item.name, item.value);
```

### Unity 集成

1. 将生成的 `unity/` 目录下的文件复制到 Unity 项目的 `Assets/Scripts/DataTable/` 目录中
2. 在代码中使用生成的 C# 类：

```csharp
using DataTable.Generated;

// 加载二进制数据
var manager = new RelicManager();
manager.Load(bytes);

// 查询数据
var item = manager.Get(itemId);
Debug.Log($"{item.Name}, {item.Value}");
```
