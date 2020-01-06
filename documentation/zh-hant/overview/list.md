# list 資料表

List 是以整數 ID 作為主鍵的設定形式，适用於需要按顺序或按数字 ID 存取的資料。

## 約定

- **第一列视為主鍵**
- **使用 `@list` 標記显式聲明為 List 類型**
- **生成的名稱預設以檔案名為准，可通过 `@list 名稱` 指定**

## 儲存結構

List 資料表格儲存為 **Array**，find_key 效能為 **O(log n)**。

> ⚠️ 如果程式没有特殊要求，建議使用預設的 dict 資料表。

## 標記方式

在第一行第一列使用 `@list` 標記：

| @list | 怪物名稱 | 生命值 | 攻擊力 |
|--------|----------|--------|--------|
| id | monster_name | hit_points | attack_damage |
| i32 | string | f32 | i32 |
| 1 | 史莱姆 | 50 | 5 |
| 2 | 哥布林 | 80 | 10 |
| 3 | 骷髅兵 | 100 | 15 |

## 程式碼產生

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

## 使用場景

怪物設定、道具設定、技能設定等需要顺序或按数字 ID 存取的資料。
