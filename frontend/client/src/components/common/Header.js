import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; 
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const categories = [
    { name: "Sports", pathValue: "sports" },
    { name: "Politics", pathValue: "politics" }, 
    { name: "Entertainment", pathValue: "entertainment" },
    { name: "Technology", pathValue: "technology" },
    { name: "Health", pathValue: "health" },
    { name: "Business", pathValue: "business" },
    { name: "Science", pathValue: "science" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <header className="app-header">
      <p className="logo">
        <Link to="/">InfoCrucible</Link>
      </p>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li className="dropdown">
            <button type="button" className="dropbtn" aria-haspopup="true">
              Category ▾
            </button>
            <ul className="dropdown-menu">
              {categories.map((category) => (
                <li key={category.pathValue}>
                  <Link to={`/category/${category.pathValue}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li><Link to="/about">About</Link></li>
          {/* Search Bar styled as header element */}
          <li style={{ display: "flex", alignItems: "center" }}>
            <form 
              className="search-form" 
              onSubmit={handleSearchSubmit} 
              style={{ display: "flex", alignItems: "center", margin: 0 }}
            >
              <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
                style={{
                  padding: "8px 12px",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                  marginRight: 6,
                  background: "#fff",
                  outline: "none"
                }}
              />
              <button
                type="submit"
                className="search-btn"
                style={{
                  padding: "8px 16px",
                  borderRadius: 4,
                  border: "none",
                  background: "#1976d2",
                  color: "#fff",
                  fontSize: "1rem",
                  cursor: "pointer"
                }}
              >
                Search
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;