# XCell Documentation

This directory contains the documentation for the XCell configuration table management tool, organized by language.

## Supported Languages

| Code | Language | Status |
| ---- | -------- | ------ |
| en | English | Complete |
| zh-hans | 简体中文 | Complete |
| zh-hant | 繁體中文 | Complete |
| ja | 日本語 | Complete |
| de | Deutsch | Complete |
| fr | Français | Complete |
| ko | 한국어 | Complete |
| ru | Русский | Complete |

> For the rendered documentation, please visit the [XCell homepage](https://xcell.lingzhi.dev).

## Directory Structure

```
documentation/
├── readme.md
├── package.json
├── en/
│   ├── readme.md
│   ├── overview/
│   ├── advanced/
│   ├── use-cases/
│   └── maintainer/
├── zh-hans/
├── zh-hant/
├── ja/
├── de/
├── fr/
├── ko/
└── ru/
```

Each language directory contains the same documentation structure:

- **readme.md** - Quick Start guide
- **overview/** - Feature overview (table types, code generation targets, type system, etc.)
- **advanced/** - Advanced topics (type system, field constraints, reference types, meta attributes, configuration, extensibility)
- **use-cases/** - Integration examples (Unity, Cocos, etc.)
- **maintainer/** - Maintainer documentation
  - **architecture/** - Architecture design and module division
  - **targets/** - Target platform integration and type mappings
