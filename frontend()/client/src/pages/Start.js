import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const cardBaseStyle = {
  width: 300,
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 2px 8px #eee",
  padding: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: 340,
  cursor: "pointer",
  border: "2px solid transparent",
  transition: "box-shadow 0.2s, border-color 0.2s, transform 0.2s",
};

const StartPage = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState("");

  const handleSelect = (option) => {
    if (option === "verify") {
      navigate("/news-verify");
    } else if (option === "news") {
      navigate("/homepage");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "60px auto", textAlign: "center" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 8, color: "#222" }}>
        Welcome to the News Portal
      </h2>
      <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: 32 }}>
        Please select an option:
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 40,
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        {/* News Verify Card */}
        <div
          style={{
            ...cardBaseStyle,
            borderColor: hovered === "verify" ? "#1976d2" : "transparent",
            boxShadow:
              hovered === "verify"
                ? "0 6px 24px #1976d233"
                : cardBaseStyle.boxShadow,
            transform: hovered === "verify" ? "scale(1.04)" : "scale(1)",
          }}
          onMouseEnter={() => setHovered("verify")}
          onMouseLeave={() => setHovered("")}
          onClick={() => handleSelect("verify")}
        >
          <div>
            <div
              style={{
                width: 180,
                height: 110,
                background: "#e0e0e0",
                borderRadius: 10,
                margin: "0 auto 18px auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src="https://r2.erweima.ai/i/A1ctOnndRcCOygOLsDqxyA.png"
                alt="Verify"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 10,
                  display: "block",
                }}
              />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#1976d2", marginBottom: 8 }}>
              News Verify
            </h3>
            <p style={{ color: "#666" }}>
              Check the authenticity of news articles and fight misinformation.
            </p>
          </div>
          <button
            style={{
              marginTop: 24,
              padding: "10px 32px",
              fontSize: 16,
              cursor: "pointer",
              borderRadius: 6,
              border: "none",
              background: "#1976d2",
              color: "#fff",
              fontWeight: 500,
              boxShadow: hovered === "verify" ? "0 2px 8px #1976d244" : "none",
              transition: "background 0.2s, box-shadow 0.2s",
            }}
            onClick={e => { e.stopPropagation(); handleSelect("verify"); }}
          >
            Verify News
          </button>
        </div>
        {/* News Card */}
        <div
          style={{
            ...cardBaseStyle,
            borderColor: hovered === "news" ? "#388e3c" : "transparent",
            boxShadow:
              hovered === "news"
                ? "0 6px 24px #388e3c33"
                : cardBaseStyle.boxShadow,
            transform: hovered === "news" ? "scale(1.04)" : "scale(1)",
          }}
          onMouseEnter={() => setHovered("news")}
          onMouseLeave={() => setHovered("")}
          onClick={() => handleSelect("news")}
        >
          <div>
            <div
              style={{
                width: 180,
                height: 110,
                background: "#e0e0e0",
                borderRadius: 10,
                margin: "0 auto 18px auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src="https://townsquare.media/site/99/files/2021/12/attachment-news-story-of-the-year.jpg?w=1200&h=0&zc=1&s=0&a=t&q=89"
                alt="News"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 10,
                  display: "block",
                }}
              />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#388e3c", marginBottom: 8 }}>
              News
            </h3>
            <p style={{ color: "#666" }}>
              Read the latest news articles and stay updated with current events.
            </p>
          </div>
          <button
            style={{
              marginTop: 24,
              padding: "10px 32px",
              fontSize: 16,
              cursor: "pointer",
              borderRadius: 6,
              border: "none",
              background: "#388e3c",
              color: "#fff",
              fontWeight: 500,
              boxShadow: hovered === "news" ? "0 2px 8px #388e3c44" : "none",
              transition: "background 0.2s, box-shadow 0.2s",
            }}
            onClick={e => { e.stopPropagation(); handleSelect("news"); }}
          >
            News
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;