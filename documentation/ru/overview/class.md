# Таблица Class

Таблицы Class используются для определения глобальных классов конфигурации, подходящих для сценариев конфигурации-одиночки.

## Соглашения

- **Первая строка, первый столбец — маркер `@class`**
- **Генерирует класс-одиночку**
- **Сгенерированное имя по умолчанию совпадает с именем файла, может быть указано через `@class Name`**

## Способ маркировки

Используйте маркер `@class` в первой строке, первом столбце.

| @class      | @comment | @type  | @default |
| ----------- | -------- | ------ | -------- |
| max\_hp     | Максимальное здоровье   | i32    | 100      |
| user\_name  | Имя игрока  | string | Игрок   |
| move\_speed | Скорость движения   | f32    | 5.0      |

## Генерация кода

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

## Варианты использования

- Глобальная конфигурация игры (например, конфигурация уровней, конфигурация сложности)
- Настройки приложения
- Конфигурация системных параметров
