import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
  Chip,
  Button,
  Modal,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  Select,
} from '@mui/material';
import { usePlayerData } from '../hooks/usePlayerData';

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

export default function MyReports() {
  const scoutEmail = localStorage.getItem('scoutEmail')?.toLowerCase() || '';
  const allPlayers = usePlayerData();

  const scoutReports = allPlayers
    .map(player => {
      const reports = player.reports?.filter(r =>
        r.name?.toLowerCase().includes(scoutEmail)
      ) || [];
      return reports.length > 0 ? { player, reports } : null;
    })
    .filter(Boolean) as { player: any; reports: any[] }[];

  const [open, setOpen] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | ''>('');
  const [newReportText, setNewReportText] = useState('');
  const [grade, setGrade] = useState<number | null>(null);
  const [interest, setInterest] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [type, setType] = useState<'Need' | 'Want' | 'BPA'>('BPA');

  const handleAddReport = () => {
    if (!selectedPlayerId || !newReportText.trim()) return;

    const newReport = {
      name: scoutEmail,
      text: newReportText.trim(),
      grade,
      interest,
      type
    };

    const localKey = `reports-${selectedPlayerId}`;
    const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
    const updated = [...existing, newReport];
    localStorage.setItem(localKey, JSON.stringify(updated));

    setSelectedPlayerId('');
    setNewReportText('');
    setGrade(null);
    setInterest('Medium');
    setType('BPA');
    setOpen(false);
    window.location.reload(); 
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          My Reports
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Report
        </Button>
      </Box>

      {scoutReports.length === 0 ? (
        <Typography>No reports submitted yet.</Typography>
      ) : (
        scoutReports.map(({ player, reports }) => (
          <Paper key={player.bio.playerId} sx={{ mb: 3, p: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              {player.bio.name} — {player.bio.currentTeam}
            </Typography>

            <Stack spacing={2} mt={2}>
              {reports.map((r, i) => (
                <Box key={i} sx={{ borderBottom: '1px solid #eee', pb: 1 }}>
                  <Stack direction="row" spacing={1} mb={1}>
                    <Chip label={`Grade: ${r.grade ?? '—'}`} size="small" />
                    <Chip
                      label={r.interest}
                      size="small"
                      color={
                        r.interest === 'High'
                          ? 'success'
                          : r.interest === 'Medium'
                          ? 'warning'
                          : 'error'
                      }
                    />
                    <Chip label={r.type} variant="outlined" size="small" />
                  </Stack>
                  <Typography variant="body2">{r.text}</Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        ))
      )}

      
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" fontWeight="bold" mb={2}>Add Scouting Report</Typography>

          <Select
            fullWidth
            displayEmpty
            value={selectedPlayerId}
            onChange={(e) => setSelectedPlayerId(Number(e.target.value))}
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled>Select Player</MenuItem>
            {allPlayers.map(p => (
              <MenuItem key={p.bio.playerId} value={p.bio.playerId}>
                {p.bio.name}
              </MenuItem>
            ))}
          </Select>

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
            value={newReportText}
            onChange={(e) => setNewReportText(e.target.value)}
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
