# 고급 주제

이 섹션은 XCell의 기본 사용법을 이해하고 있으며, 내부 메커니즘, 확장 기능에 대해 더 자세히 알고 싶거나 고급 설정을 구현하려는 개발자를 위한 것입니다.

## 문서 구조

### 타입 시스템
- [type-system.md](type-system.md) - 타입 시스템 문서
  - 기본 타입 (정수, 부동소수점, 불리언, 문자열)
  - 복합 타입 (배열, 벡터, 딕셔너리, 튜플)
  - 특수 타입 (색상, 시간)
  - 사용자 정의 타입 (열거형, 구조체)
  - 타입 변환 및 검증

### 필드 제약 조건
- [key-field.md](key-field.md) - 필드 제약 조건 문서
  - 고유 제약 조건
  - 기본 키 제약 조건
  - 복합 제약 조건

### 참조 타입
- [ref-type.md](ref-type.md) - 참조 타입 문서
  - 기본 형식
  - 작동 방식
  - 사용 사례
  - 참조 검증

### 메타 속성
- [meta-data.md](meta-data.md) - 메타 속성 문서
  - 기본 메타 속성 (var, type, default, field, client, server, meta)
  - 테이블 타입 마커 (class, enum, table, language)
  - 사용 규칙 및 예제

### 설정
- [config.md](config.md) - 설정 파일 문서
  - 프로젝트 설정
  - 테이블 설정
  - 행 매핑

### 확장성
- [extensibility.md](extensibility.md) - 확장성 문서
  - 사용자 정의 타입 시스템
  - 코드 생성기 확장 (모든 프로그래밍 언어 지원)
  - 다른 게임 엔진용 내보내기 도구 생성
  - 플러그인 개발 가이드

## 다중 엔진 지원

XCell의 설계 철학은 모든 게임 엔진에 우수한 설정 테이블 관리 솔루션을 제공하는 것입니다:

- **Unity (C#)**: 완전한 내장 지원
- **Cocos Creator**: JSON/XML + TypeScript/Lua 로더를 통해
- **Godot**: JSON + GDScript 로더를 통해
- **Unreal Engine**: 바이너리 + C++ 로더를 통해
- **사용자 정의 엔진**: 확장성 문서를 통해 사용자 정의 내보내기 도구 생성

## 사전 요구 사항

이 섹션을 읽기 전에 다음 사항을 권장합니다:

1. XCell의 기본 사용법에 익숙할 것
2. 프로젝트 설정 파일 `XCell.toml`의 기본 구조를 이해할 것
3. 대상 언어(Rust, C#, C++, Python, Lua, TypeScript 등)의 프로그래밍 기초가 있을 것
