import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    InputBase,
    Grow,
    Paper,
    Popper,
    ClickAwayListener
  } from '@mui/material';
  import { useNavigate } from 'react-router-dom';
  import SearchIcon from '@mui/icons-material/Search';
  import AccountCircle from '@mui/icons-material/AccountCircle';
  import { useState, useRef } from 'react';
  
  export default function Navbar() {
    const navigate = useNavigate();
    const scoutEmail = localStorage.getItem('scoutEmail') || 'Scout';
  
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [search, setSearch] = useState('');
    const searchRef = useRef<HTMLButtonElement | null>(null);
  
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
          {/* Left: Logo */}
          <Box display="flex" alignItems="center">
            <img
              src="/assets/mavs-logo.png"
              alt="Mavs Logo"
              style={{
                height: 48, // slightly smaller
                objectFit: 'contain',
                marginRight: 16
              }}
            />
          </Box>
  
          {/* Right-side nav */}
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              component="button"
              onClick={() => navigate('/')}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              Big Board
            </Box>
            <Box
              component="button"
              onClick={() => navigate('/reports')}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              My Reports
            </Box>
            <Box
              component="button"
              onClick={() => navigate('/about')}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              About
            </Box>
  
            {/* Expandable Search */}
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
      sx={{
        position: 'absolute',
        top: '100%',
        right: 0,
        mt: 1,
        px: 1,
        py: 0.5,
        backgroundColor: 'white',
        borderRadius: 1,
        boxShadow: 3,
        fontSize: '0.9rem',
        width: 200,
      }}
      autoFocus
    />
  )}
</Box>

  
            {/* User dropdown */}
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
  