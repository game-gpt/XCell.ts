# Unity 통합

> ⚠️ **참고**: Unity 코드 생성기는 현재 비활성화되어 있으며 리팩토링 중입니다. 다음 문서는 참조용이며 기능이 사용 불가할 수 있습니다.

XCell은 Unity 엔진과의 깊은 통합을 제공하며, C# 코드 생성, 바이너리 데이터 파일 등의 형식을 지원합니다.

## 현재 상태

Unity 코드 생성기(`unity`)는 현재 다음과 같은 이유로 비활성화되어 있습니다:

1. 아키텍처 리팩토링 진행 중
2. 타입 매핑 시스템 업데이트 필요
3. 코드 생성 템플릿 최적화 필요

### 대안 솔루션

Unity 코드 생성기가 다시 활성화되기 전까지 다음과 같은 대안을 고려할 수 있습니다:

1. **JSON 데이터 형식 사용**: [JSON](json.md) 생성기를 통해 데이터를 내보내고, Unity에서 `JsonUtility` 또는 `Newtonsoft.Json`을 사용하여 파싱
2. **TypeScript 생성기 사용**: [TypeScript](typescript.md)를 통해 타입 정의를 생성하고, 수동으로 C# 클래스 작성
3. **Dejavu 템플릿 사용**: [Dejavu 템플릿 엔진](../architecture/index.md#code-generation)을 통해 코드 생성 사용자 정의

## 설정 옵션 (참조)

`ProjectSettings.toml` 파일에서 Unity 통합 설정은 `[unity]` 섹션에 위치합니다:

```toml
[unity]
enable = false  # 현재 비활성화
project = "../"
output = "Assets/Scripts/DataTable/Generated"
namespace = "DataTable.Generated"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"
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
```

## 예상되는 생성 코드 구조

### 테이블 클래스 구조

각 설정 테이블은 해당하는 C# 클래스를 생성하며, 다음을 포함합니다:
- 테이블 데이터 클래스 (Table)
- 요소 데이터 클래스 (Element)
- 관리자 클래스 (Manager)

### 생성된 코드 구조 예제:

```csharp
namespace DataTable.Generated
{
    public class BuffTable
    {
        public Dictionary<int, BuffElement> Data { get; }
        public BuffElement Get(int id);
        public bool TryGet(int id, out BuffElement element);
    }

    public class BuffElement
    {
        public int Id { get; }
        public string Name { get; }
        public int Value { get; }
        // ... 기타 필드
    }

    public class DataTableManager
    {
        public BuffTable BuffTable { get; }
        public void LoadAll();
        public void UnloadAll();
    }
}
```

## 타입 매핑

XCell 타입에서 C# 타입으로의 매핑:

| XCell 타입 | C# 타입 |
| ----------- | ------- |
| bool | bool |
| i8 | sbyte |
| i16 | short |
| i32 | int |
| i64 | long |
| u8 | byte |
| u16 | ushort |
| u32 | uint |
| u64 | ulong |
| f32 | float |
| f64 | double |
| string | string |
| color | UnityEngine.Color |
| vec2 | UnityEngine.Vector2 |
| vec3 | UnityEngine.Vector3 |
| vec4 | UnityEngine.Vector4 |
| quaternion | UnityEngine.Quaternion |

## 일반적인 문제

### Unity 생성기가 비활성화된 이유는 무엇인가요?

Unity 코드 생성기는 더 나은 타입 시스템과 코드 생성 아키텍처를 지원하기 위해 리팩토링 중입니다. 향후 버전에서 다시 활성화될 예정입니다.

### 최신 상태를 어떻게 확인할 수 있나요?

프로젝트 업데이트 로그를 팔로우하거나 `backends/xcell-generator/src/codegen/unity/` 디렉토리의 코드 변경을 확인하세요.

## 모범 사례

1. **메타 테이블 형식 사용**: 복잡한 설정 테이블의 경우 메타 테이블 형식을 권장하며, 더 풍부한 메타데이터 정의를 지원합니다
2. **병합 규칙 합리적 사용**: 대규모 프로젝트의 경우 병합 규칙을 사용하여 복잡한 테이블을 관리합니다
3. **데이터 구조 최적화**: 실제 사용 사례에 따라 적절한 데이터 타입과 구조를 선택합니다
4. **정기적 정리**: 불필요한 설정 테이블과 데이터를 정기적으로 정리하여 프로젝트를 깔끔하게 유지합니다
