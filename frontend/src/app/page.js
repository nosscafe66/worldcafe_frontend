// pages/page.js
"use client";
import React, { useState, useEffect } from 'react';
import './page.css';

function DataDisplayComponent() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(new Set());

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
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.name;
    if (selectedCategories.has(category)) {
      selectedCategories.delete(category);
    } else {
      selectedCategories.add(category);
    }
    setSelectedCategories(new Set(selectedCategories));
  };

  const filteredData = data.filter(item =>
    (item.text.includes(searchTerm) || item.user_id.includes(searchTerm)) &&
    (selectedCategories.size === 0 || selectedCategories.has(item.category))
  );

  if (isLoading) {
    return <p>データを読み込み中...</p>;
  }

  const uniqueCategories = Array.from(new Set(data.map(item => item.category)));

  return (
    <div className="container">
      <h1>LINE Bot Messages</h1>
      <input 
        type="text" 
        placeholder="メッセージを検索" 
        value={searchTerm} 
        onChange={handleSearchChange} 
        className="search-input"
      />

      <div className="category-filters">
        {uniqueCategories.map((category, index) => (
          <label key={index}>
            <input 
              type="checkbox" 
              name={category} 
              onChange={handleCategoryChange} 
            />
            {category}
          </label>
        ))}
      </div>

      <div className="card-container">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div key={index} className="card">
              <p>Message: {item.text}</p>
              <p>User ID: {item.user_id}</p>
              <p>Category: {item.category}</p>
            </div>
          ))
        ) : (
          <p>データなし</p>
        )}
      </div>
    </div>
  );
}

export default DataDisplayComponent;
