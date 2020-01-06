
# 빠른 시작

이 튜토리얼은 XCell 설정 테이블 관리 도구를 처음부터 사용하는 방법을 안내합니다.

## 환경 설정

### 시스템 요구 사항

- Windows 운영 체제
- Rust 개발 환경 (소스에서 컴파일하는 경우)

### 설치 방법

#### 방법 1: 사전 컴파일 버전 사용

1. 프로젝트 릴리스 페이지에서 최신 `xcell.exe`를 다운로드합니다
2. `xcell.exe`를 프로젝트 디렉토리에 배치합니다

#### 방법 2: 소스에서 컴파일

1. Rust 개발 환경이 설치되어 있는지 확인합니다
2. 프로젝트 소스 코드를 클론하거나 다운로드합니다
3. 프로젝트 루트 디렉토리에서 다음 명령을 실행합니다:

```bash
cargo build --release
```

4. 컴파일 완료 후 실행 파일은 `target/release/xcell.exe`에 위치합니다

## 프로젝트 초기화

### 프로젝트 구조 생성

작업 디렉토리에 다음 구조를 생성합니다:

```
MyProject/
├── xcell.exe
├── ProjectConfig.toml
└── Tables/
    └── Hero.xlsx
```

### 설정 파일 생성

프로젝트 루트 디렉토리에 `ProjectConfig.toml` 파일을 생성합니다:

```toml
version = "0.1.0"

exclude = ""
include = "*.xlsx"

line.field = 1
line.type = 2
line.comment = 3
line.data = 4

[type.bool]
accept = ["true", "√"]
reject = ["false", "x"]

[type.string]

[unity]
enable = true
project = "./"
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

[unity.protobuf]
enable = false
```

## 첫 번째 설정 테이블 생성

### Excel 테이블 구조

XCell은 특정 Excel 테이블 구조를 사용하며, 처음 3행은 헤더이고 4행부터 데이터가 시작됩니다:

| 행 번호 | 용도 | 설명 |
|---------|------|------|
| 1 | 필드 이름 | 설정 테이블의 필드 이름 |
| 2 | 데이터 타입 | 필드의 데이터 타입 |
| 3 | 주석 | 필드의 설명 텍스트 |
| 4+ | 데이터 행 | 실제 설정 데이터 |

### 예제 테이블

`Tables/Hero.xlsx` 테이블을 생성합니다:

| id | name | hp | attack | is_boss |
|----|------|----|--------|---------|
| int | string | int | int | bool |
| 영웅 ID | 영웅 이름 | 체력 | 공격력 | 보스 여부 |
| 1 | Knight | 1000 | 100 | false |
| 2 | Mage | 800 | 150 | false |
| 3 | Dragon | 5000 | 500 | true |

## XCell 실행

### 기본 명령

프로젝트 루트 디렉토리에서 명령줄을 열고 실행합니다:

```bash
xcell.exe
```

XCell이 자동으로 수행하는 작업:
1. 현재 디렉토리의 모든 Excel 테이블 스캔
2. 테이블 데이터 검증
3. 해당하는 C# 코드 및 바이너리 데이터 파일 생성

### 명령줄 옵션

```bash
xcell.exe [OPTIONS] [COMMAND]
```

#### 명령

- `check`: 파일을 내보내지 않고 설정 테이블 확인
- `clear`: 데이터베이스 및 캐시 정리

#### 옵션

- `--workspace <WORKSPACE>`: 작업 디렉토리 수동 설정, 지정하지 않으면 현재 디렉토리가 기본값
- `-w, --watch`: 감시 모드 활성화, 수정이 감지되면 해당 파일만 업데이트
- `--disable-xml`: XML 생성 강제 비활성화
- `--disable-json`: JSON 생성 강제 비활성화
- `-h, --help`: 도움말 표시
- `-V, --version`: 버전 표시

### 사용 예제

#### 설정 테이블 확인

```bash
xcell.exe check
```

#### 감시 모드 활성화

```bash
xcell.exe --watch
```

#### 캐시 정리

```bash
xcell.exe clear
```

## 생성 결과 확인

실행이 성공하면 다음과 같은 생성된 파일을 볼 수 있습니다:

```
MyProject/
├── Assets/
│   ├── Scripts/DataTable/Generated/
│   │   ├── HeroTable.cs
│   │   └── DataTableManager.cs
│   └── Tables/Generated/
│       └── HeroTable.bytes
```

### 생성된 C# 코드 예제

`HeroTable.cs`는 다음과 유사한 내용을 포함합니다:

```csharp
namespace DataTable.Generated
{
    public partial class HeroTable
    {
        public readonly Dictionary<int, HeroElement> dict = new();

        public HeroElement GetElement(int id)
        {
            return dict.TryGetValue(id, out var item) ? item : null;
        }
    }

    public partial class HeroElement
    {
        public int id;
        public string name;
        public int hp;
        public int attack;
        public bool is_boss;
    }
}
```

## 다음 단계

- 더 많은 구체적인 응용은 [사용 사례 인덱스](use-cases/index.md)를 확인하세요
- Unity 사용자는 [Unity 통합](use-cases/unity-integration.md) 문서를 참조하세요
