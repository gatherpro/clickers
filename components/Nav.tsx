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
  }, [pathname]);

  const navItems = [
    { href: "/", label: "ホーム" },
    { href: "/c/clickkeyholder", label: "商品" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backgroundColor: "#FFFFFF",
      borderBottom: "1px solid #EEEEEE",
      boxShadow: isScrolled ? "0 1px 3px rgba(0, 0, 0, 0.05)" : "none",
      transition: "all 0.3s ease"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px"
      }}>
        <Link
          href="/"
          style={{
            fontSize: "22px",
            fontWeight: 600,
            color: "#222222",
            textDecoration: "none",
            letterSpacing: "-0.01em"
          }}
        >
          Shop
        </Link>

        <div style={{
          display: "flex",
          gap: "32px",
          alignItems: "center"
        }}>
          {navItems.slice(1).map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: "15px",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#222222" : "#666666",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
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
                    background: "#222222"
                  }} />
                )}
              </Link>
            );
          })}

          {/* カートアイコン */}
          <Link
            href="/cart"
            style={{
              position: "relative",
              fontSize: "15px",
              fontWeight: pathname === "/cart" ? 600 : 400,
              color: pathname === "/cart" ? "#222222" : "#666666",
              textDecoration: "none",
              transition: "color 0.2s ease",
              padding: "8px 0"
            }}
          >
            カート
            {itemCount > 0 && (
              <span style={{
                position: "absolute",
                top: "-4px",
                right: "-16px",
                backgroundColor: "#222222",
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
              fontSize: "15px",
              fontWeight: pathname === "/account" || pathname === "/login" ? 600 : 400,
              color: pathname === "/account" || pathname === "/login" ? "#222222" : "#666666",
              textDecoration: "none",
              transition: "color 0.2s ease",
              padding: "8px 0"
            }}
          >
            マイアカウント
          </Link>
        </div>
      </div>
    </nav>
  );
}
