import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './Router';
import { UserProvider } from './context';
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <div className="app">
      <GoogleOAuthProvider
        clientId={
          "278201745490-b042re8r90p48mapteqvchtv0da2tsf9.apps.googleusercontent.com"
        }>
        <UserProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </UserProvider>
      </GoogleOAuthProvider>
    </div>
  );
}


export default App;
