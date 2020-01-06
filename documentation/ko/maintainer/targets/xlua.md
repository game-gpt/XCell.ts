# XLua 통합

XLua는 Unity에서 자주 사용되는 Lua 스크립트 솔루션입니다. XCell은 XLua와의 통합 지원을 제공합니다.

## 타입 매핑

| XCell 타입 | XLua 타입 | 설명 |
| ----------- | --------- | ---- |
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
| `bool` | `boolean` | 불리언 값 |
| `string` | `string` | 문자열 |
| `array<T>` | `table` | 배열 |
| `map<K, V>` | `table` | 맵 |
| `enum` | `number` | 열거형 |
| `struct` | `table` | 구조체 |

## 통합 단계

1. **XLua 설치**: Unity 프로젝트에 XLua 플러그인 설치
2. **XCell 설정**: 프로젝트 설정에서 XLua 코드 생성 활성화
3. **코드 생성**: XCell을 사용하여 XLua 호환 코드 생성
4. **데이터 로드**: Lua 스크립트에서 생성된 데이터 로드

## 예제 코드

```lua
-- 설정 데이터 로드
local config = require("ConfigManager")

-- 설정 접근
local playerConfig = config.Player[1]
print("Player name: " .. playerConfig.name)
print("Player level: " .. playerConfig.level)
```

## 주의 사항

- XLua number 타입은 `number`로 통일되어 정밀도 손실이 발생할 수 있습니다
- 복잡한 데이터 구조는 Lua 테이블로 변환됩니다
- 더 나은 성능을 위해 LuaJIT 사용을 권장합니다
