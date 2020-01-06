# Class-Tabelle

Class-Tabellen werden verwendet, um globale Konfigurationsklassen zu definieren, geeignet für Singleton-Konfigurationsszenarien.

## Konventionen

- **Erste Zeile, erste Spalte ist der `@class`-Marker**
- **Erzeugt eine Singleton-Klasse**
- **Der generierte Name ist standardmäßig der Dateiname, kann über `@class Name` angegeben werden**

## Markierungsmethode

Verwenden Sie den `@class`-Marker in der ersten Zeile, erste Spalte.

| @class      | @comment | @type  | @default |
| ----------- | -------- | ------ | -------- |
| max\_hp     | Maximale Gesundheit   | i32    | 100      |
| user\_name  | Spielername  | string | Player   |
| move\_speed | Bewegungsgeschwindigkeit   | f32    | 5.0      |

## Codegenerierung

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

## Anwendungsfälle

- Globale Spielkonfiguration (z.B. Level-Konfiguration, Schwierigkeitskonfiguration)
- Anwendungseinstellungen
- Systemparameterkonfiguration
