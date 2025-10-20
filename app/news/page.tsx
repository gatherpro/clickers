export default function NewsPage() {
  // 仮のお知らせデータ
  const newsItems = [
    {
      id: 1,
      date: "2025-01-15",
      title: "新商品「Click Key Holder」を発売しました",
      content: "人間工学に基づいたキーホルダーが新登場。快適な使い心地をぜひお試しください。"
    },
    {
      id: 2,
      date: "2025-01-10",
      title: "年末年始休業のお知らせ",
      content: "誠に勝手ながら、12月30日〜1月3日まで休業させていただきます。"
    },
    {
      id: 3,
      date: "2025-01-05",
      title: "ClackTa公式サイトをリニューアルしました",
      content: "より使いやすく、見やすいデザインに生まれ変わりました。"
    }
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{
        fontSize: "clamp(32px, 5vw, 40px)",
        fontWeight: 600,
        color: "#111827",
        marginBottom: "48px",
        letterSpacing: "-0.01em"
      }}>
        お知らせ
      </h1>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px"
      }}>
        {newsItems.map((item) => (
          <article
            key={item.id}
            style={{
              backgroundColor: "white",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "32px",
              transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
            }}
          >
            <time style={{
              display: "block",
              fontSize: "14px",
              color: "#6B7280",
              marginBottom: "12px"
            }}>
              {item.date}
            </time>
            <h2 style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#111827",
              marginBottom: "16px",
              letterSpacing: "-0.01em"
            }}>
              {item.title}
            </h2>
            <p style={{
              fontSize: "15px",
              color: "#6B7280",
              lineHeight: 1.7
            }}>
              {item.content}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
