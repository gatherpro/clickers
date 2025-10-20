export default function AboutPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{
        fontSize: "clamp(32px, 5vw, 40px)",
        fontWeight: 600,
        color: "#222222",
        marginBottom: "48px"
      }}>
        私たちについて
      </h1>

      <div style={{
        display: "grid",
        gap: "64px"
      }}>
        {/* ブランドについて */}
        <section>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#222222",
            marginBottom: "16px"
          }}>
            ブランドについて
          </h2>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7,
            marginBottom: "16px"
          }}>
            私たちは、日々の暮らしをより豊かにする厳選された商品をお届けしています。
            シンプルで機能的なデザインを追求し、長く使い続けられる価値ある商品を取り揃えています。
          </p>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7
          }}>
            お客様の生活に寄り添い、本当に必要とされる商品だけを厳選してご紹介することをお約束します。
          </p>
        </section>

        {/* 素材へのこだわり */}
        <section>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#222222",
            marginBottom: "16px"
          }}>
            素材へのこだわり
          </h2>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7,
            marginBottom: "16px"
          }}>
            使用する素材は、環境への配慮と品質の両立を目指して選定しています。
            耐久性に優れ、長期間お使いいただける素材を厳選しています。
          </p>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7
          }}>
            また、可能な限り持続可能な製造プロセスを経た素材を優先的に採用しています。
          </p>
        </section>

        {/* 製造背景 */}
        <section>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#222222",
            marginBottom: "16px"
          }}>
            製造背景
          </h2>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7,
            marginBottom: "16px"
          }}>
            私たちの商品は、確かな技術を持つ製造パートナーとの協力のもとで作られています。
            品質管理を徹底し、お客様に安心してお使いいただける商品作りを心がけています。
          </p>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7
          }}>
            各製品は、企画から製造、品質チェックまで、丁寧なプロセスを経てお客様のもとへお届けしています。
          </p>
        </section>

        {/* 品質へのこだわり */}
        <section>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#222222",
            marginBottom: "16px"
          }}>
            品質へのこだわり
          </h2>
          <p style={{
            fontSize: "15px",
            color: "#666666",
            lineHeight: 1.7
          }}>
            すべての商品は、厳格な品質基準をクリアしたもののみを販売しています。
            お客様に長くご愛用いただけるよう、細部まで品質にこだわり抜いています。
          </p>
        </section>
      </div>
    </div>
  );
}
