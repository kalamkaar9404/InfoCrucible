import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Hero from '../components/common/Hero';
import NewsCard from '../components/common/NewsCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

import '../components/common/Hero.css';
import '../components/common/NewsCard.css';
import './HomePage.css';

const VALID_CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

function HomePage() {
  
  const { categoryName, searchQuery } = useParams();

  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCategory, setDisplayCategory] = useState('Latest');

  useEffect(() => {
    let fetchCategory = null;
    setError(null);

    
    if (searchQuery) {
      setDisplayCategory(`Results for "${decodeURIComponent(searchQuery)}"`);
    } else if (categoryName) {
      const lowerCaseCategory = categoryName.toLowerCase();
      if (VALID_CATEGORIES.includes(lowerCaseCategory)) {
        fetchCategory = lowerCaseCategory;
        setDisplayCategory(lowerCaseCategory.charAt(0).toUpperCase() + lowerCaseCategory.slice(1));
      } else {
        setError(`Invalid category: ${categoryName}. Please select a valid category.`);
        setLoading(false);
        setNewsArticles([]);
        setDisplayCategory('Invalid Category');
        return;
      }
    } else {
      setDisplayCategory('Top Headlines');
    }

    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      setNewsArticles([]);

      const apiKey = process.env.REACT_APP_NEWS_API_KEY;

      if (!apiKey) {
        setError("News API key is missing.");
        setLoading(false);
        return;
      }

      let apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=in&language=en`;

      
      if (searchQuery) {
        apiUrl += `&q=${encodeURIComponent(searchQuery)}`;
      } else if (fetchCategory) {
        apiUrl += `&category=${fetchCategory}`;
      }

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          let errorMsg = `HTTP error ${response.status}: Failed to fetch news.`;
          try {
            const errorData = await response.json();
            errorMsg = `API Error (${response.status}): ${errorData.message || 'Check API documentation or key.'}`;
          } catch (parseError) {}
          throw new Error(errorMsg);
        }
        const data = await response.json();

        
        if ((data.status === "success" || data.status === "ok") && data.results) {
          const validArticles = data.results.filter(
            article => article.title && article.link && article.image_url
          );
          setNewsArticles(validArticles);
          if (validArticles.length === 0) {
            setError(searchQuery
              ? `No articles found for "${decodeURIComponent(searchQuery)}".`
              : (fetchCategory ? `No articles found for category: ${displayCategory}.` : "No articles found.")
            );
          }
        } else if (data.status === "error") {
          setError(`API Error: ${data.message || 'Unknown API error'}`);
        } else {
          setError("Received unexpected data structure from API.");
        }
      } catch (err) {
        setError(err.message.includes('Failed to fetch') ? "Network error: Could not fetch news." : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [categoryName, searchQuery, displayCategory]);

  const handleVerifyClick = (articleUrl) => {
    if (!articleUrl) return;
    alert(`Verification requested for: ${articleUrl}\n(Backend call needed)`);
    
  };

  return (
    <div>
      {/* <Hero /> */}

      <div className="page-content">
        <h2 style={{ textAlign: 'center', margin: '1.5rem 0', color: '#333' }}>
          {displayCategory}
        </h2>

        {loading && <LoadingSpinner />}

        {error && !loading && (
          <div className="error-message">⚠️ Error: {error}</div>
        )}

        {!loading && !error && (
          <div className="news-grid-container">
            {newsArticles.length > 0 ? (
              newsArticles.map((article) => (
                <NewsCard
                  key={article.link}
                  title={article.title}
                  description={article.description}
                  image={article.image_url}
                  url={article.link}
                  source={article.source_id}
                  onVerifyClick={handleVerifyClick}
                />
              ))
            ) : (
              <p>No news articles available for this topic.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;