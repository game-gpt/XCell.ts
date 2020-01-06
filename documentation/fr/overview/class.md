# Table Class

Les tables de type Class sont utilisées pour définir des classes de configuration globales, adaptées aux scénarios de configuration singleton.

## Conventions

- **La première ligne, première colonne est le marqueur `@class`**
- **Génère une classe singleton**
- **Le nom généré par défaut est le nom du fichier, peut être spécifié via `@class Nom`**

## Méthode de marquage

Utilisez le marqueur `@class` dans la première ligne, première colonne.

| @class      | @comment | @type  | @default |
| ----------- | -------- | ------ | -------- |
| max\_hp     | Vie maximale   | i32    | 100      |
| user\_name  | Nom du joueur  | string | Player   |
| move\_speed | Vitesse de déplacement   | f32    | 5.0      |

## Génération de code

### TypeScript (Cocos, Laya)

```typescript
export class GameConfig {
    public static maxHp: number = 100;
    public static userName: string = "Player";
    public static moveSpeed: number = 5.0;
}
```

### C# (Unity, Godot)

```csharp
public static class GameConfig
{
    public static int MaxHp = 100;
    public static string UserName = "Player";
    public static float MoveSpeed = 5.0f;
}
```

## Cas d'utilisation

- Configuration globale du jeu (par exemple, configuration de niveau, configuration de difficulté)
- Paramètres de l'application
- Configuration des paramètres système
