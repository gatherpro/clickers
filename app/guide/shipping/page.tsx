export default function ShippingPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{
        fontSize: "clamp(32px, 5vw, 40px)",
        fontWeight: 600,
        color: "#222222",
        marginBottom: "48px"
      }}>
        配送について
      </h1>

      <div style={{
        display: "grid",
        gap: "48px"
      }}>
        {/* 配送料 */}
        <section>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#222222",
            marginBottom: "16px"
          }}>
            配送料
          </h2>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7,
            marginBottom: "16px"
          }}>
            全国一律 600円（税込）
          </p>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7
          }}>
            ※ 10,000円以上のご購入で送料無料
          </p>
        </section>

        {/* 配送日数 */}
        <section>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#222222",
            marginBottom: "16px"
          }}>
            配送日数
          </h2>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7,
            marginBottom: "16px"
          }}>
            ご注文確定後、通常3〜5営業日でお届けいたします。
          </p>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7
          }}>
            ※ 在庫状況や地域により前後する場合がございます。<br />
            ※ 土日祝日は発送業務を行っておりません。
          </p>
        </section>

        {/* 配送業者 */}
        <section>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#222222",
            marginBottom: "16px"
          }}>
            配送業者
          </h2>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7
          }}>
            ヤマト運輸または日本郵便にてお届けいたします。<br />
            配送業者のご指定はできませんので、予めご了承ください。
          </p>
        </section>

        {/* お届け先について */}
        <section>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#222222",
            marginBottom: "16px"
          }}>
            お届け先について
          </h2>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7,
            marginBottom: "16px"
          }}>
            日本国内のみの配送となります。
          </p>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7
          }}>
            離島など一部地域については、配送に通常よりお時間をいただく場合がございます。
          </p>
        </section>

        {/* 配送時間指定 */}
        <section>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#222222",
            marginBottom: "16px"
          }}>
            配送時間指定
          </h2>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7
          }}>
            配送時間のご指定は承っておりません。<br />
            不在の場合は、不在票をご確認の上、配送業者へ再配達のご依頼をお願いいたします。
          </p>
        </section>
      </div>
    </div>
  );
}
