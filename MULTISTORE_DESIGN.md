# マルチストア設計ドキュメント

## 概要
単一のShopifyバックエンドを使用して、複数の独立したECサイトを運営する設計。

## アーキテクチャ

### 基本構成
```
1つのShopify Store
  ↓
  Storefront API Token (全サイト共通でOK)
  ↓
  ┌────┴─────┬─────────┐
  ↓          ↓         ↓
Site1      Site2     Site3
(別ドメイン) (別ドメイン) (別ドメイン)
ergogain.com site2.com   site3.com

各サイトは環境変数でタグを指定:
- Site1: NEXT_PUBLIC_SITE_TAG=ergogain
- Site2: NEXT_PUBLIC_SITE_TAG=site2
- Site3: NEXT_PUBLIC_SITE_TAG=site3
```

## 実装ガイド

### 1. 環境変数の追加

各サイトの `.env.local` に追加:
```env
# 既存
NEXT_PUBLIC_SHOPIFY_DOMAIN=j0d0xu-n2.myshopify.com
NEXT_PUBLIC_STOREFRONT_TOKEN=your_token_here

# 新規追加
NEXT_PUBLIC_SITE_TAG=ergogain
NEXT_PUBLIC_SITE_COLLECTION=ergogain-store
```

### 2. lib/shopify.ts の修正

```typescript
// 商品フィルタリング関数を追加

const SITE_TAG = process.env.NEXT_PUBLIC_SITE_TAG || 'ergogain';

export async function getProducts(limit: number = 20) {
  const query = `
    query getProductsByTag($query: String!, $first: Int!) {
      products(first: $first, query: $query) {
        edges {
          node {
            id
            title
            handle
            description
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    query: `tag:${SITE_TAG}`,
    first: limit
  };

  const response = await storefrontFetch<{ products: any }>({ query, variables });
  return response.products;
}

export async function getProductByHandle(handle: string) {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        tags
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `;

  const variables = { handle };
  const response = await storefrontFetch<{ product: Product }>({ query, variables });

  // このサイトの商品かチェック
  if (response.product && !response.product.tags.includes(SITE_TAG)) {
    throw new Error('この商品は他のストアの商品です');
  }

  return response.product;
}

// コレクション方式の場合
export async function getProductsByCollection() {
  const collectionHandle = process.env.NEXT_PUBLIC_SITE_COLLECTION || 'ergogain-store';

  const query = `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        title
        description
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await storefrontFetch({ query, variables: { handle: collectionHandle } });
  return response.collection;
}
```

### 3. contexts/CartContext.tsx の修正

```typescript
// サイト別カートID
const SITE_TAG = process.env.NEXT_PUBLIC_SITE_TAG || 'ergogain';
const CART_ID_KEY = `shopify_cart_${SITE_TAG}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  // 残りは既存コードと同じ
  // ...
}
```

### 4. lib/auth.ts の修正（注文履歴フィルタリング）

```typescript
export async function getCustomerOrders(accessToken: string, filterBySite: boolean = true) {
  const query = `
    query {
      customer(customerAccessToken: "${accessToken}") {
        orders(first: 50, reverse: true) {
          edges {
            node {
              id
              orderNumber
              processedAt
              financialStatus
              fulfillmentStatus
              totalPrice {
                amount
                currencyCode
              }
              lineItems(first: 50) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      price {
                        amount
                        currencyCode
                      }
                      product {
                        title
                        handle
                        tags
                        images(first: 1) {
                          edges {
                            node {
                              url
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await storefrontFetch<{ customer: Customer }>({ query });

  if (!response.customer) {
    throw new Error('顧客情報の取得に失敗しました');
  }

  let orders = response.customer.orders.edges.map(edge => edge.node);

  // サイト別フィルタリング
  if (filterBySite) {
    const SITE_TAG = process.env.NEXT_PUBLIC_SITE_TAG || 'ergogain';

    orders = orders.filter(order => {
      // 注文内に現在のサイトの商品が含まれているかチェック
      return order.lineItems.edges.some(item =>
        item.node.variant.product.tags.includes(SITE_TAG)
      );
    });
  }

  return orders;
}
```

### 5. Shopify管理画面での設定手順

#### ステップ1: 商品にタグを追加
```
1. Shopify管理画面にログイン
2. 商品 > すべての商品
3. Ergogain関連商品を選択
4. タグに "ergogain" を追加して保存
5. 新サイト用商品にタグ "site2" を追加
```

#### ステップ2: コレクション作成（オプション）
```
1. 商品 > コレクション > コレクションを作成
2. タイトル: "Ergogain Store"
3. コレクションタイプ: 自動
4. 条件: 商品タグが "ergogain" に等しい
5. 保存
```

#### ステップ3: Storefront API Tokenの発行（サイト別推奨）
```
1. 設定 > アプリと販売チャネル
2. Storefront API > 開発
3. "Create storefront" をクリック
4. 名前: "Site2 Frontend"
5. Storefront API access tokenをコピー
6. 新サイトの .env.local に設定
```

### 6. 新サイト作成手順

```bash
# 1. 既存プロジェクトをコピー
cp -r ergogainvercel site2-project
cd site2-project

# 2. .env.local を更新
cat > .env.local << EOF
NEXT_PUBLIC_SHOPIFY_DOMAIN=j0d0xu-n2.myshopify.com
NEXT_PUBLIC_STOREFRONT_TOKEN=新しいトークン
NEXT_PUBLIC_SITE_TAG=site2
EOF

# 3. package.json の name を変更
# "name": "site2-project"

# 4. ブランディング変更
# - app/globals.css の色変数を変更
# - ロゴを変更
# - サイト名を変更

# 5. デプロイ
vercel --prod
```

### 7. ブランディングのカスタマイズ例

#### app/globals.css の色変更
```css
/* Ergogainサイト */
:root {
  --primary: #FF6B2C;  /* オレンジ */
}

/* Site2 */
:root {
  --primary: #2C6BFF;  /* ブルー */
  --primary-light: #5A8CFF;
  --primary-dark: #0051E6;
}
```

#### app/layout.tsx のメタデータ変更
```typescript
export const metadata = {
  title: 'Site2 - 新しいストア',
  description: 'Site2の説明',
};
```

## アカウント・認証について

### 顧客アカウントは完全共通
- 同じメールアドレスで全サイトにログイン可能
- パスワードも共通
- 住所録も共通

### 注文履歴の表示
```typescript
// オプション1: 全サイトの注文を表示
const orders = await getCustomerOrders(token, false);

// オプション2: 現在のサイトの注文のみ表示（推奨）
const orders = await getCustomerOrders(token, true);
```

## カート管理

### サイト別カート（推奨）
```typescript
// localStorageのキーがサイトごとに異なる
// ergogain.com → shopify_cart_ergogain
// site2.com → shopify_cart_site2
```

### メリット
- ユーザーは各サイトで独立した買い物体験
- カート内で商品が混在しない
- サイトごとに異なる決済フローを設定可能

### 共通カートにしたい場合
```typescript
// contexts/CartContext.tsx
const CART_ID_KEY = 'shopify_cart_shared';  // 固定値
```

## デプロイ構成

### Vercel での設定
```
Project: ergogain-site
  Domain: ergogain.com
  Env Variables:
    NEXT_PUBLIC_SITE_TAG=ergogain

Project: site2
  Domain: site2.com
  Env Variables:
    NEXT_PUBLIC_SITE_TAG=site2
```

### カスタムドメイン設定
```
1. Vercelプロジェクト > Settings > Domains
2. Add domain: yoursite.com
3. DNS設定（Aレコード or CNAME）
4. SSL自動発行
```

## モノレポ構成（高度な実装）

### Turborepo を使用した例
```bash
npx create-turbo@latest

# 構成
/monorepo
├── apps/
│   ├── ergogain/
│   └── site2/
├── packages/
│   ├── shopify-lib/      # 共通Shopify APIロジック
│   ├── ui/               # 共通UIコンポーネント
│   └── tsconfig/         # 共通TypeScript設定
├── turbo.json
└── package.json
```

### packages/shopify-lib/package.json
```json
{
  "name": "@yourcompany/shopify-lib",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

### apps/ergogain/package.json
```json
{
  "dependencies": {
    "@yourcompany/shopify-lib": "*",
    "@yourcompany/ui": "*"
  }
}
```

## トラブルシューティング

### 問題: 他サイトの商品が表示される
**原因**: タグフィルタリングが機能していない
**解決**:
- .env.local の NEXT_PUBLIC_SITE_TAG を確認
- Shopify商品のタグが正しいか確認

### 問題: カートが共有されてしまう
**原因**: CART_ID_KEYが同じ
**解決**:
- CartContext.tsx で `shopify_cart_${SITE_TAG}` を使用

### 問題: 注文履歴に他サイトの注文が表示される
**解決**: getCustomerOrders の第2引数を true に設定

## まとめ

この設計により:
✅ 1つのShopifyアカウントで複数サイト運営
✅ 顧客アカウントは全サイト共通
✅ 商品管理も1つのShopify管理画面
✅ フロントエンドは完全に独立
✅ 決済・注文管理も共通
✅ コストを抑えて運営可能（Shopify Plus不要）
