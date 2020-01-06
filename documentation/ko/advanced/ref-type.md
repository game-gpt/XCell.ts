# 참조 타입

## 참조 타입이 필요한 이유

게임 데이터를 설정할 때 다음과 같은 문제를 자주 겪게 됩니다:

**잘못된 ID**

아이템 테이블에 품질 ID `comon`을 입력했지만, 실제 품질 테이블에는 `common`이 있어 `m`이 하나 빠져 있습니다. 이런 철자 오류는 발견하기 어렵고, 게임이 실행될 때 문제가 발생합니다.

**ID가 변경되었으나 참조가 동기화되지 않음**

품질 테이블에서 `common`을 `normal`로 변경했지만, 아이템 테이블에서는 여전히 `common`을 사용하고 있습니다. 결과적으로 아이템이 해당 품질 설정을 찾을 수 없게 됩니다.

---

참조 타입은 이러한 문제를 해결하기 위해 설계되었습니다. XCell은 참조가 올바른지 자동으로 확인하여 다음을 보장합니다:
- 입력된 ID는 대상 테이블에 존재해야 합니다
- ID가 존재하지 않으면 즉시 오류가 보고됩니다

## 기본 형식

- `&T` - 테이블 T에 대한 참조

## 참조란 무엇인가?

간단히 말해, 참조는 "다른 테이블의 한 행 데이터를 가리키는 링크"입니다.

예를 들어: 아이템 테이블에서 "이 아이템이 어느 품질에 속하는지"를 기록해야 할 때, 참조 타입을 사용하여 품질 테이블을 가리킬 수 있습니다.

## 예제

### 1단계: 품질 테이블 생성

먼저 품질 테이블을 생성합니다:

| @dict | Color | Description |
| ----- | ----- | ----------- |
| quality_id | color | desc |
| string | string | string |
| common | #FFFFFF | 일반 품질 |
| rare | #00FFFF | 희귀 품질 |
| epic | #FF00FF | 에픽 품질 |

### 2단계: 아이템 테이블 생성 (품질 테이블 참조)

아이템 테이블의 `quality_id` 필드에 `&Quality` 타입을 사용하여 품질 테이블을 참조함을 나타냅니다:

| @dict | Name | Quality | Attack |
| ----- | ---- | ------- | ------ |
| item_id | name | quality_id | attack |
| string | string | &Quality | i32 |
| sword_001 | Iron Sword | common | 10 |
| sword_002 | Steel Sword | rare | 50 |
| sword_003 | Dragon Sword | epic | 200 |

## 일반 사용 사례

| 시나리오 | 설명 |
| -------- | ---- |
| 아이템 → 품질 | 아이템이 속한 품질 등급 |
| 장비 → 캐릭터 | 장비를 장착할 수 있는 캐릭터 |
| 스킬 → 클래스 | 스킬이 속한 클래스 |
| 몬스터 → 드롭 테이블 | 몬스터가 드롭하는 드롭 테이블 |

## 참조 가능한 테이블 타입

다음 타입의 테이블은 참조할 수 있습니다:

| 타입 | 설명 |
| ---- | ---- |
| dict 테이블 | 문자열 기본 키, 예: 아이템 ID, 스킬 ID |
| list 테이블 | 정수 기본 키, 예: 몬스터 번호, 아이템 번호 |
| language 테이블 | 언어 키, 형식은 `group_name/language_key`, 예: `&Language` |

### 언어 테이블 참조의 특수 형식

언어 테이블을 참조할 때 입력 값의 형식은 `group_name/language_key`입니다:

| @dict | Name | Tip Text |
| ----- | ---- | -------- |
| item_id | name | tip |
| string | string | &Language |
| sword_001 | Iron Sword | ui/item_tip_001 |

다음 타입은 **참조할 수 없습니다**:

| 타입 | 이유 |
| ---- | ---- |
| enum 테이블 | 열거형은 고정된 옵션이며, 데이터 테이블이 아님 |
| class 테이블 | 전역 설정은 하나의 인스턴스만 가짐 |
| 기본 타입 | i32, string 등은 값 타입이며, 테이블이 아님 |

## 중첩 타입에서의 참조

참조 타입은 다른 타입과 결합하여 더 복잡한 데이터 구조를 형성할 수 있습니다.

### 참조 배열

여러 대상을 참조해야 할 때 참조 배열을 사용할 수 있습니다:

| 형식 | 설명 |
| ---- | ---- |
| `[&T]` | 참조 배열, 여러 대상 테이블 기본 키 저장 |

**예제: 여러 아이템을 참조하는 드롭 테이블**

| @dict | Name | Drop Items |
| ----- | ---- | ---------- |
| drop_id | name | items |
| string | string | [&Item] |
| drop_001 | Starter Pack | sword_001, potion_001 |
| drop_002 | Elite Reward | sword_002, armor_001, gem_001 |

### 기타 중첩 조합

| 형식 | 설명 |
| ---- | ---- |
| `[&T]` | 참조 배열 |
| `Vec<&T>` | 참조 벡터 |
| `HashMap<string, &T>` | 문자열에서 참조로의 매핑 |

## 참조 검증

XCell은 참조가 올바른지 자동으로 확인합니다:

- ✅ 참조된 ID는 대상 테이블에 존재해야 합니다
- ✅ 존재하지 않는 ID를 입력할 수 없습니다
- ✅ 순환 참조가 감지되어 보고됩니다

## 코드 생성

### TypeScript (Cocos, Laya)

```typescript
export class Item {
    public itemId: string;
    public name: string;
    public qualityId: string;  // 기본 키 값 저장
    public attack: number;
}

export class ItemTable {
    private _items: Map<string, Item>;
    private _qualityTable: QualityTable;

    public getQuality(itemId: string): Quality | undefined {
        const item = this._items.get(itemId);
        if (item) {
            return this._qualityTable.get(item.qualityId);
        }
        return undefined;
    }
}
```

### C# (Unity, Godot)

```csharp
public class Item
{
    public string ItemId;
    public string Name;
    public string QualityId;  // 기본 키 값 저장
    public int Attack;
}

public class ItemTable
{
    private Dictionary<string, Item> _items;
    private QualityTable _qualityTable;

    public Quality GetQuality(string itemId)
    {
        if (_items.TryGetValue(itemId, out var item))
        {
            return _qualityTable.Get(item.QualityId);
        }
        return null;
    }
}
```

## 주의 사항

- 참조 대상 테이블이 존재해야 합니다
- 대상 테이블은 dict, list 또는 language 타입이어야 합니다
- enum 및 class 테이블은 참조할 수 없습니다
- 기본 타입(i32, string 등)은 참조할 수 없습니다
- 테이블 이름은 PascalCase를 권장합니다. 예: `&QualityTable`
