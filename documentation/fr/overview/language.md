# Table Language

Les tables de langue sont utilisées pour gérer le texte multilingue. XCell fournit un support complet d'internationalisation.

## Conventions

- **La première ligne, première colonne est le marqueur `@language`**
- **Champ `@group` facultatif pour le regroupement**
- **Les colonnes restantes sont les identifiants de langue**
- **Le nom généré par défaut est le nom du fichier, peut être spécifié via `@language Nom`**

## Méthode de marquage

Utilisez le marqueur `@language` dans la première ligne, première colonne, `@group` facultatif, les colonnes restantes sont les identifiants de langue :

| @language | @group | zh_cn | en_us | ja_jp |
|-----------|--------|-------|-------|-------|
| Ui_Start | ui | Start | Start | スタート |
| Ui_Settings | ui | Settings | Settings | 設定 |
| Ui_Exit | ui | Exit | Exit | 終了 |

## Génération de code

### TypeScript (Cocos, Laya)

```typescript
export class LanguageTable {
    private static _items: Map<string, string>;

    public static get(key: string): string {
        return this._items.get(key) ?? key;
    }
}
```

### C# (Unity, Godot)

```csharp
public static class LanguageTable
{
    private static Dictionary<string, string> _items;

    public static string Get(string key)
    {
        return _items.TryGetValue(key, out var value) ? value : key;
    }
}
```

## Cas d'utilisation

- Support multilingue de l'interface utilisateur de jeu
- Internationalisation d'applications
- Systèmes de documentation multilingue
- Tout projet nécessitant un support multilingue
