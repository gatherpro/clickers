export default function TokushohoPage() {
  const legalInfo = [
    {
      title: "販売業者",
      content: "株式会社〇〇〇〇（仮）"
    },
    {
      title: "運営統括責任者",
      content: "〇〇 〇〇（仮）"
    },
    {
      title: "所在地",
      content: "〒000-0000\n東京都〇〇区〇〇 0-0-0（仮）"
    },
    {
      title: "電話番号",
      content: "03-0000-0000（仮）\n受付時間：平日 10:00〜17:00"
    },
    {
      title: "メールアドレス",
      content: "info@example.com（仮）"
    },
    {
      title: "販売URL",
      content: "https://example.com（仮）"
    },
    {
      title: "商品代金以外の必要料金",
      content: "送料、決済手数料（一部決済方法）\n詳細は各商品ページおよび購入手続き画面でご確認ください。"
    },
    {
      title: "支払方法",
      content: "クレジットカード、コンビニ決済、銀行振込、その他Shopifyが提供する決済方法"
    },
    {
      title: "支払時期",
      content: "クレジットカード：ご注文確定時\nコンビニ決済：ご注文後7日以内\n銀行振込：ご注文後7日以内"
    },
    {
      title: "商品の引渡時期",
      content: "ご注文確定後、3〜5営業日以内に発送いたします。\n在庫状況や地域により前後する場合がございます。"
    },
    {
      title: "返品・交換について",
      content: "商品到着後7日以内にご連絡いただいた場合のみ承ります。\n詳しくは「返品・交換について」のページをご確認ください。"
    },
    {
      title: "不良品の扱い",
      content: "商品に不良がある場合は、送料弊社負担にて交換または返品を承ります。\n商品到着後7日以内にご連絡ください。"
    },
    {
      title: "返品送料負担",
      content: "不良品・誤配送：弊社負担\nお客様都合：お客様負担"
    },
    {
      title: "屋号またはサービス名",
      content: "Shop（仮）"
    }
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{
        fontSize: "clamp(32px, 5vw, 40px)",
        fontWeight: 600,
        color: "#222222",
        marginBottom: "24px"
      }}>
        特定商取引法に基づく表記
      </h1>

      <p style={{
        fontSize: "15px",
        color: "#666666",
        lineHeight: 1.7,
        marginBottom: "48px"
      }}>
        特定商取引法に基づき、以下の通り表記いたします。
      </p>

      <div style={{
        display: "grid",
        gap: "32px"
      }}>
        {legalInfo.map((item, index) => (
          <div
            key={index}
            style={{
              paddingBottom: "32px",
              borderBottom: index < legalInfo.length - 1 ? "1px solid #EEEEEE" : "none"
            }}
          >
            <h2 style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#222222",
              marginBottom: "12px"
            }}>
              {item.title}
            </h2>
            <p style={{
              fontSize: "15px",
              color: "#666666",
              lineHeight: 1.7,
              whiteSpace: "pre-line"
            }}>
              {item.content}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: "64px",
        padding: "32px",
        backgroundColor: "#FAFAFA",
        borderRadius: "8px",
        border: "1px solid #EEEEEE"
      }}>
        <p style={{
          fontSize: "14px",
          color: "#666666",
          lineHeight: 1.7
        }}>
          ※ 上記の情報は仮の内容です。実際の事業者情報に置き換えてください。<br />
          ※ 特定商取引法に基づく表記は、消費者保護のために法律で義務付けられています。
        </p>
      </div>
    </div>
  );
}
