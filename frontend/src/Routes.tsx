import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./pages/HomePage/HomePage";
import HomePage from "./pages/HomePage/HomePage";
import CuratePage from "./pages/CuratePage/CuratePage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/curate" element={<CuratePage />} />
      </Routes>
    </Router>
  );
}
