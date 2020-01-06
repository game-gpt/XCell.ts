# Class 테이블

Class 테이블은 전역 설정 클래스를 정의하는 데 사용되며, 싱글톤 설정 시나리오에 적합합니다.

## 규칙

- **첫 번째 행, 첫 번째 열은 `@class` 마커입니다**
- **싱글톤 클래스를 생성합니다**
- **생성된 이름은 기본적으로 파일 이름이며, `@class Name`으로 지정할 수 있습니다**

## 마킹 방법

첫 번째 행, 첫 번째 열에 `@class` 마커를 사용합니다.

| @class      | @comment | @type  | @default |
| ----------- | -------- | ------ | -------- |
| max\_hp     | 최대 체력   | i32    | 100      |
| user\_name  | 플레이어 이름  | string | Player   |
| move\_speed | 이동 속도   | f32    | 5.0      |

## 코드 생성

### TypeScript (Cocos, Laya)

```typescript
export class GameConfig {
    public static maxHp: number = 100;
    public static userName: string = "Player";
    public static moveSpeed: number = 5.0;
}
```

### C# (Unity, Godot)

```csharp
public static class GameConfig
{
    public static int MaxHp = 100;
    public static string UserName = "Player";
    public static float MoveSpeed = 5.0f;
}
```

## 사용 사례

- 게임 전역 설정 (예: 레벨 설정, 난이도 설정)
- 애플리케이션 설정
- 시스템 매개변수 설정
