import type { JSX } from 'react';

import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import LogoTransition from './pages/LogoTransition';
import NavBar from './components/NavBar'; 
import MyReports from './pages/MyReports';
import Watchlist from './pages/Watchlist';
import ComparePlayers from './pages/ComparePlayers';

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('scoutLoggedIn');
    setIsLoggedIn(loggedIn === 'true');
  }, [location.pathname]);

  const requireAuth = (component: JSX.Element) =>
    isLoggedIn ? component : <Navigate to="/login" state={{ from: location }} replace />;

  const onLoginOrSplash = location.pathname === '/login' || location.pathname === '/transition';

  return (
    <>
      {/* Show NavBar only after login and not on transition */}
      {!onLoginOrSplash && isLoggedIn && <NavBar />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/transition" element={<LogoTransition />} />
        <Route path="/" element={requireAuth(<Home />)} />
        <Route path="/player/:id" element={requireAuth(<ProfilePage />)} />
        <Route path="/search" element={requireAuth(<SearchPage />)} />
        <Route path="/reports" element={requireAuth(<MyReports />)} />
        <Route path="/watchlist" element={requireAuth(<Watchlist />)} />
        <Route path="/compare" element={requireAuth(<ComparePlayers />)} />
        {/* Optional: Add a fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;

