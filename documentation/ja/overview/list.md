# list 表

List は整数 ID を主キーとする設定形式で、順次または数値 ID でアクセスする必要があるデータに適しています。

## 規約

- **最初の列を主キーとして扱う**
- **`@list` マーカーで明示的に List タイプとして宣言**
- **生成される名前はデフォルトでファイル名、`@list 名前` で指定可能**

## 格納構造

List 表は **Array** として格納され、find_key のパフォーマンスは **O(log n)** です。

> ⚠️ プログラムに特別な要件がない場合、デフォルトの dict 表の使用を推奨します。

## マーカー方法

最初の行の最初の列に `@list` マーカーを使用：

| @list | モンスター名 | HP | 攻撃力 |
|--------|----------|--------|--------|
| id | monster_name | hit_points | attack_damage |
| i32 | string | f32 | i32 |
| 1 | スライム | 50 | 5 |
| 2 | ゴブリン | 80 | 10 |
| 3 | スケルトン | 100 | 15 |

## コード生成

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

## 使用シナリオ

モンスター設定、アイテム設定、スキル設定など、順次または数値 ID でアクセスする必要があるデータ。
