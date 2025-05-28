import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Box,
  IconButton,
  Tooltip,
  
} from '@mui/material';
import { Link } from 'react-router-dom';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import type { Player } from '../types';
import { useState } from 'react';

export default function PlayerCard({ player }: { player: Player }) {
  const { bio, ranking, reports, stats } = player;
  const lastReport = reports?.[reports.length - 1];
  const scoutKey = `scout-bookmark-${bio.playerId}`;

  const [bookmarked, setBookmarked] = useState<boolean>(() => {
    return localStorage.getItem(scoutKey) === 'true';
  });

  const toggleBookmark = () => {
    const next = !bookmarked;
    setBookmarked(next);
    localStorage.setItem(scoutKey, next.toString());
  };

  const avgRank = (() => {
    if (!ranking) return '—';
    const values = Object.entries(ranking)
      .filter(([key, val]) => key !== 'playerId' && typeof val === 'number')
      .map(([_, val]) => val as number);

    if (values.length === 0) return '—';
    const rawAvg = values.reduce((acc, val) => acc + val, 0) / values.length;
    return Math.round(rawAvg) === rawAvg ? rawAvg.toString() : rawAvg.toFixed(1);
  })();

  const espn = ranking?.['ESPN Rank'] ?? '—';
  const koc = ranking?.["Kevin O'Connor Rank"] ?? '—';

  const fgPct =
    stats?.perGame?.fgm && stats?.perGame?.fga
      ? ((stats.perGame.fgm / stats.perGame.fga) * 100).toFixed(1)
      : '—';

  const interestColor =
    lastReport?.interest === 'High'
      ? 'success'
      : lastReport?.interest === 'Medium'
      ? 'warning'
      : lastReport?.interest === 'Low'
      ? 'error'
      : 'default';

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 510,
        width: '100%',
maxWidth: 240,

        borderRadius: 2,
        transition: '0.3s ease',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-4px)',
        },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Link to={`/player/${bio.playerId}`} style={{ textDecoration: 'none', flex: 1 }}>
        {bio.photoUrl ? (
          <CardMedia
            component="img"
            image={bio.photoUrl}
            alt={bio.name}
            sx={{
              height: 260,
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
            }}
          />
        ) : (
          <Box
            height="260px"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ backgroundColor: '#E0E0E0' }}
          >
            <Typography color="primary">No Photo</Typography>
          </Box>
        )}

        <CardContent sx={{ flexGrow: 1, color: 'black', p: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
            {bio.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {bio.currentTeam} — {bio.league}
          </Typography>

        
          <Typography variant="body2" fontWeight="bold" color="text.primary" mt={1}>
            Avg Rank
          </Typography>
          <Typography variant="body2" color="text.primary" gutterBottom>
            {avgRank}
          </Typography>

       
          <Typography variant="body2" fontWeight="bold" color="text.primary">
            Stats
          </Typography>
          <Typography variant="body2" color="text.primary" gutterBottom>
            PTS: {stats?.perGame?.pts ?? '—'} &nbsp;&nbsp;
            REB: {stats?.perGame?.reb ?? '—'} &nbsp;&nbsp;
            AST: {stats?.perGame?.ast ?? '—'} &nbsp;&nbsp;
            FG%: {fgPct}
          </Typography>

          
          <Typography variant="body2" fontWeight="bold" color="text.primary">
            Top Scout Rankings
          </Typography>
          <Typography variant="body2" color="text.primary">
            ESPN: {espn}
          </Typography>
          <Typography variant="body2" color="text.primary">
            KOC: {koc}
          </Typography>

          
          {lastReport && (
            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
              {lastReport.grade && (
                <Chip label={`Grade: ${lastReport.grade}`} color="default" size="small" />
              )}
              {lastReport.interest && (
                <Chip label={lastReport.interest} color={interestColor} size="small" />
              )}
              {lastReport.type && (
                <Chip label={lastReport.type} variant="outlined" size="small" />
              )}
            </Stack>
          )}
        </CardContent>
      </Link>

      
      <Box position="absolute" top={8} right={8}>
        <Tooltip title={bookmarked ? 'Remove Bookmark' : 'Add to Watchlist'}>
          <IconButton onClick={toggleBookmark} color="primary">
            {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
}
