'use client'

import { useState } from "react";

export default function ContactForm() { // 1. コンポーネントに名前をつけましょう

  // フォームの入力内容を保持するstate
  const [message, setMessage] = useState("");
  // 送信中の状態を管理するstate（任意）
  const [submitting, setSubmitting] = useState(false);

  // 2. フォームが送信されたときの処理をまとめた関数
  const handleSubmit = async (e) => {
    // 3. フォームのデフォルトの再読み込みを防ぐ
    e.preventDefault(); 
    
    setSubmitting(true); // 送信中にする

    // 4. fetchを使って自作のAPIにPOSTリクエストを送る
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }), // stateの値をJSONにして送る
      });

      if (!response.ok) {
        throw new Error('サーバーからの応答がエラーです');
      }

      const data = await response.json();
      alert(data.message); // サーバーからの返信をアラート表示
      setMessage(""); // フォームを空にする

    } catch (error) {
      console.error('送信に失敗しました:', error);
      alert('メッセージの送信に失敗しました。');
    } finally {
      setSubmitting(false); // 送信状態を解除
    }
  };

  return (
    <div>
      {/* 5. formタグにonSubmitイベントハンドラを渡す */}
      <form onSubmit={handleSubmit}>
        <textarea 
          // 6. textareaの表示内容をstateと連携させる
          value={message} 
          // 7. 入力があるたびにstateを更新する
          onChange={(e) => setMessage(e.target.value)}
          placeholder="メッセージを入力..."
          required
        />
        {/* 送信中はボタンを無効化する */}
        <button type="submit" disabled={submitting}>
          {submitting ? '送信中...' : '送信'}
        </button>
      </form>
    </div>
  );
}