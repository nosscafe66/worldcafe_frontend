// 例: Reactコンポーネント
import React, { useEffect, useState } from 'react';

function DataComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/data`);
      const result = await response.json();
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div> // あなたのデータに応じて調整
      ))}
    </div>
  );
}

export default DataComponent;
