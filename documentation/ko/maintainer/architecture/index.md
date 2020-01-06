# XCell 아키텍처 설계 문서

## 1. 프로젝트 전체 아키텍처 개요

XCell은 Rust로 작성된 설정 테이블 관리 도구로, 모듈식 설계를 채택하여 모듈 책임이 명확하고 결합도가 낮습니다. 프로젝트는 다음과 같은 주요 부분으로 나뉩니다:

- **백엔드 모듈**: `backends/` 디렉토리에 위치하며, 핵심 비즈니스 로직 포함
  - `xcell` - 명령줄 도구 및 메인 진입점
  - `xcell-analyzer` - 워크스페이스 관리 및 테이블 분석
  - `xcell-generator` - 코드 생성기
  - `xcell-provider` - 테이블 읽기 추상화
  - `xcell-core` - 타입 시스템 및 핵심 기능
  - `xcell-config` - 설정 관리
  - `xcell-macros` - 매크로 정의
  - `xcell-parser` - 타입 파서
  - `xcell-plugin` - 플러그인 시스템
  - `xcell-wasi` - WebAssembly 지원

- **프론트엔드 모듈**: `frontends/` 디렉토리에 위치하며, 사용자 인터페이스 포함
  - `homepage` - 프로젝트 공식 웹사이트
  - `xcell` - 프론트엔드 SDK
  - `xcell-desktop` - 데스크톱 애플리케이션
  - `xcell-h5` - 웹 애플리케이션

- **문서**: `documentation/` 디렉토리에 위치하며, 프로젝트 문서 포함

- **예제**: `examples/` 디렉토리에 위치하며, 사용 예제 포함

### 기술 스택

- **백엔드**: Rust
- **프론트엔드**: Vue.js, TypeScript, Tauri
- **테이블 읽기**: calamine (Excel), csv (CSV/TSV)
- **템플릿 엔진**: dejavu
- **비동기 런타임**: tokio
- **오류 처리**: anyhow
- **로깅**: tracing

## 2. 모듈 구분 및 책임 설명

### 2.1 xcell - 명령줄 도구

**책임**:
- 명령줄 인터페이스 제공
- 명령줄 인수 파싱
- 전체 워크플로우 조정
- 다른 백엔드 모듈을 호출하여 작업 실행

**핵심 파일**:
- `backends/xcell/src/main.rs` - 프로그램 진입점
- `backends/xcell/src/workspace.rs` - 워크스페이스 관리
- `backends/xcell/src/commands/toml.rs` - TOML 설정 처리

**주요 기능**:
- 코드 및 데이터 파일 생성
- 설정 확인
- 출력 정리
- 파일 감시 모드

### 2.2 xcell-analyzer - 워크스페이스 관리 및 테이블 분석

**책임**:
- 워크스페이스 및 설정 관리
- 테이블 파일 스캔 및 식별
- 테이블 데이터 파싱
- 테이블 타입 식별
- 테이블 데이터 처리
- 열거형 정의 연결

**핵심 파일**:
- `backends/xcell-analyzer/src/lib.rs` - 모듈 내보내기
- `backends/xcell-analyzer/src/config/mod.rs` - 워크스페이스 관리자
- `backends/xcell-analyzer/src/x_table/mod.rs` - 테이블 데이터 구조

**핵심 구성 요소**:
- `WorkspaceManager` - 워크스페이스 관리자, 전체 워크플로우 조정 담당
- `XClassTable` - 클래스 테이블 타입
- `XDictTable` - 딕셔너리 테이블 타입
- `XEnumerateTable` - 열거형 테이블 타입
- `XLanguageTable` - 언어 테이블 타입
- `DefineManager` - 열거형 정의 관리자
- `LanguageManager` - 언어 테이블 관리자

### 2.3 xcell-generator - 코드 생성기

**책임**:
- 다양한 형식의 코드 및 데이터 파일 생성
- 여러 대상 플랫폼 지원
- 플러그인 가능한 코드 생성 아키텍처 제공

**핵심 파일**:
- `backends/xcell-generator/src/lib.rs` - 모듈 내보내기
- `backends/xcell-generator/src/codegen/mod.rs` - 코드 생성기 인터페이스
- `backends/xcell-generator/src/config.rs` - 생성기 설정

**지원되는 코드 생성기**:
- `json` - JSON 데이터 생성 ✅
- `binary` - 바이너리 데이터 생성 ✅
- `cocos` - Cocos 플랫폼 코드 생성 ✅
- `typescript` - TypeScript 코드 생성 ✅
- `dejavu` - 템플릿 엔진 코드 생성 ✅
- `unity` - Unity 플랫폼 코드 생성 ⚠️ (현재 비활성화)
- `xlua` - XLua 스크립트 코드 생성
- `sql` - SQL 데이터베이스 코드 생성
- `xml` - XML 데이터 생성

### 2.4 xcell-provider - 테이블 읽기 추상화

**책임**:
- 통일된 테이블 읽기 인터페이스 제공
- 여러 테이블 형식(Excel, CSV, TSV) 지원
- 테이블 형식 간의 차이 추상화
- 테이블 헤더 파싱 제공

**핵심 파일**:
- `backends/xcell-provider/src/lib.rs` - 모듈 내보내기
- `backends/xcell-provider/src/table/mod.rs` - 테이블 읽기 인터페이스
- `backends/xcell-provider/src/standard/mod.rs` - 표준 스트림 구현

**핵심 구성 요소**:
- `TableReader` - 테이블 읽기 trait
- `ExcelTable` - Excel 테이블 읽기 구현
- `CsvTable` - CSV 테이블 읽기 구현
- `TsvTable` - TSV 테이블 읽기 구현
- `FileFormatDetector` - 파일 형식 감지기
- `load_table` - 통일된 테이블 로딩 함수

### 2.5 xcell-core - 타입 시스템 및 핵심 기능

**책임**:
- 모든 데이터 타입 정의
- 타입 변환 및 파싱 제공
- 다양한 플랫폼의 타입 매핑 지원
- 값 처리 및 변환 제공
- 바이트 순서 읽기/쓰기 인터페이스 제공

**핵심 파일**:
- `backends/xcell-core/src/lib.rs` - 모듈 내보내기
- `backends/xcell-core/src/typing/mod.rs` - 타입 정의
- `backends/xcell-core/src/value/mod.rs` - 값 처리

**지원되는 타입**:
- 정수 타입 (Integer)
- 소수 타입 (Decimal)
- 불리언 타입 (Boolean)
- 문자열 타입 (String)
- 배열 타입 (Array)
- 벡터 타입 (Vector)
- 언어 타입 (Language)
- 열거형 타입 (Enumerate)
- 색상 타입 (Color)
- 시간 타입 (Time)

### 2.6 xcell-config - 설정 관리

**책임**:
- 프로젝트 설정 구조 정의
- 설정 파싱 및 검증 제공
- 다양한 플랫폼의 설정 옵션 지원

**핵심 파일**:
- `backends/xcell-config/src/lib.rs` - 모듈 내보내기
- `backends/xcell-config/src/project/mod.rs` - 프로젝트 설정
- `backends/xcell-config/src/cocos/mod.rs` - Cocos 플랫폼 설정
- `backends/xcell-config/src/unity/mod.rs` - Unity 플랫폼 설정

**핵심 구성 요소**:
- `ProjectConfig` - 프로젝트 설정
- `CocosCodegen` - Cocos 코드 생성 설정
- `UnityCodegen` - Unity 코드 생성 설정
- `MergeRules` - 테이블 병합 규칙

### 2.7 xcell-parser - 타입 파서

**책임**:
- 타입 표현식 파싱
- 필드 정의 파싱
- 메타데이터 파싱

**핵심 파일**:
- `backends/xcell-parser/src/lib.rs` - 모듈 내보내기
- `backends/xcell-parser/src/lexer.rs` - 렉서
- `backends/xcell-parser/src/parser.rs` - 파서
- `backends/xcell-parser/src/ast.rs` - 추상 구문 트리

## 3. 데이터 흐름 설명

### 3.1 전체 프로세스

테이블 파일 읽기부터 코드 내보내기까지의 완전한 프로세스:

```
테이블 파일 (Excel/CSV/TSV) → 읽기/파싱 → 테이블 식별 → 데이터 처리 → 코드 생성 → 출력 파일
```

### 3.2 상세 단계

#### 1단계: 워크스페이스 초기화

1. 명령줄 인수 또는 설정 파일 파싱
2. `WorkspaceManager` 인스턴스 생성
3. 프로젝트 설정(`ProjectConfig`) 로드

#### 2단계: 파일 스캔

1. 작업 디렉토리 스캔
2. `WalkDir`을 사용하여 디렉토리 순회
3. 설정된 `include` 패턴에 따라 파일 필터링

#### 3단계: 테이블 파일 읽기

1. `load_table()` 함수를 사용하여 테이블 파일 읽기 (형식 자동 감지)
2. 테이블 헤더 파싱(`XCellHeader`)
3. 모든 데이터 행 읽기

#### 4단계: 테이블 타입 식별

다음 테이블 타입을 순서대로 식별 시도:

1. `XListTable` - List 테이블
2. `XDictTable` - 딕셔너리 테이블
3. `XEnumerateTable` - 열거형 테이블
4. `XClassTable` - 클래스 테이블
5. `XLanguageTable` - 언어 테이블
6. `XLanguageID` - 언어 ID 테이블

#### 5단계: 테이블 데이터 처리

테이블 타입에 따라 해당 작업 실행:

- 열거형 테이블: `DefineManager`에 추가
- 언어 테이블: `LanguageManager`에 추가
- 기타 테이블: 데이터 검증 및 저장 수행

#### 6단계: 열거형 연결

`link_enumerate()` 메서드를 호출하여 열거형 정의를 해당 데이터 필드에 연결

#### 7단계: 코드 생성

1. `Generator` 인스턴스 생성
2. 활성화된 코드 생성기 설정
3. 모든 활성화된 출력 순회
4. 각 출력에 대해 해당 코드 생성기 호출
5. 해당 형식의 코드 및 데이터 파일 생성

#### 8단계: 파일 감시 (선택 사항)

파일 감시가 활성화된 경우:
1. 파일 모니터 시작
2. 파일 변경 수신
3. 변경된 파일 자동 재처리

## 4. 핵심 코드 위치 참조

### 워크스페이스 관리
- `WorkspaceManager` - `backends/xcell-analyzer/src/config/mod.rs`
- `WorkspaceManager::new()` - 워크스페이스 관리자 생성
- `WorkspaceManager::classes()` - 클래스 테이블 데이터 가져오기
- `WorkspaceManager::lists()` - 리스트 테이블 데이터 가져오기
- `WorkspaceManager::dicts()` - 딕셔너리 테이블 데이터 가져오기
- `WorkspaceManager::enumerates()` - 열거형 테이블 데이터 가져오기

### 테이블 읽기
- `load_table()` - `backends/xcell-provider/src/table/mod.rs` - 통일된 테이블 로딩 함수
- `TableReader` - `backends/xcell-provider/src/table/mod.rs` - 테이블 읽기 trait
- `XCellHeader` - `backends/xcell-provider/src/table/mod.rs` - 테이블 헤더

### 테이블 타입
- `XClassTable` - `backends/xcell-analyzer/src/x_table/class/mod.rs` - 클래스 테이블 타입
- `XDictTable` - `backends/xcell-analyzer/src/x_table/dictionary/mod.rs` - 딕셔너리 테이블 타입
- `XEnumerateTable` - `backends/xcell-analyzer/src/x_table/enumerate/mod.rs` - 열거형 테이블 타입
- `XLanguageTable` - `backends/xcell-analyzer/src/x_table/language/mod.rs` - 언어 테이블 타입

### 코드 생성
- `Generator` - `backends/xcell-generator/src/lib.rs` - 생성기 메인 진입점
- `Codegen` - `backends/xcell-generator/src/codegen/mod.rs` - 코드 생성기 trait
- `CocosCodegen` - `backends/xcell-generator/src/codegen/cocos/mod.rs` - Cocos 코드 생성
- `UnityCodegen` - `backends/xcell-generator/src/codegen/unity/mod.rs` - Unity 코드 생성 (현재 비활성화)
- `JsonCodegen` - `backends/xcell-generator/src/codegen/json/mod.rs` - JSON 데이터 생성

### 타입 시스템
- `TypeDescription` - `backends/xcell-core/src/typing/mod.rs` - 타입 설명
- `XCellValue` - `backends/xcell-core/src/value/mod.rs` - 셀 값
- `CSharpReader`/`CSharpWriter` - `backends/xcell-core/src/codegen/csharp_ffi/mod.rs` - C# 타입 매핑

### 설정 관리
- `ProjectConfig` - `backends/xcell-config/src/project/mod.rs` - 프로젝트 설정
- `CocosCodegen` - `backends/xcell-config/src/cocos/mod.rs` - Cocos 코드 생성 설정
- `UnityCodegen` - `backends/xcell-config/src/unity/mod.rs` - Unity 코드 생성 설정

## 5. 추상화 격리 설계

### 5.1 핵심 추상화 계층

XCell은 다중 계층 추상화 설계를 채택하여 모듈 책임이 명확하고 추상화 누수를 방지합니다:

1. **테이블 읽기 계층** (`xcell-provider`):
   - 통일된 `TableReader` trait 제공
   - 테이블 형식(Excel, CSV, TSV) 간의 차이 추상화
   - 상위 모듈은 구체적인 테이블 형식을 알 필요가 없음

2. **테이블 분석 계층** (`xcell-analyzer`):
   - `TableReader`를 기반으로 테이블 데이터 읽기
   - 테이블 타입 식별 및 해당 처리 수행
   - `WorkspaceManager`를 통해 모든 테이블 데이터를 통일적으로 관리

3. **코드 생성 계층** (`xcell-generator`):
   - `WorkspaceManager`를 기반으로 테이블 데이터 가져오기
   - 테이블 파일과 직접 상호작용하지 않음
   - `Codegen` trait을 통해 여러 코드 생성기 지원

4. **타입 시스템 계층** (`xcell-core`):
   - 통일된 데이터 타입 정의
   - 타입 변환 및 파싱 제공
   - 다중 플랫폼 타입 매핑 지원

### 5.2 추상화 격리 원칙

- **단일 책임**: 각 모듈은 하나의 특정 기능만 담당
- **의존성 역전**: 상위 모듈은 추상화에 의존하며, 구체적인 구현에 의존하지 않음
- **인터페이스 분리**: trait을 사용하여 최소화된 인터페이스 정의
- **리스코프 치환**: 구현은 하위 타입으로 교체 가능
- **개방/폐쇄 원칙**: 확장에는 열려 있고, 수정에는 닫혀 있음

## 6. 확장 개발 가이드

### 새로운 테이블 형식 추가

1. `backends/xcell-provider/src/table/`에 새로운 테이블 읽기 구현 생성
2. `TableReader` trait 구현
3. `FileFormatDetector`에 형식 감지 로직 추가
4. `load_table` 함수에 새로운 형식 지원 추가

### 새로운 데이터 타입 추가

1. `backends/xcell-core/src/`에 새로운 모듈 생성
2. 타입 파싱 및 변환 로직 구현
3. `backends/xcell-core/src/lib.rs`에서 내보내기
4. 해당 플랫폼 타입 매핑 지원 추가

### 새로운 코드 생성기 추가

1. `backends/xcell-generator/src/codegen/`에 새로운 모듈 생성
2. `Codegen` trait 구현
3. `Generator::new()`에 새로운 생성기 등록
4. 해당 설정 옵션 추가

### 새로운 플랫폼 지원 추가

1. `backends/xcell-config/src/`에 새로운 플랫폼 설정 모듈 생성
2. `backends/xcell-generator/src/codegen/`에 새로운 플랫폼 코드 생성기 생성
3. 플랫폼별 코드 생성 로직 구현
4. 문서 및 예제 업데이트
