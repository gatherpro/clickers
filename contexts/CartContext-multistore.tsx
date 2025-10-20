/**
 * マルチストア対応版 CartContext
 *
 * 各サイトで独立したカートを管理
 * localStorageのキーにサイトタグを含めることで分離
 */

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createCart, addToCart, updateCartLine, removeFromCart, getCart } from '@/lib/cart';

const SITE_TAG = process.env.NEXT_PUBLIC_SITE_TAG || 'ergogain';
const CART_ID_KEY = `shopify_cart_${SITE_TAG}`;  // サイトごとに異なるキー

interface CartItem {
  id: string;
  merchandiseId: string;
  quantity: number;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  image?: {
    url: string;
    altText: string;
  };
}

interface Cart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          image?: {
            url: string;
            altText: string;
          };
          product: {
            title: string;
            tags: string[];  // サイトタグチェック用
          };
        };
      };
    }>;
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addItem: (merchandiseId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  itemCount: number;
  clearCart: () => void;
  getSiteTag: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  // カートの初期化
  useEffect(() => {
    initCart();
  }, []);

  async function initCart() {
    setLoading(true);
    try {
      const savedCartId = localStorage.getItem(CART_ID_KEY);

      if (savedCartId) {
        // 既存のカートを取得
        const existingCart = await getCart(savedCartId);

        if (existingCart) {
          // 他サイトの商品が含まれていないかチェック
          const validCart = validateCartItems(existingCart);
          setCart(validCart);
        } else {
          // カートが見つからない場合は新規作成
          await createNewCart();
        }
      } else {
        // 新規カート作成
        await createNewCart();
      }
    } catch (error) {
      console.error('カートの初期化に失敗:', error);
      await createNewCart();
    } finally {
      setLoading(false);
    }
  }

  async function createNewCart() {
    try {
      const newCart = await createCart();
      setCart(newCart);
      localStorage.setItem(CART_ID_KEY, newCart.id);
    } catch (error) {
      console.error('カート作成エラー:', error);
    }
  }

  /**
   * カート内の商品が現在のサイトの商品かチェック
   * 他サイトの商品が含まれている場合は除外
   */
  function validateCartItems(cart: Cart): Cart {
    const validLines = cart.lines.edges.filter(edge => {
      const productTags = edge.node.merchandise.product.tags;
      return productTags.includes(SITE_TAG);
    });

    if (validLines.length !== cart.lines.edges.length) {
      console.warn(`他サイトの商品 ${cart.lines.edges.length - validLines.length} 個を除外しました`);
    }

    return {
      ...cart,
      lines: {
        edges: validLines,
      },
    };
  }

  async function addItem(merchandiseId: string, quantity: number) {
    if (!cart) {
      await createNewCart();
      if (!cart) return;
    }

    setLoading(true);
    try {
      const updatedCart = await addToCart(cart.id, merchandiseId, quantity);
      const validCart = validateCartItems(updatedCart);
      setCart(validCart);
    } catch (error) {
      console.error('カートへの追加エラー:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(lineId: string) {
    if (!cart) return;

    setLoading(true);
    try {
      const updatedCart = await removeFromCart(cart.id, [lineId]);
      setCart(updatedCart);
    } catch (error) {
      console.error('カートからの削除エラー:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function updateQuantity(lineId: string, quantity: number) {
    if (!cart) return;

    setLoading(true);
    try {
      const updatedCart = await updateCartLine(cart.id, lineId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error('数量更新エラー:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function clearCart() {
    localStorage.removeItem(CART_ID_KEY);
    setCart(null);
    createNewCart();
  }

  function getSiteTag() {
    return SITE_TAG;
  }

  const itemCount = cart?.lines.edges.reduce((sum, edge) => sum + edge.node.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addItem,
        removeItem,
        updateQuantity,
        itemCount,
        clearCart,
        getSiteTag,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

/**
 * 共通カート版（全サイトでカートを共有したい場合）
 */
export function SharedCartProvider({ children }: { children: ReactNode }) {
  // CART_ID_KEY を固定値にする
  const SHARED_CART_ID_KEY = 'shopify_cart_shared';

  // 上記と同じロジックだが、validateCartItems を無効化
  // 実装省略（必要に応じて使用）

  return <>{children}</>;
}

/**
 * デバッグ用: カート情報を表示
 */
export function useCartDebug() {
  const cart = useCart();

  function logCartInfo() {
    console.log('=== カート情報 ===');
    console.log('サイトタグ:', SITE_TAG);
    console.log('localStorageキー:', CART_ID_KEY);
    console.log('カートID:', cart.cart?.id);
    console.log('商品数:', cart.itemCount);
    console.log('カート内容:', cart.cart);

    if (cart.cart) {
      console.log('\n商品詳細:');
      cart.cart.lines.edges.forEach((edge, index) => {
        const item = edge.node;
        console.log(`${index + 1}. ${item.merchandise.product.title}`);
        console.log(`   タグ: [${item.merchandise.product.tags.join(', ')}]`);
        console.log(`   数量: ${item.quantity}`);
        console.log(`   価格: ¥${item.merchandise.price.amount}`);
      });
    }
  }

  return { ...cart, logCartInfo };
}
