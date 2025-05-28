import { usePlayerData } from '../hooks/usePlayerData';
import { Box, Typography } from '@mui/material';
import PlayerCard from '../components/PlayerCard';

export default function Watchlist() {
  const players = usePlayerData();

  const bookmarked = players.filter(
    (p) => localStorage.getItem(`scout-bookmark-${p.bio.playerId}`) === 'true'
  );

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Watchlist
      </Typography>

      {bookmarked.length === 0 ? (
        <Typography>No bookmarked players yet.</Typography>
      ) : (
        <Box
          display="flex"
          flexWrap="wrap"
          gap={3}
          mt={3}
          justifyContent="flex-start"
        >
          {bookmarked.map((player) => (
            <Box
              key={player.bio.playerId}
              sx={{
                width: '100%',
                maxWidth: 300,
                flex: '1 1 300px'
              }}
            >
              <PlayerCard player={player} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
