import BigBoard from '../components/BigBoard';
import { Typography, Container } from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          color: '#00538C', // Mavs navy
        }}
      >
        <SportsBasketballIcon fontSize="large" sx={{ color: '#007DC5' }} />
        NBA Draft Big Board
      </Typography>

      <Typography
        variant="subtitle1"
        textAlign="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Dallas Mavericks Scouting Department – Internal Use Only
      </Typography>

      <BigBoard />
    </Container>
  );
}
