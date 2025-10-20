"use client";

export default function AboutPage() {
  return (
    <div>
      {/* ヒーローセクション */}
      <section style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "80px 24px 100px",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "clamp(36px, 6vw, 48px)",
          fontWeight: 700,
          color: "#111827",
          marginBottom: "32px",
          letterSpacing: "-0.02em",
          lineHeight: 1.2
        }}>
          日々の暮らしに、<br/>
          小さな幸せを
        </h1>
        <p style={{
          fontSize: "clamp(16px, 2.5vw, 18px)",
          color: "#6B7280",
          lineHeight: 1.8,
          maxWidth: "700px",
          margin: "0 auto"
        }}>
          ClackTaは、"こだわりをカタチとして届ける"をテーマにしたライフスタイルショップです。<br/>
          一つひとつ丁寧に選んだアイテムで、あなたの日常をもっと心地よく。
        </p>
      </section>

      {/* ブランドストーリー */}
      <section style={{
        backgroundColor: "#F9FAFB",
        padding: "80px 24px"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "64px",
          alignItems: "center"
        }}>
          {/* 画像スペース */}
          <div style={{
            aspectRatio: "4 / 3",
            backgroundColor: "#E5E7EB",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9CA3AF",
            fontSize: "14px"
          }}>
            画像を追加
          </div>

          {/* テキスト */}
          <div>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 32px)",
              fontWeight: 600,
              color: "#111827",
              marginBottom: "24px",
              letterSpacing: "-0.01em"
            }}>
              私たちの想い
            </h2>
            <p style={{
              fontSize: "15px",
              color: "#6B7280",
              lineHeight: 1.8,
              marginBottom: "16px"
            }}>
              毎日使うものだからこそ、本当に気に入ったものを。<br/>
              そんな想いから、ClackTaは生まれました。
            </p>
            <p style={{
              fontSize: "15px",
              color: "#6B7280",
              lineHeight: 1.8
            }}>
              人間工学に基づいたデザイン、厳選された素材、<br/>
              使い心地の良さにとことんこだわり、<br/>
              暮らしに寄り添うアイテムをお届けしています。
            </p>
          </div>
        </div>
      </section>

      {/* こだわりポイント */}
      <section style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "100px 24px"
      }}>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 32px)",
          fontWeight: 600,
          color: "#111827",
          marginBottom: "64px",
          textAlign: "center",
          letterSpacing: "-0.01em"
        }}>
          3つのこだわり
        </h2>

        <div style={{
          display: "grid",
          gap: "80px"
        }}>
          {/* ポイント1 */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "48px",
            alignItems: "center"
          }}>
            <div style={{ order: 1 }}>
              <div style={{
                display: "inline-block",
                padding: "6px 16px",
                backgroundColor: "#ECFEFF",
                color: "#0891B2",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "20px",
                marginBottom: "16px"
              }}>
                01
              </div>
              <h3 style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "16px",
                letterSpacing: "-0.01em"
              }}>
                使い心地へのこだわり
              </h3>
              <p style={{
                fontSize: "15px",
                color: "#6B7280",
                lineHeight: 1.8
              }}>
                人間工学に基づいたデザインで、長時間使っても疲れにくい。<br/>
                毎日触れるものだからこそ、使い心地の良さを追求しています。
              </p>
            </div>
            <div style={{
              aspectRatio: "4 / 3",
              backgroundColor: "#E5E7EB",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9CA3AF",
              fontSize: "14px",
              order: 2
            }}>
              画像を追加
            </div>
          </div>

          {/* ポイント2 */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "48px",
            alignItems: "center"
          }}>
            <div style={{
              aspectRatio: "4 / 3",
              backgroundColor: "#E5E7EB",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9CA3AF",
              fontSize: "14px",
              order: 1
            }}>
              画像を追加
            </div>
            <div style={{ order: 2 }}>
              <div style={{
                display: "inline-block",
                padding: "6px 16px",
                backgroundColor: "#ECFEFF",
                color: "#0891B2",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "20px",
                marginBottom: "16px"
              }}>
                02
              </div>
              <h3 style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "16px",
                letterSpacing: "-0.01em"
              }}>
                素材へのこだわり
              </h3>
              <p style={{
                fontSize: "15px",
                color: "#6B7280",
                lineHeight: 1.8
              }}>
                厳選された高品質な素材のみを使用。<br/>
                環境にも配慮しながら、長く愛用していただける製品作りを心がけています。
              </p>
            </div>
          </div>

          {/* ポイント3 */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "48px",
            alignItems: "center"
          }}>
            <div style={{ order: 1 }}>
              <div style={{
                display: "inline-block",
                padding: "6px 16px",
                backgroundColor: "#ECFEFF",
                color: "#0891B2",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "20px",
                marginBottom: "16px"
              }}>
                03
              </div>
              <h3 style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "16px",
                letterSpacing: "-0.01em"
              }}>
                一つひとつ丁寧に
              </h3>
              <p style={{
                fontSize: "15px",
                color: "#6B7280",
                lineHeight: 1.8
              }}>
                大量生産ではなく、一つひとつ丁寧に仕上げることを大切にしています。<br/>
                細部まで妥協せず、最高の品質をお届けします。
              </p>
            </div>
            <div style={{
              aspectRatio: "4 / 3",
              backgroundColor: "#E5E7EB",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9CA3AF",
              fontSize: "14px",
              order: 2
            }}>
              画像を追加
            </div>
          </div>
        </div>
      </section>

      {/* デザイナーメッセージ */}
      <section style={{
        backgroundColor: "#F9FAFB",
        padding: "80px 24px"
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center"
        }}>
          <div style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            backgroundColor: "#E5E7EB",
            margin: "0 auto 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9CA3AF",
            fontSize: "14px"
          }}>
            写真
          </div>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 28px)",
            fontWeight: 600,
            color: "#111827",
            marginBottom: "24px",
            letterSpacing: "-0.01em"
          }}>
            デザイナーより
          </h2>
          <p style={{
            fontSize: "15px",
            color: "#6B7280",
            lineHeight: 1.8,
            marginBottom: "16px"
          }}>
            「毎日使うものを、もっと心地よく」<br/>
            そんな想いで、一つひとつのアイテムを作っています。
          </p>
          <p style={{
            fontSize: "15px",
            color: "#6B7280",
            lineHeight: 1.8
          }}>
            ClackTaの商品が、あなたの暮らしに小さな幸せをもたらせますように。<br/>
            商品ラインアップは順次追加予定です。<br/>
            お気に入りが見つかりましたら、ぜひフォローをお願いいたします ᵕ̈*
          </p>
        </div>
      </section>

      {/* CTAセクション */}
      <section style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "80px 24px",
        textAlign: "center"
      }}>
        <h2 style={{
          fontSize: "clamp(24px, 4vw, 28px)",
          fontWeight: 600,
          color: "#111827",
          marginBottom: "32px",
          letterSpacing: "-0.01em"
        }}>
          商品を見る
        </h2>
        <a
          href="/c/all"
          className="btn btn-primary"
          style={{
            display: "inline-block",
            padding: "18px 48px",
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
          商品一覧へ
        </a>
      </section>

      {/* モバイルレスポンシブCSS */}
      <style jsx global>{`
        @media (max-width: 768px) {
          section {
            padding: 48px 16px !important;
          }

          h1 br, p br {
            display: inline;
          }

          .btn {
            padding: 14px 32px !important;
            font-size: 15px !important;
          }
        }
      `}</style>
    </div>
  );
}
