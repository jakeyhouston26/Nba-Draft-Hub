import { useParams } from 'react-router-dom';
import { usePlayerData } from '../hooks/usePlayerData';
import PlayerProfile from '../components/PlayerProfile';
import { Typography } from '@mui/material';

export default function ProfilePage() {
  const { id } = useParams();
  const players = usePlayerData();
  const player = players.find(p => p.bio.playerId === Number(id));

  if (!player) {
    return <Typography variant="h6" p={4}>Player not found.</Typography>;
  }

  return <PlayerProfile player={player} />;
}
