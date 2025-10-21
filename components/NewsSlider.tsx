"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function NewsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const newsItems = [
    {
      id: 1,
      date: "2025-01-15",
      title: "新商品「Click Key Holder」を発売しました",
    },
    {
      id: 2,
      date: "2025-01-10",
      title: "年末年始休業のお知らせ",
    },
    {
      id: 3,
      date: "2025-01-05",
      title: "ClackTa公式サイトをリニューアルしました",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000); // 5秒ごとにスライド

    return () => clearInterval(timer);
  }, [currentSlide]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheelEvent = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isAnimating) return;

      if (e.deltaY > 0) {
        goToNext();
      } else if (e.deltaY < 0) {
        goToPrev();
      }
    };

    container.addEventListener('wheel', handleWheelEvent, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheelEvent);
    };
  }, [isAnimating, currentSlide]);

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % newsItems.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        backgroundColor: "white",
        borderBottom: "1px solid #E5E7EB",
        overflow: "hidden"
      }}
    >
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        minHeight: "80px"
      }}>
        {/* 上矢印 */}
        <button
          onClick={goToPrev}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "1px solid #E5E7EB",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.18s ease",
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#F9FAFB";
            e.currentTarget.style.borderColor = "#0891B2";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.borderColor = "#E5E7EB";
          }}
          aria-label="前のお知らせ"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>

        {/* お知らせコンテンツ（中央寄せ） */}
        <Link
          href="/news"
          style={{
            textDecoration: "none",
            position: "relative",
            overflow: "hidden",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "600px",
            maxWidth: "800px",
            cursor: "ns-resize"
          }}
        >
          {newsItems.map((item, index) => {
            const offset = index - currentSlide;
            return (
              <div
                key={item.id}
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: `translateX(-50%) translateY(${offset * 100}%)`,
                  opacity: offset === 0 ? 1 : 0,
                  transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                  pointerEvents: offset === 0 ? "auto" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                  width: "100%"
                }}
              >
                <span style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#0891B2",
                  flexShrink: 0,
                  backgroundColor: "#ECFEFF",
                  padding: "6px 14px",
                  borderRadius: "12px"
                }}>
                  NEWS
                </span>
                <span style={{
                  fontSize: "16px",
                  color: "#6B7280",
                  flexShrink: 0
                }}>
                  {item.date}
                </span>
                <span style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "#111827",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>
                  {item.title}
                </span>
              </div>
            );
          })}
        </Link>

        {/* 下矢印 */}
        <button
          onClick={goToNext}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "1px solid #E5E7EB",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.18s ease",
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#F9FAFB";
            e.currentTarget.style.borderColor = "#0891B2";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.borderColor = "#E5E7EB";
          }}
          aria-label="次のお知らせ"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* インジケーター */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          alignItems: "center",
          flexShrink: 0
        }}>
          {newsItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: currentSlide === index ? "#0891B2" : "#D1D5DB",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0
              }}
              aria-label={`お知らせ ${index + 1} へ移動`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
