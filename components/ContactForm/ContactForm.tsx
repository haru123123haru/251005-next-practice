'use client';

import { useState } from "react";

export default function ContactForm() {

  // フォームの入力内容を保持するstate
  const [message, setMessage] = useState("");
  // 送信中の状態を管理するstate
  const [submitting, setSubmitting] = useState(false);

  // 🟢 1️⃣ フォーム送信時のイベント型を指定
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('サーバーからの応答がエラーです');
      }

      const data = await response.json();
      alert(data.message);
      setMessage("");
    } catch (error) {
      console.error('送信に失敗しました:', error);
      alert('メッセージの送信に失敗しました。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* 🟢 2️⃣ onChangeのイベント型はReact.ChangeEvent<HTMLTextAreaElement> */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
          placeholder="メッセージを入力..."
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "送信中..." : "送信"}
        </button>
      </form>
    </div>
  );
}
