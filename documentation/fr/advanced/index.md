# Sujets avancés

Cette section s'adresse aux développeurs ayant une compréhension de base de XCell et souhaitant en savoir plus sur ses mécanismes internes, ses fonctionnalités étendues ou implémenter des configurations avancées.

## Structure du document

### Système de types
- [type-system.md](type-system.md) - Documentation du système de types
  - Types de base (entiers, virgule flottante, booléens, chaînes)
  - Types composites (tableaux, vecteurs, dictionnaires, tuples)
  - Types spéciaux (couleur, temps)
  - Types personnalisés (énumérations, structures)
  - Conversion et validation de types

### Contraintes de champ
- [key-field.md](key-field.md) - Documentation des contraintes de champ
  - Contraintes d'unicité
  - Contraintes de clé primaire
  - Contraintes composites

### Types de référence
- [ref-type.md](ref-type.md) - Documentation des types de référence
  - Format de base
  - Fonctionnement
  - Cas d'utilisation
  - Validation des références

### Attributs méta
- [meta-data.md](meta-data.md) - Documentation des attributs méta
  - Attributs méta de base (var, type, default, field, client, server, meta)
  - Marqueurs de type de table (class, enum, table, language)
  - Règles d'utilisation et exemples

### Configuration
- [config.md](config.md) - Documentation des fichiers de configuration
  - Configuration du projet
  - Configuration de table
  - Mappage de lignes

### Extensibilité
- [extensibility.md](extensibility.md) - Documentation de l'extensibilité
  - Système de types personnalisé
  - Extension des générateurs de code (support de tout langage de programmation)
  - Création d'exportateurs pour d'autres moteurs de jeu
  - Guide de développement de plugins

## Support multi-moteur

La philosophie de conception de XCell est de fournir d'excellentes solutions de gestion de tables de configuration pour tous les moteurs de jeu :

- **Unity (C#)** : Support intégré complet
- **Cocos Creator** : Via chargeurs JSON/XML + TypeScript/Lua
- **Godot** : Via chargeurs JSON + GDScript
- **Unreal Engine** : Via chargeurs binaires + C++
- **Moteurs personnalisés** : Créer des exportateurs personnalisés via la documentation d'extensibilité

## Prérequis

Avant de lire cette section, il est recommandé de :

1. Être familier avec l'utilisation de base de XCell
2. Comprendre la structure de base du fichier de configuration du projet `XCell.toml`
3. Avoir des fondamentaux en programmation dans les langages cibles (Rust, C#, C++, Python, Lua, TypeScript, etc.)
