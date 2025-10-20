import Link from "next/link";
import { getProducts } from "@/lib/shopify";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const products = await getProducts(50);

  // カテゴリ名の表示を設定
  const categoryNames: { [key: string]: string } = {
    'all': 'すべての商品',
    'clickkeyholder': 'Click Key Holder',
  };

  const displayName = categoryNames[params.category] || params.category;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{
        fontSize: "clamp(32px, 5vw, 40px)",
        fontWeight: 600,
        color: "#111827",
        marginBottom: "48px",
        letterSpacing: "-0.01em"
      }}>
        {displayName}
      </h1>

      {products.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "80px 24px",
          color: "#6B7280"
        }}>
          <p style={{ fontSize: "18px", marginBottom: "24px" }}>
            商品が見つかりませんでした
          </p>
          <p style={{ fontSize: "15px" }}>
            Shopify管理画面で商品にタグ「site2」を追加してください
          </p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "40px"
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
    </div>
  );
}
