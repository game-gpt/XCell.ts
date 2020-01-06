# SQL 集成

> ⚠️ **开发中**：SQL 代码生成器当前处于开发中状态，功能可能不完整。

XCell 支持将配置表导出为 SQL 格式，用于数据库初始化和数据迁移。

## 当前状态

SQL 代码生成器 (`sql`) 当前处于开发中状态，支持基本的 SQL 生成功能。

## 类型映射

| XCell 类型 | SQL 类型 | 说明 |
|-----------|---------|------|
| `bool` | `BOOLEAN` | 布尔值 |
| `i8` | `TINYINT` | 8位有符号整数 |
| `i16` | `SMALLINT` | 16位有符号整数 |
| `i32` | `INT` | 32位有符号整数 |
| `i64` | `BIGINT` | 64位有符号整数 |
| `u8` | `TINYINT UNSIGNED` | 8位无符号整数 |
| `u16` | `SMALLINT UNSIGNED` | 16位无符号整数 |
| `u32` | `INT UNSIGNED` | 32位无符号整数 |
| `u64` | `BIGINT UNSIGNED` | 64位无符号整数 |
| `f32` | `FLOAT` | 32位浮点数 |
| `f64` | `DOUBLE` | 64位浮点数 |
| `string` | `VARCHAR(n)` | 可变长度字符串 |
| `text` | `TEXT` | 长文本 |
| `array<T>` | `JSON` | JSON 数组 |
| `map<K, V>` | `JSON` | JSON 对象 |
| `enum` | `VARCHAR(64)` | 枚举名称 |

## 支持的数据库

| 数据库 | 状态 | 说明 |
|--------|------|------|
| MySQL | ✅ 支持 | 支持 MySQL 5.7+ |
| PostgreSQL | ⚠️ 开发中 | 计划支持 |
| SQLite | ⚠️ 开发中 | 计划支持 |
| SQL Server | 计划中 | 未来支持 |

## 配置选项

在 `ProjectSettings.toml` 文件中，SQL 集成配置位于 `[sql]` 部分：

```toml
[sql]
enable = true
output = "output/sql"             # SQL 文件输出目录
database = "mysql"                # 数据库类型
schema_name = "game_data"         # 数据库名称
create_table = true               # 是否生成 CREATE TABLE 语句
insert_data = true                # 是否生成 INSERT 语句
drop_table = false                # 是否生成 DROP TABLE 语句
```

## 输出格式

### 建表语句

```sql
-- Item 表
CREATE TABLE IF NOT EXISTS `item` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `damage` INT DEFAULT 0,
  `price` INT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 插入语句

```sql
-- Item 数据
INSERT INTO `item` (`id`, `name`, `damage`, `price`, `is_active`) VALUES
  (1, 'Sword', 100, 500, TRUE),
  (2, 'Shield', 0, 300, TRUE),
  (3, 'Potion', 0, 50, TRUE);
```

### 完整示例

```sql
-- ============================================
-- XCell Generated SQL
-- Database: game_data
-- Generated at: 2024-01-01 00:00:00
-- ============================================

-- Player 表
CREATE TABLE IF NOT EXISTS `player` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `level` INT DEFAULT 1,
  `gold` BIGINT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Player 数据
INSERT INTO `player` (`id`, `name`, `level`, `gold`, `is_active`) VALUES
  (1, 'Alice', 10, 1000, TRUE),
  (2, 'Bob', 5, 500, TRUE);

-- Item 表
CREATE TABLE IF NOT EXISTS `item` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `damage` INT DEFAULT 0,
  `price` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Item 数据
INSERT INTO `item` (`id`, `name`, `damage`, `price`) VALUES
  (1, 'Sword', 100, 500),
  (2, 'Shield', 0, 300);
```

## 使用场景

### 数据库初始化

将生成的 SQL 文件用于数据库初始化：

```bash
mysql -u root -p game_data < output/sql/init.sql
```

### 数据迁移

使用 SQL 文件进行数据迁移：

```bash
# 导出数据
mysqldump -u root -p game_data > backup.sql

# 导入数据
mysql -u root -p game_data < output/sql/init.sql
```

### 版本控制

将 SQL 文件纳入版本控制，追踪数据变更历史。

## 注意事项

### 字符串长度

SQL 中的 `VARCHAR` 类型需要指定长度，XCell 会根据数据自动推断合适的长度，也可以在配置中指定默认长度。

### 主键约束

XCell 会自动识别主键字段并添加 `PRIMARY KEY` 约束。

### 索引

当前版本不自动生成索引，如需索引请手动添加或使用数据库管理工具。

### 事务

对于大量数据插入，建议使用事务包装：

```sql
START TRANSACTION;
INSERT INTO `item` (`id`, `name`) VALUES (1, 'Sword');
INSERT INTO `item` (`id`, `name`) VALUES (2, 'Shield');
COMMIT;
```

## 最佳实践

1. **备份数据**：在执行 SQL 文件前，确保已备份现有数据
2. **测试环境**：先在测试环境验证 SQL 文件的正确性
3. **版本控制**：将 SQL 文件纳入版本控制
4. **增量更新**：对于生产环境，建议使用增量更新而非全量覆盖

## 未来计划

- 支持 PostgreSQL 和 SQLite
- 支持增量更新语句生成
- 支持索引自动生成
- 支持外键约束
- 支持存储过程生成
