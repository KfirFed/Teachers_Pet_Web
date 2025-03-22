import React from "react";
import logo from "../../assets/logo.png";
import styles from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

interface LandingPageProps { }

export const LandingPage: React.FC<LandingPageProps> = ({ }) => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => { }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Teacher's Pet</h1>
      <p className={styles.description}>
        The Teacher's-Pet platform is a place for teachers to be able to share
        information and ideas to help each other
      </p>

      <div>{<img src={logo} alt="Logo" className={styles.logo} />}</div>

      <div>
        <button
          className={`${styles.button} ${styles.signUpButton}`}
          onClick={() => navigate("/register")}
        >
          Sign Up
        </button>

        <button
          className={`${styles.button} ${styles.loginButton}`}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
      <div>
        {/* <GoogleLogin
          size='medium'
          onSuccess={handleGoogleLogin}
          onError={() => console.log("Google Login Failed")}
          useOneTap={false}
        /> */}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <LandingPage />
    </div>
  );
};

export default App;
