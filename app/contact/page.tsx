"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: 実際のフォーム送信処理（メール送信APIなど）
    // 現在は仮の処理
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{
        fontSize: "clamp(32px, 5vw, 40px)",
        fontWeight: 600,
        color: "#111827",
        marginBottom: "24px",
        letterSpacing: "-0.01em"
      }}>
        お問い合わせ
      </h1>

      <p style={{
        fontSize: "15px",
        color: "#6B7280",
        lineHeight: 1.7,
        marginBottom: "48px"
      }}>
        商品やサービスに関するご質問、ご不明点がございましたら、お気軽にお問い合わせください。
      </p>

      {submitStatus === "success" && (
        <div style={{
          padding: "16px",
          backgroundColor: "#E8F5E9",
          border: "1px solid #4CAF50",
          borderRadius: "4px",
          marginBottom: "32px",
          color: "#2E7D32"
        }}>
          お問い合わせを送信しました。ご連絡いただきありがとうございます。
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* お名前 */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{
            display: "block",
            fontSize: "14px",
            fontWeight: 600,
            color: "#111827",
            marginBottom: "8px"
          }}>
            お名前 <span style={{ color: "#FF0000" }}>*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "15px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              outline: "none",
              transition: "border-color 0.2s ease"
            }}
          />
        </div>

        {/* メールアドレス */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{
            display: "block",
            fontSize: "14px",
            fontWeight: 600,
            color: "#111827",
            marginBottom: "8px"
          }}>
            メールアドレス <span style={{ color: "#FF0000" }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "15px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              outline: "none",
              transition: "border-color 0.2s ease"
            }}
          />
        </div>

        {/* 件名 */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{
            display: "block",
            fontSize: "14px",
            fontWeight: 600,
            color: "#111827",
            marginBottom: "8px"
          }}>
            件名 <span style={{ color: "#FF0000" }}>*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "15px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              outline: "none",
              transition: "border-color 0.2s ease"
            }}
          />
        </div>

        {/* お問い合わせ内容 */}
        <div style={{ marginBottom: "32px" }}>
          <label style={{
            display: "block",
            fontSize: "14px",
            fontWeight: 600,
            color: "#111827",
            marginBottom: "8px"
          }}>
            お問い合わせ内容 <span style={{ color: "#FF0000" }}>*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={8}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "15px",
              border: "1px solid #EEEEEE",
              borderRadius: "4px",
              outline: "none",
              resize: "vertical",
              fontFamily: "inherit",
              transition: "border-color 0.2s ease"
            }}
          />
        </div>

        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "16px",
            fontSize: "16px",
            fontWeight: 600,
            color: "white",
            backgroundColor: isSubmitting ? "#9CA3AF" : "#1a1a1a",
            border: "none",
            borderRadius: "8px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
          }}
        >
          {isSubmitting ? "送信中..." : "送信する"}
        </button>
      </form>

      {/* お問い合わせ先情報 */}
      <div style={{
        marginTop: "64px",
        padding: "32px",
        backgroundColor: "#F9FAFB",
        borderRadius: "12px",
        border: "1px solid #E5E7EB"
      }}>
        <h2 style={{
          fontSize: "20px",
          fontWeight: 600,
          color: "#111827",
          marginBottom: "16px",
          letterSpacing: "-0.01em"
        }}>
          その他のお問い合わせ方法
        </h2>
        <p style={{
          fontSize: "15px",
          color: "#6B7280",
          lineHeight: 1.7,
          marginBottom: "8px"
        }}>
          メールアドレス: office@ergogain.co.jp
        </p>
        <p style={{
          fontSize: "15px",
          color: "#6B7280",
          lineHeight: 1.7
        }}>
          営業時間: 平日 10:00〜17:00
        </p>
      </div>
    </div>
  );
}
