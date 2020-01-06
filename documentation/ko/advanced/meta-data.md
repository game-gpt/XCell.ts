# 메타 속성

메타 속성은 필드에 추가 설정 정보를 추가하는 데 사용되며, 검증 규칙, 기본값 등을 포함합니다.

## 기본 형식

메타 속성은 `@`로 시작하며 세 가지 위치에 작성할 수 있습니다:

| 위치 | 예제 |
| ---- | ---- |
| 필드 이름 뒤 | `id @primary` |
| 타입 뒤 | `i32 @min(1)` |
| Excel 주석 | `@default(100)` |

> **권장**: 메타 속성은 개수에 제한이 없으며, 관리와 유지보수를 쉽게 하기 위해 Excel 셀 주석에 통일해서 작성하는 것이 좋습니다.

## 일반 메타 속성

### 필드 메타 속성

| 메타 속성 | 설명 | 예제 |
| --------- | ---- | ---- |
| `@primary` | 기본 키 | `id @primary` |
| `@default(value)` | 기본값 | `level @default(1)` |
| `@virtual` | 가상 필드 | `user @virtual` |

### 타입 메타 속성

| 메타 속성 | 설명 | 예제 |
| --------- | ---- | ---- |
| `@min(value)` | 최솟값 | `i32 @min(0)` |
| `@max(value)` | 최댓값 | `i32 @max(100)` |
| `@range(min, max)` | 범위 | `i32 @range(1, 100)` |

### 주석 메타 속성

메타 속성은 Excel 셀 주석에 작성할 수 있습니다:

```
@default(100)
@min(1)
@max(9999)
```

## 가상 필드

가상 필드는 실제 데이터를 저장하지 않고 다른 테이블의 데이터를 참조하여 값을 얻는 특수 필드입니다.

### 예제

| @dict | Name | Quality ID | Quality |
| ----- | ---- | ---------- | ------- |
| item_id | name | quality_id | quality @virtual |
| string | string | &Quality | Quality |
| sword_001 | Iron Sword | common | |
| sword_002 | Steel Sword | rare | |

- `quality_id`는 실제로 저장되는 필드이며, 타입은 `&Quality`입니다
- `quality`는 가상 필드로, `@virtual`로 표시되며, 타입은 대상 테이블 이름 `Quality`입니다

## 계산된 속성

계산된 속성은 표현식 계산을 통해 파생된 필드로, 실제 데이터를 저장할 필요가 없습니다.

### 예제

| @dict | Base Attack | Enhance Level | Total Attack |
| ----- | ----------- | ------------- | ------------ |
| item_id | base_atk | enhance | total_atk @computed |
| string | i32 | i32 | i32 |
| sword_001 | 100 | 5 | base_atk * (1 + enhance * 0.1) |

- `total_atk`는 계산된 속성으로, `@computed`로 표시됩니다
- 표현식은 동일한 테이블의 다른 필드를 참조할 수 있습니다

## 예제

### 검증이 있는 필드

| @dict | Level | Gold |
| ----- | ----- | ---- |
| user_id | level | gold |
| string | i32 @range(1, 100) | i32 @min(0) |
| user_001 | 10 | 1000 |
| user_002 | 50 | 5000 |

### 기본값이 있는 필드

| @dict | Name | Quality |
| ----- | ---- | ------- |
| item_id | name | quality |
| string | string | string @default(common) |
| sword_001 | Iron Sword | |
| sword_002 | Steel Sword | rare |

## 메타 속성과 코드 생성

메타 속성은 생성된 코드에 영향을 미칩니다:

### 검증 속성

```
level i32 @range(1, 100)
```

생성된 C# 코드:

```csharp
[Range(1, 100)]
public int Level { get; set; }
```

### 기본값

```
quality string @default(common)
```

생성된 C# 코드:

```csharp
public string Quality { get; set; } = "common";
```

## 주의 사항

- 메타 속성은 `@`로 시작합니다
- 필드 이름, 타입 또는 Excel 주석에 작성할 수 있습니다
- 여러 메타 속성을 조합할 수 있습니다
- 일부 메타 속성은 코드 생성과 데이터 검증에 영향을 미칩니다
