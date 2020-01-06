# SQL 統合

> ⚠️ **開発中**：SQL コードジェネレーターは現在開発中で、機能が不完全な可能性があります。

XCell は設定テーブルを SQL フォーマットでエクスポートすることをサポートし、データベースの初期化とデータ移行に使用します。

## 現在の状態

SQL コードジェネレーター（`sql`）は現在開発中で、基本的な SQL 生成機能をサポートしています。

## 型マッピング

| XCell 型 | SQL 型 | 説明 |
|-----------|---------|------|
| `bool` | `BOOLEAN` | ブール値 |
| `i8` | `TINYINT` | 8ビット符号付き整数 |
| `i16` | `SMALLINT` | 16ビット符号付き整数 |
| `i32` | `INT` | 32ビット符号付き整数 |
| `i64` | `BIGINT` | 64ビット符号付き整数 |
| `u8` | `TINYINT UNSIGNED` | 8ビット符号なし整数 |
| `u16` | `SMALLINT UNSIGNED` | 16ビット符号なし整数 |
| `u32` | `INT UNSIGNED` | 32ビット符号なし整数 |
| `u64` | `BIGINT UNSIGNED` | 64ビット符号なし整数 |
| `f32` | `FLOAT` | 32ビット浮動小数点数 |
| `f64` | `DOUBLE` | 64ビット浮動小数点数 |
| `string` | `VARCHAR(n)` | 可変長文字列 |
| `text` | `TEXT` | 長いテキスト |
| `array<T>` | `JSON` | JSON 配列 |
| `map<K, V>` | `JSON` | JSON オブジェクト |
| `enum` | `VARCHAR(64)` | 列挙名 |

## サポートされるデータベース

| データベース | 状態 | 説明 |
|--------|------|------|
| MySQL | ✅ サポート | MySQL 5.7+ をサポート |
| PostgreSQL | ⚠️ 開発中 | サポート予定 |
| SQLite | ⚠️ 開発中 | サポート予定 |
| SQL Server | 計画中 | 将来的にサポート |

## 設定オプション

`ProjectSettings.toml` ファイルで、SQL 統合設定は `[sql]` セクションにあります：

```toml
[sql]
enable = true
output = "output/sql"             # SQL ファイル出力ディレクトリ
database = "mysql"                # データベースタイプ
schema_name = "game_data"         # データベース名
create_table = true               # CREATE TABLE 文を生成するかどうか
insert_data = true                # INSERT 文を生成するかどうか
drop_table = false                # DROP TABLE 文を生成するかどうか
```

## 出力フォーマット

### テーブル作成文

```sql
-- Item テーブル
CREATE TABLE IF NOT EXISTS `item` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `damage` INT DEFAULT 0,
  `price` INT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 挿入文

```sql
-- Item データ
INSERT INTO `item` (`id`, `name`, `damage`, `price`, `is_active`) VALUES
  (1, 'Sword', 100, 500, TRUE),
  (2, 'Shield', 0, 300, TRUE),
  (3, 'Potion', 0, 50, TRUE);
```

### 完全な例

```sql
-- ============================================
-- XCell Generated SQL
-- Database: game_data
-- Generated at: 2024-01-01 00:00:00
-- ============================================

-- Player テーブル
CREATE TABLE IF NOT EXISTS `player` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `level` INT DEFAULT 1,
  `gold` BIGINT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Player データ
INSERT INTO `player` (`id`, `name`, `level`, `gold`, `is_active`) VALUES
  (1, 'Alice', 10, 1000, TRUE),
  (2, 'Bob', 5, 500, TRUE);

-- Item テーブル
CREATE TABLE IF NOT EXISTS `item` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `damage` INT DEFAULT 0,
  `price` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Item データ
INSERT INTO `item` (`id`, `name`, `damage`, `price`) VALUES
  (1, 'Sword', 100, 500),
  (2, 'Shield', 0, 300);
```

## 使用シーン

### データベース初期化

生成された SQL ファイルをデータベースの初期化に使用：

```bash
mysql -u root -p game_data < output/sql/init.sql
```

### データ移行

SQL ファイルを使用してデータ移行：

```bash
# データのエクスポート
mysqldump -u root -p game_data > backup.sql

# データのインポート
mysql -u root -p game_data < output/sql/init.sql
```

### バージョン管理

SQL ファイルをバージョン管理に含め、データ変更履歴を追跡します。

## 注意事項

### 文字列長

SQL の `VARCHAR` 型は長さを指定する必要があります。XCell はデータに基づいて適切な長さを自動的に推測します。また、設定でデフォルトの長さを指定することもできます。

### 主キー制約

XCell は主キーフィールドを自動的に識別し、`PRIMARY KEY` 制約を追加します。

### インデックス

現在のバージョンではインデックスは自動生成されません。インデックスが必要な場合は、手動で追加するか、データベース管理ツールを使用してください。

### トランザクション

大量のデータ挿入の場合、トランザクションでラップすることを推奨します：

```sql
START TRANSACTION;
INSERT INTO `item` (`id`, `name`) VALUES (1, 'Sword');
INSERT INTO `item` (`id`, `name`) VALUES (2, 'Shield');
COMMIT;
```

## ベストプラクティス

1. **データのバックアップ**：SQL ファイルを実行する前に、既存のデータをバックアップ
2. **テスト環境**：まずテスト環境で SQL ファイルの正確性を検証
3. **バージョン管理**：SQL ファイルをバージョン管理に含める
4. **増分更新**：本番環境では、全量上書きではなく増分更新を推奨

## 将来の計画

- PostgreSQL と SQLite のサポート
- 増分更新ステートメント生成のサポート
- インデックス自動生成のサポート
- 外部キー制約のサポート
- ストアドプロシージャ生成のサポート
