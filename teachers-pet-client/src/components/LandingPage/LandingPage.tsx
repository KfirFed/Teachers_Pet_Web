import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import styles from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../../context/UserContext";
import { loginWithGoogle, login } from "./../../axios/Auth"

export const LandingPage: React.FC<{}> = ({ }) => {
  const navigate = useNavigate();
  const { updateConnectedUser } = useContext(UserContext);


  const handleGoogleLogin = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      if (credentialResponse.credential) {
        const connectedUser = await loginWithGoogle(credentialResponse.credential);
        if (connectedUser) {
          console.log(connectedUser);
          updateConnectedUser(connectedUser);
          navigate("/posts");
        }
      }
    } catch (err: any) {
      console.error("Google login failed:", err.message);
    }
  }

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
        <div className={`${styles.button} ${styles.googleButton}`}>
          <GoogleLogin
            size='large'
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Google Login Failed")}
            useOneTap={false}
            width={"460px"}
          />
        </div>
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
