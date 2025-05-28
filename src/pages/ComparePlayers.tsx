import { useState } from 'react';
import {
  Box,
  Typography,
  MenuItem,
  Select
} from '@mui/material';
import { usePlayerData } from '../hooks/usePlayerData';
import PlayerProfileCard from '../components/PlayerProfileCard';

export default function ComparePlayers() {
  const players = usePlayerData();
  const [player1Id, setPlayer1Id] = useState<number | ''>('');
  const [player2Id, setPlayer2Id] = useState<number | ''>('');

  const player1 = players.find((p) => p.bio.playerId === player1Id);
  const player2 = players.find((p) => p.bio.playerId === player2Id);

  return (
    <Box p={4}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Compare Players
        </Typography>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={2}
          mb={4}
        >
          <Box sx={{ width: '100%', maxWidth: 300 }}>
            <Select
              fullWidth
              value={player1Id}
              displayEmpty
              onChange={(e) => setPlayer1Id(Number(e.target.value))}
            >
              <MenuItem value="" disabled>Select Player 1</MenuItem>
              {players.map((p) => (
                <MenuItem key={p.bio.playerId} value={p.bio.playerId}>
                  {p.bio.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ width: '100%', maxWidth: 300 }}>
            <Select
              fullWidth
              value={player2Id}
              displayEmpty
              onChange={(e) => setPlayer2Id(Number(e.target.value))}
            >
              <MenuItem value="" disabled>Select Player 2</MenuItem>
              {players.map((p) => (
                <MenuItem key={p.bio.playerId} value={p.bio.playerId}>
                  {p.bio.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={4}
      >
        {player1 && (
          <Box sx={{ flex: 1, minWidth: 300, maxWidth: 500 }}>
            <PlayerProfileCard
              player={player1}
              comparisonAgainst={player2 ?? undefined}
            />
          </Box>
        )}
        {player2 && (
          <Box sx={{ flex: 1, minWidth: 300, maxWidth: 500 }}>
            <PlayerProfileCard
              player={player2}
              comparisonAgainst={player1 ?? undefined}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
