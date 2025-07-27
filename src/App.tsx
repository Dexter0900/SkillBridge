import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { useAuth } from './context/AuthContext';
import Loader from './components/ui/Loader';

const App: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="large" />
      </div>
    );
  }

  return <AppRoutes />;
};

export default App;