# 필드 제약 조건

필드 제약 조건은 필드 값을 제한하는 규칙으로, 데이터의 고유성과 무결성을 보장합니다.

## 고유 제약 조건 (unique)

고유 제약 조건은 필드 값이 중복될 수 없도록 보장합니다.

### 마킹 방법

| 약식 표기 | 메타 속성 표기 | 설명 |
| --------- | -------------- | ---- |
| `@field_name` | `field_name @unique` | 고유 필드, 값이 중복될 수 없음 |

### 예제

| @dict | Name | Email |
| ----- | ---- | ----- |
| user\_id | name | @email |
| string | string | string |
| user\_001 | John | <john@example.com> |
| user\_002 | Jane | <jane@example.com> |

- `@email` - 이메일 필드 값은 중복될 수 없습니다

## 기본 키 제약 조건 (primary)

기본 키는 테이블의 각 데이터 행을 고유하게 식별하는 데 사용되는 필드입니다.

### 기본 규칙

- **첫 번째 열이 자동으로 기본 키로 처리되며**, 추가 마킹이 필요하지 않습니다

### 마킹 방법

| 약식 표기 | 메타 속성 표기 | 설명 |
| --------- | -------------- | ---- |
| `@@field_name` | `field_name @primary` | 기본 키 필드, 값이 고유하며 기본 키로 사용됨 |

### 예제

| @dict | Name |
| ----- | ---- |
| @@item\_id | name |
| string | string |
| sword\_001 | Iron Sword |
| sword\_002 | Steel Sword |

- `@@item_id` - 기본 키 필드, 값이 고유함

## 복합 제약 조건

여러 필드의 조합이 고유해야 하는 경우 복합 제약 조건을 사용할 수 있습니다. 타입 마커 뒤에 `@unique(field1, field2)`를 추가합니다:

| @dict @unique(class, level) | Class | Level |
| --------------------------- | ----- | ----- |
| id | class | level |
| string | string | i32 |
| warrior\_001 | warrior | 10 |
| warrior\_002 | warrior | 20 |
| mage\_001 | mage | 10 |

위 예제에서 `Class + Level` 조합은 고유해야 하지만, 개별 class나 level 값은 중복될 수 있습니다.

> ⚠️ **경고**: 복합 고유 제약 조건을 사용하는 경우, 이 테이블을 참조하는 `&T`도 복합 키를 입력해야 합니다. 일부 게임 엔진은 복합 키를 지원하지 않으므로 주의해서 사용하세요.

## 제약 조건 요구 사항

- 기본 키 값은 고유해야 합니다
- 기본 키 값은 null일 수 없습니다
- 각 테이블은 하나의 기본 키만 가질 수 있습니다
- 고유 필드 값은 중복될 수 없습니다
