import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landing" />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="*" element={<Navigate to="/landing" />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Router;