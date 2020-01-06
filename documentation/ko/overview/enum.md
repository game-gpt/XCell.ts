# Enum 테이블

Enum 테이블은 열거형 타입을 정의하는 데 사용되며, 각 열거형 값에 추가 데이터를 첨부할 수도 있습니다.

## 규칙

- **첫 번째 열이 기본 키로 처리됩니다**
- **`@enum` 마커를 사용하여 Enum 타입으로 명시적으로 선언합니다**
- **생성된 이름은 기본적으로 파일 이름이며, `@enum Name`으로 지정할 수 있습니다**

## 저장 구조

Enum 테이블은 **열거형 + 정적 필드/정적 메서드**로 저장되며, 추가 최적화를 받습니다.

> ⚠️ 프로그램에 특별한 요구 사항이 없다면 기본 dict 타입을 사용하는 것이 좋습니다.

## 마킹 방법

첫 번째 행, 첫 번째 열에 `@enum` 마커를 사용합니다:

| @enum | Comment | Icon |
| ----- | ------- | ---- |
| name | comment | icon |
| text | utf8 | utf8 |
| Norma | 일반 품질 | icon_01.png |
| Rare | 희귀 품질 | icon_02.png |
| Epic | 에픽 품질 | icon_03.png |
| Super | 전설 품질 | icon_04.png |

## 코드 생성

### TypeScript (Cocos, Laya)

```typescript
/**
 * Quality interface
 */
export interface Quality {
    /**
     * Quality ID
     */
    id: number;
    /**
     * Quality name
     */
    name: string;
    /**
     * Quality comment
     */
    comment: string;
    /**
     * Quality icon
     */
    icon: string;
}

/**
 * Quality enum
 */
export const Quality = {
    /**
     * Norma Quality
     */
    Norma: {
        id: 0,
        name: "Norma",
        comment: "Normal Quality",
        icon: "icon_01.png"
    },
    /**
     * Rare Quality
     */
    Rare: {
        id: 1,
        name: "Rare",
        comment: "Rare Quality",
        icon: "icon_02.png"
    },
    /**
     * Epic Quality
     */
    Epic: {
        id: 2,
        name: "Epic",
        comment: "Epic Quality",
        icon: "icon_03.png"
    },
    /**
     * Super Quality
     */
    Super: {
        id: 3,
        name: "Super",
        comment: "Legendary Quality",
        icon: "icon_04.png"
    }
} as const as Record<string, Quality>;
```

### C# (Unity, Godot)

```csharp
/// <summary>
/// Quality enum
/// </summary>
public enum Quality
{
    /// <summary>
    /// Normal Quality
    /// </summary>
    Norma = 0,
    /// <summary>
    /// Rare Quality
    /// </summary>
    Rare = 1,
    /// <summary>
    /// Epic Quality
    /// </summary>
    Epic = 2,
    /// <summary>
    /// Legendary Quality
    /// </summary>
    Super = 3
}

/// <summary>
/// Quality extension data
/// </summary>
public static class QualityExtension
{
    private static readonly QualityData[] _data = new QualityData[]
    {
        new QualityData { Id = 0, Name = "Norma", Comment = "Normal Quality", Icon = "icon_01.png" },
        new QualityData { Id = 1, Name = "Rare", Comment = "Rare Quality", Icon = "icon_02.png" },
        new QualityData { Id = 2, Name = "Epic", Comment = "Epic Quality", Icon = "icon_03.png" },
        new QualityData { Id = 3, Name = "Super", Comment = "Legendary Quality", Icon = "icon_04.png" }
    };

    public static QualityData GetData(this Quality quality)
    {
        return _data[(int)quality];
    }
}

public class QualityData
{
    public int Id;
    public string Name;
    public string Comment;
    public string Icon;
}
```

## 사용 사례

- 아이템 품질 정의
- 캐릭터 상태 정의
- 이벤트 타입 정의
- 추가 데이터가 첨부된 열거형이 필요한 모든 시나리오
