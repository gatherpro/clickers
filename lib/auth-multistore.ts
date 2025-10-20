/**
 * マルチストア対応版 認証・顧客管理
 *
 * 顧客アカウントは全サイト共通
 * 注文履歴はサイト別にフィルタリング可能
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
    throw new Error(json.errors[0]?.message || 'GraphQL query failed');
  }

  return json.data;
}

/**
 * 顧客の注文履歴を取得（サイト別フィルタリング対応）
 *
 * @param accessToken 顧客アクセストークン
 * @param filterBySite true: 現在のサイトの注文のみ, false: 全サイトの注文
 * @param options フィルタリングオプション
 */
export async function getCustomerOrders(
  accessToken: string,
  filterBySite: boolean = true,
  options: {
    limit?: number;
    siteTag?: string;  // 特定のサイトの注文を取得
  } = {}
) {
  const { limit = 50, siteTag = SITE_TAG } = options;

  const query = `
    query getCustomerOrders($accessToken: String!) {
      customer(customerAccessToken: $accessToken) {
        id
        email
        orders(first: ${limit}, reverse: true) {
          edges {
            node {
              id
              orderNumber
              name
              processedAt
              financialStatus
              fulfillmentStatus
              totalPrice {
                amount
                currencyCode
              }
              subtotalPrice {
                amount
                currencyCode
              }
              totalShippingPrice {
                amount
                currencyCode
              }
              lineItems(first: 50) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        url
                        altText
                      }
                      product {
                        title
                        handle
                        tags
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

  const response = await storefrontFetch<{ customer: any }>({
    query,
    variables: { accessToken },
  });

  if (!response.customer) {
    throw new Error('顧客情報の取得に失敗しました');
  }

  let orders = response.customer.orders.edges.map((edge: any) => edge.node);

  // サイト別フィルタリング
  if (filterBySite) {
    orders = orders.filter((order: any) => {
      // 注文内に現在のサイトの商品が含まれているかチェック
      return order.lineItems.edges.some((item: any) => {
        const productTags = item.node.variant.product.tags;
        return productTags.includes(siteTag);
      });
    });

    // さらに、注文内の商品も現在のサイトのもののみに絞る
    orders = orders.map((order: any) => ({
      ...order,
      lineItems: {
        edges: order.lineItems.edges.filter((item: any) => {
          const productTags = item.node.variant.product.tags;
          return productTags.includes(siteTag);
        }),
      },
    }));
  }

  return orders;
}

/**
 * 注文詳細を取得（サイトチェック付き）
 */
export async function getOrderDetail(accessToken: string, orderId: string, checkSite: boolean = true) {
  const query = `
    query getOrder($accessToken: String!) {
      customer(customerAccessToken: $accessToken) {
        orders(first: 100) {
          edges {
            node {
              id
              orderNumber
              name
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
                      title
                      price {
                        amount
                        currencyCode
                      }
                      product {
                        title
                        handle
                        tags
                      }
                    }
                  }
                }
              }
              shippingAddress {
                address1
                address2
                city
                province
                zip
                country
              }
            }
          }
        }
      }
    }
  `;

  const response = await storefrontFetch<{ customer: any }>({
    query,
    variables: { accessToken },
  });

  const order = response.customer.orders.edges.find(
    (edge: any) => edge.node.id === orderId
  )?.node;

  if (!order) {
    throw new Error('注文が見つかりませんでした');
  }

  // サイトチェック
  if (checkSite) {
    const hasSiteProducts = order.lineItems.edges.some((item: any) =>
      item.node.variant.product.tags.includes(SITE_TAG)
    );

    if (!hasSiteProducts) {
      throw new Error('この注文は他のサイトの注文です');
    }
  }

  return order;
}

/**
 * 顧客情報を取得
 * ※ アカウント情報は全サイト共通
 */
export async function getCustomer(accessToken: string) {
  const query = `
    query getCustomer($accessToken: String!) {
      customer(customerAccessToken: $accessToken) {
        id
        email
        firstName
        lastName
        phone
        acceptsMarketing
        createdAt
        updatedAt
        defaultAddress {
          id
          firstName
          lastName
          company
          address1
          address2
          city
          province
          country
          zip
          phone
        }
      }
    }
  `;

  const response = await storefrontFetch<{ customer: any }>({
    query,
    variables: { accessToken },
  });

  return response.customer;
}

/**
 * 顧客プロフィールを更新
 * ※ 更新は全サイトに反映される
 */
export async function updateCustomerProfile(
  accessToken: string,
  updates: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    acceptsMarketing?: boolean;
  }
) {
  const query = `
    mutation customerUpdate($accessToken: String!, $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $accessToken, customer: $customer) {
        customer {
          id
          email
          firstName
          lastName
          phone
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const response = await storefrontFetch<{ customerUpdate: any }>({
    query,
    variables: {
      accessToken,
      customer: updates,
    },
  });

  if (response.customerUpdate.customerUserErrors.length > 0) {
    throw new Error(response.customerUpdate.customerUserErrors[0].message);
  }

  return response.customerUpdate.customer;
}

/**
 * デバッグ用: 注文の統計情報を取得
 */
export async function getOrderStatsBySite(accessToken: string) {
  const allOrders = await getCustomerOrders(accessToken, false);

  const stats: Record<string, {
    count: number;
    totalAmount: number;
    orders: any[];
  }> = {};

  allOrders.forEach((order: any) => {
    order.lineItems.edges.forEach((item: any) => {
      const tags = item.node.variant.product.tags;

      tags.forEach((tag: string) => {
        if (!stats[tag]) {
          stats[tag] = { count: 0, totalAmount: 0, orders: [] };
        }

        stats[tag].count += 1;
        stats[tag].totalAmount += parseFloat(order.totalPrice.amount);
        stats[tag].orders.push(order.orderNumber);
      });
    });
  });

  console.log('=== サイト別注文統計 ===');
  Object.entries(stats).forEach(([tag, data]) => {
    console.log(`\n${tag}:`);
    console.log(`  注文数: ${data.count}`);
    console.log(`  合計金額: ¥${data.totalAmount.toFixed(0)}`);
    console.log(`  注文番号: ${[...new Set(data.orders)].join(', ')}`);
  });

  return stats;
}

/**
 * 現在のサイトタグを取得
 */
export function getCurrentSiteTag(): string {
  return SITE_TAG;
}

/**
 * サイト固有の設定を取得
 */
export function getSiteConfig() {
  return {
    siteTag: SITE_TAG,
    domain: SHOPIFY_DOMAIN,
    // サイトごとの設定を追加可能
    displayName: getSiteDisplayName(SITE_TAG),
    supportEmail: getSiteSupportEmail(SITE_TAG),
  };
}

function getSiteDisplayName(tag: string): string {
  const names: Record<string, string> = {
    ergogain: 'Ergogain',
    site2: 'Site2',
    // 他のサイトを追加
  };
  return names[tag] || tag;
}

function getSiteSupportEmail(tag: string): string {
  const emails: Record<string, string> = {
    ergogain: 'support@ergogain.com',
    site2: 'support@site2.com',
  };
  return emails[tag] || 'support@example.com';
}
