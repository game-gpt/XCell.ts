# 설정 파일

XCell은 TOML 형식의 설정 파일을 사용하여 프로젝트 설정을 관리합니다. 설정 파일의 이름은 `XCell.toml`이며 프로젝트 루트 디렉토리에 위치합니다.

## 기본 설정

| 설정 항목 | 타입 | 설명 | 기본값 |
| --------- | ---- | ---- | ------ |
| version | string | 설정 파일 버전 번호 | "0.0.0" |
| include | string | 포함할 Excel 파일 경로 패턴 (최고 우선순위) | "*.xlsx" |
| exclude | string | 제외할 Excel 파일 경로 패턴 (include보다 우선순위가 낮음) | "" |

### 행 설정 (line)

테이블에서 다양한 정보가 위치한 행 번호를 정의합니다 (1부터 시작).

| 설정 항목 | 타입 | 설명 | 기본값 |
| --------- | ---- | ---- | ------ |
| line.field | int | 필드 이름이 위치한 행 | 1 |
| line.type | int | 데이터 타입이 위치한 행 | 2 |
| line.comment | int | 주석이 위치한 행 | 3 |
| line.data | int | 데이터가 시작되는 행 | 4 |

#### 레거시 테이블 마이그레이션

XCell의 기본 테이블 형식은 다음과 같습니다:

| 행 번호 | 내용 |
| ------- | ---- |
| 행 1 | 필드 주석 |
| 행 2 | 필드 이름 |
| 행 3 | 필드 타입 |
| 행 4+ | 데이터 행 |

레거시 테이블 형식이 다른 경우 행 매핑을 통해 조정할 수 있습니다. 예를 들어, 레거시 테이블 형식이 다음과 같은 경우:

| 행 번호 | 내용 |
| ------- | ---- |
| 행 1 | 필드 이름 |
| 행 2 | 필드 타입 |
| 행 3+ | 데이터 행 |

다음과 같이 설정합니다:

```toml
line.field = 1
line.type = 2
line.comment = 0  # 주석 행 없음
line.data = 3
```

> 참고: `line.comment = 0`은 주석 행이 없음을 나타냅니다.

### 타입 파싱 설정 (type)

다양한 데이터 타입의 파싱 규칙을 설정합니다.

#### 불리언 타입 (bool)

| 설정 항목 | 타입 | 설명 |
| --------- | ---- | ---- |
| type.bool.accept | array[string] | true로 허용되는 값 목록 |
| type.bool.reject | array[string] | false로 허용되는 값 목록 |

예제:
```toml
[type.bool]
accept = ["true", "√", "是", "1"]
reject = ["false", "x", "否", "0"]
```

### Unity 코드 생성 설정 (unity)

C# 코드 생성 관련 설정을 구성합니다.

| 설정 항목 | 타입 | 설명 | 기본값 |
| --------- | ---- | ---- | ------ |
| unity.enable | bool | Unity 코드 생성 활성화 여부 | true |
| unity.project | string | Unity 프로젝트 경로 | "../" |
| unity.output | string | 코드 출력 디렉토리 | "Assets/Scripts/DataTable/Generated" |
| unity.namespace | string | 생성된 코드의 네임스페이스 | "DataTable.Generated" |
| unity.manager | string | 관리자 클래스 이름 | "DataTableManager" |
| unity.suffix_table | string | 테이블 클래스 접미사 | "Table" |
| unity.suffix_element | string | 요소 클래스 접미사 | "Element" |
| unity.support_clone | bool | 복제 지원 여부 | true |
| unity.legacy_using | bool | 레거시 using 사용 여부 | false |
| unity.legacy_null_null | bool | 레거시 null 처리 사용 여부 | false |

### 데이터 출력 형식 설정

다양한 형식의 데이터 파일 출력을 설정합니다.

#### 바이너리 형식

| 설정 항목 | 타입 | 설명 | 기본값 |
| --------- | ---- | ---- | ------ |
| unity.binary.enable | bool | 바이너리 출력 활성화 여부 | true |
| unity.binary.output | string | 바이너리 파일 출력 디렉토리 | "Assets/Tables/Generated" |

#### XML 형식

| 설정 항목 | 타입 | 설명 | 기본값 |
| --------- | ---- | ---- | ------ |
| unity.xml.enable | bool | XML 출력 활성화 여부 | false |
| unity.xml.output | string | XML 파일 출력 디렉토리 | "Assets/Tables/Readable" |

#### JSON 형식

| 설정 항목 | 타입 | 설명 | 기본값 |
| --------- | ---- | ---- | ------ |
| unity.json.enable | bool | JSON 출력 활성화 여부 | false |
| unity.json.output | string | JSON 파일 출력 디렉토리 | "Assets/Tables/Readable" |

#### 기타 형식

- **xlua**: Lua 코드 생성
- **protobuf**: Protobuf 형식 출력

## 사용 안내

1. 프로젝트 루트 디렉토리에 `XCell.toml` 파일을 생성합니다
2. 필요에 따라 설정 항목을 수정합니다
3. XCell 도구가 실행 시 설정을 자동으로 로드합니다
4. 테이블 설정은 전역 설정을 재정의할 수 있습니다 (동일한 이름의 `.toml` 파일 생성)
