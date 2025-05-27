import { useState } from 'react';
import { Box, Typography, MenuItem, Select, Grid } from '@mui/material';
import { usePlayerData } from '../hooks/usePlayerData';
import PlayerProfileCard from '../components/PlayerProfileCard';

export default function ComparePlayers() {
  const players = usePlayerData();
  const [player1Id, setPlayer1Id] = useState<number | ''>('');
  const [player2Id, setPlayer2Id] = useState<number | ''>('');

  const player1 = players.find(p => p.bio.playerId === player1Id);
  const player2 = players.find(p => p.bio.playerId === player2Id);

  return (
    <Box p={4}>
      
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Compare Players
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={5} md={3}>
            <Select
              fullWidth
              value={player1Id}
              displayEmpty
              onChange={(e) => setPlayer1Id(Number(e.target.value))}
            >
              <MenuItem value="" disabled>Select Player 1</MenuItem>
              {players.map(p => (
                <MenuItem key={p.bio.playerId} value={p.bio.playerId}>
                  {p.bio.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={5} md={3}>
            <Select
              fullWidth
              value={player2Id}
              displayEmpty
              onChange={(e) => setPlayer2Id(Number(e.target.value))}
            >
              <MenuItem value="" disabled>Select Player 2</MenuItem>
              {players.map(p => (
                <MenuItem key={p.bio.playerId} value={p.bio.playerId}>
                  {p.bio.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Box>

     
      <Grid container spacing={4} justifyContent="center">
        {player1 && (
          <Grid item xs={12} md={5}>
            <PlayerProfileCard
              player={player1}
              comparisonAgainst={player2 ?? undefined}
            />
          </Grid>
        )}
        {player2 && (
          <Grid item xs={12} md={5}>
            <PlayerProfileCard
              player={player2}
              comparisonAgainst={player1 ?? undefined}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
