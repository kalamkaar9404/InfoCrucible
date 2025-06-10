
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './NewsCard.css';



function NewsCard({ title, description, image, url, source }) {

  const navigate = useNavigate(); 

  
  const handleVerify = (event) => {
    event.stopPropagation();
    if (url) {
      
      const encodedUrl = encodeURIComponent(url);
      
      navigate(`/verify/${encodedUrl}`);
      
    } else {
      console.warn("Verify button clicked, but no URL is available for this article.");
     
    }
  };

  const placeholderImage = '/images/placeholder-news.png';

  return (
    <div className="news-card">
       {}
       <div className="news-card-image-wrapper"> {/* Added wrapper */}
         <img
           src={image || placeholderImage}
           alt={title || 'News article preview'}
           className="news-card-image"
           onError={(e) => { (e.target ).src = placeholderImage; }}
           loading="lazy"
         />
       </div>
       <div className="news-card-content">
         {source && <span className="news-card-source">{source}</span>}
         {title && <h3 className="news-card-title">{title}</h3>}
         {description && <p className="news-card-description">{description}</p>}

         <div className="news-card-actions">
           {url && (
             <a
               href={url}
               target="_blank"
               rel="noopener noreferrer"
               className="action-link read-more-link"
               onClick={(e) => e.stopPropagation()}
             >
               Read More
             </a>
           )}
           {}
           <button
              onClick={handleVerify} // Use the updated handler
              className="action-button verify-button"
              disabled={!url} // Keep disabled if no URL
              title={!url ? "Cannot verify without article URL" : "Verify this news article"}
           >
             Verify News
           </button>
         </div>
       </div>
    </div>
  );
}

export default NewsCard;