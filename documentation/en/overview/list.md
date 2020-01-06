# List Table

List is a configuration form that uses integer ID as the primary key, suitable for data that needs to be accessed sequentially or by numeric ID.

## Conventions

- **First column is treated as primary key**
- **Use `@list` marker to explicitly declare as List type**
- **Generated name defaults to the filename, can be specified via `@list Name`**

## Storage Structure

List tables are stored as **Array**, with find_key performance of **O(log n)**.

> ⚠️ If the program has no special requirements, it is recommended to use the default dict table.

## Marking Method

Use the `@list` marker in the first row, first column:

| @list | monster_name | hit_points | attack_damage |
|-------|--------------|------------|---------------|
| id | string | f32 | i32 |
| 1 | Slime | 50 | 5 |
| 2 | Goblin | 80 | 10 |
| 3 | Skeleton | 100 | 15 |

## Code Generation

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

## Use Cases

Monster configuration, item configuration, skill configuration, and other data that needs sequential or numeric ID access.
