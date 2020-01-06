# Galgame 示例

视觉小说/恋爱游戏示例，展示分支剧情和好感度系统。

## 表格结构

| 文件 | 类型 | 说明 |
|------|------|------|
| Characters.csv | List | 角色表，包含角色基本信息和唯一名称约束 |
| Scenes.csv | List | 场景表，定义游戏场景和背景音乐 |
| Dialogues.csv | List | 对话表，包含角色引用和场景引用 |
| Choices.csv | List | 选项表，分支选项和好感度变化 |
| Affection.csv | List | 好感度等级表，定义好感等级和解锁内容 |
| AffectionCondition.csv | List | 好感度条件表，触发特定剧情的条件 |
| Achievements.csv | List | 成就表，游戏成就定义 |
| Endings.csv | List | 结局表，多种结局配置 |

## 特性展示

- `@text` 唯一名称约束
- `&TableName` 外键引用
- `[&TableName]` 引用列表
- 分支剧情系统
- 好感度系统

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
import { DialogueManager } from './generated/DialogueManager';
```

3. 加载并使用数据：

```typescript
// 加载 JSON 数据
const response = await fetch('path/to/data.json');
const data = await response.json();
DialogueManager.getInstance().load(data);

// 查询数据
const item = DialogueManager.getInstance().get(itemId);
console.log(item.name, item.value);
```

### Unity 集成

注意：本示例的 ProjectSettings.toml 中 Unity 生成器已禁用。如需 Unity 集成，请取消注释 Unity 生成器配置并重新运行。

1. 将生成的 `unity/` 目录下的文件复制到 Unity 项目的 `Assets/Scripts/DataTable/` 目录中
2. 在代码中使用生成的 C# 类：

```csharp
using DataTable.Generated;

// 加载二进制数据
var manager = new DialogueManager();
manager.Load(bytes);

// 查询数据
var item = manager.Get(itemId);
Debug.Log($"{item.Name}, {item.Value}");
```
