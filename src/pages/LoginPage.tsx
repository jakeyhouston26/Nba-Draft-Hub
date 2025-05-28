import './LoginPage.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function LoginPage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [email, setEmail] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(false);

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
    navigate('/transition');
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
    <Box className="login-root">
      <Box className="login-logo-container">
        <img src="/assets/mavs logo.png" alt="Mavs Logo" className="login-logo" />
      </Box>

      <Box className="login-left">
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

      <Box className="login-video-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="login-video"
        >
          <source src="/assets/1video.mp4" type="video/mp4" />
        </video>

        {!audioEnabled && (
          <Box className="enable-audio-button">
            <Button
              size="small"
              variant="outlined"
              onClick={handleEnableAudio}
            >
              Enable Audio
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
