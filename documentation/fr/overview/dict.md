# Table Dict

Dict est la forme de configuration la plus courante. S'il n'y a pas de marqueur de type spécial, elle est traitée comme type Dict par défaut. Dict utilise une chaîne comme clé primaire, adaptée aux données nécessitant un accès par nom.

## Conventions

- **La première colonne est traitée comme clé primaire**
- **Type Dict par défaut, aucun marquage explicite requis**
- **Peut utiliser le marqueur `@dict` pour une déclaration explicite**
- **Le nom généré par défaut est le nom du fichier, peut être spécifié via `@dict Nom`**

## Méthode de marquage

Par défaut, aucun marquage n'est requis, la première colonne est automatiquement reconnue comme clé primaire chaîne :

| quality_key | item_icon | display_color |
|-------------|-----------|---------------|
| string | string | string |
| common | item_01.png | #FFFFFF |
| rare | item_02.png | #00FFFF |
| epic | item_03.png | #FF00FF |

Vous pouvez également utiliser explicitement le marqueur `@dict` dans la première ligne, première colonne :

| @dict | item_icon | display_color |
|-------|-----------|---------------|
| quality_key | string | string |
| common | item_01.png | #FFFFFF |
| rare | item_02.png | #00FFFF |
| epic | item_03.png | #FF00FF |

## Génération de code

### TypeScript (Cocos, Laya)

```typescript
export class ItemQuality {
    public qualityKey: string;
    public itemIcon: string;
    public displayColor: string;
}

export class ItemQualityTable {
    private _items: Map<string, ItemQuality>;
}
```

### C# (Unity, Godot)

```csharp
public class ItemQuality
{
    public string QualityKey;
    public string ItemIcon;
    public string DisplayColor;
}

public class ItemQualityTable
{
    private Dictionary<string, ItemQuality> _items;
}
```

## Cas d'utilisation

Configuration de qualité, configuration d'interface utilisateur, configuration d'effets sonores et autres données nécessitant un accès par nom.
