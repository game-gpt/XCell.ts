# React 統合

XCell は React フレームワークとの深い統合を提供し、TypeScript コード、JSON データファイルなど複数のフォーマットの生成をサポートしています。

## 設定オプション

`XCell.toml` ファイルで、React 統合設定は `[react]` セクションにあります：

```toml
[react]
enable = true
project = "../"
output = "src/data-table/generated"
namespace = "DataTable"
manager = "DataTableManager"
suffix_table = "Table"
suffix_element = "Element"

[react.json]
enable = true
output = "public/tables"

[react.graphql]
enable = false
output = "src/data-table/graphql"
```

## 生成されるコード構造

### テーブルクラス構造

各設定表は対応する TypeScript クラスを生成し、以下を含みます：
- テーブルデータクラス（Table）
- 要素データクラス（Element）
- マネージャークラス（Manager）
- React フック（Hooks）

### サンプル生成コード構造：

```typescript
// BuffTable.ts
export class BuffTable {
    private data: Map<number, BuffElement> = new Map();
    
    public get(id: number): BuffElement | undefined {
        return this.data.get(id);
    }
    
    public load(data: any[]): void {
        for (const item of data) {
            const element = new BuffElement();
            element.id = item.id;
            element.name = item.name;
            element.value = item.value;
            this.data.set(item.id, element);
        }
    }
}

// BuffElement.ts
export class BuffElement {
    public id: number = 0;
    public name: string = "";
    public value: number = 0;
    // ... その他のフィールド
}

// DataTableManager.ts
export class DataTableManager {
    public buffTable: BuffTable = new BuffTable();
    
    public async loadAll(): Promise<void> {
        // すべてのテーブルデータをロード
    }
}

// useDataTable.ts
export function useDataTable() {
    const [manager, setManager] = useState<DataTableManager | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadData = async () => {
            const newManager = new DataTableManager();
            await newManager.loadAll();
            setManager(newManager);
            setLoading(false);
        };
        
        loadData();
    }, []);
    
    return { manager, loading };
}
```

## データ読み込み

### React コンポーネントでの使用：

```typescript
import { useDataTable } from './data-table/generated/useDataTable';

function BuffList() {
    const { manager, loading } = useDataTable();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!manager) {
        return <div>Failed to load data</div>;
    }
    
    return (
        <div>
            <h1>Buff List</h1>
            {Array.from(manager.buffTable.data.values()).map(buff => (
                <div key={buff.id}>
                    <h2>{buff.name}</h2>
                    <p>Value: {buff.value}</p>
                </div>
            ))}
        </div>
    );
}
```

### サポートされる機能：
- 非同期読み込み
- 増分読み込み
- メモリ管理
- ホットアップデートサポート
- React フック統合

## 型マッピング

XCell 型から TypeScript 型へのマッピング：

| XCell 型 | TypeScript 型 |
|------------|----------------|
| bool | boolean |
| i8 | number |
| i16 | number |
| i32 | number |
| i64 | number |
| u8 | number |
| u16 | number |
| u32 | number |
| u64 | number |
| f32 | number |
| f64 | number |
| string | string |
| color | string (16進数) |
| vec2 | { x: number, y: number } |
| vec3 | { x: number, y: number, z: number } |
| vec4 | { x: number, y: number, z: number, w: number } |

## パフォーマンス最適化

### 大きなテーブルの処理最適化

1. **大きなテーブルを適切に分割**
   - 大きなテーブルを機能またはモジュールごとに分割
   - ビルド時に結合ルールを使用して結合
   - 開発時の保守性とランタイムのパフォーマンスを維持

2. **適切なデータフォーマットを使用**
   - 開発環境では JSON フォーマットを使用してデバッグを容易に
   - 本番環境では圧縮フォーマットの使用を検討して読み込み速度を向上

### 増分更新の最適化

1. **監視モード**
   監視モードを使用：
   ```bash
   xcell.exe --watch
   ```
   監視モードの特徴：
   - 変更されたファイルのみ再生成
   - 開発効率を大幅に向上
   - リアルタイムプレビューをサポート

2. **監視の適切な設定**
   適切な include/exclude パターンを設定し、監視ファイル数を削減。

### メモリ最適化

1. **必要な表のみ読み込み**
   ```typescript
   // 特定の表のみ読み込み
   await manager.buffTable.load();
   await manager.itemTable.load();
   ```

2. **適時アンロード**
   ```typescript
   // 不要な表をアンロード
   manager.buffTable.unload();
   ```

## よくある問題

### 生成されたコードのコンパイルエラー

- React プロジェクトパスが正しいか確認
- 名前空間がプロジェクト構造と一致するか確認
- すべての依存関係が正しくインストールされているか確認

### データ読み込み失敗

- JSON ファイルが生成されているか確認
- ファイルパスが正しいか確認
- テーブル構造とデータ型が一致しているか確認

## ベストプラクティス

1. **メタ表フォーマットを使用**：複雑な設定表にはメタ表フォーマットを推奨、より豊富なメタデータ定義をサポート
2. **表結合ルールを適切に使用**：大規模プロジェクトでは表結合ルールで複雑なテーブルを管理
3. **データ構造を最適化**：実際の使用シナリオに応じて適切なデータ型と構造を選択
4. **定期的にクリーンアップ**：不要な設定表とデータを定期的にクリーンアップし、プロジェクトを整潔に保つ
5. **React フックを使用**：生成された React フックでデータ読み込みと状態管理を簡素化

## サンプルプロジェクト

XCell は React サンプルプロジェクトを提供し、実際のプロジェクトで XCell を使用する方法を示しています：

- 基本的な設定表の使用
- 複雑なデータ構造
- 多言語サポート
- ホットアップデート統合
- React フックの使用

サンプルプロジェクトを通じて、React での XCell のベストプラクティスを素早く理解できます。
