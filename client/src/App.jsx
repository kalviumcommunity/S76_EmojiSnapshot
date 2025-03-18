// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import CreateSnapshot from "./pages/CreateSnapshot";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/emojicard" element={<Home />} />
        <Route path="/create" element={<CreateSnapshot />} />
      </Routes>
    </Router>
  );
};

export default App;
