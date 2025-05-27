
import { useMemo } from 'react';
import { buildPlayerList } from '../utils/transformData';

export function usePlayerData() {
  return useMemo(() => buildPlayerList(), []);
}