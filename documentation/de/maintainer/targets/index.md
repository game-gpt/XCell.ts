# Zielplattformen

XCell unterstützt mehrere Zielplattformen, einschließlich Frontend und Backend. Dieses Kapitel beschreibt detailliert die Integrationsmethoden und Typzuordnungen für jede Plattform.

## Frontend-Plattformen

Frontend-Plattformen sind hauptsächlich auf Spielengines und Frontend-Frameworks ausgerichtet und bieten Codegenerierungs- und Datenladefunktionalität.

### Spielengines

- [Unity](unity.md) - Unity-Engine-Integration ⚠️ (aktuell deaktiviert)
- [Cocos](cocos.md) - Cocos-Engine-Integration ✅
- [Unreal Engine](unreal.md) - Unreal-Engine-Integration
- [Godot](godot.md) - Godot-Engine-Integration
- [XLua](xlua.md) - XLua-Skript-Integration

### Frontend-Frameworks

- [React](react.md) - React-Framework-Integration
- [Vue](vue.md) - Vue-Framework-Integration
- [TypeScript/JavaScript](typescript.md) - TypeScript/JavaScript-Integration ✅

## Backend-Plattformen

Backend-Plattformen sind hauptsächlich auf Serverseite und Datenspeicherung ausgerichtet und bieten Datenpersistenz und serverseitige Integration.

### Datenformate

- [JSON](json.md) - JSON-Datenformat ✅
- [SQL](sql.md) - SQL-Datenbank-Integration

## Codegenerator-Statusübersicht

| Generator | Status | Beschreibung |
| --------- | ------ | ----------- |
| `json` | ✅ Verfügbar | JSON-Datengenerierung |
| `binary` | ✅ Verfügbar | Binärdatengenerierung |
| `cocos` | ✅ Verfügbar | Cocos-Plattform-Codegenerierung |
| `typescript` | ✅ Verfügbar | TypeScript-Codegenerierung |
| `dejavu` | ✅ Verfügbar | Template-Engine-Codegenerierung |
| `unity` | ⚠️ Deaktiviert | Unity-Plattform-Codegenerierung (unter Refaktorierung) |
| `xlua` | In Entwicklung | XLua-Skript-Codegenerierung |
| `sql` | In Entwicklung | SQL-Datenbank-Codegenerierung |
| `xml` | In Entwicklung | XML-Datengenerierung |

## Plattformübergreifende Unterstützung

XCell ist plattformübergreifend konzipiert und unterstützt die gemeinsame Nutzung von Konfigurationsdaten zwischen verschiedenen Plattformen, um Datenkonsistenz und Entwicklungseffizenz sicherzustellen.

### Plattformübergreifende Datenfreigabe

- Einheitliches Datenmodell
- Plattformübergreifende Typzuordnung
- Standardisiertes Konfigurationsformat

### Best Practices

- Geeignetes Datenformat basierend auf Zielplattform wählen
- Zusammenführungsregeln zur Verwaltung plattformübergreifender Daten verwenden
- Regelmäßig Datenstrukturen plattformübergreifend synchronisieren
