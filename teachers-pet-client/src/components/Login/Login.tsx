import React from "react";
import logo from "../../assets/logo.png";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

interface LoginProps { }

export const Login: React.FC<LoginProps> = ({ }) => {
  const navigate = useNavigate();

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
        <button className={`${styles.button} ${styles.loginButton}`}>
          Log In
        </button>

        <button className={`${styles.button} ${styles.cancelButton}`} onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default App;
