import React, { useContext } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './pages/LoginPage';
import { GlobalContext } from './context/GlobalState';

const App: React.FC = () => {
  const { isAuthenticated } = useContext(GlobalContext);

  return isAuthenticated ? <LandingPage /> : <LoginPage />;
};

export default App;
