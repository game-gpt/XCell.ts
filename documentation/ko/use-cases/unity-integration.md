
# Unity 통합

이 튜토리얼은 XCell 설정 테이블 관리 도구를 Unity 프로젝트와 원활하게 통합하는 방법을 자세히 설명합니다.

## 프로젝트 구조

권장되는 Unity 프로젝트 및 XCell 작업 디렉토리 구조는 다음과 같습니다:

```
MyUnityGame/
├── UnityProject/          # Unity 프로젝트 루트 디렉토리
│   ├── Assets/
│   │   ├── Scripts/
│   │   │   └── DataTable/
│   │   │       └── Generated/    # 자동 생성된 C# 코드
│   │   └── Tables/
│   │       └── Generated/         # 자동 생성된 바이너리 데이터
│   └── ProjectSettings/
└── XCellWork/             # XCell 작업 디렉토리
    ├── xcell.exe
    ├── ProjectConfig.toml
    └── Tables/
        ├── Hero.xlsx
        ├── Item.xlsx
        └── Skill.xlsx
```

## ProjectConfig.toml 설정

XCell 작업 디렉토리에 `ProjectConfig.toml`을 생성합니다. 설정은 다음과 같습니다:

```toml
version = "1.0.0"

exclude = ""
include = "*.xlsx"

line.field = 1
line.type = 2
line.comment = 3
line.data = 4

[type.bool]
accept = ["true", "√", "是"]
reject = ["false", "x", "否"]

[type.string]

[unity]
enable = true
project = "../UnityProject"
output = "Assets/Scripts/DataTable/Generated"
namespace = "MyGame.DataTable"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Data"
support_clone = true
legacy_using = false
legacy_null_null = false

[unity.binary]
enable = true
output = "Assets/Tables/Generated"

[unity.xlua]
enable = false

[unity.xml]
enable = false
output = "Assets/Tables/Readable"

[unity.json]
enable = false
output = "Assets/Tables/Readable"

[unity.protobuf]
enable = false
```

### 설정 설명

| 설정 항목 | 설명 |
| --------- | ---- |
| `unity.project` | Unity 프로젝트의 상대 경로 |
| `unity.output` | C# 코드 생성 경로 |
| `unity.namespace` | 생성된 코드의 네임스페이스 |
| `unity.manager` | 데이터 관리자 클래스 이름 |
| `unity.suffix_table` | 테이블 클래스 이름 접미사 |
| `unity.suffix_element` | 데이터 요소 클래스 이름 접미사 |
| `unity.binary.output` | 바이너리 데이터 출력 경로 |

## 설정 테이블 예제 생성

### 1. 영웅 설정 테이블 (Hero.xlsx)

| id | name | name_key | hp | attack | defense | speed | rarity | skill_ids |
|----|------|----------|----|--------|---------|-------|--------|-----------|
| int | string | string | int | int | int | float | int | int[] |
| 영웅 ID | 영웅 이름 | 이름 현지화 키 | 체력 | 공격력 | 방어력 | 속도 | 희귀도 | 스킬 ID 목록 |
| 1001 | Knight | hero_knight | 1500 | 120 | 80 | 1.2 | 2 | [101, 102] |
| 1002 | Mage | hero_mage | 900 | 180 | 40 | 1.5 | 2 | [201, 202] |
| 1003 | Archer | hero_archer | 1000 | 150 | 50 | 1.8 | 2 | [301, 302] |

### 2. 아이템 설정 테이블 (Item.xlsx)

| id | name | type | price | stackable | max_stack | description |
|----|------|------|-------|-----------|-----------|-------------|
| int | string | int | int | bool | int | string |
| 아이템 ID | 아이템 이름 | 아이템 타입 | 가격 | 중첩 가능 | 최대 중첩 | 설명 |
| 1 | Health Potion | 1 | 50 | true | 99 | 체력 500 회복 |
| 2 | Mana Potion | 1 | 60 | true | 99 | 마나 300 회복 |
| 3 | Iron Sword | 2 | 500 | false | 1 | 기본 무기, 공격력 +50 |

### 3. 스킬 설정 테이블 (Skill.xlsx)

| id | name | damage | cooldown | mp_cost | target_type |
|----|------|--------|----------|---------|-------------|
| int | string | int | float | int | int |
| 스킬 ID | 스킬 이름 | 피해 | 쿨다운 | MP 소모 | 대상 타입 |
| 101 | Slash | 100 | 2.0 | 0 | 1 |
| 102 | Shield Bash | 80 | 3.0 | 10 | 1 |
| 201 | Fireball | 200 | 3.5 | 30 | 2 |

## XCell 실행하여 코드 생성

XCell 작업 디렉토리에서 명령줄을 열고 실행합니다:

```bash
xcell.exe
```

생성 완료 후 Unity 프로젝트에서 다음 파일을 볼 수 있습니다:

```
UnityProject/
├── Assets/
│   ├── Scripts/DataTable/Generated/
│   │   ├── HeroTable.cs
│   │   ├── ItemTable.cs
│   │   ├── SkillTable.cs
│   │   └── DataTableManager.cs
│   └── Tables/Generated/
│       ├── HeroTable.bytes
│       ├── ItemTable.bytes
│       └── SkillTable.bytes
```

## 데이터 로더 생성

Unity 프로젝트에 `DataTableLoader.cs` 스크립트를 생성합니다:

```csharp
using System;
using System.IO;
using UnityEngine;
using MyGame.DataTable;

public class DataTableLoader : MonoBehaviour
{
    private static DataTableLoader _instance;
    public static DataTableLoader Instance => _instance;

    public HeroTable HeroTable { get; private set; }
    public ItemTable ItemTable { get; private set; }
    public SkillTable SkillTable { get; private set; }

    private void Awake()
    {
        if (_instance != null && _instance != this)
        {
            Destroy(gameObject);
            return;
        }

        _instance = this;
        DontDestroyOnLoad(gameObject);
        LoadAllTables();
    }

    private void LoadAllTables()
    {
        HeroTable = LoadTable<HeroTable>("HeroTable");
        ItemTable = LoadTable<ItemTable>("ItemTable");
        SkillTable = LoadTable<SkillTable>("SkillTable");
    }

    private T LoadTable<T>(string tableName) where T : class, new()
    {
        TextAsset textAsset = Resources.Load<TextAsset>($"Tables/{tableName}");
        if (textAsset == null)
        {
            Debug.LogError($"Failed to load table: {tableName}");
            return null;
        }

        using (MemoryStream stream = new MemoryStream(textAsset.bytes))
        using (BinaryReader reader = new BinaryReader(stream))
        {
            T table = new T();
            var method = typeof(T).GetMethod("Read");
            if (method != null)
            {
                method.Invoke(table, new object[] { reader });
            }
            return table;
        }
    }
}
```

## 게임에서 설정 테이블 사용

### 예제 1: 영웅 데이터 가져오기

```csharp
public class Hero : MonoBehaviour
{
    public int heroId;
    private HeroData _heroData;

    private void Start()
    {
        _heroData = DataTableLoader.Instance.HeroTable.GetElement(heroId);
        if (_heroData == null)
        {
            Debug.LogError($"Hero data not found: {heroId}");
            return;
        }

        InitializeHero();
    }

    private void InitializeHero()
    {
        Debug.Log($"Loading hero: {_heroData.name}");
        Debug.Log($"Health Points: {_heroData.hp}");
        Debug.Log($"Attack Power: {_heroData.attack}");
    }
}
```

### 예제 2: 아이템 시스템 통합

```csharp
public class InventoryManager : MonoBehaviour
{
    public void UseItem(int itemId)
    {
        ItemData itemData = DataTableLoader.Instance.ItemTable.GetElement(itemId);
        if (itemData == null)
        {
            Debug.LogError($"Item not found: {itemId}");
            return;
        }

        switch (itemData.type)
        {
            case 1:
                UseConsumable(itemData);
                break;
            case 2:
                EquipWeapon(itemData);
                break;
        }
    }

    private void UseConsumable(ItemData item)
    {
        Debug.Log($"Using item: {item.name}");
    }

    private void EquipWeapon(ItemData item)
    {
        Debug.Log($"Equipping weapon: {item.name}");
    }
}
```

### 예제 3: 스킬 시스템

```csharp
public class SkillController : MonoBehaviour
{
    public void CastSkill(int skillId, GameObject caster, GameObject target)
    {
        SkillData skillData = DataTableLoader.Instance.SkillTable.GetElement(skillId);
        if (skillData == null)
        {
            Debug.LogError($"Skill not found: {skillId}");
            return;
        }

        Debug.Log($"Casting skill: {skillData.name}, Damage: {skillData.damage}");
    }
}
```

## 워크플로 권장 사항

### 개발 단계

1. Excel에서 설정 테이블 편집
2. `xcell.exe` 실행하여 코드와 데이터 생성
3. Unity 프로젝트 새로고침
4. Unity에서 테스트

### 감시 모드

개발 중에 감시 모드를 사용하여 파일 변경을 자동으로 감지할 수 있습니다:

```bash
xcell.exe --watch
```

이렇게 하면 Excel 테이블을 수정할 때 XCell이 자동으로 코드와 데이터 파일을 재생성합니다.

## 모범 사례

1. **버전 관리**: Excel 테이블과 `ProjectConfig.toml`을 버전 관리에 포함하고, 생성된 코드와 바이너리 파일은 제외합니다
2. **폴더 구성**: 기능 모듈별로 Excel 테이블 파일을 구성합니다
3. **명명 규칙**: 일관된 명명 규칙 사용, 예: PascalCase 또는 snake_case
4. **데이터 검증**: 정기적으로 `xcell.exe check`를 사용하여 설정 테이블 데이터의 정확성을 검증합니다
5. **문서 유지**: 복잡한 설정 테이블에 대한 문서를 추가합니다
