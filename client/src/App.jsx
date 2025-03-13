// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // Assuming LandingPage.jsx is in the same folder
import Home from "./pages/Home"; // Import Home instead of EmojiCard
import "./App.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/emojicard" element={<Home />} /> {/* Change this line */}
      </Routes>
    </Router>
  );
};

export default App;
