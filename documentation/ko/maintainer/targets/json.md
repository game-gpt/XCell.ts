# JSON 통합

> ✅ **사용 가능**: JSON 데이터 생성기는 현재 사용 가능하며, 표준 JSON 형식 데이터 파일 생성을 지원합니다.

XCell은 설정 테이블을 JSON 형식으로 내보내는 것을 지원합니다. JSON은 범용 데이터 교환 형식으로, 여러 언어와 플랫폼에서 쉽게 파싱할 수 있습니다.

## 타입 매핑

| XCell 타입 | JSON 타입 | 설명 |
| ----------- | --------- | ---- |
| `bool` | `boolean` | 불리언 값 |
| `i8` | `number` | 8비트 부호 있는 정수 |
| `i16` | `number` | 16비트 부호 있는 정수 |
| `i32` | `number` | 32비트 부호 있는 정수 |
| `i64` | `number` | 64비트 부호 있는 정수 |
| `u8` | `number` | 8비트 부호 없는 정수 |
| `u16` | `number` | 16비트 부호 없는 정수 |
| `u32` | `number` | 32비트 부호 없는 정수 |
| `u64` | `number` | 64비트 부호 없는 정수 |
| `f32` | `number` | 32비트 부동소수점 |
| `f64` | `number` | 64비트 부동소수점 |
| `string` | `string` | 문자열 |
| `array<T>` | `T[]` | 배열 |
| `list<T>` | `T[]` | 리스트 |
| `map<K, V>` | `object` | 맵 객체 |
| `enum` | `string` | 열거형 이름 |
| `struct` | `object` | 구조체 객체 |
| `color` | `string` | 색상 (16진수, 예: "#FF0000") |
| `vec2` | `object` | `{ "x": 0, "y": 0 }` |
| `vec3` | `object` | `{ "x": 0, "y": 0, "z": 0 }` |
| `vec4` | `object` | `{ "x": 0, "y": 0, "z": 0, "w": 0 }` |

## 설정 옵션

`ProjectSettings.toml` 파일에서 JSON 통합 설정은 `[json]` 섹션에 위치합니다:

```toml
[json]
enable = true
output = "output/json"             # JSON 데이터 출력 디렉토리
indent = 2                         # 들여쓰기 공백 수 (0이면 압축 형식)
```

## 출력 형식

### 리스트 테이블 형식

리스트 테이블은 JSON 배열로 내보내집니다:

```json
[
  {
    "id": 1,
    "name": "Sword",
    "damage": 100,
    "price": 500,
    "is_active": true
  },
  {
    "id": 2,
    "name": "Shield",
    "damage": 0,
    "price": 300,
    "is_active": true
  }
]
```

### 딕셔너리 테이블 형식

딕셔너리 테이블은 기본 키를 키로 사용하는 JSON 객체로 내보내집니다:

```json
{
  "1": {
    "id": 1,
    "name": "Sword",
    "damage": 100,
    "price": 500
  },
  "2": {
    "id": 2,
    "name": "Shield",
    "damage": 0,
    "price": 300
  }
}
```

### 열거형 테이블 형식

열거형 테이블은 JSON 객체로 내보내집니다:

```json
{
  "enum_name": "ItemType",
  "values": {
    "WEAPON": 1,
    "ARMOR": 2,
    "CONSUMABLE": 3
  }
}
```

### 복합 타입 예제

#### 배열 타입

```json
{
  "id": 1,
  "name": "Skill Pack",
  "skills": [101, 102, 103]
}
```

#### 구조체 타입

```json
{
  "id": 1,
  "name": "Player",
  "position": {
    "x": 100.0,
    "y": 200.0,
    "z": 50.0
  }
}
```

#### 맵 타입

```json
{
  "id": 1,
  "name": "Localization",
  "translations": {
    "en": "Hello",
    "zh": "你好",
    "ja": "こんにちは"
  }
}
```

## 사용 사례

### 프론트엔드 애플리케이션

JSON 형식은 프론트엔드 애플리케이션에 적합합니다:

```typescript
// JSON 데이터 로드
async function loadItemData(): Promise<Item[]> {
  const response = await fetch('/data/items.json');
  return response.json();
}
```

### 백엔드 서비스

Node.js 또는 기타 백엔드 환경에서:

```javascript
const fs = require('fs');
const items = JSON.parse(fs.readFileSync('./output/json/items.json', 'utf-8'));
```

### 게임 엔진

대부분의 게임 엔진은 JSON 파싱을 지원합니다:

- **Unity**: `JsonUtility.FromJson<T>()`
- **Cocos**: `JSON.parse()`
- **Unreal**: JSON 플러그인 사용

## 주의 사항

### 숫자 정밀도

JSON 숫자 타입은 정수와 부동소수점을 구분하지 않습니다. 64비트 정수의 경우 정밀도 손실이 발생할 수 있습니다. 큰 정수를 정확하게 표현해야 하는 경우 문자열 타입을 사용하는 것이 좋습니다.

### 인코딩 형식

JSON 파일은 기본적으로 UTF-8 인코딩을 사용합니다. 유니코드 문자를 올바르게 처리해야 합니다.

### 파일 크기

대용량 설정 테이블의 경우 JSON 파일이 상당히 클 수 있습니다. 다음을 고려하세요:

1. 압축 형식 사용 (`indent = 0` 설정)
2. 전송 시 GZIP 압축 활성화
3. 바이너리 형식(예: MessagePack)을 대안으로 사용

## 모범 사례

1. **버전 관리**: 생성된 JSON 파일을 버전 관리에 포함하여 변경 사항 추적
2. **데이터 검증**: JSON Schema를 사용하여 데이터 형식 검증
3. **지연 로딩**: 필요할 때 데이터를 로드하여 초기 로딩 시간 단축
4. **캐싱**: 로드된 데이터를 캐시하여 반복 파싱 방지
