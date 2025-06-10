import React from 'react';
import CreateNewsForm from '../components/news/CreateNewsForm';


function AddNewsPage() {
  

  return (
    <div className="add-news-page">
      <h2>Add or Check News Article</h2>
      <p>Enter the details of a news article below. You can either just add it to the feed or check its authenticity (placeholder).</p>
 
      <CreateNewsForm />

     
    </div>
  );
}

export default AddNewsPage;