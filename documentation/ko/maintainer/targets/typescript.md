# TypeScript/JavaScript 통합

> ✅ **사용 가능**: TypeScript 코드 생성기는 현재 사용 가능하며, TypeScript 인터페이스 및 타입 정의 생성을 지원합니다.

XCell은 프론트엔드 및 백엔드 애플리케이션을 위한 TypeScript 및 JavaScript 코드 생성을 지원합니다.

## 타입 매핑

| XCell 타입 | TypeScript 타입 | 설명 |
| ----------- | --------------- | ---- |
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
| `map<K, V>` | `Record<K, V>` | 맵 |
| `enum` | `string` | 열거형 (문자열 형태) |
| `struct` | `interface` | 구조체 |
| `color` | `string` | 색상 (16진수) |
| `vec2` | `{ x: number, y: number }` | 2D 벡터 |
| `vec3` | `{ x: number, y: number, z: number }` | 3D 벡터 |
| `vec4` | `{ x: number, y: number, z: number, w: number }` | 4D 벡터 |

## 지원 형식

- **TypeScript + JSON**: TypeScript 인터페이스 및 JSON 데이터 파일 생성 ✅
- **TypeScript + CSV**: TypeScript 인터페이스 및 CSV 데이터 파일 생성
- **JavaScript + JSON**: JavaScript 코드 및 JSON 데이터 파일 생성
- **JavaScript + CSV**: JavaScript 코드 및 CSV 데이터 파일 생성

## 설정 옵션

`ProjectSettings.toml` 파일에서 TypeScript 통합 설정은 `[typescript]` 섹션에 위치합니다:

```toml
[typescript]
enable = true
output = "src/generated"           # TypeScript 코드 출력 디렉토리
namespace = "DataTable.Generated"   # 네임스페이스
manager_name = "DataTableManager"  # 관리자 클래스 이름
suffix_table = "Table"             # 테이블 클래스 접미사
suffix_element = "Element"         # 요소 클래스 접미사

# JSON 데이터 출력 설정
[typescript.json]
enable = true
output = "data/generated"          # JSON 데이터 출력 디렉토리
```

## 통합 단계

1. **TypeScript 내보내기 설정**: XCell 설정에서 TypeScript 형식 내보내기 활성화
2. **코드 생성**: XCell을 사용하여 TypeScript/JavaScript 코드 및 데이터 파일 생성
3. **코드 가져오기**: 프로젝트에서 생성된 코드와 데이터를 가져오기
4. **데이터 사용**: 애플리케이션에서 생성된 데이터와 타입 사용

## TypeScript 코드 예제

### 생성된 타입 정의

```typescript
// Player.ts
export interface Player {
  id: number;
  name: string;
  level: number;
  gold: number;
  is_active: boolean;
}

// Item.ts
export interface Item {
  id: number;
  name: string;
  damage: number;
  price: number;
}

// DataTableManager.ts
import { Player } from './Player';
import { Item } from './Item';

export class DataTableManager {
  private _player: Player[] | null = null;
  private _item: Item[] | null = null;

  public get player(): Player[] {
    if (!this._player) {
      throw new Error('Player data not loaded');
    }
    return this._player;
  }

  public get item(): Item[] {
    if (!this._item) {
      throw new Error('Item data not loaded');
    }
    return this._item;
  }

  public async loadAll(): Promise<void> {
    this._player = await this.loadJson<Player[]>('data/generated/Player.json');
    this._item = await this.loadJson<Item[]>('data/generated/Item.json');
  }

  private async loadJson<T>(path: string): Promise<T> {
    const response = await fetch(path);
    return response.json();
  }
}
```

### 생성된 코드 사용

```typescript
import { DataTableManager } from './generated/DataTableManager';

async function main() {
  const manager = new DataTableManager();
  await manager.loadAll();

  // 데이터 사용
  const player = manager.player[0];
  console.log(`Player name: ${player.name}`);
  console.log(`Player level: ${player.level}`);

  // 특정 데이터 찾기
  const item = manager.item.find(i => i.id === 1);
  if (item) {
    console.log(`Item: ${item.name}, Price: ${item.price}`);
  }
}

main().catch(console.error);
```

## 데이터 로딩 방법

### fetch를 사용한 로딩 (브라우저 환경)

```typescript
async function loadJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.statusText}`);
  }
  return response.json();
}
```

### fs를 사용한 로딩 (Node.js 환경)

```typescript
import fs from 'fs';
import path from 'path';

function loadJson<T>(filePath: string): T {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}
```

### 동적 가져오기 사용 (번들러)

```typescript
// Vite/Webpack 동적 가져오기 사용
const playerData = await import('./data/generated/Player.json');
```

## 주의 사항

- TypeScript number 타입은 `number`로 통일되어 정밀도 손실이 발생할 수 있습니다
- 생성된 인터페이스는 타입 검사와 코드 힌트에 직접 사용할 수 있습니다
- 다양한 코드 스타일(ES 모듈, CommonJS 등)의 생성을 설정할 수 있습니다
- 대규모 프로젝트의 경우 코드 분할을 사용하여 로딩 성능을 최적화하는 것이 좋습니다

## 모범 사례

1. **타입 안전성**: 생성된 인터페이스를 사용하여 타입 검사를 수행하고 런타임 오류를 방지합니다
2. **지연 로딩**: 필요할 때 데이터를 로드하여 초기 로딩 시간을 단축합니다
3. **캐싱**: 로드된 데이터를 캐시하여 반복 요청을 방지합니다
4. **오류 처리**: 로딩 실패에 대한 적절한 오류 처리를 추가합니다

## 예제 프로젝트

XCell은 실제 프로젝트에서 XCell을 사용하는 방법을 보여주는 TypeScript 예제 프로젝트를 제공합니다:

- 기본 설정 테이블 사용
- 복잡한 데이터 구조
- 다국어 지원
- 프론트엔드 및 백엔드 통합

예제 프로젝트를 통해 TypeScript에서 XCell의 모범 사례를 빠르게 배울 수 있습니다.
