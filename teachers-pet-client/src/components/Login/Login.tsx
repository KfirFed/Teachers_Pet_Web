import React from "react";
import logo from "../../assets/logo.png";
import styles from "./Login.module.css";

interface LoginProps {
  // onLoginClick: () => void;
  // onSignupClick: () => void;
}

export const Login: React.FC<LoginProps> = (
  {
    // onLoginClick, onSignupClick
  }
) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <div>{<img src={logo} alt="Logo" className={styles.logo} />}</div>

      <div>
        <div>
          <input className={styles.input} type="text" placeholder="Username" />
        </div>
        <div>
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
          />
        </div>
      </div>

      <div>
        <button
          className={`${styles.button} ${styles.signUpButton}`}
          // onClick={onSignupClick}
        >
          Log In
        </button>

        <button
          className={`${styles.button} ${styles.loginButton}`}
          // onClick={onLoginClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const handleLoginClick = () => {
    console.log("Login button clicked");
    // Navigate to login page
  };

  const handleSignupClick = () => {
    console.log("Sign Up button clicked");
    // Navigate to signup page
  };

  return (
    <div>
      <Login
      // onLoginClick={handleLoginClick}
      // onSignupClick={handleSignupClick}
      />
    </div>
  );
};

export default App;
