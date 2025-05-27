import BigBoard from '../components/BigBoard';
import { Container } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <BigBoard />
    </Container>
  );
}
