# XLua-Integration

XLua ist eine häufig verwendete Lua-Skript-Lösung in Unity. XCell bietet Integrationsunterstützung mit XLua.

## Typzuordnung

| XCell-Typ | XLua-Typ | Beschreibung |
| ---------- | --------- | ----------- |
| `i8` | `number` | 8-Bit-Vorzeichen-Ganzzahl |
| `i16` | `number` | 16-Bit-Vorzeichen-Ganzzahl |
| `i32` | `number` | 32-Bit-Vorzeichen-Ganzzahl |
| `i64` | `number` | 64-Bit-Vorzeichen-Ganzzahl |
| `u8` | `number` | 8-Bit-Vorzeichenlose-Ganzzahl |
| `u16` | `number` | 16-Bit-Vorzeichenlose-Ganzzahl |
| `u32` | `number` | 32-Bit-Vorzeichenlose-Ganzzahl |
| `u64` | `number` | 64-Bit-Vorzeichenlose-Ganzzahl |
| `f32` | `number` | 32-Bit-Gleitkomma |
| `f64` | `number` | 64-Bit-Gleitkomma |
| `bool` | `boolean` | Boolescher Wert |
| `string` | `string` | Zeichenkette |
| `array<T>` | `table` | Array |
| `map<K, V>` | `table` | Map |
| `enum` | `number` | Aufzählung |
| `struct` | `table` | Struktur |

## Integrationsschritte

1. **XLua installieren**: XLua-Plugin im Unity-Projekt installieren
2. **XCell konfigurieren**: XLua-Codegenerierung in Projektkonfiguration aktivieren
3. **Code generieren**: XCell verwenden, um XLua-kompatiblen Code zu generieren
4. **Daten laden**: Generierte Daten in Lua-Skripten laden

## Beispielcode

```lua
-- Konfigurationsdaten laden
local config = require("ConfigManager")

-- Auf Konfiguration zugreifen
local playerConfig = config.Player[1]
print("Spielername: " .. playerConfig.name)
print("Spielerstufe: " .. playerConfig.level)
```

## Hinweise

- XLua-Zahlentypen sind als `number` vereinheitlicht, was zu Präzisionsverlust führen kann
- Komplexe Datenstrukturen werden in Lua-Tabellen konvertiert
- Es wird empfohlen, LuaJIT für bessere Leistung zu verwenden
