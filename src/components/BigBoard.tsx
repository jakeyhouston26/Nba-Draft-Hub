import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import PlayerCard from './PlayerCard';
import { usePlayerData } from '../hooks/usePlayerData';
import FilterDropdown from './FilterDropdown'; // ✅ Fix casing

export default function BigBoard() {
  const allPlayers = usePlayerData();
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'card' | 'list'>('card');
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<{
    interestLevel: '' | 'GREEN' | 'YELLOW' | 'RED';
    draftType: '' | 'BPA' | 'NEED' | 'WANT';
    minGrade: number;
    internationalOnly: boolean;
  }>({
    interestLevel: '',
    draftType: '',
    minGrade: 0,
    internationalOnly: false,
  });

  const filteredPlayers = allPlayers
    .filter((p) =>
      p.bio.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => {
      if (filters.interestLevel && p.interest !== filters.interestLevel) return false;
      if (filters.draftType && p.draftType !== filters.draftType) return false;
      if (filters.minGrade && (p.scoutGrade ?? 0) < filters.minGrade) return false;
      if (filters.internationalOnly && !p.international) return false;
      return true;
    });

  return (
    <Box p={4}>
      {/* Header */}
      <Box textAlign="center" mt={0} mb={2}>
        <Typography variant="h3" fontWeight="bold" color="#004D96" gutterBottom>
          Draft Big Board
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Dallas Mavericks Scouting Department – Internal Use Only
        </Typography>
      </Box>

      {/* Controls */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        mb={2}
        border="1px solid #ccc"
        borderRadius={2}
        bgcolor="#fafafa"
        flexWrap="wrap"
        gap={2}
      >
        <TextField
          size="small"
          sx={{ flex: 1, minWidth: '200px' }}
          placeholder="Search player..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Box display="flex" alignItems="center" gap={1}>
          <ToggleButtonGroup
            size="small"
            value={view}
            exclusive
            onChange={(_, val) => val && setView(val)}
          >
            <ToggleButton value="card">Card View</ToggleButton>
            <ToggleButton value="list">List View</ToggleButton>
          </ToggleButtonGroup>
          <IconButton onClick={() => setShowFilters(!showFilters)} color="primary">
            <FilterListIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Filter Dropdown */}
      <FilterDropdown open={showFilters} filters={filters} onChange={setFilters} />

      {/* CARD VIEW */}
      {view === 'card' && (
        <Grid container spacing={3} component="div">
          {filteredPlayers.map((p) => (
            <Box
            key={p.bio.playerId}
            sx={{
              flex: '1 1 calc(25% - 24px)', // 4 per row accounting for spacing
              maxWidth: 'calc(25% - 24px)',
              boxSizing: 'border-box',
            }}
          >
            <PlayerCard player={p} />
          </Box>
          
          ))}
        </Grid>
      )}

      {/* LIST VIEW */}
      {view === 'list' && (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">PTS</TableCell>
                <TableCell align="right">REB</TableCell>
                <TableCell align="right">AST</TableCell>
                <TableCell align="right">FG%</TableCell>
                <TableCell align="right">Avg Rank</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPlayers.map((p, i) => {
                const stats = p.stats?.perGame ?? {};
                const scoutRanks = Object.values(p.ranking ?? {}).filter(
                  (v): v is number => typeof v === 'number'
                );
                const avgRank =
                  scoutRanks.length > 0
                    ? (
                        scoutRanks.reduce((sum, r) => sum + r, 0) /
                        scoutRanks.length
                      ).toFixed(1)
                    : '—';

                const fgPct =
                  stats.fgm && stats.fga
                    ? ((stats.fgm / stats.fga) * 100).toFixed(1)
                    : '—';

                return (
                  <TableRow key={p.bio.playerId}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{p.bio.name}</TableCell>
                    <TableCell align="right">{stats.pts ?? '—'}</TableCell>
                    <TableCell align="right">{stats.reb ?? '—'}</TableCell>
                    <TableCell align="right">{stats.ast ?? '—'}</TableCell>
                    <TableCell align="right">{fgPct}</TableCell>
                    <TableCell align="right">{avgRank}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
