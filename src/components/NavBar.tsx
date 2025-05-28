import './Navbar.css'; // Import CSS

import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  InputBase
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const scoutEmail = localStorage.getItem('scoutEmail') || 'Scout';

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('scoutLoggedIn');
    localStorage.removeItem('scoutEmail');
    navigate('/login');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?name=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setSearchOpen(false);
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#004D96', zIndex: 1100 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <img src="/assets/mavs-logo.png" alt="Mavs Logo" className="navbar-logo" />
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <button onClick={() => navigate('/')} className="navbar-button">
            Big Board
          </button>
          <button onClick={() => navigate('/reports')} className="navbar-button">
            My Reports
          </button>
          <button onClick={() => navigate('/watchlist')} className="navbar-button">
            Watchlist
          </button>
          <button onClick={() => navigate('/compare')} className="navbar-button">
            Compare
          </button>

          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}
          >
            <IconButton
              onClick={() => setSearchOpen((prev) => !prev)}
              color="inherit"
              sx={{ color: 'white' }}
              type="button"
            >
              <SearchIcon />
            </IconButton>

            {searchOpen && (
              <InputBase
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search player..."
                className="search-input"
                autoFocus
              />
            )}
          </Box>

          <IconButton onClick={handleMenuClick} color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem disabled>{scoutEmail}</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
