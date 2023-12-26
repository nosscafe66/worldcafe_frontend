"use client";
import React, { useState, useEffect } from 'react';

function DataDisplayComponent() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // データ読み込み中の状態

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false); // データ読み込み完了
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <p>データを読み込み中...</p>;
  }

  return (
    <div>
      <h1>LINE Bot Messages</h1>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            {/* データの構造に応じて表示を調整 */}
            <p>Message: {item.text}</p>
            <p>User ID: {item.user_id}</p>
            {/* その他のデータフィールド */}
          </div>
        ))
      ) : (
        <p>データなし</p>
      )}
    </div>
  );
}

export default DataDisplayComponent;
