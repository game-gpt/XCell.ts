# list 表

List 是以整数 ID 作为主键的配置形式，适用于需要按顺序或按数字 ID 访问的数据。

## 约定

- **第一列视为主键**
- **使用 `@list` 标记显式声明为 List 类型**
- **生成的名称默认以文件名为准，可通过 `@list 名称` 指定**

## 存储结构

List 表格存储为 **Array**，find_key 性能为 **O(log n)**。

> ⚠️ 如果程序没有特殊要求，建议使用默认的 dict 表。

## 标记方式

在第一行第一列使用 `@list` 标记：

| @list | 怪物名称 | 生命值 | 攻击力 |
|--------|----------|--------|--------|
| id | monster_name | hit_points | attack_damage |
| i32 | string | f32 | i32 |
| 1 | 史莱姆 | 50 | 5 |
| 2 | 哥布林 | 80 | 10 |
| 3 | 骷髅兵 | 100 | 15 |

## 代码生成

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

## 使用场景

怪物配置、道具配置、技能配置等需要顺序或按数字 ID 访问的数据。
