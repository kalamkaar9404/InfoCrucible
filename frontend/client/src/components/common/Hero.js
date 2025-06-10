import React, { useEffect, useState } from 'react';
import './Hero.css';

// Dummy fallback trending news (in case API fails)
const fallbackTrending = [
  {
    title: "India wins historic cricket match!",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    url: "#"
  },
  {
    title: "Tech giants announce new AI breakthrough",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    url: "#"
  },
  {
    title: "Global markets rally after positive news",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    url: "#"
  }
];

function Hero() {
  const [trending, setTrending] = useState([]);
  const [current, setCurrent] = useState(0);

  // Fetch trending news from API (using newsdata.io as example)
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const apiKey = process.env.REACT_APP_NEWS_API_KEY;
        const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=us&language=en&category=top`;
        const res = await fetch(url);
        const data = await res.json();
        if ((data.status === "success" || data.status === "ok") && data.results) {
          const valid = data.results
            .filter(a => a.title && a.image_url)
            .slice(0, 5)
            .map(a => ({
              title: a.title,
              image: a.image_url,
              url: a.link
            }));
          setTrending(valid.length ? valid : fallbackTrending);
        } else {
          setTrending(fallbackTrending);
        }
      } catch {
        setTrending(fallbackTrending);
      }
    };
    fetchTrending();
  }, []);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (trending.length < 2) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % trending.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [trending]);

  if (!trending.length) return null;

  return (
    <div className="hero-scrollbar">
      <div className="hero-scrollbar-inner">
        {trending.map((news, idx) => (
          <div
            key={idx}
            className={`hero-slide${idx === current ? " active" : ""}`}
            style={{ backgroundImage: `url(${news.image})` }}
            onClick={() => window.open(news.url, "_blank")}
            tabIndex={0}
            role="button"
            aria-label={news.title}
          >
            <div className="hero-slide-overlay">
              <h2>{news.title}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="hero-dots">
        {trending.map((_, idx) => (
          <span
            key={idx}
            className={`dot${idx === current ? " active" : ""}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;