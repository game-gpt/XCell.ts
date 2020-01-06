# Cocos 통합

> ✅ **사용 가능**: Cocos 코드 생성기는 현재 사용 가능하며, TypeScript 코드와 JSON 데이터 파일 생성을 지원합니다.

XCell은 Cocos 엔진과의 깊은 통합을 제공하며, TypeScript 코드 생성, JSON 데이터 파일 등의 형식을 지원합니다.

## 설정 옵션

`ProjectSettings.toml` 파일에서 Cocos 통합 설정은 `[cocos]` 섹션에 위치합니다:

```toml
[cocos]
enable = true
project = "../"                    # Cocos 프로젝트 디렉토리
output = "assets/scripts/DataTable/Generated"  # TypeScript 코드 출력 디렉토리
manager_name = "DataTableManager"  # 관리자 클래스 이름
suffix_table = "Table"             # 테이블 클래스 접미사
instance_name = "dataTable"        # 인스턴스 이름
table_data_path = "assets/tables"  # 테이블 데이터 경로 접두사

# JSON 저장 설정
[cocos.storage.Json]
enable = true
output = "assets/tables/Generated" # JSON 데이터 출력 디렉토리

# 개발 환경 저장 설정 (선택 사항)
[cocos.storage_debug.Json]
enable = true
output = "assets/tables/Debug"
```

## 생성된 코드 구조

### 테이블 클래스 구조

각 설정 테이블은 해당하는 TypeScript 클래스를 생성하며, 다음을 포함합니다:
- 테이블 데이터 클래스 (Table)
- 요소 데이터 클래스 (Element)
- 관리자 클래스 (Manager)

### 생성된 코드 구조 예제:

```typescript
namespace DataTable.Generated {
    export class BuffTable {
        private data: Map<number, BuffElement> = new Map();

        public get(id: number): BuffElement {
            return this.data.get(id);
        }

        public tryGet(id: number): BuffElement | undefined {
            return this.data.get(id);
        }

        public load(data: any[]): void {
            for (const item of data) {
                const element = new BuffElement();
                element.id = item.id;
                element.name = item.name;
                element.value = item.value;
                this.data.set(item.id, element);
            }
        }
    }

    export class BuffElement {
        public id: number = 0;
        public name: string = "";
        public value: number = 0;
        // ... 기타 필드
    }

    export class DataTableManager {
        public buffTable: BuffTable = new BuffTable();

        public async loadAll(): Promise<void> {
            // 모든 테이블 데이터 로드
        }

        public unloadAll(): void {
            // 모든 테이블 데이터 언로드
        }
    }
}
```

## 데이터 로딩

### JSON 데이터 로딩:

```typescript
import { DataTableManager } from "../scripts/DataTable/Generated/Manager";

const manager = new DataTableManager();
await manager.loadAll();

// 데이터 사용
const buff = manager.buffTable.get(1);
console.log(buff?.name);
```

### 지원 기능:
- 비동기 로딩
- 증분 로딩
- 메모리 관리
- 핫 업데이트 지원

## 타입 매핑

XCell 타입에서 TypeScript 타입으로의 매핑:

| XCell 타입 | TypeScript 타입 |
| ----------- | --------------- |
| bool | boolean |
| i8 | number |
| i16 | number |
| i32 | number |
| i64 | number |
| u8 | number |
| u16 | number |
| u32 | number |
| u64 | number |
| f32 | number |
| f64 | number |
| string | string |
| color | string (16진수) |
| vec2 | { x: number, y: number } |
| vec3 | { x: number, y: number, z: number } |
| vec4 | { x: number, y: number, z: number, w: number } |

## 설정 필드 설명

| 필드 | 타입 | 기본값 | 설명 |
| ---- | ---- | ------ | ---- |
| `enable` | `bool` | `false` | Cocos 코드 생성 활성화 여부 |
| `project` | `string` | `"../"` | Cocos 프로젝트 디렉토리 |
| `output` | `string` | `""` | TypeScript 코드 출력 디렉토리 |
| `manager_name` | `string` | `""` | 관리자 클래스 이름 |
| `suffix_table` | `string` | `""` | 테이블 클래스 접미사 |
| `instance_name` | `string` | `""` | 인스턴스 이름 |
| `table_data_path` | `string` | `""` | 테이블 데이터 경로 접두사 |
| `storage` | `CocosStorage` | `Json` | 저장 형식 설정 |
| `storage_debug` | `Option<CocosStorage>` | `None` | 개발 환경 저장 설정 |

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
   ```typescript
   // 특정 테이블만 로드
   await manager.buffTable.load();
   await manager.itemTable.load();
   ```

2. **적시에 언로드**
   ```typescript
   // 불필요한 테이블 언로드
   manager.buffTable.unload();
   ```

## 일반적인 문제

### 생성된 코드 컴파일 오류

- Cocos 프로젝트 경로가 올바른지 확인
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
