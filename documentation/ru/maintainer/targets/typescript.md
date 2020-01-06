# Интеграция с TypeScript/JavaScript

> ✅ **Доступно**: Генератор кода TypeScript в настоящее время доступен, поддерживает генерацию интерфейсов и определений типов TypeScript.

XCell поддерживает генерацию кода TypeScript и JavaScript для фронтенд и бэкенд приложений.

## Маппинг типов

| Тип XCell | Тип TypeScript | Описание |
| ---------- | --------------- | ----------- |
| `bool` | `boolean` | Логическое значение |
| `i8` | `number` | 8-битное знаковое целое |
| `i16` | `number` | 16-битное знаковое целое |
| `i32` | `number` | 32-битное знаковое целое |
| `i64` | `number` | 64-битное знаковое целое |
| `u8` | `number` | 8-битное беззнаковое целое |
| `u16` | `number` | 16-битное беззнаковое целое |
| `u32` | `number` | 32-битное беззнаковое целое |
| `u64` | `number` | 64-битное беззнаковое целое |
| `f32` | `number` | 32-битное число с плавающей точкой |
| `f64` | `number` | 64-битное число с плавающей точкой |
| `string` | `string` | Строка |
| `array<T>` | `T[]` | Массив |
| `list<T>` | `T[]` | Список |
| `map<K, V>` | `Record<K, V>` | Отображение |
| `enum` | `string` | Перечисление (строковая форма) |
| `struct` | `interface` | Структура |
| `color` | `string` | Цвет (шестнадцатеричный) |
| `vec2` | `{ x: number, y: number }` | 2D-вектор |
| `vec3` | `{ x: number, y: number, z: number }` | 3D-вектор |
| `vec4` | `{ x: number, y: number, z: number, w: number }` | 4D-вектор |

## Поддерживаемые форматы

- **TypeScript + JSON**: Генерация интерфейсов TypeScript и файлов данных JSON ✅
- **TypeScript + CSV**: Генерация интерфейсов TypeScript и файлов данных CSV
- **JavaScript + JSON**: Генерация кода JavaScript и файлов данных JSON
- **JavaScript + CSV**: Генерация кода JavaScript и файлов данных CSV

## Параметры конфигурации

В файле `ProjectSettings.toml` конфигурация интеграции TypeScript расположена в секции `[typescript]`:

```toml
[typescript]
enable = true
output = "src/generated"           # Директория вывода кода TypeScript
namespace = "DataTable.Generated"   # Пространство имён
manager_name = "DataTableManager"  # Имя класса менеджера
suffix_table = "Table"             # Суффикс класса таблицы
suffix_element = "Element"         # Суффикс класса элемента

# Конфигурация вывода данных JSON
[typescript.json]
enable = true
output = "data/generated"          # Директория вывода данных JSON
```

## Шаги интеграции

1. **Настройка экспорта TypeScript**: Включите экспорт в формате TypeScript в конфигурации XCell
2. **Генерация кода**: Используйте XCell для генерации кода TypeScript/JavaScript и файлов данных
3. **Импорт кода**: Импортируйте сгенерированный код и данные в проект
4. **Использование данных**: Используйте сгенерированные данные и типы в приложении

## Пример кода TypeScript

### Сгенерированные определения типов

```typescript
// Player.ts
export interface Player {
  id: number;
  name: string;
  level: number;
  gold: number;
  is_active: boolean;
}

// Item.ts
export interface Item {
  id: number;
  name: string;
  damage: number;
  price: number;
}

// DataTableManager.ts
import { Player } from './Player';
import { Item } from './Item';

export class DataTableManager {
  private _player: Player[] | null = null;
  private _item: Item[] | null = null;

  public get player(): Player[] {
    if (!this._player) {
      throw new Error('Данные Player не загружены');
    }
    return this._player;
  }

  public get item(): Item[] {
    if (!this._item) {
      throw new Error('Данные Item не загружены');
    }
    return this._item;
  }

  public async loadAll(): Promise<void> {
    this._player = await this.loadJson<Player[]>('data/generated/Player.json');
    this._item = await this.loadJson<Item[]>('data/generated/Item.json');
  }

  private async loadJson<T>(path: string): Promise<T> {
    const response = await fetch(path);
    return response.json();
  }
}
```

### Использование сгенерированного кода

```typescript
import { DataTableManager } from './generated/DataTableManager';

async function main() {
  const manager = new DataTableManager();
  await manager.loadAll();

  // Использование данных
  const player = manager.player[0];
  console.log(`Имя игрока: ${player.name}`);
  console.log(`Уровень игрока: ${player.level}`);

  // Поиск конкретных данных
  const item = manager.item.find(i => i.id === 1);
  if (item) {
    console.log(`Предмет: ${item.name}, Цена: ${item.price}`);
  }
}

main().catch(console.error);
```

## Методы загрузки данных

### Использование fetch для загрузки (браузерная среда)

```typescript
async function loadJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Не удалось загрузить ${path}: ${response.statusText}`);
  }
  return response.json();
}
```

### Использование fs для загрузки (среда Node.js)

```typescript
import fs from 'fs';
import path from 'path';

function loadJson<T>(filePath: string): T {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}
```

### Использование динамического импорта (сборщики)

```typescript
// Использование динамического импорта Vite/Webpack
const playerData = await import('./data/generated/Player.json');
```

## Примечания

- Тип number в TypeScript унифицирован как `number`, что может привести к потере точности
- Сгенерированные интерфейсы можно напрямую использовать для проверки типов и подсказок кода
- Можно настроить генерацию разных стилей кода (ES modules, CommonJS и др.)
- Для больших проектов рекомендуется использовать разделение кода для оптимизации производительности загрузки

## Лучшие практики

1. **Безопасность типов**: Используйте сгенерированные интерфейсы для проверки типов, чтобы избежать ошибок во время выполнения
2. **Ленивая загрузка**: Загружайте данные по требованию для уменьшения времени начальной загрузки
3. **Кэширование**: Кэшируйте загруженные данные, чтобы избежать повторных запросов
4. **Обработка ошибок**: Добавьте соответствующую обработку ошибок для случаев сбоя загрузки

## Пример проекта

XCell предоставляет пример проекта TypeScript, демонстрирующий использование XCell в реальных проектах:

- Базовое использование конфигурационных таблиц
- Сложные структуры данных
- Поддержка многоязычности
- Интеграция фронтенда и бэкенда

Через пример проекта вы можете быстро освоить лучшие практики XCell в TypeScript.
