import Link from "next/link";
import { getProducts } from "@/lib/shopify";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const products = await getProducts(50);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{
        fontSize: "clamp(32px, 5vw, 40px)",
        fontWeight: 600,
        color: "#222222",
        marginBottom: "48px"
      }}>
        {params.category}
      </h1>

      {products.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "80px 24px",
          color: "#666666"
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
          gap: "32px"
        }}>
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/p/${product.handle}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid #EEEEEE",
                borderRadius: "8px",
                overflow: "hidden",
                transition: "border-color 0.2s ease"
              }}
            >
              {product.images.edges[0] && (
                <img
                  src={product.images.edges[0].node.url}
                  alt={product.images.edges[0].node.altText || product.title}
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    objectFit: "cover"
                  }}
                />
              )}
              <div style={{ padding: "20px" }}>
                <h3 style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#222222",
                  marginBottom: "8px"
                }}>
                  {product.title}
                </h3>
                <p style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#222222"
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
