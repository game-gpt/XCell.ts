# SQL 통합

> ⚠️ **개발 중**: SQL 코드 생성기는 현재 개발 중이며 기능이 불완전할 수 있습니다.

XCell은 설정 테이블을 SQL 형식으로 내보내는 것을 지원하여 데이터베이스 초기화 및 데이터 마이그레이션에 사용할 수 있습니다.

## 현재 상태

SQL 코드 생성기(`sql`)는 현재 개발 중이며, 기본 SQL 생성 기능을 지원합니다.

## 타입 매핑

| XCell 타입 | SQL 타입 | 설명 |
| ----------- | -------- | ---- |
| `bool` | `BOOLEAN` | 불리언 값 |
| `i8` | `TINYINT` | 8비트 부호 있는 정수 |
| `i16` | `SMALLINT` | 16비트 부호 있는 정수 |
| `i32` | `INT` | 32비트 부호 있는 정수 |
| `i64` | `BIGINT` | 64비트 부호 있는 정수 |
| `u8` | `TINYINT UNSIGNED` | 8비트 부호 없는 정수 |
| `u16` | `SMALLINT UNSIGNED` | 16비트 부호 없는 정수 |
| `u32` | `INT UNSIGNED` | 32비트 부호 없는 정수 |
| `u64` | `BIGINT UNSIGNED` | 64비트 부호 없는 정수 |
| `f32` | `FLOAT` | 32비트 부동소수점 |
| `f64` | `DOUBLE` | 64비트 부동소수점 |
| `string` | `VARCHAR(n)` | 가변 길이 문자열 |
| `text` | `TEXT` | 긴 텍스트 |
| `array<T>` | `JSON` | JSON 배열 |
| `map<K, V>` | `JSON` | JSON 객체 |
| `enum` | `VARCHAR(64)` | 열거형 이름 |

## 지원되는 데이터베이스

| 데이터베이스 | 상태 | 설명 |
| ------------ | ---- | ---- |
| MySQL | ✅ 지원 | MySQL 5.7+ 지원 |
| PostgreSQL | ⚠️ 개발 중 | 지원 예정 |
| SQLite | ⚠️ 개발 중 | 지원 예정 |
| SQL Server | 계획 중 | 향후 지원 예정 |

## 설정 옵션

`ProjectSettings.toml` 파일에서 SQL 통합 설정은 `[sql]` 섹션에 위치합니다:

```toml
[sql]
enable = true
output = "output/sql"             # SQL 파일 출력 디렉토리
database = "mysql"                # 데이터베이스 타입
schema_name = "game_data"         # 데이터베이스 이름
create_table = true               # CREATE TABLE 문 생성 여부
insert_data = true                # INSERT 문 생성 여부
drop_table = false                # DROP TABLE 문 생성 여부
```

## 출력 형식

### 테이블 생성 문

```sql
-- Item 테이블
CREATE TABLE IF NOT EXISTS `item` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `damage` INT DEFAULT 0,
  `price` INT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 삽입 문

```sql
-- Item 데이터
INSERT INTO `item` (`id`, `name`, `damage`, `price`, `is_active`) VALUES
  (1, 'Sword', 100, 500, TRUE),
  (2, 'Shield', 0, 300, TRUE),
  (3, 'Potion', 0, 50, TRUE);
```

### 완전한 예제

```sql
-- ============================================
-- XCell Generated SQL
-- Database: game_data
-- Generated at: 2024-01-01 00:00:00
-- ============================================

-- Player 테이블
CREATE TABLE IF NOT EXISTS `player` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `level` INT DEFAULT 1,
  `gold` BIGINT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Player 데이터
INSERT INTO `player` (`id`, `name`, `level`, `gold`, `is_active`) VALUES
  (1, 'Alice', 10, 1000, TRUE),
  (2, 'Bob', 5, 500, TRUE);

-- Item 테이블
CREATE TABLE IF NOT EXISTS `item` (
  `id` INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `damage` INT DEFAULT 0,
  `price` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Item 데이터
INSERT INTO `item` (`id`, `name`, `damage`, `price`) VALUES
  (1, 'Sword', 100, 500),
  (2, 'Shield', 0, 300);
```

## 사용 사례

### 데이터베이스 초기화

생성된 SQL 파일을 사용하여 데이터베이스를 초기화합니다:

```bash
mysql -u root -p game_data < output/sql/init.sql
```

### 데이터 마이그레이션

SQL 파일을 사용하여 데이터를 마이그레이션합니다:

```bash
# 데이터 내보내기
mysqldump -u root -p game_data > backup.sql

# 데이터 가져오기
mysql -u root -p game_data < output/sql/init.sql
```

### 버전 관리

SQL 파일을 버전 관리에 포함하여 데이터 변경 이력을 추적합니다.

## 주의 사항

### 문자열 길이

SQL의 `VARCHAR` 타입은 길이를 지정해야 합니다. XCell은 데이터를 기반으로 적절한 길이를 자동으로 추론하거나, 설정에서 기본 길이를 지정할 수 있습니다.

### 기본 키 제약 조건

XCell은 기본 키 필드를 자동으로 식별하고 `PRIMARY KEY` 제약 조건을 추가합니다.

### 인덱스

현재 버전은 인덱스를 자동으로 생성하지 않습니다. 인덱스가 필요한 경우 수동으로 추가하거나 데이터베이스 관리 도구를 사용하세요.

### 트랜잭션

대용량 데이터 삽입의 경우 트랜잭션으로 래핑하는 것이 좋습니다:

```sql
START TRANSACTION;
INSERT INTO `item` (`id`, `name`) VALUES (1, 'Sword');
INSERT INTO `item` (`id`, `name`) VALUES (2, 'Shield');
COMMIT;
```

## 모범 사례

1. **데이터 백업**: SQL 파일을 실행하기 전에 기존 데이터를 백업했는지 확인
2. **테스트 환경**: 테스트 환경에서 먼저 SQL 파일을 검증
3. **버전 관리**: SQL 파일을 버전 관리에 포함
4. **증분 업데이트**: 프로덕션 환경에서는 전체 덮어쓰기보다 증분 업데이트를 권장

## 향후 계획

- PostgreSQL 및 SQLite 지원
- 증분 업데이트 문 생성 지원
- 자동 인덱스 생성 지원
- 외래 키 제약 조건 지원
- 저장 프로시저 생성 지원
