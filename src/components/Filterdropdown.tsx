import {
    Box,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Slider,
    Switch,
    FormControlLabel,
    Collapse,
    Paper,
  } from '@mui/material';
  
  interface FilterState {
    interestLevel: '' | 'GREEN' | 'YELLOW' | 'RED';
    draftType: '' | 'NEED' | 'WANT' | 'BPA';
    minGrade: number;
    internationalOnly: boolean;
  }
  
  interface FilterDropdownProps {
    open: boolean;
    filters: FilterState;
    onChange: (updated: FilterState) => void;
  }
  
  export default function FilterDropdown({ open, filters, onChange }: FilterDropdownProps) {
    const handleChange = (key: keyof FilterState, value: any) => {
      onChange({ ...filters, [key]: value });
    };
  
    return (
      <Collapse in={open}>
        <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
          <Box display="flex" flexWrap="wrap" gap={4} alignItems="center">
            <Box>
              <Typography fontWeight="bold">Interest Level</Typography>
              <ToggleButtonGroup
                value={filters.interestLevel}
                exclusive
                onChange={(_, val) => handleChange('interestLevel', val ?? '')}
                size="small"
              >
                <ToggleButton value="GREEN">GREEN</ToggleButton>
                <ToggleButton value="YELLOW">YELLOW</ToggleButton>
                <ToggleButton value="RED">RED</ToggleButton>
              </ToggleButtonGroup>
            </Box>
  
            <Box>
              <Typography fontWeight="bold">Draft Category</Typography>
              <ToggleButtonGroup
                value={filters.draftType}
                exclusive
                onChange={(_, val) => handleChange('draftType', val ?? '')}
                size="small"
              >
                <ToggleButton value="NEED">NEED</ToggleButton>
                <ToggleButton value="WANT">WANT</ToggleButton>
                <ToggleButton value="BPA">BPA</ToggleButton>
              </ToggleButtonGroup>
            </Box>
  
            <Box width={180}>
              <Typography fontWeight="bold">Min Internal Grade</Typography>
              <Slider
                min={0}
                max={10}
                step={1}
                value={filters.minGrade}
                onChange={(_, val) => handleChange('minGrade', val)}
                valueLabelDisplay="auto"
              />
            </Box>
  
            <FormControlLabel
              control={
                <Switch
                  checked={filters.internationalOnly}
                  onChange={(e) => handleChange('internationalOnly', e.target.checked)}
                />
              }
              label="International Only"
            />
          </Box>
        </Paper>
      </Collapse>
    );
  }
  