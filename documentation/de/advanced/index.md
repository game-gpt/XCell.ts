# Erweiterte Themen

Dieser Abschnitt richtet sich an Entwickler, die bereits grundlegende Kenntnisse über XCell haben und mehr über interne Mechanismen, erweiterte Funktionen oder fortgeschrittene Konfigurationen erfahren möchten.

## Dokumentstruktur

### Typsystem
- [type-system.md](type-system.md) - Typsystem-Dokumentation
  - Grundtypen (Ganzzahlen, Gleitkommazahlen, Boolesche Werte, Zeichenketten)
  - Zusammengesetzte Typen (Arrays, Vektoren, Wörterbücher, Tupel)
  - Spezielle Typen (Farbe, Zeit)
  - Benutzerdefinierte Typen (Aufzählungen, Strukturen)
  - Typkonvertierung und Validierung

### Feldbeschränkungen
- [key-field.md](key-field.md) - Feldbeschränkungsdokumentation
  - Eindeutigkeitsbeschränkungen
  - Primärschlüsselbeschränkungen
  - Zusammengesetzte Beschränkungen

### Referenztypen
- [ref-type.md](ref-type.md) - Referenztyp-Dokumentation
  - Grundformat
  - Funktionsweise
  - Anwendungsfälle
  - Referenzvalidierung

### Meta-Attribute
- [meta-data.md](meta-data.md) - Meta-Attribut-Dokumentation
  - Grundlegende Meta-Attribute (var, type, default, field, client, server, meta)
  - Tabellentyp-Marker (class, enum, table, language)
  - Verwendungsregeln und Beispiele

### Konfiguration
- [config.md](config.md) - Konfigurationsdateidokumentation
  - Projektkonfiguration
  - Tabellenkonfiguration
  - Zeilenabbildung

### Erweiterbarkeit
- [extensibility.md](extensibility.md) - Erweiterbarkeitsdokumentation
  - Benutzerdefiniertes Typsystem
  - Erweiterung von Codegeneratoren (Unterstützung für jede Programmiersprache)
  - Erstellung von Exportern für andere Spielengines
  - Plugin-Entwicklungsleitfaden

## Multi-Engine-Unterstützung

XCells Designphilosophie ist es, hervorragende Konfigurationstabellen-Verwaltungslösungen für alle Spielengines bereitzustellen:

- **Unity (C#)**: Vollständige integrierte Unterstützung
- **Cocos Creator**: Über JSON/XML + TypeScript/Lua-Loader
- **Godot**: Über JSON + GDScript-Loader
- **Unreal Engine**: Über Binär + C++-Loader
- **Benutzerdefinierte Engines**: Erstellen Sie benutzerdefinierte Exporter über die Erweiterbarkeitsdokumentation

## Voraussetzungen

Bevor Sie diesen Abschnitt lesen, wird empfohlen:

1. Mit der grundlegenden Verwendung von XCell vertraut zu sein
2. Die Grundstruktur der Projektkonfigurationsdatei `XCell.toml` zu verstehen
3. Programmiergrundlagen in Zielsprachen (Rust, C#, C++, Python, Lua, TypeScript usw.) zu besitzen
