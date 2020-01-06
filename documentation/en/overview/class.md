# Class Table

Class tables are used to define global configuration classes, suitable for singleton configuration scenarios.

## Conventions

- **First row, first column is the `@class` marker**
- **Generates a singleton class**
- **Generated name defaults to the filename, can be specified via `@class Name`**

## Marking Method

Use `@class` marker in the first row, first column.

| @class      | @comment | @type  | @default |
| ----------- | -------- | ------ | -------- |
| max\_hp     | Max Health   | i32    | 100      |
| user\_name  | Player Name  | string | Player   |
| move\_speed | Move Speed   | f32    | 5.0      |

## Code Generation

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

## Use Cases

- Game global configuration (e.g., level configuration, difficulty configuration)
- Application settings
- System parameter configuration
