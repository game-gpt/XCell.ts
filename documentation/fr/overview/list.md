# Table List

List est une forme de configuration qui utilise un ID entier comme clé primaire, adaptée aux données nécessitant un accès séquentiel ou par ID numérique.

## Conventions

- **La première colonne est traitée comme clé primaire**
- **Utilisez le marqueur `@list` pour déclarer explicitement le type List**
- **Le nom généré par défaut est le nom du fichier, peut être spécifié via `@list Nom`**

## Structure de stockage

Les tables List sont stockées sous forme de **tableau**, avec une performance find_key de **O(log n)**.

> ⚠️ Si le programme n'a pas d'exigences particulières, il est recommandé d'utiliser la table dict par défaut.

## Méthode de marquage

Utilisez le marqueur `@list` dans la première ligne, première colonne :

| @list | monster_name | hit_points | attack_damage |
|-------|--------------|------------|---------------|
| id | string | f32 | i32 |
| 1 | Slime | 50 | 5 |
| 2 | Goblin | 80 | 10 |
| 3 | Skeleton | 100 | 15 |

## Génération de code

### TypeScript (Cocos, Laya)

```typescript
export class Monster {
    public id: number;
    public monsterName: string;
    public hitPoints: number;
    public attackDamage: number;
}

export class MonsterTable {
    private _items: Monster[];
}
```

### C# (Unity, Godot)

```csharp
public class Monster
{
    public int Id;
    public string MonsterName;
    public float HitPoints;
    public float AttackDamage;
}

public class MonsterTable
{
    private Monster[] _items;
}
```

## Cas d'utilisation

Configuration de monstres, configuration d'objets, configuration de compétences et autres données nécessitant un accès séquentiel ou par ID numérique.
