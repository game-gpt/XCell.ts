# 확장성 문서

이 문서는 XCell 설정 테이블 관리 도구의 기능을 확장하는 방법을 소개하며, 사용자 정의 타입 시스템, 코드 생성기 확장 및 플러그인 개발을 포함합니다.

## 목차

1. [사용자 정의 타입 시스템](#사용자-정의-타입-시스템)
2. [코드 생성기 확장](#코드-생성기-확장)
3. [플러그인 개발 가이드](#플러그인-개발-가이드)

***

## 사용자 정의 타입 시스템

XCell은 유연한 타입 시스템을 제공하여 여러 내장 데이터 타입을 지원하며, 개발자가 새로운 데이터 타입을 사용자 정의할 수 있습니다.

### 내장 타입 개요

XCell은 다음과 같은 내장 타입을 지원합니다:

| 타입 범주 | 지원 타입                                                                                                            |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| 불리언    | `bool`, `boolean`                                                                                                    |
| 정수      | `byte`/`i8`, `short`/`i16`, `int`/`i32`, `long`/`i64`, `sbyte`/`u8`, `ushort`/`u16`, `uint`/`u32`, `ulong`/`u64`    |
| 소수      | `float`/`f32`, `double`/`f64`, `decimal`/`d128`/`f128`                                                               |
| 문자열    | `string`                                                                                                             |
| 특수 타입 | `color`/`colour`, `color32`, `time`/`date`/`datetime`                                                                |
| 벡터/배열 | `v2`/`vec2`, `v3`/`vec3`, `v4`/`vec4`, `q4`/`quaternion`                                                             |
| 열거형    | 사용자 정의 열거형 타입                                                                                              |

### 타입 시스템 아키텍처

XCell의 타입 시스템 핵심은 `xcell-types` 모듈에 위치하며, 주로 다음 구성 요소를 포함합니다:

- `XCellTyped`: 타입 열거형, 지원되는 모든 데이터 타입 정의
- `TypeMetaInfo`: 타입 메타데이터, 타입 설정 정보 포함
- `XCellValue`: 타입 값, 파싱된 데이터 저장
- 다양한 타입 설명자: `IntegerDescription`, `DecimalDescription` 등

### 사용자 정의 타입 구현 단계

사용자 정의 타입을 추가하려면 다음 단계를 따르세요:

#### 1. 타입 설명 모듈 생성

`projects/xcell-types/src/` 디렉토리에 새로운 타입 모듈을 생성합니다. 예: `my_type/mod.rs`:

```rust
use serde::{Deserialize, Serialize};
use xcell_errors::XResult;
use crate::value::XCellValue;

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct MyTypeDescription {
    pub default: Option<String>,
}

impl MyTypeDescription {
    pub fn parse_cell(&self, cell: &str) -> XResult<XCellValue> {
        todo!("셀 파싱 로직 구현")
    }
}
```

#### 2. XCellTyped 열거형 확장

`projects/xcell-types/src/typing/mod.rs`에서 `XCellTyped` 열거형을 확장합니다:

```rust
pub enum XCellTyped {
    // ... 기존 타입 ...
    MyType(Box<MyTypeDescription>),
}
```

#### 3. 타입 파싱 구현

`projects/xcell-types/src/typing/parser.rs`에 타입 파싱 로직을 추가합니다:

```rust
impl XCellTyped {
    pub fn parse(input: &str, info: &TypeMetaInfo) -> Self {
        let normed = Self::norm_typing(input);
        match normed.as_str() {
            // ... 기존 타입 ...
            "mytype" | "my_type" => info.my_type.clone().into(),
            _ => XCellTyped::parse_complex(input, &normed, info),
        }
    }
}
```

#### 4. TypeMetaInfo 업데이트

`projects/xcell-types/src/typing/mod.rs`에서 `TypeMetaInfo` 구조체를 업데이트합니다:

```rust
#[derive(Debug, Clone, Default, Serialize)]
pub struct TypeMetaInfo {
    // ... 기존 필드 ...
    pub my_type: MyTypeDescription,
}
```

#### 5. 코드 생성 지원 추가

`projects/xcell-types/src/codegen/`에 새로운 타입에 대한 코드 생성 로직을 추가하여 대상 언어(예: C#)에 올바른 타입 정의를 생성할 수 있도록 합니다.

***

## 코드 생성기 확장

XCell은 여러 코드 생성 대상을 지원하며, Unity C#, 바이너리 파일, XML, JSON 등을 포함합니다. 이러한 생성기를 확장하거나 새로운 것을 만들 수 있습니다.

### 코드 생성 아키텍처

코드 생성은 주로 `xcell-core/src/codegen/` 모듈에서 구현됩니다:

- `binary/`: 바이너리 형식 생성
- `readable/`: 읽기 가능한 형식 생성 (XML, JSON)
- `unity/`: Unity C# 코드 생성

### Unity 코드 생성기 확장

Unity 코드 생성기는 가장 자주 사용되는 생성기 중 하나입니다. 확장 단계는 다음과 같습니다:

#### 1. 기존 템플릿 보기

Unity 코드 생성은 `projects/xcell-core/templates/` 디렉토리에 위치한 템플릿 파일을 사용합니다:

- `BuildClass.cs`: 클래스 테이블 템플릿
- `BuildDictionary.cs`: 딕셔너리 테이블 템플릿
- `BuildEnumerate.cs`: 열거형 테이블 템플릿
- `BuildLanguage.cs`: 언어 테이블 템플릿
- `BuildManager.cs`: 관리자 템플릿

#### 2. 템플릿 수정 또는 생성

필요에 따라 기존 템플릿을 수정하거나 새로운 템플릿 파일을 생성합니다.

#### 3. UnityCodegen 설정 업데이트

`projects/xcell-core/src/config/unity/mod.rs`에서 설정을 업데이트합니다:

```rust
#[derive(Debug, Clone)]
pub struct UnityCodegen {
    // ... 기존 필드 ...
    pub my_custom_option: bool,
}
```

#### 4. 생성 로직 구현

`projects/xcell-core/src/codegen/unity/`에서 구체적인 생성 로직을 구현합니다.

### 새로운 코드 생성기 생성

완전히 새로운 코드 생성기를 생성하려면 다음 단계를 따르세요:

#### 1. 생성기 모듈 생성

`projects/xcell-core/src/codegen/` 디렉토리에 새로운 모듈을 생성합니다. 예: `cocos/mod.rs`:

```rust
use xcell_errors::XResult;
use crate::config::ProjectConfig;

pub struct CocosCodegen {
    // 설정 필드
}

impl CocosCodegen {
    pub fn write(&self, config: &ProjectConfig) -> XResult<()> {
        todo!("Cocos 코드 생성 로직 구현")
    }
}
```

#### 2. 설정 시스템에 통합

`ProjectConfig`에 새로운 생성기에 대한 설정 옵션을 추가합니다.

#### 3. 워크플로우에 연결

`WorkspaceManager::write_unity()` 또는 유사한 메서드에서 새로운 생성기를 호출합니다.

***

## 플러그인 개발 가이드

XCell은 플러그인 시스템을 통해 기능을 확장하는 것을 지원합니다. 플러그인은 새로운 테이블 타입, 사용자 정의 검증 로직 또는 코드 생성 기능을 확장할 수 있습니다.

### 플러그인 아키텍처

플러그인 시스템은 Rust의 trait 시스템을 기반으로 하며, 주요 인터페이스는 다음과 같습니다:

- 테이블 프로세서 trait
- 검증기 trait
- 코드 생성기 trait

### 플러그인 개발 단계

#### 1. 플러그인 프로젝트 생성

새로운 Rust 프로젝트를 생성하고 `xcell-core` 및 `xcell-types`에 대한 의존성을 추가합니다:

```toml
[package]
name = "xcell-my-plugin"
version = "0.1.0"
edition = "2024"

[dependencies]
xcell-core = { path = "../xcell-core" }
xcell-types = { path = "../xcell-types" }
```

#### 2. 플러그인 trait 구현

필요에 따라 해당 trait을 구현합니다. 예를 들어, 사용자 정의 테이블 프로세서를 구현합니다:

```rust
use xcell_core::x_table::table::CalamideTable;
use xcell_errors::XResult;

pub struct MyCustomTable;

impl MyCustomTable {
    pub fn confirm(table: &CalamideTable) -> XResult<Self> {
        todo!("테이블이 사용자 정의 형식과 일치하는지 확인")
    }

    pub fn perform(&self, workspace: &mut WorkspaceManager) -> XResult<()> {
        todo!("테이블 처리 로직 실행")
    }
}
```

#### 3. 플러그인 등록

`WorkspaceManager::try_perform_file()` 메서드에 플러그인을 등록하여 인식 및 처리될 수 있도록 합니다.

### 플러그인 모범 사례

1. **플러그인 독립성 유지**: 플러그인은 가능한 한 독립적이어야 하며, XCell 내부 구현에 대한 의존성을 최소화합니다
2. **설정 옵션 제공**: `XCell.toml`을 통해 플러그인 설정을 제공합니다
3. **오류 처리**: 오류를 적절히 처리하고 명확한 오류 메시지를 제공합니다
4. **문서화**: 플러그인에 대한 완전한 사용 문서를 제공합니다
5. **테스트**: 충분한 테스트 케이스를 작성합니다

***

## 요약

XCell은 강력한 확장성을 제공하여 개발자가 필요에 따라 기능을 사용자 정의할 수 있습니다. 새로운 데이터 타입 추가, 코드 생성기 확장 또는 독립적인 플러그인 개발 모두 XCell의 모듈식 아키텍처가 잘 지원할 수 있습니다.

확장 중에 문제가 발생하면 프로젝트 소스 코드를 참조하거나 Issue를 제출하여 도움을 받으세요.
