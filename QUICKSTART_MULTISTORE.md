# マルチストア クイックスタートガイド

同じShopifyバックエンドを使用して、複数の独立したECサイトを立ち上げる手順を説明します。

## 前提条件

- 既存のErgogainサイトが稼働している
- Shopify管理画面へのアクセス権限
- Node.js, npm, git がインストール済み

## 📝 概要

この設定により以下が実現できます：

✅ 1つのShopifyアカウントで複数サイト運営
✅ 顧客アカウントは全サイト共通（同じログイン情報）
✅ 商品管理も1つの管理画面
✅ 各サイトは独立したURL・デザイン
✅ 決済も共通

## ステップ1: Shopify管理画面での設定

### 1-1. Storefront API Token

**推奨: 既存のTokenを使い回す（簡単）**

既にErgogainサイトで使用している同じTokenを全サイトで使えばOKです！
```env
# 全サイトで同じTokenを使用
NEXT_PUBLIC_STOREFRONT_TOKEN=a85ff6bbd70e1e4a97dcb3ea8c0c6c58
```
- ✅ 設定が簡単
- ✅ 管理しやすい
- ✅ ほとんどの場合、これで十分

**オプション: サイト別にTokenを発行（高度な用途）**

サイト別の使用量追跡が必要な場合のみ：
```
1. Shopify管理画面 > 設定 > アプリと販売チャネル
2. Storefront API > "Create storefront"
3. 名前: "Site2 Frontend"
4. Tokenをコピー
```

### 1-2. 商品にタグを追加

既存のErgogain商品:
```
1. 商品 > すべての商品
2. Ergogain関連商品を選択
3. タグに "ergogain" を追加
4. 保存
```

新サイト用の商品:
```
1. 新しい商品を作成 or 既存商品を編集
2. タグに "site2" を追加
3. 保存
```

💡 **1つの商品に複数のタグを付けることで、複数サイトで販売可能**

例: タグ ["ergogain", "site2", "premium"] の商品は両サイトで表示される

### 1-3. コレクション作成（オプション）

タグ方式の代わりにコレクションでも管理可能:

```
1. 商品 > コレクション
2. コレクションを作成
3. タイトル: "Site2 Store"
4. コレクションタイプ: 自動
5. 条件: 商品タグが "site2" に等しい
6. 保存
```

## ステップ2: 新サイトの作成

### 方法A: スクリプトを使用（推奨）

**Windows:**
```bash
cd C:\Users\81905\Documents\ergogainvercel
scripts\create-new-site.bat site2-project site2
```

**Mac/Linux:**
```bash
cd /path/to/ergogainvercel
chmod +x scripts/create-new-site.sh
./scripts/create-new-site.sh site2-project site2
```

スクリプトが自動的に以下を実行します:
- プロジェクトファイルのコピー
- .env.local の作成
- package.json の更新
- Git リポジトリの初期化

### 方法B: 手動でコピー

```bash
# 1. プロジェクトをコピー
cp -r ergogainvercel site2-project
cd site2-project

# 2. .env.local を作成
cat > .env.local << EOF
NEXT_PUBLIC_SHOPIFY_DOMAIN=j0d0xu-n2.myshopify.com
NEXT_PUBLIC_STOREFRONT_TOKEN=【ステップ1-1で取得したToken】
NEXT_PUBLIC_SITE_TAG=site2
EOF

# 3. package.json の name を変更
# "name": "site2-project" に変更

# 4. Gitリポジトリを初期化
rm -rf .git
git init
```

## ステップ3: 環境変数の設定

`.env.local` を編集:

```env
# 必須設定
NEXT_PUBLIC_SHOPIFY_DOMAIN=j0d0xu-n2.myshopify.com
NEXT_PUBLIC_STOREFRONT_TOKEN=a85ff6bbd70e1e4a97dcb3ea8c0c6c58  # 既存と同じTokenでOK
NEXT_PUBLIC_SITE_TAG=site2

# オプション（コレクション方式を使う場合）
NEXT_PUBLIC_SITE_COLLECTION=site2-store

# Google OAuth（必要な場合）
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=random_secret_string
NEXTAUTH_URL=https://site2.com
```

## ステップ4: ブランディングのカスタマイズ

### 4-1. 色の変更

`app/globals.css` を編集:

```css
:root {
  /* Ergogain: オレンジ */
  /* --primary: #FF6B2C; */

  /* Site2: ブルー */
  --primary: #2C6BFF;
  --primary-light: #5A8CFF;
  --primary-dark: #0051E6;
}
```

### 4-2. サイト名・メタデータの変更

`app/layout.tsx` を編集:

```typescript
export const metadata = {
  title: 'Site2 - あなたのストア',
  description: 'Site2の説明文',
};
```

### 4-3. ロゴの変更

- `public/logo.png` を差し替え
- `components/Nav.tsx` のロゴテキストを変更

### 4-4. ナビゲーションの調整

`components/Nav.tsx` を必要に応じて編集

## ステップ5: コードの更新（既存ファイルを置き換え）

### オプションA: マルチストア対応版を使用

既存のファイルをマルチストア対応版に置き換える:

```bash
# lib/shopify.ts の代わりに
cp lib/shopify-multistore.ts lib/shopify.ts

# contexts/CartContext.tsx の代わりに
cp contexts/CartContext-multistore.tsx contexts/CartContext.tsx

# lib/auth.ts の代わりに
cp lib/auth-multistore.ts lib/auth.ts
```

### オプションB: 既存ファイルを手動で編集

詳細は `MULTISTORE_DESIGN.md` を参照

## ステップ6: ローカル確認

```bash
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開く

### 確認ポイント:
✅ サイト2の商品のみが表示される
✅ Ergogainの商品は表示されない
✅ カートに商品を追加できる
✅ ログイン・ログアウトが正常動作

## ステップ7: Vercelへのデプロイ

### 7-1. GitHubにプッシュ

```bash
git remote add origin https://github.com/yourname/site2-project.git
git branch -M main
git push -u origin main
```

### 7-2. Vercelプロジェクト作成

```
1. https://vercel.com にログイン
2. "New Project" をクリック
3. GitHubリポジトリを選択: site2-project
4. Environment Variables を設定:
   NEXT_PUBLIC_SHOPIFY_DOMAIN=j0d0xu-n2.myshopify.com
   NEXT_PUBLIC_STOREFRONT_TOKEN=a85ff6bbd70e1e4a97dcb3ea8c0c6c58  # 既存と同じでOK
   NEXT_PUBLIC_SITE_TAG=site2
5. Deploy をクリック
```

### 7-3. カスタムドメイン設定

```
1. Vercelプロジェクト > Settings > Domains
2. Add domain: site2.com
3. DNS設定（Aレコード or CNAME）
   - Type: CNAME
   - Name: @
   - Value: cname.vercel-dns.com
4. SSL証明書が自動発行される（数分）
```

## ステップ8: 動作確認

### テストシナリオ

1. **商品表示のテスト**
   - Site2で、タグ "site2" の商品のみ表示されるか
   - Ergogainで、タグ "ergogain" の商品のみ表示されるか

2. **カートのテスト**
   - 各サイトで独立したカートが動作するか
   - Site2で追加した商品がErgogainのカートに表示されないか

3. **アカウントのテスト**
   - 両サイトで同じメール・パスワードでログインできるか
   - 両サイトでプロフィール情報が同期されているか

4. **注文履歴のテスト**
   - 各サイトで自サイトの注文のみ表示されるか
   - または、全サイトの注文を表示するか（設定による）

## トラブルシューティング

### 問題: 他サイトの商品が表示される

**原因**: タグフィルタリングが機能していない

**解決策**:
1. `.env.local` の `NEXT_PUBLIC_SITE_TAG` を確認
2. Shopify商品のタグが正しいか確認
3. ブラウザのキャッシュをクリア
4. 開発サーバーを再起動

### 問題: カートが共有されてしまう

**原因**: `CART_ID_KEY` が同じ

**解決策**:
`contexts/CartContext.tsx` で以下を確認:
```typescript
const CART_ID_KEY = `shopify_cart_${SITE_TAG}`;
```

### 問題: ビルドエラー

**原因**: 環境変数が設定されていない

**解決策**:
1. Vercel の Environment Variables を確認
2. ローカルの `.env.local` を確認
3. `npm run build` でローカルビルドテスト

### 問題: 商品が1つも表示されない

**原因**: タグが付いた商品が存在しない

**解決策**:
1. Shopify管理画面で商品を確認
2. `scripts/list-products.js` を実行して商品一覧を確認
3. 少なくとも1つの商品に正しいタグを追加

## デバッグツール

### 商品タグの確認

```bash
node scripts/list-products.js
```

または、ブラウザのコンソールで:

```javascript
import { debugAllProductTags } from '@/lib/shopify-multistore';
await debugAllProductTags();
```

### カート情報の確認

ブラウザのコンソールで:

```javascript
// localStorageを確認
localStorage.getItem('shopify_cart_ergogain');
localStorage.getItem('shopify_cart_site2');

// useCart フックを使用
const { logCartInfo } = useCartDebug();
logCartInfo();
```

## 高度な設定

### モノレポ構成

複数サイトのコードを1つのリポジトリで管理:

```bash
npx create-turbo@latest

# 構成
/monorepo
├── apps/
│   ├── ergogain/
│   └── site2/
└── packages/
    ├── shopify-lib/
    └── ui/
```

詳細は `MULTISTORE_DESIGN.md` の「モノレポ構成」セクションを参照

### 共有カート

全サイトでカートを共有したい場合:

```typescript
// contexts/CartContext.tsx
const CART_ID_KEY = 'shopify_cart_shared';  // 固定値
```

### 注文履歴の表示方法

**オプション1: サイト別に表示（推奨）**
```typescript
const orders = await getCustomerOrders(token, true);
```

**オプション2: 全サイトの注文を表示**
```typescript
const orders = await getCustomerOrders(token, false);
```

## まとめ

これで、1つのShopifyアカウントで複数の独立したECサイトを運営できます！

### メリット:
✅ コスト削減（Shopify Plus不要）
✅ 顧客アカウント統一（ユーザビリティ向上）
✅ 商品管理の一元化
✅ 決済・配送設定の共通化

### さらに詳しく:
- `MULTISTORE_DESIGN.md` - 設計の詳細説明
- `lib/shopify-multistore.ts` - APIクライアントの実装
- `contexts/CartContext-multistore.tsx` - カート管理の実装

質問や問題があれば、設計ドキュメントを参照してください。
