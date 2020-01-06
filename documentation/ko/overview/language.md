# Language 테이블

Language 테이블은 다국어 텍스트를 관리하는 데 사용됩니다. XCell은 완전한 국제화 지원을 제공합니다.

## 규칙

- **첫 번째 행, 첫 번째 열은 `@language` 마커입니다**
- **선택적 `@group` 필드로 그룹화**
- **나머지 열은 언어 ID입니다**
- **생성된 이름은 기본적으로 파일 이름이며, `@language Name`으로 지정할 수 있습니다**

## 마킹 방법

첫 번째 행, 첫 번째 열에 `@language` 마커를 사용하고, 선택적 `@group`, 나머지 열은 언어 ID입니다:

| @language | @group | zh_cn | en_us | ja_jp |
|-----------|--------|-------|-------|-------|
| Ui_Start | ui | 开始 | Start | スタート |
| Ui_Settings | ui | 设置 | Settings | 設定 |
| Ui_Exit | ui | 退出 | Exit | 終了 |

## 코드 생성

### TypeScript (Cocos, Laya)

```typescript
export class LanguageTable {
    private static _items: Map<string, string>;

    public static get(key: string): string {
        return this._items.get(key) ?? key;
    }
}
```

### C# (Unity, Godot)

```csharp
public static class LanguageTable
{
    private static Dictionary<string, string> _items;

    public static string Get(string key)
    {
        return _items.TryGetValue(key, out var value) ? value : key;
    }
}
```

## 사용 사례

- 게임 UI 다국어 지원
- 애플리케이션 국제화
- 다국어 문서 시스템
- 다국어 지원이 필요한 모든 프로젝트
