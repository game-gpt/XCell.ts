# Godot 통합

XCell은 Godot 엔진과의 깊은 통합을 제공하며, GDScript 코드 생성, JSON 데이터 파일 등의 형식을 지원합니다.

## 설정 옵션

`XCell.toml` 파일에서 Godot 통합 설정은 `[godot]` 섹션에 위치합니다:

```toml
[godot]
enable = true
project = "../"
output = "scripts/DataTable/Generated"
namespace = "DataTable"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"

[godot.json]
enable = true
output = "res://tables/Generated"

[godot.binary]
enable = false
output = "res://tables/Binary"
```

## 생성된 코드 구조

### 테이블 클래스 구조

각 설정 테이블은 해당하는 GDScript 클래스를 생성하며, 다음을 포함합니다:
- 테이블 데이터 클래스 (Table)
- 요소 데이터 클래스 (Element)
- 관리자 클래스 (Manager)

### 생성된 코드 구조 예제:

```gdscript
# BuffTable.gd
class_name BuffTable

var data = {}

func get(id):
    return data.get(id)

func try_get(id):
    return data.get(id, null)

func load(data_array):
    for item in data_array:
        var element = BuffElement.new()
        element.id = item.id
        element.name = item.name
        element.value = item.value
        data[item.id] = element

# BuffElement.gd
class_name BuffElement

var id = 0
var name = ""
var value = 0
# ... 기타 필드

# DataTableManager.gd
class_name DataTableManager

var buff_table = BuffTable.new()

func load_all():
    # 모든 테이블 데이터 로드
    pass

func unload_all():
    # 모든 테이블 데이터 언로드
    pass
```

## 데이터 로딩

### JSON 데이터 로딩:

```gdscript
var manager = DataTableManager.new()
manager.load_all()

# 데이터 사용
var buff = manager.buff_table.get(1)
if buff:
    print(buff.name)
```

### 지원 기능:
- 비동기 로딩
- 증분 로딩
- 메모리 관리
- 핫 업데이트 지원

## 타입 매핑

XCell 타입에서 GDScript 타입으로의 매핑:

| XCell 타입 | GDScript 타입 |
| ----------- | ------------- |
| bool | bool |
| i8 | int |
| i16 | int |
| i32 | int |
| i64 | int |
| u8 | int |
| u16 | int |
| u32 | int |
| u64 | int |
| f32 | float |
| f64 | float |
| string | String |
| color | Color |
| vec2 | Vector2 |
| vec3 | Vector3 |
| vec4 | Vector4 |

## 성능 최적화

### 대용량 테이블 처리 최적화

1. **대용량 테이블 합리적 분할**
   - 기능이나 모듈별로 대용량 테이블 분할
   - 행 병합 규칙을 사용하여 빌드 시 병합
   - 개발 시 유지보수성과 런타임 성능 유지

2. **적절한 데이터 형식 사용**
   - 개발 환경에서는 디버깅을 위해 JSON 형식 사용
   - 프로덕션 환경에서는 로딩 속도 향상을 위해 바이너리 형식 고려

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
   ```gdscript
   # 특정 테이블만 로드
   manager.buff_table.load()
   manager.item_table.load()
   ```

2. **적시에 언로드**
   ```gdscript
   # 불필요한 테이블 언로드
   manager.buff_table.unload()
   ```

## 일반적인 문제

### 생성된 코드 컴파일 오류

- Godot 프로젝트 경로가 올바른지 확인
- 네임스페이스가 프로젝트 구조와 일치하는지 확인
- 모든 의존성이 올바르게 설치되었는지 확인

### 데이터 로딩 실패

- JSON 파일이 생성되었는지 확인
- 파일 경로가 올바른지 확인
- 테이블 구조가 데이터 타입과 일치하는지 확인

## 모범 사례

1. **메타 테이블 형식 사용**: 복잡한 설정 테이블의 경우 메타 테이블 형식을 권장하며, 더 풍부한 메타데이터 정의를 지원합니다
2. **병합 규칙 합리적 사용**: 대규모 프로젝트의 경우 병합 규칙을 사용하여 복잡한 테이블을 관리합니다
3. **데이터 구조 최적화**: 실제 사용 사례에 따라 적절한 데이터 타입과 구조를 선택합니다
4. **정기적 정리**: 불필요한 설정 테이블과 데이터를 정기적으로 정리하여 프로젝트를 깔끔하게 유지합니다

## 예제 프로젝트

XCell은 실제 프로젝트에서 XCell을 사용하는 방법을 보여주는 Godot 예제 프로젝트를 제공합니다:

- 기본 설정 테이블 사용
- 복잡한 데이터 구조
- 다국어 지원
- 핫 업데이트 통합

예제 프로젝트를 통해 Godot에서 XCell의 모범 사례를 빠르게 배울 수 있습니다.
