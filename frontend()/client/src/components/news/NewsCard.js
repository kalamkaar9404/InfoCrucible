// src/components/common/NewsCard.js
import React from 'react';
import './NewsCard.css'; // Make sure to import the CSS

// Define the props the component expects
// Added 'url' and 'onVerifyClick'
interface NewsCardProps {
  title: string;
  description: string;
  image: string;
  url?: string; // Optional URL for the article
  onVerifyClick: (url: string | undefined) => void; // Function to call when verify is clicked
}

function NewsCard({ title, description, image, url, onVerifyClick }: NewsCardProps) {

  const handleVerify = () => {
    // Call the function passed from the parent, passing the article's URL (or undefined)
    onVerifyClick(url);
  };

  return (
    <div className="news-card">
      {image && <img src={image} alt={title || 'News image'} className="news-card-image" />}
      <div className="news-card-content">
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-description">{description}</p>
        <div className="news-card-actions">
           {/* Conditionally render an "Read More" link if URL exists */}
           {url && (
             <a href={url} target="_blank" rel="noopener noreferrer" className="read-more-link">
               Read More
             </a>
           )}
          <button onClick={handleVerify} className="verify-button">
            Verify News
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;