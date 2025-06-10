import React, { useState } from "react";
import axios from "axios";

const NewsVerify = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setResult(null);
    setError(null);

    try {
      let formData = new FormData();
      if (text.trim()) formData.append("text", text);
      if (file) formData.append("file", file);

      // Use axios for the API call
      const response = await axios.post(
        "http://localhost:5000/api/verify-news",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;

      // Expecting backend to return { percent: number, verdict: "Fake"|"Real" }
      setResult({
        percent: data.percent,
        verdict: data.verdict,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong."
      );
    } finally {
      setVerifying(false);
    }
  };

  const Meter = ({ percent }) => (
    <div style={{ margin: "24px 0" }}>
      <div style={{
        width: "100%",
        height: 28,
        background: "#eee",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 2px 8px #eee",
        marginBottom: 8
      }}>
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: percent > 60 ? "#e53935" : "#43a047",
            transition: "width 0.8s cubic-bezier(.4,2,.6,1)",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: percent > 10 ? "flex-end" : "center",
            color: "#fff",
            fontWeight: 600,
            fontSize: 16,
            paddingRight: 12
          }}
        >
          {percent}%
        </div>
      </div>
      <div style={{ textAlign: "center", fontWeight: 500, color: percent > 60 ? "#e53935" : "#43a047" }}>
        {percent > 60 ? "Likely Fake News" : "Likely Real News"}
      </div>
    </div>
  );

  return (
    <div
      style={{
        maxWidth: 520,
        margin: "40px auto",
        padding: 32,
        border: "1px solid #e0e0e0",
        borderRadius: 16,
        background: "#fafcff",
        boxShadow: "0 4px 24px #0001"
      }}
    >
      <h2 style={{ textAlign: "center", color: "#1976d2", marginBottom: 24 }}>
        Verify News Authenticity
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 22 }}>
          <label style={{ fontWeight: 500, color: "#333" }}>
            Enter News Text:
            <textarea
              value={text}
              onChange={handleTextChange}
              rows={5}
              style={{
                width: "100%",
                marginTop: 8,
                padding: 10,
                borderRadius: 8,
                border: "1px solid #bdbdbd",
                fontSize: 16,
                background: "#fff"
              }}
              placeholder="Paste or type news text here..."
              disabled={verifying}
            />
          </label>
        </div>
        <div style={{ marginBottom: 22 }}>
          <label style={{ fontWeight: 500, color: "#333" }}>
            Or Upload a File:
            <input
              type="file"
              accept=".txt,.pdf,.doc,.docx"
              onChange={handleFileChange}
              style={{
                display: "block",
                marginTop: 8,
                fontSize: 15,
                borderRadius: 6,
                border: "1px solid #bdbdbd",
                padding: "6px 0"
              }}
              disabled={verifying}
            />
          </label>
          {file && <div style={{ marginTop: 8, color: "#1976d2" }}>Selected file: {file.name}</div>}
        </div>
        <button
          type="submit"
          style={{
            padding: "12px 32px",
            fontSize: 17,
            borderRadius: 8,
            border: "none",
            background: verifying ? "#bdbdbd" : "#1976d2",
            color: "#fff",
            fontWeight: 600,
            cursor: verifying ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px #1976d244",
            transition: "background 0.2s"
          }}
          disabled={verifying}
        >
          {verifying ? "Verifying..." : "Verify"}
        </button>
      </form>

      {error && (
        <div style={{ color: "#e53935", marginTop: 18, textAlign: "center" }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: 36, textAlign: "center" }}>
          <h3 style={{ color: "#222", marginBottom: 10 }}>Verification Result</h3>
          <Meter percent={result.percent} />
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: result.percent > 60 ? "#e53935" : "#43a047",
              marginTop: 8
            }}
          >
            {result.verdict === "Fake" ? "⚠️ This news is likely FAKE." : "✅ This news is likely REAL."}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsVerify;