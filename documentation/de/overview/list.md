# List-Tabelle

List ist ein Konfigurationsformat, das eine Ganzzahl-ID als Primärschlüssel verwendet, geeignet für Daten, die sequenziell oder über numerische ID abgerufen werden müssen.

## Konventionen

- **Erste Spalte wird als Primärschlüssel behandelt**
- **Verwenden Sie den `@list`-Marker zur expliziten Deklaration als List-Typ**
- **Der generierte Name ist standardmäßig der Dateiname, kann über `@list Name` angegeben werden**

## Speicherstruktur

List-Tabellen werden als **Array** gespeichert, mit einer find_key-Leistung von **O(log n)**.

> ⚠️ Wenn das Programm keine besonderen Anforderungen hat, wird empfohlen, die standardmäßige Dict-Tabelle zu verwenden.

## Markierungsmethode

Verwenden Sie den `@list`-Marker in der ersten Zeile, erste Spalte:

| @list | monster_name | hit_points | attack_damage |
|-------|--------------|------------|---------------|
| id | string | f32 | i32 |
| 1 | Slime | 50 | 5 |
| 2 | Goblin | 80 | 10 |
| 3 | Skeleton | 100 | 15 |

## Codegenerierung

### TypeScript (Cocos, Laya)

```typescript
export class Monster {
    public id: number;
    public monsterName: string;
    public hitPoints: number;
    public attackDamage: number;
}

export class MonsterTable {
    private _items: Monster[];
}
```

### C# (Unity, Godot)

```csharp
public class Monster
{
    public int Id;
    public string MonsterName;
    public float HitPoints;
    public float AttackDamage;
}

public class MonsterTable
{
    private Monster[] _items;
}
```

## Anwendungsfälle

Monsterkonfiguration, Artikelkonfiguration, Fähigkeitenkonfiguration und andere Daten, die sequenziellen oder numerischen ID-Zugriff erfordern.
