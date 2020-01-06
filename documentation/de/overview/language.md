# Language-Tabelle

Language-Tabellen werden verwendet, um mehrsprachige Texte zu verwalten. XCell bietet vollständige Internationalisierungsunterstützung.

## Konventionen

- **Erste Zeile, erste Spalte ist der `@language`-Marker**
- **Optionales `@group`-Feld zur Gruppierung**
- **Verbleibende Spalten sind Sprach-IDs**
- **Der generierte Name ist standardmäßig der Dateiname, kann über `@language Name` angegeben werden**

## Markierungsmethode

Verwenden Sie den `@language`-Marker in der ersten Zeile, erste Spalte, optionales `@group`, verbleibende Spalten sind Sprach-IDs:

| @language | @group | zh_cn | en_us | ja_jp |
|-----------|--------|-------|-------|-------|
| Ui_Start | ui | Start | Start | スタート |
| Ui_Settings | ui | Settings | Settings | 設定 |
| Ui_Exit | ui | Exit | Exit | 終了 |

## Codegenerierung

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

## Anwendungsfälle

- Mehrsprachige Unterstützung für Spiel-UI
- Anwendungsisationalisierung
- Mehrsprachige Dokumentationssysteme
- Jedes Projekt, das mehrsprachige Unterstützung erfordert
