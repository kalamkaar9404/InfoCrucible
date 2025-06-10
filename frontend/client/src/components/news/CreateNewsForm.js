import React, { useState } from 'react';
import { addNews, checkNewsFake } from '../../services/newsService'; 
import LoadingSpinner from '../common/LoadingSpinner';
import DetectionResult from './DetectionResult'; 
import './CreateNewsForm.css'; 

// Optional: receive a callback prop if the parent page needs the result
// function CreateNewsForm({ onCheckComplete }) {
function CreateNewsForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [source, setSource] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkResult, setCheckResult] = useState(null); // State to hold detection result


  const handleAddSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError(null);
    setCheckResult(null); // Clear previous check result

    try {
      const newsData = { title, content, source, url };
      const addedArticle = await addNews(newsData);
      console.log('Article added:', addedArticle);
      // Optionally clear form or show success message
      setTitle('');
      setContent('');
      setSource('');
      setUrl('');
      alert('News article added successfully!'); // Simple feedback
    } catch (err) {
      console.error("Error adding news:", err);
      setError(err.response?.data?.error || 'Failed to add news article.');
    } finally {
      setLoading(false);
    }
  };

   const handleCheckSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!content.trim()) {
        setError('Please enter some news content to check.');
        return;
    }
    setLoading(true);
    setError(null);
    setCheckResult(null); // Clear previous result

    try {
      const result = await checkNewsFake(content); // Use the content field for checking
      console.log('Check result:', result);
      setCheckResult(result); // Store the result in state
      // Optionally call the parent callback if provided
      // if (onCheckComplete) {
      //   onCheckComplete(result);
      // }
    } catch (err) {
      console.error("Error checking news:", err);
      setError(err.response?.data?.error || 'Failed to check news article.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-news-container">
      <form className="create-news-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required // Add basic HTML5 validation
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content / Text to Check</label>
          <textarea
            id="content"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
         <div className="form-group">
          <label htmlFor="source">Source (Optional)</label>
          <input
            type="text"
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
         <div className="form-group">
          <label htmlFor="url">URL (Optional)</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="form-actions">
            <button type="submit" onClick={handleAddSubmit} disabled={loading}>
            {loading ? 'Adding...' : 'Add Article to Feed'}
            </button>
             <button type="submit" onClick={handleCheckSubmit} disabled={loading || !content.trim()}>
            {loading ? 'Checking...' : 'Check Content Authenticity'}
            </button>
        </div>

      </form>

      {/* Display loading spinner or check result */}
      {loading && <LoadingSpinner />}
      {checkResult && !loading && (
        <DetectionResult isFake={checkResult.isFake} confidence={checkResult.confidence} />
      )}

    </div>
  );
}

export default CreateNewsForm;