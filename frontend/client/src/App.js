// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header'; 
import Footer from './components/common/Footer'; 
import HomePage from './pages/HomePage';       
import AboutPage from './pages/AboutPage';     
import NewsVerificationPage from './pages/NewsVerificationPage';
import SignupPage from './pages/SignupPage';
import StartPage from './pages/Start'; // Import the Start page
import NewsVerify from './pages/NewsVerify'; // Import the NewsVerify page
import './App.css'; 


function App() {
  return (
    <Router>
      <div className="app-container"> { }
        <Header />
        <main className="main-content"> {}
          <Routes>
            {}
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/news-verify" element={<NewsVerify />} />
            <Route path="/" element={<StartPage />} />
            <Route path="/search/:searchQuery" element={<HomePage />} />
            {/* Route for specific categories */}
            {/* ':categoryName' is a URL parameter */}
            <Route path="/category/:categoryName" element={<HomePage />} />

            {/* Route for the About page */}
            <Route path="/about" element={<AboutPage />} />
             
            {/* Add other routes here (e.g., /news, /add-news) */}
            <Route path="/verify/:encodedArticleUrl" element={<NewsVerificationPage />}
            />
            <Route path="/signup" element={<SignupPage />} />
            {/* <Route path="/news" element={<SomeOtherPageComponent />} /> */}
             
            {}
            {}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;