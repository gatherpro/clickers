/**
 * マルチストア対応版 Shopify API クライアント
 *
 * 使用方法:
 * 1. .env.local に NEXT_PUBLIC_SITE_TAG を設定
 * 2. Shopify商品にタグを追加（例: "ergogain", "site2"）
 * 3. この関数を使用して商品を取得
 */

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_TOKEN!;
const SITE_TAG = process.env.NEXT_PUBLIC_SITE_TAG || 'ergogain';

interface StorefrontFetchOptions {
  query: string;
  variables?: Record<string, any>;
}

async function storefrontFetch<T>({ query, variables }: StorefrontFetchOptions): Promise<T> {
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    console.error('GraphQL Errors:', json.errors);
    throw new Error('GraphQL query failed');
  }

  return json.data;
}

/**
 * サイト専用の商品一覧を取得
 * タグでフィルタリングして、現在のサイトの商品のみ返す
 */
export async function getProductsBySite(limit: number = 20) {
  const query = `
    query getProductsByTag($query: String!, $first: Int!) {
      products(first: $first, query: $query, sortKey: CREATED_AT, reverse: true) {
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
    first: limit,
  };

  const response = await storefrontFetch<{ products: any }>({ query, variables });
  return response.products.edges.map((edge: any) => edge.node);
}

/**
 * 商品詳細を取得（サイトチェック付き）
 * 他のサイトの商品の場合はエラーをスロー
 */
export async function getProductByHandleWithSiteCheck(handle: string) {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
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
        variants(first: 20) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  const variables = { handle };
  const response = await storefrontFetch<{ product: any }>({ query, variables });

  if (!response.product) {
    throw new Error('商品が見つかりませんでした');
  }

  // このサイトの商品かチェック
  if (!response.product.tags.includes(SITE_TAG)) {
    console.warn(`商品 "${handle}" はタグ "${SITE_TAG}" を持っていません`);
    throw new Error('この商品は他のストアの商品です');
  }

  return response.product;
}

/**
 * コレクション方式で商品を取得
 * 環境変数 NEXT_PUBLIC_SITE_COLLECTION を設定して使用
 */
export async function getProductsByCollection() {
  const collectionHandle = process.env.NEXT_PUBLIC_SITE_COLLECTION || `${SITE_TAG}-store`;

  const query = `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        title
        description
        products(first: 50) {
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
    }
  `;

  const response = await storefrontFetch<{ collection: any }>({
    query,
    variables: { handle: collectionHandle }
  });

  if (!response.collection) {
    throw new Error(`コレクション "${collectionHandle}" が見つかりませんでした`);
  }

  return {
    ...response.collection,
    products: response.collection.products.edges.map((edge: any) => edge.node),
  };
}

/**
 * 複数のサイトタグで商品を検索
 * 例: 共通商品を複数サイトで表示したい場合
 */
export async function getProductsByMultipleTags(tags: string[], limit: number = 20) {
  const tagQuery = tags.map(tag => `tag:${tag}`).join(' OR ');

  const query = `
    query getProductsByTags($query: String!, $first: Int!) {
      products(first: $first, query: $query) {
        edges {
          node {
            id
            title
            handle
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
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    query: tagQuery,
    first: limit,
  };

  const response = await storefrontFetch<{ products: any }>({ query, variables });
  return response.products.edges.map((edge: any) => edge.node);
}

/**
 * 現在のサイトタグを取得
 */
export function getCurrentSiteTag(): string {
  return SITE_TAG;
}

/**
 * デバッグ用: 全商品のタグを確認
 */
export async function debugAllProductTags() {
  const query = `
    query {
      products(first: 100) {
        edges {
          node {
            title
            handle
            tags
          }
        }
      }
    }
  `;

  const response = await storefrontFetch<{ products: any }>({ query });

  console.log('=== 全商品のタグ一覧 ===');
  response.products.edges.forEach((edge: any) => {
    console.log(`${edge.node.handle}: [${edge.node.tags.join(', ')}]`);
  });

  // サイトごとの商品数を集計
  const tagCounts: Record<string, number> = {};
  response.products.edges.forEach((edge: any) => {
    edge.node.tags.forEach((tag: string) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  console.log('\n=== タグ別商品数 ===');
  Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).forEach(([tag, count]) => {
    console.log(`${tag}: ${count}個`);
  });

  return { products: response.products.edges.map((e: any) => e.node), tagCounts };
}
