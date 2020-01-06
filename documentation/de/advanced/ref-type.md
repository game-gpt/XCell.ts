# Referenztypen

## Warum brauchen wir Referenztypen?

Bei der Konfiguration von Spieldaten treffen Sie häufig auf diese Probleme:

**Falsche ID**

In der Artikeltabelle haben Sie die Qualitäts-ID `comon` eingetragen, aber die tatsächliche Qualitätstabelle hat `common`, ein `m` fehlt. Diese Art von Tippfehler ist schwer zu entdecken, und beim Spielen treten Probleme auf.

**ID geändert, Referenz nicht synchronisiert**

Die Qualitätstabelle hat `common` zu `normal` geändert, aber die Artikeltabelle verwendet weiterhin `common`. Das Ergebnis ist, dass Artikel die entsprechende Qualitätskonfiguration nicht finden können.

---

Referenztypen wurden entwickelt, um diese Probleme zu lösen. XCell überprüft automatisch, ob Referenzen korrekt sind, und stellt sicher:
- Ausgefüllte IDs müssen in der Zieltabelle existieren
- Wenn eine ID nicht existiert, wird sofort ein Fehler gemeldet

## Grundformat

- `&T` - Referenz auf Tabelle T

## Was ist eine Referenz?

Einfach ausgedrückt ist eine Referenz ein "Link, der auf eine Datenzeile in einer anderen Tabelle zeigt".

Beispiel: In einer Artikeltabelle müssen Sie aufzeichnen, "welcher Qualität dieser Artikel angehört", dann können Sie einen Referenztyp verwenden, um auf die Qualitätstabelle zu zeigen.

## Beispiel

### Schritt 1: Qualitätstabelle erstellen

Erstellen Sie zuerst eine Qualitätstabelle:

| @dict | Farbe | Beschreibung |
| ----- | ----- | ----------- |
| quality_id | color | desc |
| string | string | string |
| common | #FFFFFF | Normale Qualität |
| rare | #00FFFF | Seltene Qualität |
| epic | #FF00FF | Epische Qualität |

### Schritt 2: Artikeltabelle erstellen (Referenz auf Qualitätstabelle)

Das Feld `quality_id` in der Artikeltabelle verwendet den Typ `&Quality`, was anzeigt, dass es auf die Qualitätstabelle verweist:

| @dict | Name | Qualität | Angriff |
| ----- | ---- | ------- | ------ |
| item_id | name | quality_id | attack |
| string | string | &Quality | i32 |
| sword_001 | Eisenschwert | common | 10 |
| sword_002 | Stahlschwert | rare | 50 |
| sword_003 | Drachenschwert | epic | 200 |

## Häufige Anwendungsfälle

| Szenario | Beschreibung |
| -------- | ----------- |
| Artikel → Qualität | Welcher Qualitätsstufe ein Artikel angehört |
| Ausrüstung → Charakter | Welcher Charakter die Ausrüstung tragen kann |
| Fähigkeit → Klasse | Welche Klasse eine Fähigkeit angehört |
| Monster → Beutetabelle | Welche Beutetabelle ein Monster droppt |

## Referenzierbare Tabellentypen

Die folgenden Tabellentypen können referenziert werden:

| Typ | Beschreibung |
| ---- | ----------- |
| Dict-Tabelle | Zeichenfolgen-Primärschlüssel, wie Artikel-ID, Fähigkeiten-ID |
| List-Tabelle | Ganzzahl-Primärschlüssel, wie Monsternummer, Artikelnummer |
| Language-Tabelle | Sprachschlüssel, Format ist `gruppen_name/sprach_schlüssel`, wie `&Language` |

### Spezielles Format für Language-Tabellenreferenzen

Bei der Referenzierung einer Language-Tabelle ist das Format des ausgefüllten Werts `gruppen_name/sprach_schlüssel`:

| @dict | Name | Hinweistext |
| ----- | ---- | -------- |
| item_id | name | tip |
| string | string | &Language |
| sword_001 | Eisenschwert | ui/item_tip_001 |

Die folgenden Typen **können nicht referenziert werden**:

| Typ | Grund |
| ---- | ------ |
| Enum-Tabelle | Aufzählungen sind feste Optionen, keine Datentabellen |
| Class-Tabelle | Globale Konfiguration hat nur eine Instanz |
| Grundtypen | i32, string usw. sind Werttypen, keine Tabellen |

## Referenzen in verschachtelten Typen

Referenztypen können mit anderen Typen kombiniert werden, um komplexere Datenstrukturen zu bilden.

### Referenz-Array

Wenn Sie auf mehrere Ziele verweisen müssen, können Sie ein Referenz-Array verwenden:

| Format | Beschreibung |
| ------ | ----------- |
| `[&T]` | Referenz-Array, speichert mehrere Zieltabellen-Primärschlüssel |

**Beispiel: Beutetabelle referenziert mehrere Artikel**

| @dict | Name | Beuteartikel |
| ----- | ---- | ---------- |
| drop_id | name | items |
| string | string | [&Item] |
| drop_001 | Starter-Pack | sword_001, potion_001 |
| drop_002 | Elite-Belohnung | sword_002, armor_001, gem_001 |

### Andere verschachtelte Kombinationen

| Format | Beschreibung |
| ------ | ----------- |
| `[&T]` | Referenz-Array |
| `Vec<&T>` | Referenz-Vektor |
| `HashMap<string, &T>` | Zeichenkette-zu-Referenz-Abbildung |

## Referenzvalidierung

XCell überprüft automatisch, ob Referenzen korrekt sind:

- ✅ Referenzierte IDs müssen in der Zieltabelle existieren
- ✅ Nicht existierende IDs können nicht ausgefüllt werden
- ✅ Zirkuläre Referenzen werden erkannt und gemeldet

## Codegenerierung

### TypeScript (Cocos, Laya)

```typescript
export class Item {
    public itemId: string;
    public name: string;
    public qualityId: string;  // Speichert Primärschlüsselwert
    public attack: number;
}

export class ItemTable {
    private _items: Map<string, Item>;
    private _qualityTable: QualityTable;

    public getQuality(itemId: string): Quality | undefined {
        const item = this._items.get(itemId);
        if (item) {
            return this._qualityTable.get(item.qualityId);
        }
        return undefined;
    }
}
```

### C# (Unity, Godot)

```csharp
public class Item
{
    public string ItemId;
    public string Name;
    public string QualityId;  // Speichert Primärschlüsselwert
    public int Attack;
}

public class ItemTable
{
    private Dictionary<string, Item> _items;
    private QualityTable _qualityTable;

    public Quality GetQuality(string itemId)
    {
        if (_items.TryGetValue(itemId, out var item))
        {
            return _qualityTable.Get(item.QualityId);
        }
        return null;
    }
}
```

## Hinweise

- Die referenzierte Zieltabelle muss existieren
- Die Zieltabelle muss vom Typ Dict, List oder Language sein
- Enum- und Class-Tabellen können nicht referenziert werden
- Grundtypen (i32, string usw.) können nicht referenziert werden
- Tabellennamen sollten PascalCase verwenden, wie `&QualityTable`
