import React from 'react';

function AboutPage() {
  return (
    <div className="about-page">
      <h2>About This Application</h2>
      <p>
        This application is designed to display news articles and provide a (placeholder)
        feature to detect potential fake news using machine learning techniques.
      </p>
      <p>
        The frontend is built with React, and the backend uses Node.js, Express, and MongoDB.
      </p>
      <p>
        <strong>Disclaimer:</strong> The fake news detection feature is currently a placeholder
        and does not use a real trained model. Results are simulated.
      </p>
    </div>
  );
}

export default AboutPage;