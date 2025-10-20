export default function ReturnPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{
        fontSize: "clamp(32px, 5vw, 40px)",
        fontWeight: 600,
        color: "#222222",
        marginBottom: "48px"
      }}>
        返品・交換について
      </h1>

      <div style={{
        display: "grid",
        gap: "48px"
      }}>
        {/* 返品・交換の条件 */}
        <section>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#222222",
            marginBottom: "16px"
          }}>
            返品・交換の条件
          </h2>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7,
            marginBottom: "16px"
          }}>
            商品到着後7日以内にご連絡いただいた場合のみ、返品・交換を承ります。
          </p>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7
          }}>
            以下の条件を満たす商品に限ります：
          </p>
          <ul style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7,
            paddingLeft: "24px",
            marginTop: "8px"
          }}>
            <li>未使用・未開封の状態</li>
            <li>商品タグや付属品がすべて揃っている</li>
            <li>商品や外箱に破損・汚損がない</li>
          </ul>
        </section>

        {/* 不良品・誤配送の場合 */}
        <section>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#222222",
            marginBottom: "16px"
          }}>
            不良品・誤配送の場合
          </h2>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7,
            marginBottom: "16px"
          }}>
            商品に不良がある場合や、ご注文と異なる商品が届いた場合は、送料弊社負担にて交換または返品を承ります。
          </p>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7
          }}>
            商品到着後7日以内にお問い合わせフォームよりご連絡ください。
          </p>
        </section>

        {/* お客様都合による返品 */}
        <section>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#222222",
            marginBottom: "16px"
          }}>
            お客様都合による返品
          </h2>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7,
            marginBottom: "16px"
          }}>
            イメージ違いやサイズ違いなど、お客様都合による返品の場合は、返送料をご負担いただきます。
          </p>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7
          }}>
            事前にお問い合わせフォームよりご連絡の上、商品をご返送ください。
          </p>
        </section>

        {/* 返金について */}
        <section>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#222222",
            marginBottom: "16px"
          }}>
            返金について
          </h2>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7
          }}>
            返品商品の到着確認後、5〜10営業日以内にご購入時の決済方法へ返金処理を行います。<br />
            お客様都合による返品の場合、返送料を差し引いた金額をご返金いたします。
          </p>
        </section>

        {/* 返品・交換できない商品 */}
        <section>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#222222",
            marginBottom: "16px"
          }}>
            返品・交換できない商品
          </h2>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7
          }}>
            以下の場合は返品・交換をお受けできません：
          </p>
          <ul style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7,
            paddingLeft: "24px",
            marginTop: "8px"
          }}>
            <li>商品到着後8日以上経過した商品</li>
            <li>一度でも使用された商品</li>
            <li>お客様の責任で傷や汚れが生じた商品</li>
            <li>商品タグを外した商品</li>
            <li>セール品・アウトレット品（不良品を除く）</li>
          </ul>
        </section>

        {/* お問い合わせ */}
        <section style={{
          backgroundColor: "#FAFAFA",
          padding: "32px",
          borderRadius: "8px",
          border: "1px solid #EEEEEE"
        }}>
          <h2 style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#222222",
            marginBottom: "16px"
          }}>
            お問い合わせ
          </h2>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7
          }}>
            返品・交換に関するご質問やご相談は、お気軽にお問い合わせください。<br />
            メールアドレス: support@example.com（仮）
          </p>
        </section>
      </div>
    </div>
  );
}
