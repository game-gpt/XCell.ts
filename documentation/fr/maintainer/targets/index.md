# Cibles

XCell supporte plusieurs plateformes cibles, y compris frontend et backend. Ce chapitre détaille les méthodes d'intégration et les mappages de types pour chaque plateforme.

## Plateformes frontend

Les plateformes frontend sont principalement orientées vers les moteurs de jeu et les frameworks frontend, fournissant des fonctionnalités de génération de code et de chargement de données.

### Moteurs de jeu

- [Unity](unity.md) - Intégration du moteur Unity ⚠️ (actuellement désactivé)
- [Cocos](cocos.md) - Intégration du moteur Cocos ✅
- [Unreal Engine](unreal.md) - Intégration du moteur Unreal Engine
- [Godot](godot.md) - Intégration du moteur Godot
- [XLua](xlua.md) - Intégration de scripts XLua

### Frameworks frontend

- [React](react.md) - Intégration du framework React
- [Vue](vue.md) - Intégration du framework Vue
- [TypeScript/JavaScript](typescript.md) - Intégration TypeScript/JavaScript ✅

## Plateformes backend

Les plateformes backend sont principalement orientées vers le côté serveur et le stockage de données, fournissant la persistance des données et l'intégration côté serveur.

### Formats de données

- [JSON](json.md) - Format de données JSON ✅
- [SQL](sql.md) - Intégration de base de données SQL

## Description du statut des générateurs de code

| Générateur | Statut | Description |
| --------- | ------ | ----------- |
| `json` | ✅ Disponible | Génération de données JSON |
| `binary` | ✅ Disponible | Génération de données binaires |
| `cocos` | ✅ Disponible | Génération de code plateforme Cocos |
| `typescript` | ✅ Disponible | Génération de code TypeScript |
| `dejavu` | ✅ Disponible | Génération de code par moteur de templates |
| `unity` | ⚠️ Désactivé | Génération de code plateforme Unity (en refonte) |
| `xlua` | En développement | Génération de code script XLua |
| `sql` | En développement | Génération de code base de données SQL |
| `xml` | En développement | Génération de données XML |

## Support multi-plateforme

XCell est conçu pour être multi-plateforme, supportant le partage de données de configuration entre différentes plateformes, garantissant la cohérence des données et l'efficacité de développement.

### Partage de données multi-plateforme

- Modèle de données unifié
- Mappage de types multi-plateforme
- Format de configuration standardisé

### Bonnes pratiques

- Choisir le format de données approprié selon la plateforme cible
- Utiliser les règles de fusion pour gérer les données multi-plateformes
- Synchroniser régulièrement les structures de données entre les plateformes
