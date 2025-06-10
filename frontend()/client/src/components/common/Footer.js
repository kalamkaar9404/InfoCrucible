import React from 'react';
import './Footer.css'; 

function Footer() {
  return (
    <footer className="app-footer">
      <p>© {new Date().getFullYear()} News Detector App. All rights reserved.</p>
      {/* Add any other footer links or info here */}
    </footer>
  );
}

export default Footer;