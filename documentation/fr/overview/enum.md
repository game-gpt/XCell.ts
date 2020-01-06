# Table Enum

Les tables d'énumération sont utilisées pour définir des types énumérés, et peuvent également attacher des données supplémentaires à chaque valeur d'énumération.

## Conventions

- **La première colonne est traitée comme clé primaire**
- **Utilisez le marqueur `@enum` pour déclarer explicitement le type Enum**
- **Le nom généré par défaut est le nom du fichier, peut être spécifié via `@enum Nom`**

## Structure de stockage

Les tables d'énumération sont stockées sous forme de **enum + champs statiques/méthodes statiques**, bénéficiant d'optimisations supplémentaires.

> ⚠️ Si le programme n'a pas d'exigences particulières, il est recommandé d'utiliser le type dict par défaut.

## Méthode de marquage

Utilisez le marqueur `@enum` dans la première ligne, première colonne :

| @enum | Commentaire | Icône |
| ----- | ------- | ---- |
| name | comment | icon |
| text | utf8 | utf8 |
| Norma | Qualité normale | icon_01.png |
| Rare | Qualité rare | icon_02.png |
| Epic | Qualité épique | icon_03.png |
| Super | Qualité légendaire | icon_04.png |

## Génération de code

### TypeScript (Cocos, Laya)

```typescript
/**
 * Interface Quality
 */
export interface Quality {
    /**
     * ID de qualité
     */
    id: number;
    /**
     * Nom de qualité
     */
    name: string;
    /**
     * Commentaire de qualité
     */
    comment: string;
    /**
     * Icône de qualité
     */
    icon: string;
}

/**
 * Enum Quality
 */
export const Quality = {
    /**
     * Qualité Norma
     */
    Norma: {
        id: 0,
        name: "Norma",
        comment: "Normal Quality",
        icon: "icon_01.png"
    },
    /**
     * Qualité Rare
     */
    Rare: {
        id: 1,
        name: "Rare",
        comment: "Rare Quality",
        icon: "icon_02.png"
    },
    /**
     * Qualité Epic
     */
    Epic: {
        id: 2,
        name: "Epic",
        comment: "Epic Quality",
        icon: "icon_03.png"
    },
    /**
     * Qualité Super
     */
    Super: {
        id: 3,
        name: "Super",
        comment: "Legendary Quality",
        icon: "icon_04.png"
    }
} as const as Record<string, Quality>;
```

### C# (Unity, Godot)

```csharp
/// <summary>
/// Enum Quality
/// </summary>
public enum Quality
{
    /// <summary>
    /// Normal Quality
    /// </summary>
    Norma = 0,
    /// <summary>
    /// Rare Quality
    /// </summary>
    Rare = 1,
    /// <summary>
    /// Epic Quality
    /// </summary>
    Epic = 2,
    /// <summary>
    /// Legendary Quality
    /// </summary>
    Super = 3
}

/// <summary>
/// Données d'extension Quality
/// </summary>
public static class QualityExtension
{
    private static readonly QualityData[] _data = new QualityData[]
    {
        new QualityData { Id = 0, Name = "Norma", Comment = "Normal Quality", Icon = "icon_01.png" },
        new QualityData { Id = 1, Name = "Rare", Comment = "Rare Quality", Icon = "icon_02.png" },
        new QualityData { Id = 2, Name = "Epic", Comment = "Epic Quality", Icon = "icon_03.png" },
        new QualityData { Id = 3, Name = "Super", Comment = "Legendary Quality", Icon = "icon_04.png" }
    };

    public static QualityData GetData(this Quality quality)
    {
        return _data[(int)quality];
    }
}

public class QualityData
{
    public int Id;
    public string Name;
    public string Comment;
    public string Icon;
}
```

## Cas d'utilisation

- Définitions de qualité d'objets
- Définitions d'état de personnages
- Définitions de types d'événements
- Tout scénario nécessitant des énumérations avec des données supplémentaires attachées
