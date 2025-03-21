import React from 'react';
import logo from '../../assets/logo.png';
import styles from './LandingPage.module.css';


interface LandingPageProps {
  // onLoginClick: () => void;
  // onSignupClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  // onLoginClick, onSignupClick
}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Teacher's Pet</h1>
      <p className={styles.description}>
        The Teacher's-Pet platform is a place for teachers to be able to share information and ideas to help each other
      </p>

      <div>
        {<img src={logo} alt="Logo" className={styles.logo} />}
      </div>

      <div>
        <button
          className={`${styles.button} ${styles.signUpButton}`}
        // onClick={onSignupClick}
        >
          Sign Up
        </button>

        <button
          className={`${styles.button} ${styles.loginButton}`}
        // onClick={onLoginClick}
        >
          Login
        </button>
      </div>
      <div>
        <button
          className={`${styles.button} ${styles.googleButton}`}
        // onClick={onLoginClick}
        >
          Sign Up with Google
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const handleLoginClick = () => {
    console.log('Login button clicked');
    // Navigate to login page
  };

  const handleSignupClick = () => {
    console.log('Sign Up button clicked');
    // Navigate to signup page
  };

  return (
    <div>
      <LandingPage
      // onLoginClick={handleLoginClick}
      // onSignupClick={handleSignupClick}
      />
    </div>
  );
};

export default App;