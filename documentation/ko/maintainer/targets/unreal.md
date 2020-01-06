# Unreal Engine 통합

XCell은 언리얼 엔진과의 깊은 통합을 제공하며, C++ 코드 생성, 바이너리 데이터 파일 등의 형식을 지원합니다.

## 설정 옵션

`XCell.toml` 파일에서 언리얼 엔진 통합 설정은 `[unreal]` 섹션에 위치합니다:

```toml
[unreal]
enable = true
project = "../"
output = "Source/DataTable/Generated"
namespace = "DataTable::Generated"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"

[unreal.binary]
enable = true
output = "Content/Tables/Generated"

[unreal.json]
enable = false
output = "Content/Tables/Readable"
```

## 생성된 코드 구조

### 테이블 클래스 구조

각 설정 테이블은 해당하는 C++ 클래스를 생성하며, 다음을 포함합니다:
- 테이블 데이터 클래스 (Table)
- 요소 데이터 클래스 (Element)
- 관리자 클래스 (Manager)

### 생성된 코드 구조 예제:

```cpp
namespace DataTable::Generated {
    class BuffTable {
    public:
        const BuffElement* Get(int32 Id) const;
        bool TryGet(int32 Id, const BuffElement*& OutElement) const;

    private:
        TMap<int32, BuffElement> Data;
    };

    class BuffElement {
    public:
        int32 Id = 0;
        FString Name = "";
        int32 Value = 0;
        // ... 기타 필드
    };

    class DataTableManager {
    public:
        BuffTable BuffTable;
        void LoadAll();
        void UnloadAll();
    };
}
```

## 데이터 로딩

### 바이너리 데이터 로딩:

```cpp
auto Manager = MakeShared<DataTableManager>();
Manager->LoadAll();
```

### 지원 기능:
- 비동기 로딩
- 증분 로딩
- 메모리 관리
- 핫 업데이트 지원

## 타입 매핑

XCell 타입에서 C++ 타입으로의 매핑:

| XCell 타입 | C++ 타입 |
| ----------- | -------- |
| bool | bool |
| i8 | int8 |
| i16 | int16 |
| i32 | int32 |
| i64 | int64 |
| u8 | uint8 |
| u16 | uint16 |
| u32 | uint32 |
| u64 | uint64 |
| f32 | float |
| f64 | double |
| string | FString |
| color | FColor |
| vec2 | FVector2D |
| vec3 | FVector |
| vec4 | FVector4 |
| quaternion | FQuat |

## 성능 최적화

### 대용량 테이블 처리 최적화

1. **대용량 테이블 합리적 분할**
   - 기능이나 모듈별로 대용량 테이블 분할
   - 행 병합 규칙을 사용하여 빌드 시 병합
   - 개발 시 유지보수성과 런타임 성능 유지

2. **바이너리 형식 사용**
   - 바이너리 형식이 가장 빠른 로딩 속도를 제공
   - 프로덕션 환경에서는 바이너리 형식 권장
   - 개발 환경에서는 디버깅을 위해 JSON 사용 가능

### 증분 업데이트 최적화

1. **감시 모드**
   감시 모드 사용:
   ```bash
   xcell.exe --watch
   ```
   감시 모드 기능:
   - 변경된 파일만 재생성
   - 개발 효율성 크게 향상
   - 실시간 미리보기 지원

2. **합리적인 감시 설정**
   합리적인 include/exclude 패턴을 설정하여 감시할 파일 수를 줄입니다.

### 메모리 최적화

1. **필요한 테이블만 로드**
   ```cpp
   // 특정 테이블만 로드
   Manager->BuffTable.Load();
   Manager->ItemTable.Load();
   ```

2. **적시에 언로드**
   ```cpp
   // 불필요한 테이블 언로드
   Manager->BuffTable.Unload();
   ```

## 일반적인 문제

### 생성된 코드 컴파일 오류

- 언리얼 엔진 프로젝트 경로가 올바른지 확인
- 네임스페이스가 프로젝트 구조와 일치하는지 확인
- 모든 의존성이 올바르게 설치되었는지 확인

### 데이터 로딩 실패

- 바이너리 파일이 생성되었는지 확인
- 파일 경로가 올바른지 확인
- 테이블 구조가 데이터 타입과 일치하는지 확인

## 모범 사례

1. **메타 테이블 형식 사용**: 복잡한 설정 테이블의 경우 메타 테이블 형식을 권장하며, 더 풍부한 메타데이터 정의를 지원합니다
2. **병합 규칙 합리적 사용**: 대규모 프로젝트의 경우 병합 규칙을 사용하여 복잡한 테이블을 관리합니다
3. **데이터 구조 최적화**: 실제 사용 사례에 따라 적절한 데이터 타입과 구조를 선택합니다
4. **정기적 정리**: 불필요한 설정 테이블과 데이터를 정기적으로 정리하여 프로젝트를 깔끔하게 유지합니다

## 예제 프로젝트

XCell은 실제 프로젝트에서 XCell을 사용하는 방법을 보여주는 언리얼 엔진 예제 프로젝트를 제공합니다:

- 기본 설정 테이블 사용
- 복잡한 데이터 구조
- 다국어 지원
- 핫 업데이트 통합

예제 프로젝트를 통해 언리얼 엔진에서 XCell의 모범 사례를 빠르게 배울 수 있습니다.
