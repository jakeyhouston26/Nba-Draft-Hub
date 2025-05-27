import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import LogoTransition from './pages/LogoTransition';
import Navbar from './components/NavBar';
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
      {/* Show Navbar only after login and not on transition */}
      {!onLoginOrSplash && isLoggedIn && <Navbar />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/transition" element={<LogoTransition />} />
        <Route path="/" element={requireAuth(<Home />)} />
        <Route path="/player/:id" element={requireAuth(<ProfilePage />)} />
        <Route path="/search" element={requireAuth(<SearchPage />)} />
        <Route path="/reports" element={requireAuth(<MyReports />)} />
        <Route path="/watchlist" element={requireAuth(<Watchlist />)} />
        <Route path="/compare" element={requireAuth(<ComparePlayers />)} />
        {/* Redirect to home if no match */}
      </Routes>
    </>
  );
}

export default App;
