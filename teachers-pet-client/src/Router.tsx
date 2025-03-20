import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landing" />} />
      <Route path="/landing" element={<LandingPage/>} />
      <Route path="*" element={<Navigate to="/landing" />} />
    </Routes>
  );
};

export default Router;