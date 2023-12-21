import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.LINE_BACKEND_URL}/api/messages`);
      const data = await res.json();
      setMessages(data);
    }

    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {messages.map((message) => (
          <div key={message.id}>
            {message.text} - {message.user_id}
          </div>
        ))}
      </div>
    </main>
  );
}
