# Enum-Tabelle

Enum-Tabellen werden verwendet, um Aufzählungstypen zu definieren und können jedem Aufzählungswert zusätzliche Daten anhängen.

## Konventionen

- **Erste Spalte wird als Primärschlüssel behandelt**
- **Verwenden Sie den `@enum`-Marker zur expliziten Deklaration als Enum-Typ**
- **Der generierte Name ist standardmäßig der Dateiname, kann über `@enum Name` angegeben werden**

## Speicherstruktur

Enum-Tabellen werden als **Enum + statische Felder/statische Methoden** gespeichert und genießen zusätzliche Optimierungen.

> ⚠️ Wenn das Programm keine besonderen Anforderungen hat, wird empfohlen, den standardmäßigen Dict-Typ zu verwenden.

## Markierungsmethode

Verwenden Sie den `@enum`-Marker in der ersten Zeile, erste Spalte:

| @enum | Comment | Icon |
| ----- | ------- | ---- |
| name | comment | icon |
| text | utf8 | utf8 |
| Norma | Normale Qualität | icon_01.png |
| Rare | Seltene Qualität | icon_02.png |
| Epic | Epische Qualität | icon_03.png |
| Super | Legendäre Qualität | icon_04.png |

## Codegenerierung

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

## Anwendungsfälle

- Artikelqualitätsdefinitionen
- Charakterstatusdefinitionen
- Ereignistypdefinitionen
- Jedes Szenario, das Aufzählungen mit zusätzlichen Daten erfordert
