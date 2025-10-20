import Link from "next/link";

export default function Footer() {
  const footerLinks = [
    {
      title: "ショップ",
      links: [
        { label: "商品一覧", href: "/c/all" },
        { label: "About", href: "/about" },
        { label: "カート", href: "/cart" },
      ]
    },
    {
      title: "サポート",
      links: [
        { label: "お問い合わせ", href: "/contact" },
        { label: "配送について", href: "/guide/shipping" },
        { label: "返品・交換", href: "/guide/return" },
      ]
    },
    {
      title: "アカウント",
      links: [
        { label: "マイアカウント", href: "/account" },
        { label: "ログイン", href: "/login" },
      ]
    },
    {
      title: "法的情報",
      links: [
        { label: "特定商取引法", href: "/legal/tokushoho" },
      ]
    }
  ];

  return (
    <footer style={{
      backgroundColor: "#F9FAFB",
      borderTop: "1px solid #E5E7EB",
      marginTop: "auto"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "64px 24px 32px"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "48px",
          marginBottom: "48px"
        }}>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "16px",
                letterSpacing: "-0.01em"
              }}>
                {section.title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {section.links.map((link) => (
                  <li key={link.href} style={{ marginBottom: "12px" }}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "14px",
                        color: "#6B7280",
                        textDecoration: "none",
                        transition: "color 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          paddingTop: "24px",
          borderTop: "1px solid #E5E7EB",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          <p style={{
            fontSize: "13px",
            color: "#9CA3AF",
            margin: 0
          }}>
            © 2025 ClackTa All rights reserved.
          </p>

          <Link
            href="/"
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#111827",
              textDecoration: "none",
              letterSpacing: "-0.01em",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            ClackTa
            <span style={{
              fontSize: "12px",
              fontWeight: 400,
              color: "#6B7280"
            }}>
              （クラクタ）
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
