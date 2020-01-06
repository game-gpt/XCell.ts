# Tower Defense 示例

塔防游戏示例，展示塔升级和波次系统。

## 表格结构

| 文件 | 类型 | 说明 |
|------|------|------|
| Towers.csv | List | 塔表，包含自引用升级和 vec3 范围 |
| Enemies.csv | List | 敌人表 |
| Waves.csv | List | 波次表，包含敌人数量元组列表 |
| Maps.csv | List | 地图表，包含路径配置 |
| Projectiles.csv | List | 弹道表 |
| Upgrades.csv | List | 升级表 |
| Effects.csv | List | 效果表 |
| GameSettings.csv | Class | 全局配置 |

## 特性展示

- `vec3<f32>` 3D 向量类型
- `[(&Enemies, i32)]` 元组列表（敌人+数量）
- `&Towers` 自引用（塔升级）
- `&TableName` 外键引用
- Class 类型全局配置
- 波次配置系统

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
import { TowerManager } from './generated/TowerManager';
```

3. 加载并使用数据：

```typescript
// 加载 JSON 数据
const response = await fetch('path/to/data.json');
const data = await response.json();
TowerManager.getInstance().load(data);

// 查询数据
const item = TowerManager.getInstance().get(itemId);
console.log(item.name, item.value);
```

### Unity 集成

1. 将生成的 `unity/` 目录下的文件复制到 Unity 项目的 `Assets/Scripts/DataTable/` 目录中
2. 在代码中使用生成的 C# 类：

```csharp
using DataTable.Generated;

// 加载二进制数据
var manager = new TowerManager();
manager.Load(bytes);

// 查询数据
var item = manager.Get(itemId);
Debug.Log($"{item.Name}, {item.Value}");
```
