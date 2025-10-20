"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { useCart } from "@/contexts/CartContext";

export default function ProductDetailPage({ params }: { params: { handle: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductByHandle(params.handle);
        setProduct(data);
        if (data?.variants.edges[0]) {
          setSelectedVariant(data.variants.edges[0].node);
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [params.handle]);

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    try {
      await addItem(selectedVariant.id, quantity);
      alert("カートに追加しました");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("カートへの追加に失敗しました");
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px", textAlign: "center" }}>
        <p>読み込み中...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>商品が見つかりませんでした</h1>
        <button onClick={() => router.back()} style={{
          padding: "12px 24px",
          backgroundColor: "#222222",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}>
          戻る
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "64px"
      }}>
        {/* 商品画像 */}
        <div>
          {product.images.edges[0] && (
            <img
              src={product.images.edges[0].node.url}
              alt={product.images.edges[0].node.altText || product.title}
              style={{
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #EEEEEE"
              }}
            />
          )}
        </div>

        {/* 商品情報 */}
        <div>
          <h1 style={{
            fontSize: "clamp(28px, 4vw, 36px)",
            fontWeight: 600,
            color: "#222222",
            marginBottom: "16px"
          }}>
            {product.title}
          </h1>

          <p style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "#222222",
            marginBottom: "32px"
          }}>
            ¥{parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString()}
          </p>

          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            style={{
              fontSize: "15px",
              color: "#666666",
              lineHeight: 1.7,
              marginBottom: "40px"
            }}
          />

          {/* バリアント選択 */}
          {product.variants.edges.length > 1 && (
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 600,
                color: "#222222",
                marginBottom: "8px"
              }}>
                オプション
              </label>
              <select
                value={selectedVariant?.id}
                onChange={(e) => {
                  const variant = product.variants.edges.find(
                    (v: any) => v.node.id === e.target.value
                  )?.node;
                  setSelectedVariant(variant);
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "15px",
                  border: "1px solid #EEEEEE",
                  borderRadius: "4px"
                }}
              >
                {product.variants.edges.map((v: any) => (
                  <option key={v.node.id} value={v.node.id}>
                    {v.node.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 数量選択 */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 600,
              color: "#222222",
              marginBottom: "8px"
            }}>
              数量
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              style={{
                width: "100px",
                padding: "12px",
                fontSize: "15px",
                border: "1px solid #EEEEEE",
                borderRadius: "4px"
              }}
            />
          </div>

          {/* カートに追加ボタン */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant?.availableForSale}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "16px",
              fontWeight: 600,
              color: "white",
              backgroundColor: selectedVariant?.availableForSale ? "#222222" : "#CCCCCC",
              border: "none",
              borderRadius: "4px",
              cursor: selectedVariant?.availableForSale ? "pointer" : "not-allowed",
              transition: "background-color 0.2s ease"
            }}
          >
            {selectedVariant?.availableForSale ? "カートに追加" : "在庫切れ"}
          </button>
        </div>
      </div>
    </div>
  );
}
