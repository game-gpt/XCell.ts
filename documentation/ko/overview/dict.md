# Dict 테이블

Dict는 가장 일반적으로 사용되는 설정 양식입니다. 특별한 타입 마커가 없으면 기본적으로 Dict 타입으로 처리됩니다. Dict는 문자열을 기본 키로 사용하며, 이름으로 접근해야 하는 데이터에 적합합니다.

## 규칙

- **첫 번째 열이 기본 키로 처리됩니다**
- **기본적으로 Dict 타입이며, 명시적 마킹이 필요하지 않습니다**
- **`@dict` 마커를 사용하여 명시적으로 선언할 수 있습니다**
- **생성된 이름은 기본적으로 파일 이름이며, `@dict Name`으로 지정할 수 있습니다**

## 마킹 방법

기본적으로 마킹이 필요하지 않으며, 첫 번째 열이 자동으로 문자열 기본 키로 인식됩니다:

| quality_key | item_icon | display_color |
|-------------|-----------|---------------|
| string | string | string |
| common | item_01.png | #FFFFFF |
| rare | item_02.png | #00FFFF |
| epic | item_03.png | #FF00FF |

첫 번째 행, 첫 번째 열에 `@dict` 마커를 명시적으로 사용할 수도 있습니다:

| @dict | item_icon | display_color |
|-------|-----------|---------------|
| quality_key | string | string |
| common | item_01.png | #FFFFFF |
| rare | item_02.png | #00FFFF |
| epic | item_03.png | #FF00FF |

## 코드 생성

### TypeScript (Cocos, Laya)

```typescript
export class ItemQuality {
    public qualityKey: string;
    public itemIcon: string;
    public displayColor: string;
}

export class ItemQualityTable {
    private _items: Map<string, ItemQuality>;
}
```

### C# (Unity, Godot)

```csharp
public class ItemQuality
{
    public string QualityKey;
    public string ItemIcon;
    public string DisplayColor;
}

public class ItemQualityTable
{
    private Dictionary<string, ItemQuality> _items;
}
```

## 사용 사례

품질 설정, UI 설정, 효과음 설정 등 이름으로 접근해야 하는 데이터.
