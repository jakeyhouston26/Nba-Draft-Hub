import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function LoginPage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [email, setEmail] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Enable video sound on user click
  const handleEnableAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.5;
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay blocked:", err);
      });
      setAudioEnabled(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('scoutLoggedIn', 'true');
    localStorage.setItem('scoutEmail', email);
    navigate('/transition'); // new splash route
  };
  
  const handleGoogleLogin = () => {
    localStorage.setItem('scoutLoggedIn', 'true');
    localStorage.setItem('scoutEmail', 'google.user@mavs.com');
    navigate('/');
  };

  useEffect(() => {
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch((err) =>
          console.warn('Autoplay blocked:', err)
        );
      }
    }, 500);
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Mavericks logo top-left */}
      <Box sx={{ position: 'absolute', top: 24, left: 32, zIndex: 10 }}>
        <img src="/assets/mavs logo.png" alt="Mavs Logo" style={{ height: 60 }} />
      </Box>

      {/* Left: login form */}
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Container maxWidth="xs">
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome back
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
              Please enter your details
            </Typography>

            <TextField
              label="Email address"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              sx={{ mb: 1 }}
            />

            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <FormControlLabel control={<Checkbox />} label="Remember for 30 days" />
              <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                Forgot password
              </Typography>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mb: 2, textTransform: 'none' }}
            >
              Login
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{ textTransform: 'none' }}
            >
              Sign in with Google
            </Button>

            <Typography variant="body2" textAlign="center" color="text.secondary" mt={2}>
              Don’t have an account?{' '}
              <Typography component="span" color="primary" sx={{ cursor: 'pointer' }}>
                Sign up
              </Typography>
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Right: video background */}
      <Box sx={{ width: '50%', position: 'relative' }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        >
          <source src="/assets/FINAL_FULL_23_24_CITY_EDITION.mp4" type="video/mp4" />
        </video>

        {!audioEnabled && (
          <Box
            position="absolute"
            bottom={20}
            right={20}
            zIndex={10}
          >
            <Button
              size="small"
              variant="outlined"
              onClick={handleEnableAudio}
              sx={{
                color: '#fff',
                borderColor: '#fff',
                textTransform: 'none',
                fontSize: '0.75rem',
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderColor: '#ccc',
                },
              }}
            >
              Enable Audio
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
