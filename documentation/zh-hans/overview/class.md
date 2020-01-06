# class 表

Class 表格用于定义全局配置类，适用于单例配置场景。

## 约定

- **第一行第一列为 `@class` 标记**
- **生成单例类**
- **生成的名称默认以文件名为准，可通过 `@class 名称` 指定**

## 标记方式

第一行第一列使用 `@class` 标记。

| @class      | @comment | @type  | @default |
| ----------- | -------- | ------ | -------- |
| max\_hp     | 最大生命值    | i32    | 100      |
| user\_name  | 玩家名称     | string | Player   |
| move\_speed | 移动速度     | f32    | 5.0      |

## 代码生成

### TypeScript (Cocos, Laya)

```typescript
export class GameConfig {
    public static maxHp: number = 100;
    public static userName: string = "Player";
    public static moveSpeed: number = 5.0;
}
```

### C# (Unity, Godot)

```csharp
public static class GameConfig
{
    public static int MaxHp = 100;
    public static string UserName = "Player";
    public static float MoveSpeed = 5.0f;
}
```

## 使用场景

- 游戏全局配置（如关卡配置、难度配置）
- 应用程序设置
- 系统参数配置
