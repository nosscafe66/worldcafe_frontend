import React, { useState, useEffect } from 'react';

// 例: データ取得用の関数
async function fetchData() {
  try {
    const response = await fetch('https://worldcafe-backend.vercel.app/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function DataDisplayComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(data => {
      setData(data);
    });
  }, []);

  return (
    <div>
      <h1>取得データ</h1>
      {data.map(item => (
        <div key={item.id}>{item.name}</div> // データの形式に応じて変更
      ))}
    </div>
  );
}

export default DataDisplayComponent;