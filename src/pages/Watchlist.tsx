import { usePlayerData } from '../hooks/usePlayerData';
import { Box, Grid, Typography } from '@mui/material';
import PlayerCard from '../components/PlayerCard';

export default function Watchlist() {
  const players = usePlayerData();

  const bookmarked = players.filter(p =>
    localStorage.getItem(`scout-bookmark-${p.bio.playerId}`) === 'true'
  );

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Watchlist
      </Typography>

      {bookmarked.length === 0 ? (
        <Typography>No bookmarked players yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {bookmarked.map(player => (
            <Grid container spacing={3} component="div">
            {bookmarked.map((player) => (
              <Box key={player.bio.playerId} sx={{ width: '100%', maxWidth: 300 }}>
                <PlayerCard player={player} />
              </Box>
            ))}
          </Grid>
          
          ))}
        </Grid>
      )}
    </Box>
  );
}
