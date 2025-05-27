import { useState } from 'react';
import type { Player } from '../types';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  ToggleButtonGroup,
  ToggleButton,
  Tabs,
  Tab,
  Stack,
  Chip
} from '@mui/material';

const measurementLabels: Record<string, string> = {
  heightNoShoes: 'Height (No Shoes)',
  heightShoes: 'Height (With Shoes)',
  wingspan: 'Wingspan',
  reach: 'Standing Reach',
  maxVertical: 'Max Vertical',
  noStepVertical: 'No Step Vertical',
  weight: 'Weight',
  bodyFat: 'Body Fat %',
  handLength: 'Hand Length',
  handWidth: 'Hand Width',
  agility: 'Agility',
  sprint: 'Sprint Time',
  shuttleLeft: 'Shuttle Left',
  shuttleRight: 'Shuttle Right',
  shuttleBest: 'Shuttle Best',
};

type Props = {
  player: Player;
  comparisonAgainst?: Player;
};

export default function PlayerProfileCard({ player, comparisonAgainst }: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const [statMode, setStatMode] = useState<'perGame' | 'seasonTotals'>('perGame');

  const stats = player.stats?.[statMode];
  const otherStats = comparisonAgainst?.stats?.[statMode];

  const measurements = player.measurement ?? {};
  const otherMeasurements = comparisonAgainst?.measurement ?? {};

  const summaryStats = {
    pts: stats?.pts ?? 0,
    reb: stats?.reb ?? 0,
    ast: stats?.ast ?? 0,
    fgPct:
      stats && stats.fgm && stats.fga
        ? ((stats.fgm / stats.fga) * 100).toFixed(1)
        : '—',
  };

  const highlight = (val: number | string, otherVal: number | string) => {
    if (typeof val !== 'number' || typeof otherVal !== 'number') return 'inherit';
    return val > otherVal ? 'primary.main' : 'inherit';
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar
            src={player.bio.photoUrl || undefined}
            alt={player.bio.name}
            sx={{ width: 100, height: 100 }}
          />
          <Box>
            <Typography variant="h6" fontWeight="bold">{player.bio.name}</Typography>
            <Typography variant="body2">{player.bio.currentTeam} — {player.bio.league}</Typography>
            {player.bio.position && (
              <Typography variant="body2" color="text.secondary">Position: {player.bio.position}</Typography>
            )}
          </Box>
        </Box>

        {/* Summary */}
        <Stack direction="row" spacing={1} justifyContent="space-between" mb={2}>
          {[
            { label: 'PTS', value: summaryStats.pts, key: 'pts' },
            { label: 'REB', value: summaryStats.reb, key: 'reb' },
            { label: 'AST', value: summaryStats.ast, key: 'ast' },
            { label: 'FG%', value: summaryStats.fgPct, key: 'fgPct' }
          ].map(item => (
            <Box key={item.label} textAlign="center" flex={1}>
              <Typography
                fontWeight="bold"
                fontSize="1.25rem"
                color={highlight(Number(item.value), Number(summaryStats[item.key as keyof typeof summaryStats]))}
              >
                {item.value}
              </Typography>
              <Typography variant="caption">{item.label}</Typography>
            </Box>
          ))}
        </Stack>

        {/* Tabs */}
        <Tabs value={tabIndex} onChange={(_, val) => setTabIndex(val)} sx={{ mb: 2 }}>
          <Tab label="Stats" />
          <Tab label="Measurements" />
          <Tab label="Reports" />
        </Tabs>

        {/* STATS */}
        {tabIndex === 0 && (
          <Box>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <ToggleButtonGroup
                size="small"
                value={statMode}
                exclusive
                onChange={(_, value) => value && setStatMode(value)}
              >
                <ToggleButton value="perGame">Per Game</ToggleButton>
                <ToggleButton value="seasonTotals">Season Totals</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {stats ? (
              <Box component="table" width="100%">
                {Object.entries(stats).map(([key, val], idx) => {
                  const otherVal = otherStats?.[key];
                  return (
                    <Box
                      key={key}
                      component="tr"
                      sx={{ backgroundColor: idx % 2 ? '#f4f6f8' : 'white' }}
                    >
                      <Box component="td" sx={{ px: 1.5, py: 1, fontWeight: 500 }}>
                        {key.toUpperCase()}
                      </Box>
                      <Box
                        component="td"
                        sx={{
                          px: 1.5,
                          py: 1,
                          color: highlight(val, otherVal),
                          fontWeight: val > otherVal ? 600 : 400
                        }}
                      >
                        {val}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Typography>No stats available.</Typography>
            )}
          </Box>
        )}

        {/* MEASUREMENTS */}
        {tabIndex === 1 && (
          <Box>
            {player.measurement ? (
              <Box component="table" width="100%">
                {Object.entries(measurements).map(([key, val], idx) => {
                  const otherVal = otherMeasurements?.[key];
                  return (
                    <Box
                      key={key}
                      component="tr"
                      sx={{ backgroundColor: idx % 2 ? '#f4f6f8' : 'white' }}
                    >
                      <Box component="td" sx={{ px: 1.5, py: 1, fontWeight: 500 }}>
                        {measurementLabels[key] || key}
                      </Box>
                      <Box
                        component="td"
                        sx={{
                          px: 1.5,
                          py: 1,
                          color: highlight(val as number, otherVal as number),
                          fontWeight: Number(val) > Number(otherVal) ? 600 : 400
                        }}
                      >
                        {val ?? '—'}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Typography>No measurements available.</Typography>
            )}
          </Box>
        )}

        {/* REPORTS */}
        {tabIndex === 2 && (
          <Stack spacing={2}>
            {player.reports && player.reports.length > 0 ? (
              player.reports.map((r, i) => (
                <Box key={i}>
                  <Typography fontWeight="bold">{r.name}</Typography>
                  <Stack direction="row" spacing={1} my={1}>
                    <Chip label={`Grade: ${r.grade ?? '—'}`} size="small" />
                    <Chip label={r.interest} size="small" color={
                      r.interest === 'High' ? 'success'
                        : r.interest === 'Medium' ? 'warning'
                        : 'error'
                    } />
                    <Chip label={r.type} size="small" variant="outlined" />
                  </Stack>
                  <Typography variant="body2">{r.text}</Typography>
                </Box>
              ))
            ) : (
              <Typography>No reports yet.</Typography>
            )}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
