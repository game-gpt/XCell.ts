# Dokumentation der erweiterten Funktionen

Dieses Dokument beschreibt die erweiterten Funktionen des XCell-Konfigurationstabellen-Verwaltungstools, einschließlich erweiterter Konfigurationsoptionen, detaillierter Tabellen-Zusammenführungsregeln und Tipps zur Leistungsoptimierung.

## Inhaltsverzeichnis

1. [Erweiterte Konfigurationsoptionen](#erweiterte-konfigurationsoptionen)
2. [Details der Tabellen-Zusammenführungsregeln](#details-der-tabellen-zusammenführungsregeln)
3. [Tipps zur Leistungsoptimierung](#tipps-zur-leistungsoptimierung)
4. [Engine-Integration](#engine-integration)

---

## Erweiterte Konfigurationsoptionen

XCells Konfigurationsdatei `XCell.toml` bietet umfangreiche Konfigurationsoptionen, mit denen Sie das Verhalten des Tools flexibel anpassen können.

### Grundlegende Konfigurationsstruktur

Eine vollständige `XCell.toml`-Konfigurationsdatei enthält die folgenden Hauptteile:

```toml
version = "0.0.0"

exclude = ""
include = "*.xlsx"

line.field = 1
line.type = 2
line.comment = 3
line.data = 4

[type.bool]
accept = ["true", "√"]
reject = ["false", "x"]

[type.string]

[merge]
```

### Versionskontrollkonfiguration

```toml
version = "0.0.0"
```

- **version**: Aktuelle Projektversionsnummer, verwendet zur Identifizierung der Version von generiertem Code und Datendateien

### Datei-Ein-/Ausschlusskonfiguration

```toml
exclude = ""
include = "*.xlsx"
```

- **include**: Gibt das einzuschließende Excel-Dateimuster an, unterstützt Platzhalter
- **exclude**: Gibt das auszuschließende Excel-Dateimuster an, niedrigere Priorität als include

Beispiel:
```toml
include = "tables/**/*.xlsx"
exclude = "tables/temp/*.xlsx"
```

### Tabellenzeilenkonfiguration

```toml
line.field = 1
line.type = 2
line.comment = 3
line.data = 4
```

- **line.field**: Zeilennummer, in der Feldnamen stehen (beginnend bei 1)
- **line.type**: Zeilennummer, in der Typdeklarationen stehen
- **line.comment**: Zeilennummer, in der Kommentare stehen
- **line.data**: Zeilennummer, ab der Daten beginnen

### Typkonfiguration

#### Boolesche Typkonfiguration

```toml
[type.bool]
accept = ["true", "√"]
reject = ["false", "x"]
```

- **accept**: Liste der Werte, die als true erkannt werden
- **reject**: Liste der Werte, die als false erkannt werden

#### Zeichenkettentypkonfiguration

```toml
[type.string]
# Erweiterbare Konfiguration
```

---

## Details der Tabellen-Zusammenführungsregeln

Tabellen-Zusammenführungsregeln ermöglichen es Ihnen, mehrere Excel-Tabellen zu einer zusammenzuführen, wobei Zeilen- oder Spaltenzusammenführung unterstützt wird.

### Konfiguration der Zusammenführungsregeln

Zusammenführungsregeln werden im Abschnitt `[merge]` konfiguriert, jede Regel verwendet eine eindeutige Nummer als Identifikator.

```toml
[merge.10001]
mode = "row"
input = "Language_CN*"
target = "Language_CN"

[merge.10002]
mode = "row"
input = "Language_EN*"
target = "Language_EN"

[merge.20001]
mode = "column"
input = "Language*"
target = "Language"
```

### Zusammenführungsmodi

#### Zeilen-Zusammenführungsmodus (row)

```toml
mode = "row"
```

Zeilen-Zusammenführung kombiniert Datenzeilen aus mehreren Tabellen zu einer Tabelle. Geeignet für:
- Große Tabellen, die für die Verwaltung aufgeteilt werden müssen
- Getrennte Verwaltung mehrsprachiger Daten

Beispiel-Verzeichnisstruktur:
```
LanguageTable/
  - CN/
    - Language_CN_UI.xlsx
    - Language_CN_Item.xlsx
  - EN/
    - Language_EN_UI.xlsx
    - Language_EN_Item.xlsx
```

#### Spalten-Zusammenführungsmodus (column)

```toml
mode = "column"
```

Spalten-Zusammenführung kombiniert Spalten aus mehreren Tabellen zu einer Tabelle. Geeignet für:
- Verteilung von Spaltendaten auf verschiedene Dateien
- Verschiedene Teams arbeiten an verschiedenen Teilen derselben Tabelle

### Parameter der Zusammenführungsregeln

- **mode**: Zusammenführungsmodus, `row` oder `column`
- **input**: Eingabedateimuster, unterstützt Platzhalter
- **target**: Zieltabellenname

### Ausführungsreihenfolge der Zusammenführung

Regelnummern bestimmen die Ausführungsreihenfolge der Zusammenführungen, kleinere Zahlen werden früher ausgeführt. Empfehlungen:
- Zeilen-Zusammenführung verwendet den Bereich 10000-19999
- Spalten-Zusammenführung verwendet den Bereich 20000-29999
- Andere benutzerdefinierte Regeln verwenden höhere Zahlen

---

## Tipps zur Leistungsoptimierung

### Optimierung der Verarbeitung großer Tabellen

#### 1. Große Tabellen sinnvoll aufteilen

- Große Tabellen nach Funktion oder Modul aufteilen
- Zeilen-Zusammenführungsregeln zur Zusammenführung zur Build-Zeit verwenden
- Wartbarkeit während der Entwicklung und Leistung zur Laufzeit beibehalten

#### 2. Binärformat verwenden

- Binärformat hat die schnellste Ladegeschwindigkeit
- Binärformat wird für Produktionsumgebungen empfohlen
- XML/JSON kann in Entwicklungsumgebungen zum Debuggen verwendet werden

### Optimierung der inkrementellen Aktualisierung

#### 1. Überwachungsmodus

Verwenden Sie den Überwachungsmodus:

```bash
xcell.exe --watch
```

Funktionen des Überwachungsmodus:
- Nur geänderte Dateien neu generieren
- Entwicklereffizenz erheblich steigern
- Echtzeitvorschau unterstützen

#### 2. Sinnvolle Überwachungskonfiguration

Konfigurieren Sie sinnvolle include/exclude-Muster, um die Anzahl der überwachten Dateien zu reduzieren.

### Speicheroptimierung

#### 1. Nur benötigte Tabellen laden

Je nach Engine-API nur Tabellen laden, die für die aktuelle Szene oder Funktion benötigt werden, vermeiden Sie das Laden aller Tabellen auf einmal.

#### 2. Rechtzeitig entladen

Wenn bestimmte Tabellen nicht mehr benötigt werden, entladen Sie diese rechtzeitig, um Speicher freizugeben.

### Build-Optimierung

#### 1. Parallele Verarbeitung

XCell unterstützt die parallele Verarbeitung mehrerer Dateien, was die Build-Geschwindigkeit erheblich verbessert.

#### 2. Caching-Mechanismus

Verwenden Sie Caching sinnvoll, um wiederholte Verarbeitung zu vermeiden.

---

## Engine-Integration

XCell unterstützt die Integration mit mehreren Spielengines, siehe folgende Dokumentation für Details:

- [Unity-Integration](./unity.md) - Details zur XCell-Integration mit der Unity-Engine
- [Cocos-Integration](./cocos.md) - Details zur XCell-Integration mit der Cocos-Engine

---

## Zusammenfassung

XCell bietet umfangreiche erweiterte Funktionen, die durch sinnvolle Konfiguration und Optimierung die Anforderungen verschiedener komplexer Projekte erfüllen können.

- Verwenden Sie erweiterte Konfigurationsoptionen, um das XCell-Verhalten anzupassen
- Verwenden Sie Zusammenführungsregeln, um komplexe Tabellen zu verwalten
- Verbessern Sie die Effizienz zur Laufzeit und während des Builds durch Leistungsoptimierung
- Verbessern Sie die Entwicklereffizenz durch Engine-Integration

Wenn Sie Fragen oder Vorschläge haben, können Sie gerne ein Issue oder PR einreichen!
