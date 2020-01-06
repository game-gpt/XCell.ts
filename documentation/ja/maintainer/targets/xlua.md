# XLua 統合

XLua は Unity でよく使用される Lua スクリプトソリューションで、XCell は XLua との統合サポートを提供しています。

## 型マッピング

| XCell 型 | XLua 型 | 説明 |
|-----------|-----------|------|
| `i8` | `number` | 8ビット符号付き整数 |
| `i16` | `number` | 16ビット符号付き整数 |
| `i32` | `number` | 32ビット符号付き整数 |
| `i64` | `number` | 64ビット符号付き整数 |
| `u8` | `number` | 8ビット符号なし整数 |
| `u16` | `number` | 16ビット符号なし整数 |
| `u32` | `number` | 32ビット符号なし整数 |
| `u64` | `number` | 64ビット符号なし整数 |
| `f32` | `number` | 32ビット浮動小数点数 |
| `f64` | `number` | 64ビット浮動小数点数 |
| `bool` | `boolean` | ブール値 |
| `string` | `string` | 文字列 |
| `array<T>` | `table` | 配列 |
| `map<K, V>` | `table` | マッピング |
| `enum` | `number` | 列挙 |
| `struct` | `table` | 構造体 |

## 統合手順

1. **XLua のインストール**：Unity プロジェクトに XLua プラグインをインストール
2. **XCell の設定**：プロジェクト設定で XLua コード生成を有効化
3. **コードの生成**：XCell を使用して XLua 互換のコードを生成
4. **データの読み込み**：Lua スクリプトで生成されたデータを読み込み

## サンプルコード

```lua
-- 設定データの読み込み
local config = require("ConfigManager")

-- 設定にアクセス
local playerConfig = config.Player[1]
print("Player name: " .. playerConfig.name)
print("Player level: " .. playerConfig.level)
```

## 注意事項

- XLua の数値型は `number` に統一されるため、精度損失が発生する可能性があります
- 複雑なデータ構造は Lua table に変換されます
- より良いパフォーマンスのために LuaJIT の使用を推奨
