"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "120px 24px 80px",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "clamp(40px, 6vw, 56px)",
          fontWeight: 600,
          color: "#222222",
          marginBottom: "24px",
          letterSpacing: "-0.02em",
          lineHeight: 1.2
        }}>
          シンプルで美しい<br />日々の暮らし
        </h1>
        <p style={{
          fontSize: "clamp(16px, 2.5vw, 18px)",
          color: "#666666",
          marginBottom: "48px",
          lineHeight: 1.7,
          maxWidth: "600px",
          margin: "0 auto 48px"
        }}>
          厳選された雑貨で、あなたの暮らしをもっと豊かに。<br />
          シンプルで機能的なアイテムを取り揃えています。
        </p>
        <Link
          href="/products"
          style={{
            display: "inline-block",
            backgroundColor: "#222222",
            color: "white",
            padding: "16px 40px",
            fontSize: "16px",
            fontWeight: 500,
            borderRadius: "4px",
            textDecoration: "none",
            transition: "background-color 0.2s ease"
          }}
        >
          商品を見る
        </Link>
      </section>

      {/* Features Section */}
      <section style={{
        backgroundColor: "#FAFAFA",
        padding: "80px 24px",
        marginTop: "40px"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 32px)",
            fontWeight: 600,
            color: "#222222",
            marginBottom: "56px",
            textAlign: "center"
          }}>
            私たちの特徴
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "40px"
          }}>
            {[
              {
                title: "厳選された商品",
                desc: "品質にこだわり抜いた商品だけを取り揃えています。"
              },
              {
                title: "安心の決済",
                desc: "Shopifyの安全な決済システムで、安心してお買い物いただけます。"
              },
              {
                title: "迅速な配送",
                desc: "ご注文後、迅速に発送手続きを行います。"
              }
            ].map((feature, i) => (
              <div key={i} style={{
                padding: "40px 32px",
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                border: "1px solid #EEEEEE",
                textAlign: "center"
              }}>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#222222",
                  marginBottom: "16px"
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: "15px",
                  color: "#666666",
                  lineHeight: 1.7
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
