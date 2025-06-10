// src/pages/NewsVerificationPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner'; 
import './NewsVerificationPage.css'; 

function NewsVerificationPage() {
  
  const { encodedArticleUrl } = useParams();
  const [articleUrl, setArticleUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [verificationResult, setVerificationResult] = useState(null); 
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Decode the URL parameter when the component mounts or parameter changes
    if (encodedArticleUrl) {
      try {
        const decodedUrl = decodeURIComponent(encodedArticleUrl);
        setArticleUrl(decodedUrl);
      
        setIsLoading(true);
        setVerificationResult(null);
        setErrorMessage('');

   
        console.log(`Initiating verification for: ${decodedUrl}`);
       
        const verifyNewsOnBackend = async (urlToVerify) => {
          try {
            
            await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate network delay
        
            const simulatedResult = Math.random() > 0.4 ? 'real' : 'fake';
             if (Math.random() < 0.1) throw new Error("Simulated network error during verification."); // Simulate error sometimes
            console.log("Simulated verification result:", simulatedResult);
            setVerificationResult(simulatedResult);
         

          } catch (error) {
            console.error("Verification API call failed:", error);
            setErrorMessage(error.message || "Could not verify the news article.");
            setVerificationResult('error');
          } finally {
            setIsLoading(false);
          }
        };

        verifyNewsOnBackend(decodedUrl);
        // -----------------------------------------------

      } catch (error) {
        console.error("Error decoding URL:", error);
        setErrorMessage("Invalid article URL provided.");
        setVerificationResult('error');
        setIsLoading(false);
      }
    } else {
       // Handle case where parameter is missing (shouldn't happen with correct routing)
       setErrorMessage("Article URL parameter is missing.");
       setVerificationResult('error');
       setIsLoading(false);
    }
  }, [encodedArticleUrl]); // Re-run effect if the encoded URL changes

  // --- Helper function to render result message ---
  const renderResultMessage = () => {
    if (isLoading) return null; // No message while loading
    if (verificationResult === 'error') {
      return <p className="verification-status status-error">⚠️ Error: {errorMessage}</p>;
    }
    if (verificationResult === 'real') {
      return <p className="verification-status status-real">✅ Verified as likely REAL news.</p>;
    }
    if (verificationResult === 'fake') {
      return <p className="verification-status status-fake">❌ Verified as likely FAKE news.</p>;
    }
    return <p className="verification-status status-pending">Verification status unknown.</p>; // Fallback
  };

  return (
    <div className="verification-page-container">
      <h1>News Verification</h1>
      {articleUrl ? (
        <div className="article-info">
          <p>Verifying article from:</p>
          {/* Link to the original article */}
          <a href={articleUrl} target="_blank" rel="noopener noreferrer" className="article-link">
            {articleUrl}
          </a>
        </div>
      ) : (
         // Show error if URL couldn't be decoded or wasn't provided
         !isLoading && <p className="verification-status status-error">Could not load article URL.</p>
      )}


      <div className="verification-result-area">
        {isLoading && (
          <div className="loading-area">
            <LoadingSpinner />
            <p>Verifying, please wait...</p>
          </div>
        )}
        {renderResultMessage()}
      </div>

      {/* Button to go back to the homepage */}
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>
    </div>
  );
}

export default NewsVerificationPage;