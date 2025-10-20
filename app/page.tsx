"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import HeroSlider from "../components/HeroSlider";
import NewsSlider from "../components/NewsSlider";
import { getProducts } from "@/lib/shopify";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts(6); // 6商品を取得
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <div>
      {/* お知らせスライダー */}
      <NewsSlider />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
        {/* 上部：動画（左）+ Heroスライダー（右） */}
        <section className="hero-section" style={{
          marginBottom: "80px",
          display: "grid",
          gridTemplateColumns: "400px 1fr",
          gap: "32px",
          alignItems: "start"
        }}>
          {/* 左側：動画 */}
          <div style={{
            backgroundColor: "#F9FAFB",
            borderRadius: "12px",
            padding: "24px",
            border: "1px solid #E5E7EB"
          }}>
            <h3 style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#111827",
              marginBottom: "16px",
              letterSpacing: "-0.01em"
            }}>
              ClackTaの世界
            </h3>
            <div style={{
              aspectRatio: "16 / 9",
              backgroundColor: "#E5E7EB",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6B7280",
              fontSize: "13px",
              padding: "16px",
              textAlign: "center"
            }}>
              {/* TODO: YouTube埋め込みまたはビデオファイルを追加 */}
              <div>
                <p style={{ marginBottom: "8px" }}>動画</p>
                <p style={{ fontSize: "12px" }}>YouTubeリンクまたは<br/>ビデオファイルを追加</p>
              </div>
            </div>
          </div>

          {/* 右側：Heroスライダー */}
          <div>
            <HeroSlider />
          </div>
        </section>

        {/* SNSアイコン（左側固定） */}
        <div className="sns-icons" style={{
          position: "fixed",
          left: "32px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          zIndex: 100
        }}>
          {/* 見出し */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "16px 12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center"
          }}>
            <p style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#111827",
              marginBottom: "4px",
              letterSpacing: "-0.01em"
            }}>
              フォローしてね！
            </p>
            <p style={{
              fontSize: "11px",
              color: "#6B7280"
            }}>
              Follow us
            </p>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(188, 24, 136, 0.3)",
              transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
              textDecoration: "none",
              position: "relative"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.15) rotate(5deg)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(188, 24, 136, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1) rotate(0deg)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(188, 24, 136, 0.3)";
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "#000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
              transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
              textDecoration: "none",
              position: "relative"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.15) rotate(-5deg)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.5)";
              e.currentTarget.style.backgroundColor = "#EE1D52";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1) rotate(0deg)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.3)";
              e.currentTarget.style.backgroundColor = "#000000";
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
        </div>

        {/* 商品リスト（3列） */}
        <section>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "48px"
          }}>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 32px)",
              fontWeight: 600,
              color: "#111827",
              letterSpacing: "-0.01em"
            }}>
              おすすめ商品
            </h2>
            <Link
              href="/c/all"
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: "#0891B2",
                textDecoration: "none",
                transition: "color 0.18s ease"
              }}
            >
              すべて見る →
            </Link>
          </div>

          {loading ? (
            <div style={{
              textAlign: "center",
              padding: "80px 24px",
              color: "#6B7280"
            }}>
              <p>読み込み中...</p>
            </div>
          ) : products.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "80px 24px",
              color: "#6B7280"
            }}>
              <p style={{ fontSize: "16px", marginBottom: "16px" }}>
                商品が見つかりませんでした
              </p>
              <p style={{ fontSize: "14px" }}>
                Shopify管理画面で商品にタグ「site2」を追加してください
              </p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "32px"
            }}>
              {products.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/p/${product.handle}`}
                  className="card reveal"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    overflow: "hidden",
                    padding: 0,
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  {product.images.edges[0] && (
                    <div style={{ overflow: "hidden" }}>
                      <img
                        src={product.images.edges[0].node.url}
                        alt={product.images.edges[0].node.altText || product.title}
                        style={{
                          width: "100%",
                          aspectRatio: "1",
                          objectFit: "cover",
                          transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
                        }}
                      />
                    </div>
                  )}
                  <div style={{ padding: "24px" }}>
                    <h3 style={{
                      fontSize: "17px",
                      fontWeight: 600,
                      color: "#111827",
                      marginBottom: "12px",
                      letterSpacing: "-0.01em"
                    }}>
                      {product.title}
                    </h3>
                    <p style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#0891B2",
                      letterSpacing: "-0.01em"
                    }}>
                      ¥{parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* モバイルレスポンシブCSS */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            margin-bottom: 48px !important;
          }

          .sns-icons {
            display: none !important;
          }

          /* ブランド名のフォントサイズ調整 */
          nav span {
            font-size: 22px !important;
          }

          /* ホームページのパディング調整 */
          body > div > div {
            padding: 32px 16px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            margin-bottom: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
