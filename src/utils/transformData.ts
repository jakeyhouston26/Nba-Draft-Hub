import rawData from '../data/intern_project_data.json';
import type { Player } from '../types';

export function buildPlayerList(): Player[] {
  const bios: any[] = rawData.bio;
  const rankings: any[] = rawData.scoutRankings;
  const measurements: any[] = rawData.measurements;
  const gameLogs = rawData.game_logs;

  return bios.map((bio) => {
    const ranking = rankings.find((r) => r.playerId === bio.playerId) || null;
    const measurement = measurements.find((m) => m.playerId === bio.playerId) || null;
    const logs = gameLogs.filter((g) => g.playerId === bio.playerId);

    const stats = logs.length > 0 ? calculateStats(logs) : undefined;

    return {
      bio,
      ranking,
      measurement,
      stats,
    };
  });
}

function calculateStats(logs: any[]): { perGame: Record<string, number>, seasonTotals: Record<string, number> } {
  const statKeys = [
    'pts', 'ast', 'reb', 'fgm', 'fga', 'tpm', 'tpa', 'ftm', 'fta',
    'stl', 'blk', 'tov', 'pf', 'oreb', 'dreb'
  ];

  const seasonTotals: Record<string, number> = {};
  const perGame: Record<string, number> = {};

  for (const key of statKeys) {
    seasonTotals[key] = logs.reduce((sum, log) => sum + (log[key] || 0), 0);
    perGame[key] = parseFloat((seasonTotals[key] / logs.length).toFixed(1));
  }

  return { perGame, seasonTotals };
}