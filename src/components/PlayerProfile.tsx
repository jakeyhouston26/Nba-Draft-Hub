import { useState } from 'react';
import type { Player } from '../types';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Modal,
  TextField,
  Tabs,
  Tab,
  Avatar,
  ToggleButton,
  ToggleButtonGroup,
  Chip
} from '@mui/material';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

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

export default function PlayerProfile({ player }: { player: Player }) {
  const [reports, setReports] = useState(player.reports ?? []);
  const [newReport, setNewReport] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [grade, setGrade] = useState<number | null>(null);
  const [interest, setInterest] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [type, setType] = useState<'Need' | 'Want' | 'BPA'>('BPA');
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [statMode, setStatMode] = useState<'perGame' | 'seasonTotals'>('perGame');

  const stats = player.stats?.[statMode];
  const summaryStats = {
    pts: stats?.pts ?? '—',
    reb: stats?.reb ?? '—',
    ast: stats?.ast ?? '—',
    fgPct:
      stats && stats.fgm && stats.fga
        ? ((stats.fgm / stats.fga) * 100).toFixed(1)
        : '—',
  };

  const handleAddReport = () => {
    if (!newReport.trim() || !reporterName.trim()) return;
    const newEntry = {
      name: reporterName.trim(),
      text: newReport.trim(),
      grade: grade ?? 0,
      interest,
      type,
    };
    const updated = [...reports, newEntry];
    setReports(updated);
    setNewReport('');
    setReporterName('');
    setGrade(null);
    setInterest('Medium');
    setType('BPA');
    setOpen(false);

    localStorage.setItem(
      `reports-${player.bio.playerId}`,
      JSON.stringify(updated)
    );
  };

  return (
    <Box p={4}>
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        gap={4}
        mb={4}
      >
        <Avatar
          src={player.bio.photoUrl || undefined}
          alt={player.bio.name}
          sx={{ width: 150, height: 150 }}
        />
        <Box>
          <Typography variant="h4" fontWeight="bold">{player.bio.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {player.bio.currentTeam} — {player.bio.league}
          </Typography>
        </Box>
      </Box>

      {/* Stat summary */}
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={3}
        mb={3}
      >
        {[
          { label: 'PTS', value: summaryStats.pts },
          { label: 'REB', value: summaryStats.reb },
          { label: 'AST', value: summaryStats.ast },
          { label: 'FG%', value: summaryStats.fgPct },
        ].map((item) => (
          <Box
            key={item.label}
            flex="1 1 120px"
            textAlign="center"
          >
            <Typography variant="h5" fontWeight="bold">{item.value}</Typography>
            <Typography variant="caption">{item.label}</Typography>
          </Box>
        ))}
      </Box>

      {/* Tab bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Tabs value={tabIndex} onChange={(_, newVal) => setTabIndex(newVal)}>
          <Tab label="Stats" />
          <Tab label="Measurements" />
          <Tab label="Reports" />
          <Tab label="Rankings" />
        </Tabs>
        <Button variant="contained" onClick={() => setOpen(true)}>Add Report</Button>
      </Box>

      {/* Stats tab */}
      {tabIndex === 0 && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
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
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {Object.entries(stats).map(([key, val], idx) => (
                    <tr key={key} style={{ backgroundColor: idx % 2 ? '#f4f6f8' : 'white' }}>
                      <td style={{ padding: '8px', fontWeight: 600 }}>{key.toUpperCase()}</td>
                      <td style={{ padding: '8px' }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Typography>No stats available.</Typography>
            )}
          </CardContent>
        </Card>
      )}

      {/* Measurements tab */}
      {tabIndex === 1 && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            {player.measurement ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {Object.entries(player.measurement)
                    .filter(([key]) => key !== 'playerId')
                    .map(([key, val], idx) => (
                      <tr key={key} style={{ backgroundColor: idx % 2 ? '#f8f9fa' : '#fff' }}>
                        <td style={{ padding: '8px', fontWeight: 600 }}>
                          {measurementLabels[key] || key}
                        </td>
                        <td style={{ padding: '8px' }}>{val ?? '—'}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <Typography>No measurements available.</Typography>
            )}
          </CardContent>
        </Card>
      )}

      {/* Reports tab */}
      {tabIndex === 2 && (
        <Card>
          <CardContent>
            <Stack spacing={2}>
              {reports.length > 0 ? (
                reports.map((r, i) => (
                  <Box key={i} sx={{ borderBottom: '1px solid #eee', pb: 1 }}>
                    <Typography>
                      <strong>{r.name}</strong> (Grade: {r.grade ?? '—'})
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1} mb={1}>
                      <Chip
                        label={r.interest + ' Interest'}
                        color={
                          r.interest === 'High'
                            ? 'success'
                            : r.interest === 'Medium'
                            ? 'warning'
                            : 'error'
                        }
                      />
                      <Chip label={r.type} variant="outlined" />
                    </Stack>
                    <Typography>{r.text}</Typography>
                  </Box>
                ))
              ) : (
                <Typography color="text.secondary">No reports yet.</Typography>
              )}
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Rankings tab */}
      {tabIndex === 3 && (
        <Card>
          <CardContent>
            {player.ranking && Object.keys(player.ranking).length > 0 ? (
              <table style={{ width: '100%', maxWidth: 400, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f0f0f0' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Source</th>
                    <th style={{ padding: '10px', textAlign: 'right' }}>Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(player.ranking)
                    .filter(([key]) => key !== 'playerId')
                    .map(([scout, rank], idx) => (
                      <tr key={idx} style={{ backgroundColor: idx % 2 ? '#f9f9f9' : 'white' }}>
                        <td style={{ padding: '10px', fontWeight: 600 }}>{scout}</td>
                        <td style={{ padding: '10px', textAlign: 'right' }}>{rank ?? '—'}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <Typography>No rankings available.</Typography>
            )}
          </CardContent>
        </Card>
      )}

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" fontWeight="bold" mb={2}>Add Scouting Report</Typography>

          <TextField
            label="Your Name"
            fullWidth
            value={reporterName}
            onChange={(e) => setReporterName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Internal Grade (1–10)"
            fullWidth
            type="number"
            inputProps={{ min: 1, max: 10 }}
            sx={{ mb: 2 }}
            value={grade ?? ''}
            onChange={(e) => setGrade(Number(e.target.value))}
          />

          <Box mb={2}>
            <Typography fontWeight="bold" mb={1}>Interest Level</Typography>
            <ToggleButtonGroup
              fullWidth
              exclusive
              value={interest}
              onChange={(_, value) => value && setInterest(value)}
            >
              <ToggleButton value="High">Green</ToggleButton>
              <ToggleButton value="Medium">Yellow</ToggleButton>
              <ToggleButton value="Low">Red</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box mb={2}>
            <Typography fontWeight="bold" mb={1}>Draft Category</Typography>
            <ToggleButtonGroup
              fullWidth
              exclusive
              value={type}
              onChange={(_, value) => value && setType(value)}
            >
              <ToggleButton value="Need">Need</ToggleButton>
              <ToggleButton value="Want">Want</ToggleButton>
              <ToggleButton value="BPA">BPA</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <TextField
            label="Scouting Report"
            multiline
            rows={4}
            fullWidth
            value={newReport}
            onChange={(e) => setNewReport(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button variant="contained" fullWidth onClick={handleAddReport}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
