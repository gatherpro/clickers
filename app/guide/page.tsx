export default function GuidePage() {
  return (
    <div>
      {/* ヒーローセクション */}
      <section style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "80px 24px 60px",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "clamp(36px, 6vw, 48px)",
          fontWeight: 700,
          color: "#111827",
          marginBottom: "24px",
          letterSpacing: "-0.02em",
          lineHeight: 1.2
        }}>
          ご利用ガイド
        </h1>
        <p style={{
          fontSize: "clamp(15px, 2.5vw, 16px)",
          color: "#6B7280",
          lineHeight: 1.8,
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          ClackTaでのお買い物をより快適にお楽しみいただくために。<br/>
          配送やご返品に関する大切な情報をまとめました。
        </p>
      </section>

      {/* 発送について */}
      <section style={{
        backgroundColor: "#F9FAFB",
        padding: "80px 24px"
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto"
        }}>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 32px)",
            fontWeight: 600,
            color: "#111827",
            marginBottom: "48px",
            letterSpacing: "-0.01em",
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
            <span style={{
              display: "inline-block",
              padding: "8px 20px",
              backgroundColor: "#ECFEFF",
              color: "#0891B2",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "24px"
            }}>
              01
            </span>
            発送について
          </h2>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px"
          }}>
            {/* 配送スケジュール */}
            <div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "16px",
                letterSpacing: "-0.01em"
              }}>
                配送スケジュール
              </h3>
              <p style={{
                fontSize: "15px",
                color: "#6B7280",
                lineHeight: 1.8
              }}>
                ご注文受付後、通常2〜4営業日以内に発送手続きを行います。<br/>
                お届けまでは発送から約3〜6日程度かかります（地域により異なります）。
              </p>
            </div>

            {/* 配送方法 */}
            <div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "16px",
                letterSpacing: "-0.01em"
              }}>
                配送方法
              </h3>
              <p style={{
                fontSize: "15px",
                color: "#6B7280",
                lineHeight: 1.8
              }}>
                日本郵便またはヤマト運輸にて配送いたします。<br/>
                配送会社の指定はお受けしておりません。ご了承ください。
              </p>
            </div>

            {/* 配送状況の確認 */}
            <div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "16px",
                letterSpacing: "-0.01em"
              }}>
                配送状況の確認
              </h3>
              <p style={{
                fontSize: "15px",
                color: "#6B7280",
                lineHeight: 1.8
              }}>
                商品発送時に、お問い合わせ番号（追跡番号）をメールでお送りします。<br/>
                配送会社の追跡サービスで、リアルタイムに配送状況をご確認いただけます。
              </p>
            </div>

            {/* 営業日カレンダー */}
            <div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "16px",
                letterSpacing: "-0.01em"
              }}>
                営業日カレンダー
              </h3>
              <p style={{
                fontSize: "15px",
                color: "#6B7280",
                lineHeight: 1.8
              }}>
                平日（月〜金）が営業日です。土日祝日はお休みをいただいております。<br/>
                休業日のご注文・お問い合わせは、翌営業日より順次対応させていただきます。<br/>
                年末年始・GW・お盆期間などの特別休業日は、お知らせにてご案内いたします。
              </p>
            </div>

            {/* 丁寧な梱包でお届け */}
            <div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "16px",
                letterSpacing: "-0.01em"
              }}>
                丁寧な梱包でお届け
              </h3>
              <p style={{
                fontSize: "15px",
                color: "#6B7280",
                lineHeight: 1.8
              }}>
                大切な商品を安全にお届けするため、一つひとつ丁寧に梱包しています。<br/>
                環境への配慮から、必要最小限の梱包材を使用しております。<br/>
                プレゼント包装が必要な場合は、お問い合わせフォームよりご相談ください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* キャンセル・返品について */}
      <section style={{
        backgroundColor: "white",
        padding: "80px 24px"
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto"
        }}>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 32px)",
            fontWeight: 600,
            color: "#111827",
            marginBottom: "48px",
            letterSpacing: "-0.01em",
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
            <span style={{
              display: "inline-block",
              padding: "8px 20px",
              backgroundColor: "#ECFEFF",
              color: "#0891B2",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "24px"
            }}>
              02
            </span>
            キャンセル・返品について
          </h2>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px"
          }}>
            {/* キャンセルポリシー */}
            <div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "16px",
                letterSpacing: "-0.01em"
              }}>
                キャンセルポリシー
              </h3>
              <p style={{
                fontSize: "15px",
                color: "#6B7280",
                lineHeight: 1.8,
                marginBottom: "12px"
              }}>
                商品発送前であれば、ご注文のキャンセルが可能です。<br/>
                キャンセルご希望の際は、できるだけ早くお問い合わせフォームからご連絡ください。
              </p>
              <p style={{
                fontSize: "14px",
                color: "#DC2626",
                lineHeight: 1.8,
                backgroundColor: "#FEF2F2",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #FEE2E2"
              }}>
                ※商品発送後のキャンセルは承れませんので、あらかじめご了承ください。
              </p>
            </div>

            {/* 返品ポリシー */}
            <div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "16px",
                letterSpacing: "-0.01em"
              }}>
                返品ポリシー
              </h3>
              <p style={{
                fontSize: "15px",
                color: "#6B7280",
                lineHeight: 1.8,
                marginBottom: "16px"
              }}>
                商品到着日より7日以内にご連絡いただいた場合のみ、返品対応が可能です。
              </p>

              <div style={{
                backgroundColor: "#F9FAFB",
                padding: "24px",
                borderRadius: "12px",
                border: "1px solid #E5E7EB"
              }}>
                <p style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#111827",
                  marginBottom: "12px"
                }}>
                  返品対応可能なケース：
                </p>
                <ul style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  lineHeight: 1.8,
                  paddingLeft: "20px",
                  marginBottom: "16px"
                }}>
                  <li>商品に初期不良や破損があった場合</li>
                  <li>ご注文商品と異なる商品が届いた場合</li>
                  <li>配送時のトラブルで商品が破損した場合</li>
                </ul>

                <p style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#111827",
                  marginBottom: "12px"
                }}>
                  返品対応できないケース：
                </p>
                <ul style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  lineHeight: 1.8,
                  paddingLeft: "20px"
                }}>
                  <li>お客様のご都合による返品（思っていたのと違う、など）</li>
                  <li>到着後8日以上経過している場合</li>
                  <li>一度でも使用された商品</li>
                  <li>お客様の過失で傷や汚れがついた商品</li>
                  <li>タグや付属品を紛失された場合</li>
                </ul>
              </div>
            </div>

            {/* 返品の流れ */}
            <div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "16px",
                letterSpacing: "-0.01em"
              }}>
                返品の流れ
              </h3>
              <ol style={{
                fontSize: "15px",
                color: "#6B7280",
                lineHeight: 2,
                paddingLeft: "20px"
              }}>
                <li>お問い合わせフォームから返品の旨をご連絡</li>
                <li>返送先の住所と詳細な手順をメールでご案内</li>
                <li>商品を適切に梱包し、指定住所へ返送</li>
                <li>当店で商品確認後、返金手続きを開始</li>
              </ol>
            </div>

            {/* 返送送料 */}
            <div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "16px",
                letterSpacing: "-0.01em"
              }}>
                返送送料
              </h3>
              <p style={{
                fontSize: "15px",
                color: "#6B7280",
                lineHeight: 1.8
              }}>
                当店の不備による返品の場合、返送料は当店にて負担いたします。<br/>
                お客様都合での返品の場合、返送料はお客様のご負担となります。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 返金について */}
      <section style={{
        backgroundColor: "#F9FAFB",
        padding: "80px 24px"
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto"
        }}>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 32px)",
            fontWeight: 600,
            color: "#111827",
            marginBottom: "48px",
            letterSpacing: "-0.01em",
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
            <span style={{
              display: "inline-block",
              padding: "8px 20px",
              backgroundColor: "#ECFEFF",
              color: "#0891B2",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "24px"
            }}>
              03
            </span>
            返金について
          </h2>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px"
          }}>
            {/* 返金の基本方針 */}
            <div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "16px",
                letterSpacing: "-0.01em"
              }}>
                返金の基本方針
              </h3>
              <p style={{
                fontSize: "15px",
                color: "#6B7280",
                lineHeight: 1.8
              }}>
                返品された商品を確認後、お支払いいただいた方法に応じた返金手続きを行います。
              </p>
            </div>

            {/* クレジットカードでお支払いの場合 */}
            <div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "16px",
                letterSpacing: "-0.01em"
              }}>
                クレジットカードでお支払いの場合
              </h3>
              <p style={{
                fontSize: "15px",
                color: "#6B7280",
                lineHeight: 1.8
              }}>
                決済会社経由でのご返金となります。<br/>
                返金処理から実際の返金まで、1〜2ヶ月ほどお時間をいただく場合があります。<br/>
                具体的な返金時期については、ご利用のカード会社へお問い合わせください。
              </p>
            </div>

            {/* 銀行振込でお支払いの場合 */}
            <div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "16px",
                letterSpacing: "-0.01em"
              }}>
                銀行振込でお支払いの場合
              </h3>
              <p style={{
                fontSize: "15px",
                color: "#6B7280",
                lineHeight: 1.8
              }}>
                ご指定の口座へ直接お振込みいたします。<br/>
                商品確認後、5〜7営業日以内にお振込み手続きを完了いたします。<br/>
                振込手数料は当店にて負担いたします。
              </p>
            </div>

            {/* 返金金額 */}
            <div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "16px",
                letterSpacing: "-0.01em"
              }}>
                返金金額
              </h3>
              <p style={{
                fontSize: "15px",
                color: "#6B7280",
                lineHeight: 1.8
              }}>
                商品代金を全額ご返金いたします。<br/>
                当店の不備が原因の返品の場合、送料込みで全額返金いたします。<br/>
                お客様都合での返品の場合、送料はお客様負担となります。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
