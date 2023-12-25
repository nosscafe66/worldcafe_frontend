"use client";

import Image from 'next/image';
import styles from './page.module.css';
import { useEffect, useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages().then(data => {
      setMessages(data);
      console.log("================");
    });
  }, []);

  async function fetchMessages() {
    try {
      const response = await fetch('https://worldcafe-backend.vercel.app/');
      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      return [];
    }
  }

  return (
    <main className={styles.main}>
      {/* ... 既存のコード ... */}

      {/* メッセージデータを表示 */}
      <div>
        {messages.length > 0 ? (
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message.text}</li> // ここで各メッセージの内容を表示
            ))}
          </ul>
        ) : (
          <p>No messages found.</p>
        )}
      </div>
    </main>
  );
}
