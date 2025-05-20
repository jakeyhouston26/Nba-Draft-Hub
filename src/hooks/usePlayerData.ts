// Loads player list and memoizes it — this ensures the data is only built once
import { useMemo } from 'react';
import { buildPlayerList } from '../utils/transformData';

export function usePlayerData() {
  return useMemo(() => buildPlayerList(), []);
}
