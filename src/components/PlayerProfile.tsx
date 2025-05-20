import { useState } from 'react';
import type { Player } from '../types';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Grid,
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
  const [reports, setReports] = useState<
    {
      name: string;
      text: string;
      grade: number | null;
      interest: 'High' | 'Medium' | 'Low';
      type: 'Need' | 'Want' | 'BPA';
    }[]
  >([]);
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
    pts: stats?.pts ?? 0,
    reb: stats?.reb ?? 0,
    ast: stats?.ast ?? 0,
    fgPct:
      stats && stats.fgm && stats.fga
        ? ((stats.fgm / stats.fga) * 100).toFixed(1)
        : '—',
  };

  const handleAddReport = () => {
    if (!newReport.trim() || !reporterName.trim()) return;
    setReports([
      ...reports,
      {
        name: reporterName.trim(),
        text: newReport.trim(),
        grade,
        interest,
        type,
      },
    ]);
    setNewReport('');
    setReporterName('');
    setGrade(null);
    setInterest('Medium');
    setType('BPA');
    setOpen(false);
  };

  return (
    <Box p={4}>
      {/* Header */}
      <Grid container spacing={3} alignItems="center" mb={2}>
        <Grid item>
          <Avatar
            src={player.bio.photoUrl || undefined}
            alt={player.bio.name}
            sx={{ width: 150, height: 150, borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs>
          <Typography variant="h4" fontWeight="bold">{player.bio.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {player.bio.currentTeam} — {player.bio.league}
          </Typography>
        </Grid>
      </Grid>

      {/* Stat Summary Bar */}
      <Grid container spacing={2} mb={3}>
        {[
          { label: 'PTS', value: summaryStats.pts },
          { label: 'REB', value: summaryStats.reb },
          { label: 'AST', value: summaryStats.ast },
          { label: 'FG%', value: summaryStats.fgPct },
        ].map((item) => (
          <Grid item xs={6} sm={3} key={item.label}>
            <Box
              sx={{
                backgroundColor: '#00538C',
                color: 'white',
                borderRadius: 2,
                textAlign: 'center',
                py: 2,
              }}
            >
              <Typography variant="h5" fontWeight="bold">{item.value}</Typography>
              <Typography variant="body2">{item.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Tabs + Add Report Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Tabs value={tabIndex} onChange={(_, newVal) => setTabIndex(newVal)}>
          <Tab label="Stats" />
          <Tab label="Measurements" />
          <Tab label="Scouting Reports" />
        </Tabs>

        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Report
        </Button>
      </Box>

      {/* Tab 0: Stats */}
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
              <Box component="table" width="100%" sx={{ borderCollapse: 'collapse' }}>
                {Object.entries(stats).map(([key, val], idx) => (
                  <Box
                    key={key}
                    component="tr"
                    sx={{
                      backgroundColor: idx % 2 === 0 ? '#f4f6f8' : 'white',
                      borderBottom: '1px solid #ddd',
                    }}
                  >
                    <Box component="td" sx={{ px: 2, py: 1, fontWeight: 600 }}>
                      {key.toUpperCase()}
                    </Box>
                    <Box component="td" sx={{ px: 2, py: 1 }}>
                      {val}
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography>No stats available.</Typography>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tab 1: Measurements */}
      {tabIndex === 1 && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Measurements</Typography>
            {player.measurement ? (
              <Box component="table" width="100%" sx={{ borderCollapse: 'collapse' }}>
                {Object.entries(player.measurement).map(([key, val], idx) => (
                  <Box
                    key={key}
                    component="tr"
                    sx={{
                      backgroundColor: idx % 2 === 0 ? '#f8f9fa' : '#fff',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <Box component="td" sx={{ px: 2, py: 1, fontWeight: 600 }}>
                      {measurementLabels[key] || key}
                    </Box>
                    <Box component="td" sx={{ px: 2, py: 1 }}>
                      {val ?? '—'}
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography>No measurements available.</Typography>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tab 2: Reports */}
      {tabIndex === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Scouting Reports</Typography>
            <Stack spacing={2}>
              {reports.length > 0 ? (
                reports.map((r, i) => (
                  <Box key={i} sx={{ borderBottom: '1px solid #eee', pb: 1 }}>
                    <Typography>
                      <strong>{r.name}</strong> (Grade: {r.grade ?? '—'})
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1} mb={1}>
                      <Chip label={r.interest + ' Interest'} color={
                        r.interest === 'High' ? 'success' : r.interest === 'Medium' ? 'warning' : 'error'
                      } />
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
