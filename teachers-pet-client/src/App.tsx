import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './Router';
import { UserProvider } from './context';

function App() {
  return (
    <div className="app">
      <UserProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}


export default App;
