import React, { useContext } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './pages/LoginPage';
import { GlobalContext } from './context/GlobalState';

// A simple loading spinner component to show while checking auth status
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-500"></div>
  </div>
);

const App: React.FC = () => {
  const { isAuthenticated, loading } = useContext(GlobalContext);

  // While the initial auth state is being determined, show a loading spinner
  // to prevent a flash of the login screen for already logged-in users.
  if (loading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <LandingPage /> : <LoginPage />;
};

export default App;
