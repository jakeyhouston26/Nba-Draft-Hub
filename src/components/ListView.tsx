import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import type { Player } from '../types';

export default function ListView({ players }: { players: Player[] }) {
  return (
    <Box mt={3}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Player</TableCell>
              <TableCell>Team</TableCell>
              <TableCell align="right">Avg Rank</TableCell>
              <TableCell align="right">PTS</TableCell>
              <TableCell align="right">REB</TableCell>
              <TableCell align="right">AST</TableCell>
              <TableCell align="right">FG%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player, index) => {
              const stats = player.stats?.perGame;
              const fgPct = stats && stats.fgm && stats.fga
                ? ((stats.fgm / stats.fga) * 100).toFixed(1)
                : '—';

              const avgRank =
                player.ranking &&
                Object.entries(player.ranking)
                  .filter(([key, val]) => key !== 'playerId' && typeof val === 'number')
                  .length > 0
                  ? (
                      Object.entries(player.ranking)
                        .filter(([key, val]) => key !== 'playerId' && typeof val === 'number')
                        .reduce((acc, [_, val]) => acc + (val as number), 0) /
                      Object.entries(player.ranking)
                        .filter(([key, val]) => key !== 'playerId' && typeof val === 'number')
                        .length
                    ).toFixed(1)
                  : '—';

              return (
                <TableRow key={player.bio.playerId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">{player.bio.name}</Typography>
                    <Typography variant="caption">{player.bio.position ?? ''}</Typography>
                  </TableCell>
                  <TableCell>{player.bio.currentTeam}</TableCell>
                  <TableCell align="right">{avgRank}</TableCell>
                  <TableCell align="right">{stats?.pts ?? '—'}</TableCell>
                  <TableCell align="right">{stats?.reb ?? '—'}</TableCell>
                  <TableCell align="right">{stats?.ast ?? '—'}</TableCell>
                  <TableCell align="right">{fgPct}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
