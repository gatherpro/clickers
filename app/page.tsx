"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section" style={{
        background: "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
        padding: "120px 24px",
        marginBottom: "48px",
        borderRadius: "24px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{
            fontSize: "clamp(40px, 6vw, 64px)",
            fontWeight: 700,
            color: "white",
            marginBottom: "24px",
            letterSpacing: "-0.03em",
            lineHeight: 1.1
          }}>
            素敵な雑貨を<br />あなたの暮らしに
          </h1>
          <p style={{
            fontSize: "clamp(18px, 2.5vw, 21px)",
            color: "rgba(255, 255, 255, 0.95)",
            marginBottom: "40px",
            lineHeight: 1.5
          }}>
            厳選された雑貨で、毎日をもっと豊かに
          </p>
          <Link
            href="/products"
            style={{
              display: "inline-block",
              backgroundColor: "white",
              color: "#FF6B2C",
              padding: "18px 48px",
              fontSize: "18px",
              fontWeight: 600,
              borderRadius: "12px",
              textDecoration: "none",
              transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
            }}
          >
            商品を見る
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "48px 24px",
        textAlign: "center"
      }}>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 36px)",
          fontWeight: 700,
          color: "#111",
          marginBottom: "48px"
        }}>
          私たちの特徴
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "32px"
        }}>
          {[
            { title: "厳選された商品", desc: "品質にこだわった商品を取り揃えています" },
            { title: "安心の決済", desc: "Shopifyの安全な決済システムを採用" },
            { title: "迅速な発送", desc: "ご注文後、すぐに発送手続きを開始します" }
          ].map((feature, i) => (
            <div key={i} style={{
              padding: "32px",
              borderRadius: "18px",
              backgroundColor: "#F5F5F7",
              border: "1px solid #E5E5E7"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#111",
                marginBottom: "12px"
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: "15px",
                color: "#555",
                lineHeight: 1.6
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
