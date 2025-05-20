import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Stack,
    Box,
    IconButton,
    Tooltip
  } from '@mui/material';
  import { Link } from 'react-router-dom';
  import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
  import BookmarkIcon from '@mui/icons-material/Bookmark';
  import type { Player } from '../types';
  import { useState } from 'react';
  
  export default function PlayerCard({ player }: { player: Player }) {
    const { bio, ranking, reports } = player;
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
  
    const avgRank =
      ranking &&
      Object.entries(ranking)
        .filter(([key, val]) => key !== 'playerId' && typeof val === 'number')
        .length > 0
        ? (
            Object.entries(ranking)
              .filter(([key, val]) => key !== 'playerId' && typeof val === 'number')
              .reduce((acc, [_, val]) => acc + (val as number), 0) /
            Object.entries(ranking)
              .filter(([key, val]) => key !== 'playerId' && typeof val === 'number')
              .length
          ).toFixed(1)
        : '—';
  
    const espn = ranking?.['ESPN Rank'] ?? '—';
    const koc = ranking?.["Kevin O'Connor Rank"] ?? '—';
  
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
          height: 460,
          width: 270,
          borderRadius: 2,
          transition: '0.3s ease',
          '&:hover': {
            boxShadow: 6,
            transform: 'translateY(-4px)',
          },
          position: 'relative',
        }}
      >
        <Link to={`/player/${bio.playerId}`} style={{ textDecoration: 'none', flex: 1 }}>
          {bio.photoUrl ? (
            <CardMedia
              component="img"
              image={bio.photoUrl}
              alt={bio.name}
              sx={{
                height: 200,
                width: '100%',
                objectFit: 'cover',
                objectPosition: 'top center'
              }}
            />
          ) : (
            <Box
              height="200px"
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ backgroundColor: '#E0E0E0' }}
            >
              <Typography color="primary">No Photo</Typography>
            </Box>
          )}
  
          <CardContent sx={{ flexGrow: 1, color: 'black' }}>
            <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
              {bio.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              {bio.currentTeam} — {bio.league}
            </Typography>
  
            {bio.position && (
              <Typography variant="body2" color="text.secondary" mb={1}>
                Position: {bio.position}
              </Typography>
            )}
  
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 1 }}
            >
              Avg Rank: {avgRank}
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
              <Stack direction="row" spacing={1} mt={1}>
                {lastReport.grade && (
                  <Chip
                    label={`Grade: ${lastReport.grade}`}
                    color="default"
                    size="small"
                  />
                )}
                <Chip
                  label={lastReport.interest}
                  color={interestColor}
                  size="small"
                />
                <Chip
                  label={lastReport.type}
                  variant="outlined"
                  size="small"
                />
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
  