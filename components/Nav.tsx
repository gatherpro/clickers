"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { hasToken } from "../lib/token";
import { useCart } from "../contexts/CartContext";

export default function Nav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProductMenu, setShowProductMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // ログイン状態をチェック
    setIsLoggedIn(hasToken());
    // モバイルメニューを閉じる
    setMobileMenuOpen(false);
  }, [pathname]);

  const productCategories = [
    { href: "/c/all", label: "All" },
    { href: "/c/clickkeyholder", label: "Click Key Holder" },
  ];

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/news", label: "お知らせ" },
    { href: "/guide", label: "ガイド" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backgroundColor: "#FFFFFF",
      borderBottom: "1px solid #E5E7EB",
      boxShadow: isScrolled ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)" : "none",
      transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
    }}>
      {/* 1段目：ブランド名とカート・アカウント */}
      <div style={{
        borderBottom: "1px solid #E5E7EB",
        backgroundColor: "#FAFAFA"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          {/* ハンバーガーメニューボタン（モバイルのみ） */}
          <div style={{ flex: 1 }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                color: "#111827"
              }}
              className="mobile-menu-button"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <><path d="M6 18L18 6M6 6l12 12" /></>
                ) : (
                  <><path d="M3 12h18M3 6h18M3 18h18" /></>
                )}
              </svg>
            </button>
          </div>
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              justifyContent: "center"
            }}
          >
            <span style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#111827",
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}>
              ClackTa
              <span style={{
                fontSize: "14px",
                fontWeight: 400,
                color: "#6B7280",
                letterSpacing: "0"
              }}>
                （クラクタ）
              </span>
            </span>
          </Link>

          {/* カート・アカウント（右側） */}
          <div style={{
            flex: 1,
            display: "flex",
            gap: "24px",
            alignItems: "center",
            justifyContent: "flex-end"
          }}>
            {/* カートアイコン */}
            <Link
              href="/cart"
              style={{
                position: "relative",
                fontSize: "14px",
                fontWeight: pathname === "/cart" ? 600 : 400,
                color: pathname === "/cart" ? "#111827" : "#6B7280",
                textDecoration: "none",
                transition: "color 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
                padding: "8px 0"
              }}
            >
              カート
              {itemCount > 0 && (
                <span style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-16px",
                  backgroundColor: "#0891B2",
                  color: "white",
                  fontSize: "11px",
                  fontWeight: 700,
                  borderRadius: "10px",
                  padding: "2px 6px",
                  minWidth: "18px",
                  textAlign: "center"
                }}>
                  {itemCount}
                </span>
              )}
            </Link>

            {/* マイアカウント */}
            <Link
              href={isLoggedIn ? "/account" : "/login"}
              style={{
                fontSize: "14px",
                fontWeight: pathname === "/account" || pathname === "/login" ? 600 : 400,
                color: pathname === "/account" || pathname === "/login" ? "#111827" : "#6B7280",
                textDecoration: "none",
                transition: "color 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
                padding: "8px 0"
              }}
            >
              マイアカウント
            </Link>
          </div>
        </div>
      </div>

      {/* 2段目：メニュー */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        height: "56px"
      }}>
          {/* Home */}
          <Link
            href="/"
            style={{
              fontSize: "16px",
              fontWeight: pathname === "/" ? 700 : 600,
              color: pathname === "/" ? "#111827" : "#374151",
              textDecoration: "none",
              transition: "color 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
              position: "relative",
              padding: "8px 0"
            }}
          >
            Home
            {pathname === "/" && (
              <span style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: "#0891B2"
              }} />
            )}
          </Link>

          {/* Product ドロップダウンメニュー */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setShowProductMenu(true)}
            onMouseLeave={() => setShowProductMenu(false)}
          >
            <Link
              href="/c/all"
              style={{
                fontSize: "16px",
                fontWeight: pathname.startsWith("/c/") ? 700 : 600,
                color: pathname.startsWith("/c/") ? "#111827" : "#374151",
                textDecoration: "none",
                transition: "color 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
                position: "relative",
                padding: "8px 0",
                display: "inline-block",
                cursor: "pointer"
              }}
            >
              Product
              {pathname.startsWith("/c/") && (
                <span style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "#0891B2"
                }} />
              )}
            </Link>

            {/* ドロップダウンメニュー */}
            {showProductMenu && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: "0",
                paddingTop: "8px",
                backgroundColor: "transparent",
                zIndex: 1000
              }}>
                <div style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  minWidth: "200px",
                  overflow: "hidden"
                }}>
                {productCategories.map((category, index) => {
                  const isActive = pathname === category.href;
                  const isAll = category.href === "/c/all";

                  return (
                    <div key={category.href}>
                      <Link
                        href={category.href}
                        style={{
                          display: "block",
                          padding: isAll ? "14px 16px" : "12px 16px 12px 32px",
                          fontSize: isAll ? "15px" : "14px",
                          color: isActive ? "#111827" : "#6B7280",
                          fontWeight: isAll ? 600 : (isActive ? 600 : 400),
                          textDecoration: "none",
                          transition: "background-color 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
                          backgroundColor: isActive ? "#F9FAFB" : "transparent",
                          borderBottom: (isAll && index === 0) ? "1px solid #E5E7EB" : "none"
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = "#F9FAFB";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }
                        }}
                      >
                        {category.label}
                      </Link>
                      {isAll && index === 0 && (
                        <div style={{
                          padding: "8px 16px 4px",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#9CA3AF",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px"
                        }}>
                          Categories
                        </div>
                      )}
                    </div>
                  );
                })}
                </div>
              </div>
            )}
          </div>

          {/* About, お知らせ, ガイド, Contact */}
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: "16px",
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? "#111827" : "#374151",
                  textDecoration: "none",
                  transition: "color 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
                  position: "relative",
                  padding: "8px 0"
                }}
              >
                {item.label}
                {isActive && (
                  <span style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "#0891B2"
                  }} />
                )}
              </Link>
            );
          })}
        </div>

      {/* モバイルメニューオーバーレイ */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* モバイルメニュー */}
      <div
        className="mobile-menu"
        style={{
          position: "fixed",
          top: "0",
          left: mobileMenuOpen ? "0" : "-280px",
          width: "280px",
          height: "100vh",
          backgroundColor: "#FFFFFF",
          zIndex: 1001,
          transition: "left 0.3s ease",
          overflowY: "auto",
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div style={{ padding: "24px 20px" }}>
          {/* メニュー項目 */}
          <Link
            href="/"
            style={{
              display: "block",
              padding: "14px 0",
              fontSize: "16px",
              fontWeight: pathname === "/" ? 600 : 400,
              color: pathname === "/" ? "#0891B2" : "#111827",
              textDecoration: "none",
              borderBottom: "1px solid #E5E7EB"
            }}
          >
            Home
          </Link>

          <Link
            href="/c/all"
            style={{
              display: "block",
              padding: "14px 0",
              fontSize: "16px",
              fontWeight: pathname.startsWith("/c/") ? 600 : 400,
              color: pathname.startsWith("/c/") ? "#0891B2" : "#111827",
              textDecoration: "none",
              borderBottom: "1px solid #E5E7EB"
            }}
          >
            Product
          </Link>

          {/* サブメニュー */}
          {pathname.startsWith("/c/") && (
            <div style={{ paddingLeft: "16px", backgroundColor: "#F9FAFB" }}>
              {productCategories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  style={{
                    display: "block",
                    padding: "10px 0",
                    fontSize: "14px",
                    fontWeight: pathname === cat.href ? 600 : 400,
                    color: pathname === cat.href ? "#0891B2" : "#6B7280",
                    textDecoration: "none"
                  }}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          )}

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "block",
                padding: "14px 0",
                fontSize: "16px",
                fontWeight: pathname === item.href ? 600 : 400,
                color: pathname === item.href ? "#0891B2" : "#111827",
                textDecoration: "none",
                borderBottom: "1px solid #E5E7EB"
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* CSS for mobile responsiveness */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .mobile-menu-button {
            display: block !important;
          }
          nav > div:nth-child(2) {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
