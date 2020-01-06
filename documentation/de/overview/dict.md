# Dict-Tabelle

Dict ist das am häufigsten verwendete Konfigurationsformat. Wenn kein spezieller Typmarker vorhanden ist, wird es standardmäßig als Dict-Typ behandelt. Dict verwendet eine Zeichenkette als Primärschlüssel, geeignet für Daten, die nach Namen abgerufen werden müssen.

## Konventionen

- **Erste Spalte wird als Primärschlüssel behandelt**
- **Standardmäßig Dict-Typ, keine explizite Markierung erforderlich**
- **Kann den `@dict`-Marker zur expliziten Deklaration verwenden**
- **Der generierte Name ist standardmäßig der Dateiname, kann über `@dict Name` angegeben werden**

## Markierungsmethode

Standardmäßig ist keine Markierung erforderlich, die erste Spalte wird automatisch als Zeichenfolgen-Primärschlüssel erkannt:

| quality_key | item_icon | display_color |
|-------------|-----------|---------------|
| string | string | string |
| common | item_01.png | #FFFFFF |
| rare | item_02.png | #00FFFF |
| epic | item_03.png | #FF00FF |

Sie können auch explizit den `@dict`-Marker in der ersten Zeile, erste Spalte verwenden:

| @dict | item_icon | display_color |
|-------|-----------|---------------|
| quality_key | string | string |
| common | item_01.png | #FFFFFF |
| rare | item_02.png | #00FFFF |
| epic | item_03.png | #FF00FF |

## Codegenerierung

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

## Anwendungsfälle

Qualitätskonfiguration, UI-Konfiguration, Soundeffekt-Konfiguration und andere Daten, die nach Namen abgerufen werden müssen.
