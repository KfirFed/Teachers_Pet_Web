import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import Login from "./components/Login";
import AiPage from "./components/AiPage";
import Profile from "./components/MyProfilePage";
import { UploadPost } from "./components/UploadPost";
import { PostsPage } from "./components/PostsPage";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const Router: React.FC = () => {
  const { connectedUser } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landing" />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="*" element={<Navigate to="/landing" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/ai"
        element={
          connectedUser?.accessToken ? <AiPage /> : <Navigate to="/landing" />
        }
      />
      <Route
        path="/profile"
        element={
          connectedUser?.accessToken ? <Profile /> : <Navigate to="/landing" />
        }
      />
      <Route
        path="/uploadPost"
        element={
          connectedUser?.accessToken ? (
            <UploadPost />
          ) : (
            <Navigate to="/landing" />
          )
        }
      />
      <Route
        path="/posts"
        element={
          connectedUser?.accessToken ? (
            <PostsPage />
          ) : (
            <Navigate to="/landing" />
          )
        }
      />
    </Routes>
  );
};

export default Router;
