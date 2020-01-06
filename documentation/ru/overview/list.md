# Таблица List

List — это форма конфигурации, использующая целочисленный ID в качестве первичного ключа, подходящая для данных, к которым нужен последовательный доступ или доступ по числовому ID.

## Соглашения

- **Первый столбец считается первичным ключом**
- **Используйте маркер `@list` для явного объявления типа List**
- **Сгенерированное имя по умолчанию совпадает с именем файла, может быть указано через `@list Name`**

## Структура хранения

Таблицы List хранятся как **Массив**, производительность find_key составляет **O(log n)**.

> ⚠️ Если программа не имеет особых требований, рекомендуется использовать таблицу dict по умолчанию.

## Способ маркировки

Используйте маркер `@list` в первой строке, первом столбце:

| @list | monster_name | hit_points | attack_damage |
|-------|--------------|------------|---------------|
| id | string | f32 | i32 |
| 1 | Слизень | 50 | 5 |
| 2 | Гоблин | 80 | 10 |
| 3 | Скелет | 100 | 15 |

## Генерация кода

### TypeScript (Cocos, Laya)

```typescript
export class Monster {
    public id: number;
    public monsterName: string;
    public hitPoints: number;
    public attackDamage: number;
}

export class MonsterTable {
    private _items: Monster[];
}
```

### C# (Unity, Godot)

```csharp
public class Monster
{
    public int Id;
    public string MonsterName;
    public float HitPoints;
    public float AttackDamage;
}

public class MonsterTable
{
    private Monster[] _items;
}
```

## Варианты использования

Конфигурация монстров, конфигурация предметов, конфигурация навыков и другие данные, требующие последовательного доступа или доступа по числовому ID.
