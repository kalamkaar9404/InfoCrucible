import React from 'react';
import './DetectionResult.css'; // Make sure to create this CSS file

function DetectionResult({ isFake, confidence }) {
  let message = '';
  let resultClass = 'result-uncertain'; // Default style

  if (isFake === true) {
    message = `Result: Likely FAKE`;
    resultClass = 'result-fake';
  } else if (isFake === false) {
    message = `Result: Likely REAL`;
    resultClass = 'result-real';
  } else {
    // isFake is null or undefined
    message = `Result: Uncertain / Could not determine`;
     resultClass = 'result-uncertain';
  }

   // Format confidence if it exists
  const confidenceText = confidence !== null && confidence !== undefined
    ? ` (Confidence: ${(confidence * 100).toFixed(1)}%)`
    : '';


  return (
    <div className={`detection-result ${resultClass}`}>
      <p>{message}{confidenceText}</p>
    </div>
  );
}

export default DetectionResult;