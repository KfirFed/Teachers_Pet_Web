import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import Login from "./components/Login";
import AiPage from "./components/AiPage";
import Profile from "./components/MyProfilePage";
import { UploadPost } from "./components/UploadPost";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landing" />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="*" element={<Navigate to="/landing" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ai" element={<AiPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/uploadPost" element={<UploadPost />} />
    </Routes>
  );
};

export default Router;