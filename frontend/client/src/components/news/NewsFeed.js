import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsCard from './NewsCard';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <div className="news-feed">
      <h1>Latest News</h1>
      {loading ? (
        <div className="loading">Loading news...</div>
      ) : (
        <div className="news-grid">
          {news.map(article => (
            <NewsCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;