"use client";

import { useCart } from "../../contexts/CartContext";

export default function CartPage() {
  const { cart, loading, removeItem, updateQuantity, itemCount } = useCart();

  // チェックアウトURLにreturn_toパラメータを追加
  const getCheckoutUrl = () => {
    if (!cart) return "";

    const returnUrl = encodeURIComponent("https://clackta.com/thanks");
    const separator = cart.checkoutUrl.includes("?") ? "&" : "?";
    return `${cart.checkoutUrl}${separator}return_to=${returnUrl}`;
  };

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 200px)",
        fontSize: "15px",
        color: "#6B7280"
      }}>
        読み込み中...
      </div>
    );
  }

  if (!cart || cart.lines.edges.length === 0) {
    return (
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "80px 24px",
        minHeight: "calc(100vh - 200px)",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "clamp(32px, 5vw, 40px)",
          fontWeight: 600,
          marginBottom: "24px",
          letterSpacing: "-0.02em",
          color: "#111827",
          lineHeight: 1.15
        }}>
          カート
        </h1>

        <div style={{
          backgroundColor: "#F9FAFB",
          borderRadius: "12px",
          padding: "48px 32px",
          marginTop: "48px",
          border: "1px solid #E5E7EB"
        }}>
          <p style={{ fontSize: "16px", color: "#6B7280", marginBottom: "32px" }}>
            カートは空です
          </p>
          <a
            href="/c/all"
            className="btn btn-primary"
            style={{
              display: "inline-block",
              padding: "16px 32px",
              fontSize: "17px",
              fontWeight: 600,
              color: "white",
              backgroundColor: "#0891B2",
              borderRadius: "12px",
              textDecoration: "none",
              transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
              boxShadow: "0 4px 6px -1px rgba(8, 145, 178, 0.3), 0 2px 4px -1px rgba(8, 145, 178, 0.2)"
            }}
          >
            商品を見る
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "80px 24px",
      minHeight: "calc(100vh - 200px)"
    }}>
      <h1 style={{
        fontSize: "clamp(32px, 5vw, 40px)",
        fontWeight: 600,
        marginBottom: "16px",
        letterSpacing: "-0.02em",
        color: "#111827",
        lineHeight: 1.15
      }}>
        カート
      </h1>

      <p style={{
        fontSize: "15px",
        color: "#6B7280",
        marginBottom: "48px"
      }}>
        {itemCount}点の商品
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "24px",
        marginBottom: "48px"
      }}>
        {/* カート商品リスト */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          {cart.lines.edges.map(({ node }) => (
            <div
              key={node.id}
              style={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                padding: "24px",
                display: "flex",
                gap: "24px",
                alignItems: "center",
                transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
              }}
            >
              {/* 商品情報 */}
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#111827",
                  marginBottom: "8px"
                }}>
                  {node.merchandise.product.title}
                </h3>
                {node.merchandise.title !== "Default Title" && (
                  <p style={{
                    fontSize: "14px",
                    color: "#6B7280",
                    marginBottom: "12px"
                  }}>
                    {node.merchandise.title}
                  </p>
                )}
                {node.merchandise.priceV2 && (
                  <p style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#111827"
                  }}>
                    ¥{Number(node.merchandise.priceV2.amount).toLocaleString()}
                  </p>
                )}
              </div>

              {/* 数量コントロール */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                backgroundColor: "#F9FAFB",
                borderRadius: "8px",
                padding: "8px 12px",
                border: "1px solid #E5E7EB"
              }}>
                <button
                  onClick={() => updateQuantity(node.id, node.quantity - 1)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    border: "1px solid #E5E7EB",
                    backgroundColor: "white",
                    color: "#111827",
                    fontSize: "18px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#1a1a1a";
                    e.currentTarget.style.borderColor = "#1a1a1a";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.borderColor = "#E5E7EB";
                    e.currentTarget.style.color = "#111827";
                  }}
                >
                  −
                </button>

                <span style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#111827",
                  minWidth: "32px",
                  textAlign: "center"
                }}>
                  {node.quantity}
                </span>

                <button
                  onClick={() => updateQuantity(node.id, node.quantity + 1)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    border: "1px solid #E5E7EB",
                    backgroundColor: "white",
                    color: "#111827",
                    fontSize: "18px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#1a1a1a";
                    e.currentTarget.style.borderColor = "#1a1a1a";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.borderColor = "#E5E7EB";
                    e.currentTarget.style.color = "#111827";
                  }}
                >
                  ＋
                </button>
              </div>

              {/* 削除ボタン */}
              <button
                onClick={() => removeItem(node.id)}
                style={{
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#DC2626",
                  backgroundColor: "white",
                  border: "1px solid #FCA5A5",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FEF2F2";
                  e.currentTarget.style.borderColor = "#DC2626";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.borderColor = "#FCA5A5";
                }}
              >
                削除
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 合計とチェックアウト */}
      <div style={{
        backgroundColor: "#F9FAFB",
        borderRadius: "12px",
        padding: "32px",
        border: "1px solid #E5E7EB"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px"
        }}>
          <span style={{ fontSize: "18px", fontWeight: 600, color: "#111827" }}>
            小計
          </span>
          <span style={{ fontSize: "28px", fontWeight: 700, color: "#111827" }}>
            ¥{Number(cart.cost.subtotalAmount.amount).toLocaleString()}
          </span>
        </div>

        <p style={{
          fontSize: "13px",
          color: "#9CA3AF",
          marginBottom: "24px",
          textAlign: "center"
        }}>
          送料と税金はチェックアウト時に計算されます
        </p>

        <a
          href={getCheckoutUrl()}
          className="btn btn-primary"
          style={{
            display: "block",
            width: "100%",
            padding: "18px",
            fontSize: "17px",
            fontWeight: 600,
            color: "white",
            backgroundColor: "#0891B2",
            border: "none",
            borderRadius: "12px",
            textAlign: "center",
            textDecoration: "none",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
            boxShadow: "0 4px 6px -1px rgba(8, 145, 178, 0.3), 0 2px 4px -1px rgba(8, 145, 178, 0.2)"
          }}
        >
          チェックアウトに進む
        </a>

        <p style={{
          fontSize: "12px",
          color: "#9CA3AF",
          textAlign: "center",
          marginTop: "16px",
          lineHeight: 1.5
        }}>
          決済はShopifyの安全な画面で行われます
        </p>
      </div>
    </div>
  );
}
