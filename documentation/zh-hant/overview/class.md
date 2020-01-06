# class 資料表

Class 資料表格用於定義全局設定类，适用於單例設定場景。

## 約定

- **第一行第一列為 `@class` 標記**
- **生成單例类**
- **生成的名稱預設以檔案名為准，可通过 `@class 名稱` 指定**

## 標記方式

第一行第一列使用 `@class` 標記。

| @class      | @comment | @type  | @default |
| ----------- | -------- | ------ | -------- |
| max\_hp     | 最大生命值    | i32    | 100      |
| user\_name  | 玩家名稱     | string | Player   |
| move\_speed | 行動速度     | f32    | 5.0      |

## 程式碼產生

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

## 使用場景

- 遊戲全局設定（如關卡設定、难度設定）
- 應用程式設定
- 系統參數設定
