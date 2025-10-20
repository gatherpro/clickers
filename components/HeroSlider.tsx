"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "新商品登場",
      subtitle: "Click Key Holderで快適な毎日を",
      image: "/slides/slide1.jpg", // 仮のパス
      link: "/c/clickkeyholder",
      backgroundColor: "#E8F5E9"
    },
    {
      id: 2,
      title: "シンプルで美しい",
      subtitle: "厳選された雑貨で、暮らしをもっと豊かに",
      image: "/slides/slide2.jpg", // 仮のパス
      link: "/c/all",
      backgroundColor: "#E3F2FD"
    },
    {
      id: 3,
      title: "品質へのこだわり",
      subtitle: "長く使い続けられる価値ある商品",
      image: "/slides/slide3.jpg", // 仮のパス
      link: "/about",
      backgroundColor: "#FFF3E0"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5秒ごとにスライド

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "400px",
      overflow: "hidden",
      borderRadius: "16px"
    }}>
      {slides.map((slide, index) => (
        <Link
          key={slide.id}
          href={slide.link}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: currentSlide === index ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            backgroundColor: slide.backgroundColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textDecoration: "none",
            cursor: "pointer"
          }}
        >
          {/* TODO: 画像を追加する場合は以下をコメント解除 */}
          {/* <img
            src={slide.image}
            alt={slide.title}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          /> */}
          <div style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "0 24px"
          }}>
            <h2 style={{
              fontSize: "clamp(32px, 6vw, 56px)",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}>
              {slide.title}
            </h2>
            <p style={{
              fontSize: "clamp(16px, 2.5vw, 22px)",
              color: "#6B7280",
              lineHeight: 1.7
            }}>
              {slide.subtitle}
            </p>
          </div>
        </Link>
      ))}

      {/* インジケーター */}
      <div style={{
        position: "absolute",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "12px",
        zIndex: 2
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: currentSlide === index ? "#0891B2" : "#D1D5DB",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            aria-label={`スライド ${index + 1} へ移動`}
          />
        ))}
      </div>
    </div>
  );
}
