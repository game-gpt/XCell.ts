# List 테이블

List는 정수 ID를 기본 키로 사용하는 설정 양식으로, 순차적 접근이나 숫자 ID로 접근해야 하는 데이터에 적합합니다.

## 규칙

- **첫 번째 열이 기본 키로 처리됩니다**
- **`@list` 마커를 사용하여 List 타입으로 명시적으로 선언합니다**
- **생성된 이름은 기본적으로 파일 이름이며, `@list Name`으로 지정할 수 있습니다**

## 저장 구조

List 테이블은 **배열**로 저장되며, find_key 성능은 **O(log n)**입니다.

> ⚠️ 프로그램에 특별한 요구 사항이 없다면 기본 dict 테이블을 사용하는 것이 좋습니다.

## 마킹 방법

첫 번째 행, 첫 번째 열에 `@list` 마커를 사용합니다:

| @list | monster_name | hit_points | attack_damage |
|-------|--------------|------------|---------------|
| id | string | f32 | i32 |
| 1 | Slime | 50 | 5 |
| 2 | Goblin | 80 | 10 |
| 3 | Skeleton | 100 | 15 |

## 코드 생성

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

## 사용 사례

몬스터 설정, 아이템 설정, 스킬 설정 등 순차적 또는 숫자 ID 접근이 필요한 데이터.
