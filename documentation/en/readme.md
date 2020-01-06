
# Quick Start

This tutorial will guide you through using the XCell configuration table management tool from scratch.

## Environment Setup

### System Requirements

- Windows operating system
- Rust development environment (if compiling from source)

### Installation Methods

#### Method 1: Use Pre-compiled Version

1. Download the latest `xcell.exe` from the project release page
2. Place `xcell.exe` in your project directory

#### Method 2: Compile from Source

1. Ensure Rust development environment is installed
2. Clone or download the project source code
3. Run the following command in the project root directory:

```bash
cargo build --release
```

4. After compilation, the executable is located at `target/release/xcell.exe`

## Project Initialization

### Create Project Structure

Create the following structure in your working directory:

```
MyProject/
├── xcell.exe
├── ProjectConfig.toml
└── Tables/
    └── Hero.xlsx
```

### Create Configuration File

Create a `ProjectConfig.toml` file in the project root directory:

```toml
version = "0.1.0"

exclude = ""
include = "*.xlsx"

line.field = 1
line.type = 2
line.comment = 3
line.data = 4

[type.bool]
accept = ["true", "√"]
reject = ["false", "x"]

[type.string]

[unity]
enable = true
project = "./"
output = "Assets/Scripts/DataTable/Generated"
namespace = "DataTable.Generated"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"
support_clone = true
legacy_using = false
legacy_null_null = false

[unity.binary]
enable = true
output = "Assets/Tables/Generated"

[unity.xlua]
enable = false

[unity.xml]
enable = false
output = "Assets/Tables/Readable"

[unity.json]
enable = false
output = "Assets/Tables/Readable"

[unity.protobuf]
enable = false
```

## Create Your First Configuration Table

### Excel Table Structure

XCell uses a specific Excel table structure, with the first 3 rows as headers, and data starting from row 4:

| Row Number | Purpose | Description |
|------------|---------|-------------|
| 1 | Field Name | Field names for the configuration table |
| 2 | Data Type | Data types for the fields |
| 3 | Comment | Description text for the fields |
| 4+ | Data Rows | Actual configuration data |

### Example Table

Create a `Tables/Hero.xlsx` table:

| id | name | hp | attack | is_boss |
|----|------|----|--------|---------|
| int | string | int | int | bool |
| Hero ID | Hero Name | Health Points | Attack Power | Is Boss |
| 1 | Knight | 1000 | 100 | false |
| 2 | Mage | 800 | 150 | false |
| 3 | Dragon | 5000 | 500 | true |

## Run XCell

### Basic Command

Open a command line in the project root directory and run:

```bash
xcell.exe
```

XCell will automatically:
1. Scan all Excel tables in the current directory
2. Validate table data
3. Generate corresponding C# code and binary data files

### Command Line Options

```bash
xcell.exe [OPTIONS] [COMMAND]
```

#### Commands

- `check`: Check configuration tables without exporting any files
- `clear`: Clear database and cache

#### Options

- `--workspace <WORKSPACE>`: Manually set working directory, defaults to current directory if not specified
- `-w, --watch`: Enable watch mode, only update corresponding files when modifications are detected
- `--disable-xml`: Force disable XML generation
- `--disable-json`: Force disable JSON generation
- `-h, --help`: Display help
- `-V, --version`: Display version

### Usage Examples

#### Check Configuration Tables

```bash
xcell.exe check
```

#### Enable Watch Mode

```bash
xcell.exe --watch
```

#### Clear Cache

```bash
xcell.exe clear
```

## View Generated Results

After successful execution, you will see the following generated files:

```
MyProject/
├── Assets/
│   ├── Scripts/DataTable/Generated/
│   │   ├── HeroTable.cs
│   │   └── DataTableManager.cs
│   └── Tables/Generated/
│       └── HeroTable.bytes
```

### Generated C# Code Example

`HeroTable.cs` will contain content similar to:

```csharp
namespace DataTable.Generated
{
    public partial class HeroTable
    {
        public readonly Dictionary<int, HeroElement> dict = new();

        public HeroElement GetElement(int id)
        {
            return dict.TryGetValue(id, out var item) ? item : null;
        }
    }

    public partial class HeroElement
    {
        public int id;
        public string name;
        public int hp;
        public int attack;
        public bool is_boss;
    }
}
```

## Next Steps

- Check [Use Cases Index](use-cases/index.md) for more specific applications
- Unity users can refer to the [Unity Integration](use-cases/unity-integration.md) documentation
