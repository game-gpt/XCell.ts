# Tabellen-Zusammenführungsregeln

XCell unterstützt das Zusammenführen mehrerer Tabellen zu einer Tabelle. Durch Zusammenführungsregeln können Sie komplexe Datenstrukturen flexibel verwalten.

## Namenskonvention

- **PascalCase-Benennung** (z.B. `ItemWeapon`, `ItemArmor`): Unabhängige Tabellen, nehmen nicht an der Zusammenführung teil
- **Unterstrich-Benennung** (z.B. `Item_Weapon`, `Item_Armor`): Werden automatisch in die `Item`-Tabelle zusammengeführt

## Beispiel

| Dateiname | Verhalten |
|----------|----------|
| `ItemWeapon.xlsx` | Unabhängige Tabelle, erzeugt `ItemWeapon` |
| `ItemArmor.xlsx` | Unabhängige Tabelle, erzeugt `ItemArmor` |
| `Item_Weapon.xlsx` | In `Item` zusammengeführt |
| `Item_Armor.xlsx` | In `Item` zusammengeführt |
| `Item_Consumable.xlsx` | In `Item` zusammengeführt |

## Zusammenführungslogik

- Tabellen mit gleicher Struktur werden zusammengeführt
- **Doppelte IDs verursachen Fehler** (die Zusammenführungsreihenfolge hängt von der Festplattenspeicherung ab, nicht festgelegt)
- Die endgültige Ausgabe wird nach ID sortiert

## Anwendungsfälle

### Szenario: Tabellen nach Typ verwalten

Angenommen, Sie haben die folgenden Artikeltabellen:
- `Item_Weapon.xlsx` - Waffenkonfiguration
- `Item_Armor.xlsx` - Rüstungskonfiguration
- `Item_Consumable.xlsx` - Verbrauchsgüterkonfiguration

Diese werden automatisch in die `Item`-Tabelle zusammengeführt.

## Hinweise

- Zusammengeführte Tabellen müssen die gleiche Struktur haben (gleiche Spaltennamen und Typen)
- Bei Primärschlüsselkonflikten überschreiben spätere zusammengeführte Dateidaten frühere
- Es wird empfohlen, Originaldateien vor der Durchführung von Zusammenführungsvorgängen zu sichern
- **`Language` ist ein reservierter Tabellenname**, alle Language-Tabellen werden in Language zusammengeführt, verwenden Sie diesen Namen nicht
