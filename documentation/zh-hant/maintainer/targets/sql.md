# SQL 集成

> ⚠️ **開發中**：SQL 程式碼產生器當前處於開發中狀態，功能可能不完整。

XCell 支援將設定資料表匯出為 SQL 格式，用於資料庫初始化和資料迁移。

## 當前狀態

SQL 程式碼產生器 (`sql`) 當前處於開發中狀態，支援基本的 SQL 生成功能。

## 類型對應

| XCell 類型 | SQL 類型 | 說明 |
|-----------|---------|------|
| `bool` | `BOOLEAN` | 布爾值 |
| `i8` | `TINYINT` | 8位有符號整數 |
| `i16` | `SMALLINT` | 16位有符號整數 |
| `i32` | `INT` | 32位有符號整數 |
| `i64` | `BIGINT` | 64位有符號整數 |
| `u8` | `TINYINT UNSIGNED` | 8位无符號整數 |
| `u16` | `SMALLINT UNSIGNED` | 16位无符號整數 |
| `u32` | `INT UNSIGNED` | 32位无符號整數 |
| `u64` | `BIGINT UNSIGNED` | 64位无符號整數 |
| `f32` | `FLOAT` | 32位浮點數 |
| `f64` | `DOUBLE` | 64位浮點數 |
| `string` | `VARCHAR(n)` | 可變长度字串 |
| `text` | `TEXT` | 长文本 |
| `array<T>` | `JSON` | JSON 陣列 |
| `map<K, V>` | `JSON` | JSON 物件 |
| `enum` | `VARCHAR(64)` | 列舉名稱 |

## 支援的資料庫

| 資料庫 | 狀態 | 說明 |
|--------|------|------|
| MySQL | ✅ 支援 | 支援 MySQL 5.7+ |
| PostgreSQL | ⚠️ 開發中 | 計劃支援 |
| SQLite | ⚠️ 開發中 | 計劃支援 |
| SQL Server | 計劃中 | 未来支援 |

## 設定選項

在 `ProjectSettings.toml` 檔案中，SQL 集成設定位於 `[sql]` 部分：

```toml
[sql]
enable = true
output = "output/sql"             # SQL 檔案輸出目錄
database = "mysql"                # 資料庫類型
schema_name = "game_data"         # 資料庫名稱
create_table = true               # 是否生成 CREATE TABLE 陳述式
insert_data = true                # 是否生成 INSERT 陳述式
drop_table = false                # 是否生成 DROP TABLE 陳述式
```

## 輸出格式

### 建資料表陳述式

```sql
-- Item 資料表
CREATE TABLE IF NOT EXISTS `item` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `damage` INT DEFAULT 0,
  `price` INT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 插入陳述式

```sql
-- Item 資料
INSERT INTO `item` (`id`, `name`, `damage`, `price`, `is_active`) VALUES
  (1, 'Sword', 100, 500, TRUE),
  (2, 'Shield', 0, 300, TRUE),
  (3, 'Potion', 0, 50, TRUE);
```

### 完整範例

```sql
-- ============================================
-- XCell Generated SQL
-- Database: game_data
-- Generated at: 2024-01-01 00:00:00
-- ============================================

-- Player 資料表
CREATE TABLE IF NOT EXISTS `player` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `level` INT DEFAULT 1,
  `gold` BIGINT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Player 資料
INSERT INTO `player` (`id`, `name`, `level`, `gold`, `is_active`) VALUES
  (1, 'Alice', 10, 1000, TRUE),
  (2, 'Bob', 5, 500, TRUE);

-- Item 資料表
CREATE TABLE IF NOT EXISTS `item` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `damage` INT DEFAULT 0,
  `price` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Item 資料
INSERT INTO `item` (`id`, `name`, `damage`, `price`) VALUES
  (1, 'Sword', 100, 500),
  (2, 'Shield', 0, 300);
```

## 使用場景

### 資料庫初始化

將生成的 SQL 檔案用於資料庫初始化：

```bash
mysql -u root -p game_data < output/sql/init.sql
```

### 資料迁移

使用 SQL 檔案進行資料迁移：

```bash
# 匯出資料
mysqldump -u root -p game_data > backup.sql

# 匯入資料
mysql -u root -p game_data < output/sql/init.sql
```

### 版本控制

將 SQL 檔案纳入版本控制，追踪資料變更歷史。

## 注意事项

### 字串长度

SQL 中的 `VARCHAR` 類型需要指定长度，XCell 會根据資料自動推断合适的长度，也可以在設定中指定預設长度。

### 主鍵约束

XCell 會自動識別主鍵欄位並新增 `PRIMARY KEY` 约束。

### 索引

當前版本不自動生成索引，如需索引请手動新增或使用資料庫管理工具。

### 交易

對於大量資料插入，建議使用交易包裝：

```sql
START TRANSACTION;
INSERT INTO `item` (`id`, `name`) VALUES (1, 'Sword');
INSERT INTO `item` (`id`, `name`) VALUES (2, 'Shield');
COMMIT;
```

## 最佳做法

1. **備份資料**：在執行 SQL 檔案前，確保已備份現有資料
2. **測試環境**：先在測試環境驗證 SQL 檔案的正确性
3. **版本控制**：將 SQL 檔案纳入版本控制
4. **增量更新**：對於生產環境，建議使用增量更新而非全量覆盖

## 未来計劃

- 支援 PostgreSQL 和 SQLite
- 支援增量更新陳述式生成
- 支援索引自動生成
- 支援外鍵约束
- 支援預存程式生成
