import { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Checkbox,
  FormControlLabel,
  Popover,
  Button
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { usePlayerData } from '../hooks/usePlayerData';
import PlayerCard from './PlayerCard';
import type { Player } from '../types';

export default function BigBoard() {
  const allPlayers = usePlayerData();

  const [interestFilter, setInterestFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [minGrade, setMinGrade] = useState<number>(0);
  const [internationalOnly, setInternationalOnly] = useState<boolean>(false);
  const [top10Only, setTop10Only] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;

  const averageRank = (ranking: Record<string, number | null>): number => {
    const values = Object.entries(ranking)
      .filter(([key, val]) => key !== 'playerId' && typeof val === 'number')
      .map(([_, val]) => val as number);

    return values.length
      ? Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(1))
      : 999;
  };

  const filtered = allPlayers
    .map((p) => ({
      ...p,
      avgRank: p.ranking ? averageRank(p.ranking) : 999,
      lastReport: p.reports?.[p.reports.length - 1] || null,
    }))
    .filter((p) => {
      const r = p.lastReport;

      if (interestFilter !== 'All' && r?.interest !== interestFilter) return false;
      if (typeFilter !== 'All' && r?.type !== typeFilter) return false;
      if (minGrade > 0 && (r?.grade ?? 0) < minGrade) return false;
      if (internationalOnly && p.bio.homeCountry === 'USA') return false;
      if (top10Only && p.avgRank > 10) return false;

      return true;
    })
    .sort((a, b) => a.avgRank - b.avgRank);

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold">NBA Draft Big Board</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Dallas Mavericks Scouting Department – Internal Use Only
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={handleFilterClick}
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          Filters
        </Button>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleFilterClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box sx={{ p: 2, width: 300 }}>
            <Typography fontWeight="bold" gutterBottom>Filters</Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Interest Level</InputLabel>
              <Select
                value={interestFilter}
                label="Interest Level"
                onChange={(e) => setInterestFilter(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="High">Green</MenuItem>
                <MenuItem value="Medium">Yellow</MenuItem>
                <MenuItem value="Low">Red</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Draft Category</InputLabel>
              <Select
                value={typeFilter}
                label="Draft Category"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Need">Need</MenuItem>
                <MenuItem value="Want">Want</MenuItem>
                <MenuItem value="BPA">BPA</MenuItem>
              </Select>
            </FormControl>

            <Typography gutterBottom>Min Grade: {minGrade}</Typography>
            <Slider
              value={minGrade}
              onChange={(_, val) => setMinGrade(val as number)}
              step={1}
              min={0}
              max={10}
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={internationalOnly}
                  onChange={(e) => setInternationalOnly(e.target.checked)}
                />
              }
              label="International Only"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={top10Only}
                  onChange={(e) => setTop10Only(e.target.checked)}
                />
              }
              label="Top 10 Only"
            />
          </Box>
        </Popover>
      </Box>

      <Grid container spacing={3}>
        {filtered.map((player) => (
          <Grid item xs={12} sm={6} md={4} display="flex" key={player.bio.playerId}>
            <PlayerCard player={player} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
