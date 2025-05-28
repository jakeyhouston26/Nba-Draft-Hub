import { useLocation } from 'react-router-dom';
import { usePlayerData } from '../hooks/usePlayerData';
import { Box, Grid, Typography } from '@mui/material';
import PlayerCard from '../components/PlayerCard';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
  const players = usePlayerData();
  const query = useQuery();
  const name = query.get('name')?.toLowerCase() || '';

  const filtered = players.filter(p =>
    p.bio.name.toLowerCase().includes(name)
  );

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Search Results for "{name}"
      </Typography>

      {filtered.length === 0 ? (
        <Typography>No players found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filtered.map(player => (
            <Box key={player.bio.playerId} sx={{ width: '100%', maxWidth: 300 }}>
            <PlayerCard player={player} />
          </Box>
          
          ))}
        </Grid>
      )}
    </Box>
  );
}

