import React, { useState } from 'react';
import axios from 'axios';

const NewsVerification = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    try {
      const res = await axios.post('/api/verify', { text });
      setResult(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="verification-container">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste news content here..."
      />
      <button onClick={handleVerify}>Verify News</button>
      {result && (
        <div className={`result ${result.result.toLowerCase()}`}>
          <h3>Result: {result.result}</h3>
          <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};