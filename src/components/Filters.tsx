import { TextField, Box } from '@mui/material';
import { ChangeEvent } from 'react';

interface FiltersProps {
  onSearch: (term: string) => void;
}

export default function Filters({ onSearch }: FiltersProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Box>
      <TextField
        size="small"
        placeholder="Search player…"
        onChange={handleSearchChange}
      />
    </Box>
  );
}
