# class 表

Class 表はグローバル設定クラスを定義するために使用され、シングルトン設定シナリオに適しています。

## 規約

- **最初の行の最初の列に `@class` マーカー**
- **シングルトンクラスを生成**
- **生成される名前はデフォルトでファイル名、`@class 名前` で指定可能**

## マーカー方法

最初の行の最初の列に `@class` マーカーを使用。

| @class      | @comment | @type  | @default |
| ----------- | -------- | ------ | -------- |
| max\_hp     | 最大HP    | i32    | 100      |
| user\_name  | プレイヤー名 | string | Player   |
| move\_speed | 移動速度   | f32    | 5.0      |

## コード生成

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

## 使用シナリオ

- ゲームグローバル設定（レベル設定、難易度設定など）
- アプリケーション設定
- システムパラメータ設定
